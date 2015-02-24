/*global window */
/*global jQuery */
/*global Q */
/*global createDeferred */
/*global ProfilerApi */
/*global ProfilerClient */
/*global CachedApi */
/*global MessageStorage */
/*global ListenersManager */
/*global chrome */
/*global fgMessage */
/*global slDebug */
/*global getCurrentTab */
/*global Requester */
/*global API_END_POINT */
/*global CREDENTIALS_END_POINT */
/*global getUserAgent */
/*global profiler */
/*global ToolbarStack */
/*global LocalStorage */
/*global RavenClient */
/*global formatHeadersAsKeyValues */
/*global isIpReserved */
/*global EventEmitter2 */

(function (window, $, RavenClient, Q) {
    "use strict";

    var dispatcher = new EventEmitter2({
            wildcard: true
        }),
        storage = new LocalStorage(),
        STORAGE_USER_API_KEY = 'user-api-key',
        listeners = new ListenersManager(),
        requester = new Requester(listeners, dispatcher),
        toolbar = new ToolbarStack(),
        client = new ProfilerClient(API_END_POINT, null, null),
        api = new CachedApi(new ProfilerApi(client), storage, dispatcher);

    chrome.browserAction.setBadgeText({"text" : window.SLP_DIST});

    chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
        if (request) {
            if (request.message) {
                if (request.message === 'version') {
                    sendResponse({version: window.EXTENSION_VERSION});
                } else {
                    slDebug.error('message', 'Unhandled external message ' + request.message);
                }
            }
        }

        return true;
    });

    requester.on('start', function (data) {
        listeners.enableFilterHeaders();
        fgMessage('profileStart', {"data": data, 'status': requester.getStatus()});
        toolbar.setStatus(data.tab.id, requester.getStatus() + '.starting', 0);
    });

    requester.on('progress', function (data) {
        fgMessage('profileProgress', {"data": data, 'status' : requester.getStatus()});
        toolbar.setStatus(data.tab.id, requester.getStatus(), data.percentage);
    });

    requester.on('finish.*', function (data) {
        slDebug.log('profiling', 'finish', data);
        listeners.disableFilterHeaders();

        if (data.type === 'success') {
            if (!isIpReserved(data.query.request.ip)) {
                api.createProfileRequest(data.query.signature.pieces.profileSlot, {
                    request_id: data.query.signature.pieces.requestId,
                    http_request_data: {
                        method: data.query.request.method,
                        url: data.query.request.url,
                        headers: formatHeadersAsKeyValues(data.query.request.requestHeaders, true),
                        body_form_data: data.query.request.body.formData || null,
                        body_raw: data.query.request.body.raw ? window.btoa(data.query.request.body.raw) : null
                    }
                });
            } else {
                slDebug.log('profiling', 'bypassing localhost traffic for metadata, ip is', data.query.request.ip);
            }

            fgMessage('profileFinish', {"data": data, 'status' : 'completed'});
            toolbar.setFinished(data.tab.id, data.msg);
        } else if (data.type === 'failure') {
            fgMessage('profileFinish', {"data": data, 'status' : 'errored'});
            toolbar.setErrored(data.tab.id, data.msg);
        } else {
            fgMessage('profileFinish', {"data": data, 'status' : 'aborted'});
            toolbar.setAborted(data.tab.id, data.msg);
        }
    });

    function doFetchCredentials() {
        return Q($.ajax({
            "url": CREDENTIALS_END_POINT,
            "type": "GET",
            "dataType" : "json",
            "headers" : {
                "accept": "application/json",
                "X-Blackfire-User-Agent": getUserAgent()
            }
        }));
    }

    function fetchCredentials(response, sendResponse) {
        listeners.enableFilterHeaders(CREDENTIALS_END_POINT);

        slDebug.log('api', 'Performing request on GET ' + CREDENTIALS_END_POINT);

        doFetchCredentials()
            .then(function (apiCredentials) {
                var deferredStorage = createDeferred();

                storage.set(STORAGE_USER_API_KEY, apiCredentials)
                    .then(function () {
                        deferredStorage.resolve(apiCredentials);
                    })
                    .fail(RavenClient.captureException);

                return deferredStorage.promise;
            })
            .then(function (credentials) {
                client.setAuthentication(credentials.uuid, credentials.apiToken);
                sendResponse({
                    "success" : true,
                    "result" : credentials
                });
            }, function (jqXHR, status, exception) {
                sendResponse({
                    "success" : false,
                    "exception" : exception,
                    "jqXHR" : JSON.stringify(jqXHR)
                });
            })
            .fail(RavenClient.captureException)
            .finally(function () {
                listeners.disableFilterHeaders();
            });
    }

    function signinAndRequest(api, slot) {
        var deferred = createDeferred();

        api.signin({
            collabToken: slot.collabToken.id,
            profileSlot: slot.id
        }).then(function (signature) {
            deferred.resolve(signature[0]);
        }, function (data) {
            deferred.reject(data);
        });

        return deferred.promise;
    }

    function parseSignature(signature) {
        var data = $.extend({pieces: {}}, signature),
            tmpAgents = [];

        if (!signature.query_string) {
            RavenClient.captureMessage('Invalid signature', { signature: signature });

            return data;
        }

        data.pieces = parseQueryString(signature.query_string);

        if (!data.pieces.agentIds) {
            RavenClient.captureMessage('Missing agents in signature', { signature: signature, data: data });

            return data;
        }

        data.pieces.agentIds = data.pieces.agentIds.split(',');

        if (2 > data.pieces.agentIds.length) {
            RavenClient.captureMessage('Missing request-id as last agent in signature', { signature: signature, data: data });

            return data;
        }

        data.pieces.requestId = null;
        data.pieces.agentIds.forEach(function (agentId) {
            if ('request-id-' === agentId.substr(0, 'request-id-'.length)) {
                data.pieces.requestId = agentId.substr('request-id-'.length);

                return;
            }
            tmpAgents.push(agentId);
        });

        data.pieces.agentIds = tmpAgents;

        if (data.pieces.requestId === null) {
            RavenClient.captureMessage('Missing request-id as last agent in signature', { signature: signature, data: data });

            return data;
        }

        return data;
    }

    function doProfile(query, sendResponse) {
        if (requester.isActive()) {
            sendResponse({
                "success": false
            });
        } else {
            toolbar.insert(query.tab.id, query.slot)
                .then(function (toolbar) {
                    signinAndRequest(api, query.slot)
                        .then(function (signature) {
                            query.signature = parseSignature(signature);

                            return requester.send(query);
                        })
                        .fail(function (data) {
                            RavenClient.captureMessage('Unable to sign', { data: data });
                            fgMessage('signinFailure', {"data": data});
                            toolbar.setErrored(new InfoMessage('Authorization retrieval failed', 'Could not connect to Blackfire to get a profiling authorization, please try again later', true));
                        });

                });

            sendResponse({
                "success": true,
                "status" : 'profiling'
            });
        }
    }

    function doProfileNextRequest(query, sendResponse) {
        if (requester.isActive()) {
            sendResponse({
                "success": false
            });
        } else {
            toolbar.insert(query.tab.id, query.slot)
                .then(function (toolbar) {
                    signinAndRequest(api, query.slot)
                        .then(function (signature) {
                            query.signature = parseSignature(signature);

                            return requester.send(query);
                        })
                        .fail(function (data) {
                            RavenClient.captureMessage('Unable to sign', { data: data });
                            fgMessage('signinFailure', {"data": data});
                            toolbar.setErrored(new InfoMessage('Authorization retrieval failed', 'Could not connect to Blackfire to get a profiling authorization, please try again later', true));
                        });

                });

            sendResponse({
                "success": true,
                "status" : 'waiting'
            });
        }
    }

    function isProfiling(query, sendResponse) {
        sendResponse({
            "success": true,
            "result" : requester.isActive() && !requester.isAborted(),
            "status" : requester.getStatus()
        });
    }

    function getDebugConfiguration(query, sendResponse) {
        var conf = [];

        slDebug.available.forEach(function (type) {
            conf.push({
                "type": type,
                "enabled": window['DEBUG_' + type.toUpperCase()]
            });
        });

        sendResponse({
            "conf": conf,
            "success": true
        });
    }

    function enableDebug(query, sendResponse) {
        if (undefined !== window['DEBUG_' + query.type.toUpperCase()]) {
            slDebug.updateConf(query.type, true);
        } else {
            slDebug.error('other', 'Invalid message received for disable debug');
        }
        sendResponse({
            "enabled" : true,
            "success" : true
        });
    }

    function disableDebug(query, sendResponse) {
        if (undefined !== window['DEBUG_' + query.type.toUpperCase()]) {
            slDebug.updateConf(query.type, false);
        } else {
            slDebug.error('other', 'Invalid message received for disable debug');
        }
        sendResponse({
            "enabled" : false,
            "success" : true
        });
    }

    function abortProfile(query, sendResponse, sender) {
        var tab = query.tab || sender.tab;

        requester.abort(tab);
        toolbar.setAborted(tab.id, new InfoMessage("Profile request has been aborted", "You have manually aborted the profile request.", false));
        sendResponse({
            "success" : true
        });
    }

    function setStatus(query, sendResponse) {
        profiler.getCurrentTab()
            .then(function (tab) {
                toolbar.insert(tab.id, query.slot)
                    .then(function () {
                        if (query.method === 'setStatus') {
                            toolbar[query.method](tab.id, query.status, query.percentage);
                        } else {
                            toolbar[query.method](tab.id, query.infoMessage);
                        }
                    })
                    .fail(RavenClient.captureException);
            })
            .fail(RavenClient.captureException);

        sendResponse({
            "success" : true
        });
    }

    function getMe(query, sendResponse) {
        api.getMe()
            .then(function (result) {
                RavenClient.setUserInfo(result[0]);
                sendResponse({
                    "success" : true,
                    'result': result[0]
                });
            }, function () {
                sendResponse({
                    "success" : false
                });
            })
            .fail(RavenClient.captureException);
    }

    function getCollabTokens(query, sendResponse) {
        api.getCollabTokens(query.fresh)
            .then(function (result) {
                sendResponse({
                    "success" : true,
                    'result': result[0]
                });
            }, function () {
                sendResponse({
                    "success" : false
                });
            })
            .fail(RavenClient.captureException);
    }

    function updateProfileSlotLabel(query, sendResponse) {
        api.updateProfileSlotLabel(query.slot.id, query.payload)
            .then(function (result) {
                query.slot.label = query.payload.label;
                toolbar.broadcast('updateSlot', {slot: query.slot});
                sendResponse({
                    "success" : true,
                    'result': result[0]
                });
            }, function () {
                sendResponse({
                    "success" : false
                });
            })
            .fail(RavenClient.captureException);
    }

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
        if ('loading' === changeInfo.status) {
            toolbar.reinsert(tabId);
        }
    });

    function toolbarRemove(msg, sendResponse, sender) {
        toolbar.remove(sender.tab.id);
        sendResponse({success: true});
    }

    function toolbarLoaded(msg, sendResponse, sender) {
        toolbar.setLoaded(sender.tab.id);
        sendResponse({success: true});
    }

    function toolbarSizeUp(msg, sendResponse, sender) {
        toolbar.extendSize(sender.tab.id);
        sendResponse({success: true});
    }

    function toolbarSizeDown(msg, sendResponse, sender) {
        toolbar.reduceSize(sender.tab.id);
        sendResponse({success: true});
    }

    window.installMessageListener({
        fetchCredentials      : fetchCredentials,
        doProfile             : doProfile,
        doProfileNextRequest  : doProfileNextRequest,
        isProfiling           : isProfiling,
        getDebugConfiguration : getDebugConfiguration,
        enableDebug           : enableDebug,
        disableDebug          : disableDebug,
        abortProfile          : abortProfile,
        setStatus             : setStatus,
        getMe                 : getMe,
        getCollabTokens       : getCollabTokens,
        updateProfileSlotLabel: updateProfileSlotLabel,
        toolbarRemove         : toolbarRemove,
        toolbarSizeUp         : toolbarSizeUp,
        toolbarSizeDown       : toolbarSizeDown,
        toolbarLoaded         : toolbarLoaded
    });

    api.on('post-lazyload.*', function (method, data) {
        switch (method.toLowerCase()) {
        case 'getme':
            fgMessage('onIdentity', data);
            break;
        case 'getcollabtokens':
            fgMessage('onCollabTokens', data);
            break;
        default:
            window.console.error('Unhandled post lazy load event', method, data);
        }
    });
}(window, jQuery, RavenClient, Q));
