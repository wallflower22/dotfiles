/*global jQuery */
/*global slDebug */
/*global window */
/*global InfoMessage */
/*global getBlackfireResponseFromJqXHR */
/*global getBlackfireErrorFromJqXHR */
/*global getBlackfireErrorHeader */
/*global handleJqXHRError */
/*global RavenClient */
/*global Q */

(function (window, $, RavenClient, Q) {
    "use strict";

    $.ajaxSetup({
        crossDomain: true
    });

    function generateSProfilerQuery(query) {
        //@deprecated signature will not be duplicated in query_string late April 2015 (`replace()` to be removed)
        var QS = query.signature.query_string.replace(/&signature=[^&]*$/, '') + '&signature=' + encodeURIComponent(query.signature.signature);

        Object.keys(query.options).forEach(function (key) {
            if ('_' === key.substr(0, 1)) {
                return;
            }
            if ('wait_scope' === key) {
                return;
            }
            // Probe is enabling flags whenever it sees it, let's disable it if it's not "1"
            if ('flag_' === key.substr(0, 5) && '1' !== query.options[key].toString()) {
                return;
            }

            QS += '&' + key + '=' + encodeURIComponent(query.options[key]);
        });

        return QS;
    }

    function prepareAjaxSettings(query) {
        var requestHeaders = {}, settings = {},
            queryString = generateSProfilerQuery(query);

        requestHeaders['X-Blackfire-Query'] = queryString;
        requestHeaders['Cache-Control'] = 'max-age=0';
        requestHeaders['If-Modified-Since'] = '';
        requestHeaders['If-None-Match'] = '';

        settings.url         = query.tab.url;
        settings.headers     = requestHeaders;

        return settings;
    }

    window.REQUESTER_WAITING = 'waiting';
    window.REQUESTER_PROFILING = 'profiling';
    window.REQUESTER_ABORTING = 'aborting';
    window.REQUESTER_READY = 'ready';

    function Requester(listenersManager, dispatcher) {
        this.emitter = dispatcher;
        this.listenersManager = listenersManager;
        this.status = window.REQUESTER_READY;
        this.iteration = null;

        function finish(tab, payload) {
            this.emitter.emit('finish.' + payload.type, {
                type     : payload.type,
                tab      : tab,
                msg      : payload.msg,
                options  : payload.query.options,
                query    : payload.query,
                signature: payload.query.signature
            });
        }

        function abort(tab) {
            this.emitter.emit('aborting', {
                type     : 'aborted',
                tab      : tab,
                msg      : new InfoMessage('Profile request has been aborted', 'You have manually aborted the profile request.')
            });
        }

        function abortionFinished(tab) {
            this.emitter.emit('finish.aborted', {
                type     : 'aborted',
                tab      : tab,
                msg      : new InfoMessage('Profile request has been aborted', 'You have manually aborted the profile request.')
            });
        }

        function fastAbort(tab, payload) {
            abortionFinished.call(this, tab, payload);
            this.status = window.REQUESTER_READY;
        }

        this.transitions = {};
        this.transitions[window.REQUESTER_WAITING + '=>' + window.REQUESTER_ABORTING] = fastAbort;
        this.transitions[window.REQUESTER_WAITING + '=>' + window.REQUESTER_READY] = finish;

        this.transitions[window.REQUESTER_PROFILING + '=>' + window.REQUESTER_ABORTING] = abort;
        this.transitions[window.REQUESTER_PROFILING + '=>' + window.REQUESTER_READY] = finish;

        this.transitions[window.REQUESTER_ABORTING + '=>' + window.REQUESTER_READY] = abortionFinished;

        this.transitions[window.REQUESTER_READY + '=>' + window.REQUESTER_WAITING] = function (tab, payload) {
            this.emitter.emit('start', {
                tab        : tab,
                options    : payload.query.options,
                query      : payload.query,
                status     : '...'
            });
        };
        this.transitions[window.REQUESTER_READY + '=>' + window.REQUESTER_PROFILING] = function (tab, payload) {
            this.emitter.emit('start', {
                tab        : tab,
                options    : payload.query.options,
                query      : payload.query,
                status     : '0%'
            });
        };
    }

    Requester.prototype = {
        _setStatus: function (status, tab, payload) {
            var transition = this.status + '=>' + status;

            if (undefined === this.transitions[transition]) {
                throw 'Invalid transition ' + transition;
            }

            this.status = status;
            this.transitions[transition].call(this, tab, payload);
        },

        getStatus: function getStatus() {
            return this.status;
        },

        isActive: function () {
            return this.status !== window.REQUESTER_READY;
        },

        isAborted: function () {
            return this.status === window.REQUESTER_ABORTING;
        },

        abort: function (tab) {
            if (!this.isActive()) {
                slDebug.error('profiling', 'Cannot abort unactive requester');

                return;
            }
            this._setStatus(window.REQUESTER_ABORTING, tab);

            if (this.listenersManager.isListeningOnNextRequest()) {
                this.listenersManager.cancelOnNextRequestEnd();
            }
        },

        on: function (eventName, callback) {
            this.emitter.addListener(eventName, callback);
        },

        singleRequest: function (query) {
            if (this.isActive()) {
                throw "Requester is already active";
            }

            this._setStatus(window.REQUESTER_WAITING, query.tab, {query: query});

            var scope = query.options.wait_scope,
                queryString = generateSProfilerQuery(query),
                headers = {
                    'X-Blackfire-Query' : queryString
                };

            this.listenersManager.notifyOnNextRequestEnd(headers, query.tab.id, scope, function (url, headers, nextRequest) {
                var errorHeader = getBlackfireErrorHeader(headers),
                    errors = null !== errorHeader ? errorHeader.split(' ') : [],
                    msg = null,
                    type = null,
                    errorMessage = window.DEBUG_PROFILING ? errors.join(' ') : errors.slice(1, errors.length).join(' ');

                query.request = nextRequest.getRequest();

                if (errors.length === 0 && Object.keys(headers).length === 0) {
                    type = 'failure';
                    msg = new InfoMessage('Are you authorized to profile this page?', 'No probe response, missing PHP extension or invalid signature for relaying agent ' + (DEFAULT_DEBUG ? 'to profile ' + url : '') + '.', true);
                } else if (errors.length > 1) {
                    type = 'failure';
                    msg = new InfoMessage('Error while profiling', errorMessage, true);
                } else {
                    type = 'success';
                    msg = new InfoMessage('Access your profile now!');
                }

                this._setStatus(window.REQUESTER_READY, query.tab, {type: type, msg: msg, query: query});
            }.bind(this));
        },

        send: function (query) {
            if (this.isActive()) {
                throw "Requester is already active";
            }

            slDebug.log('profiling', 'Starting profiling request');

            this.iteration = 0;
            this._setStatus(window.REQUESTER_PROFILING, query.tab, {query: query});

            this.listenersManager
                .captureRequest(query.signature.pieces.requestId)
                .then(function (request) {
                    query.request = request;
                });

            return this.doSendData(query, null)
                .then(function (data) {
                    this.iteration = null;
                    this._setStatus(window.REQUESTER_READY, query.tab, {query: query, type: data[0], msg: data[1]});
                }.bind(this))
                .progress(function (percentage) {
                    if (!this.isAborted()) {
                        slDebug.log('profiling', 'progress', query.tab, percentage);
                        this.emitter.emit('progress', {
                            tab: query.tab,
                            percentage: percentage
                        });
                    }
                }.bind(this))
                .fail(RavenClient.captureException);
        },

        doSendData: function (query, deferred) {
            var requester = this;

            if (!deferred) {
                deferred = Q.defer();
            }

            slDebug.log('profiling', 'about to query', query.tab);

            if (this.isAborted()) {
                query.options._original_aggreg_samples = query.options.aggreg_samples;
                query.options.aggreg_samples = 0;
            }

            if (100 < this.iteration) {
                query.options._original_aggreg_samples = query.options.aggreg_samples;
                query.options.aggreg_samples = 0;

                $.ajax(query.tab.url, prepareAjaxSettings(query));

                RavenClient.captureMessage('Companion is looping', { query: query });
                deferred.resolve(['failure', new InfoMessage('Internal error', 'The companion is looping', true)]);

                return deferred.promise;
            }

            this.iteration += 1;

            slDebug.log('profiling', 'Performing request on ' + query.tab.url, query.options);
            $.ajax(query.tab.url, prepareAjaxSettings(query))
                .done(function (content, status, jqXHR) {
                    slDebug.log('profiling', 'request done');
                    requester.handleData(query, deferred, jqXHR, null);
                })
                .fail(function (jqXHR, exception) {
                    slDebug.log('profiling', 'request failure');
                    requester.handleData(query, deferred, jqXHR, exception);
                });

            return deferred.promise;
        },

        handleData: function (query, deferred, jqXHR, exception) {
            var responseHeader = getBlackfireResponseFromJqXHR(jqXHR),
                errorHeader = getBlackfireErrorFromJqXHR(jqXHR),
                errors = null !== errorHeader ? errorHeader.split(' ') : [],
                queryString = null !== responseHeader ? responseHeader : '',
                data = parseQueryString(queryString),
                msg = '',
                errorMessage = window.DEBUG_PROFILING ? errors.join(' ') : errors.slice(1, errors.length).join(' ');

            if (data.progress) {
                deferred.notify(data.progress);
            }

            if (errors.length > 1) {
                deferred.resolve(['failure', new InfoMessage('Error while profiling', errorMessage, true)]);

                return deferred.promise;
            }

            // Chrome extension are prevented to make too much error requests to prevent DDoS attacks
            // see http://www.chromium.org/throttling
            // In this cas, disable aggregation
            if (data.continue === 'true' && 500 <= jqXHR.status && query.options.aggreg_samples > 0) {
                query.options._original_aggreg_samples = query.options.aggreg_samples;
                query.options.aggreg_samples = 1;
            }

            switch (data.continue) {
            case 'true':
                if ('0' === data.wait) {
                    this.doSendData(query, deferred);
                } else {
                    window.setTimeout(function () {
                        this.doSendData(query, deferred);
                    }.bind(this), undefined === data.wait ? 100 : window.parseInt(data.wait));
                }
                break;
            case 'false':
                slDebug.log('profiling', 'Profiling finished');
                if (this.isAborted()) {
                    deferred.resolve(['aborted', new InfoMessage('Profile request has been aborted', 'You have manually aborted the profile request.')]);
                } else {
                    deferred.resolve(['success', new InfoMessage('Access your profile now!')]);
                }
                break;
            default:
                slDebug.warn('profiling', 'Nothing received, probably not a profilable or network error', msg);
                deferred.resolve(['failure', handleJqXHRError(query.tab.url, exception, jqXHR)]);
                break;
            }
        }
    };

    window.Requester = Requester;
}(window, jQuery, RavenClient, Q));
