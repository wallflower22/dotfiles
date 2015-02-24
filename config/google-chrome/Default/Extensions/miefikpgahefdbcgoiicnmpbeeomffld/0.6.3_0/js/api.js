/*global slDebug */
/*global window */
/*global RavenClient */
/*global jQuery */
/*global createDeferred */
/*global API_END_POINT */

(function (window, $, RavenClient, Q) {
    "use strict";

    var STORAGE_API_ME = 'storage-api-me',
        STORAGE_API_COLLAB_TOKENS = 'storage-api-collab-tokens',

        ObjectAreEquals = function (x, y) {
            if (x === y) {
                return true;
            }

            // if both x and y are null or undefined and exactly the same
            if (!(x instanceof Object) || !(y instanceof Object)) {
                return false;
            }

            // if they are not strictly equal, they both need to be Objects
            if (x.constructor !== y.constructor) {
                return false;
            }

            // they must have the exact same prototype chain, the closest we can do is
            // test there constructor.
            for (var p in x) {
                if (!x.hasOwnProperty(p)) {
                    continue;
                }

                // other properties were tested using x.constructor === y.constructor
                if (!y.hasOwnProperty(p)) {
                    return false;
                }

                // allows to compare x[ p ] and y[ p ] when set to undefined
                if (x[p] === y[p]) {
                    continue;
                }

                // if they have the same strict value or identity then they are equal
                if (typeof(x[p]) !== "object") {
                    return false;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal
                if (!ObjectAreEquals(x[p], y[p])) {
                    return false;
                }
            }

            for (p in y) {
                // allows x[ p ] to be set to undefined
                if (y.hasOwnProperty(p) && ! x.hasOwnProperty(p)) {
                    return false;
                }
            }
            return true;
        };


    function ProfilerClient(endpoint, uuid, token) {
        this.endpoint = undefined === endpoint ? API_END_POINT : endpoint;
        this.uuid = undefined !== uuid ? uuid : null;
        this.token = undefined !== token ? token : null;
    }

    ProfilerClient.prototype = {
        get : function (url) {
            return this.doExecute('GET', url, {});
        },
        post : function (url, data) {
            return this.doExecute('POST', url, data);
        },
        put : function (url, data) {
            return this.doExecute('PUT', url, data);
        },
        setAuthentication: function (uuid, token) {
            this.uuid = uuid;
            this.token = token;
        },

        doExecute: function (method, url, data) {
            var deferred = Q.defer(),
                settings = {},
                endpoint = this.endpoint;

            if (null === this.uuid || null === this.token) {
                deferred.reject(['auth', 'Authentication is missing']);
                return;
            }

            settings = {
                type        : method,
                contentType : 'application/json',
                data        : 'get' === method.toLowerCase() ? data : JSON.stringify(data),
                dataType    : 'json',
                headers : {
                    Authorization: "Basic " + window.btoa(this.uuid + ":" + this.token)
                }
            };

            slDebug.log('api', 'Performing request on ' + method + ' ' + this.endpoint + url);
            $.ajax(this.endpoint + url, settings)
                .done(function (content, status, jqXHR) {
                    slDebug.log('api', 'Requested ' + method + ' ' + endpoint + url + ' with settings', settings, ' - Response is ' + jqXHR.status + ' ', jqXHR);
                    deferred.resolve([content, jqXHR]);
                })
                .fail(function (jqXHR, exception) {
                    slDebug.log('api', 'Requested ' + method + ' ' + endpoint + url + ' with settings', settings, ' - Response is ' + jqXHR.status + ' ', jqXHR);
                    deferred.reject([exception, jqXHR]);
                });

            return deferred.promise;
        }
    };

    function ProfilerApi(client) {
        this.client = undefined !== client ? client : new ProfilerClient();
    }

    ProfilerApi.prototype = {
        getMe : function () {
            return this.client.get('/me');
        },

        getCollabTokens : function () {
            return this.client.get('/collab-tokens');
        },

        getProfileSlot : function (id) {
            return this.client.get('/profile-slots/' + id);
        },

        getProfileMetadata : function (id) {
            return this.client.get('/profile-slots/' + id + '/data');
        },

        updateProfileSlotLabel : function (id, data) {
            return this.client.put('/profile-slots/' + id, data);
        },

        createProfileRequest : function (id, data) {
            return this.client.post('/profile-slots/' + id +'/request', data);
        },

        signin : function (data) {
            // data contains profileSlot id and collabToken

            return this.client.post('/signing', data);
        }
    };

    function CachedApi(api, storage, dispatcher) {
        this.api = api;
        this.storage = storage;
        this.emitter = dispatcher;
    }

    CachedApi.prototype = {
        getMe : function (fresh) {
            return this._doFetchFromCache(STORAGE_API_ME, 'getMe', fresh);
        },

        getCollabTokens : function (fresh) {
            return this._doFetchFromCache(STORAGE_API_COLLAB_TOKENS, 'getCollabTokens', fresh);
        },

        getProfileSlot : function (id) {
            return this.api.getProfileSlot(id);
        },

        getProfileMetadata : function (id) {
            return this.api.getProfileMetadata(id);
        },

        updateProfileSlotLabel : function (id, data) {
            return this.api.updateProfileSlotLabel(id, data);
        },

        createProfileRequest : function (id, data) {
            return this.api.createProfileRequest(id, data);
        },

        signin : function (data) {
            return this.api.signin(data);
        },

        on: function (eventName, callback) {
            this.emitter.addListener(eventName, callback);
        },

        _doFetchFromCache : function(cacheKey, method, fresh) {
            return this.storage.get(cacheKey, null)
                .then(function (result) {
                    // We fetch result in cache

                    if (null === result || true === fresh) {
                        // no result, lets query the API and save
                        return this.api[method]()
                            .then(function (apiResult) {
                                this.storage.set(cacheKey, apiResult[0]);

                                return apiResult;
                            }.bind(this));
                    }
                    var deferred = createDeferred();

                    // result were found, however, let's run a background task to verify these data
                    this.api[method]()
                        .then(function (apiResult) {
                            if (!ObjectAreEquals(result, apiResult[0])) {
                                this.storage.set(cacheKey, apiResult[0]);
                                this.emitter.emit('post-lazyload.' + method, method, apiResult[0]);
                            }
                        }.bind(this))
                        .fail(RavenClient.captureException);

                    deferred.resolve([result]);

                    return deferred.promise;
                }.bind(this))
                .fail(RavenClient.captureException);
        }
    };

    window.ProfilerClient = ProfilerClient;
    window.ProfilerApi = ProfilerApi;
    window.CachedApi = CachedApi;
}(window, jQuery, RavenClient, Q));
