/*global chrome */
/*global window */
/*global Q */
/*global slDebug */
/*global filterHeaders */
/*global isBlackfireHeader */
/*global hasBlackfireHeader */

(function (window, Q) {
    "use strict";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function arrayBuffer2Base64(arraybuffer) {
        var bytes = new Uint8Array(arraybuffer),
            i,
            len = bytes.length,
            base64 = "";

        for (i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += chars[bytes[i + 2] & 63];
        }

        if ((len % 3) === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
        }

        return base64;
    };

    function NextRequest(blackfireHeaders, callback) {
        this.requestHeaders = null;
        this.blackfireHeaders = blackfireHeaders;
        this.callback = callback;
        this.method = null;
        this.url = null;
        this.body = {formData: null, raw: null};
        this.browserRequestId = null;
        this.responseHeaders = null;
        this.browserRequestId = null;
        this.ip = null;
    }

    function Request() {
        this.requestHeaders = null;
        this.method = null;
        this.url = null;
        this.body = {formData: null, raw: null};
        this.bodyBuffer = {};
        this.browserRequestId = null;
        this.ip = null;
    }

    NextRequest.prototype.getRequest = function () {
        var request = new Request();

        request.requestHeaders = this.requestHeaders;
        request.method = this.method;
        request.url = this.url;
        request.body = this.body;
        request.browserRequestId = this.browserRequestId;
        request.ip = this.ip;

        delete request.bodyBuffer;

        return request;
    };

    function ListenersManager() {
        this.enabled = false;
        this.nextRequest = null;

        this.regularRequestCaptureBodyFactory = function (requestId, captured, deferred) {
            return function (request) {
                // We buffer all bodies, we can not determine if a request is the one we want
                // without headers
                // Unfortunately, we don't have headers yet, and we can not retrieve the body payload
                // in the headers listener
                captured.bodyBuffer[request.requestId] = { raw: null, formData: null };

                if (!request.requestBody) {
                    deferred.resolve(captured);

                    return;
                }

                if (request.requestBody.error) {
                    window.console.error('Error in request', request.requestBody.error);
                }

                if (request.requestBody.raw) {
                    captured.bodyBuffer[request.requestId].raw = request.requestBody.raw.map(function (item) {
                        return arrayBuffer2Base64(item.bytes);
                    });
                }
                if (request.requestBody.formData) {
                    captured.bodyBuffer[request.requestId].formData = request.requestBody.formData;
                }

                deferred.resolve(captured);
            };
        };

        this.regularRequestCaptureHeadersFactory = function (requestId, captured, deferred) {
            return function (request) {
                if (null !== captured.browserRequestId) {
                    // it's not a request we're looking at
                    return;
                }

                if (!hasBlackfireHeader(request.requestHeaders)) {
                    // it's not a blackfire request
                    return;
                }

                captured.browserRequestId = request.requestId;

                captured.requestHeaders = request.requestHeaders;
                captured.method = request.method;
                captured.url = request.url;
                captured.body = captured.bodyBuffer[request.requestId];
                delete captured.bodyBuffer;

                deferred.resolve(captured);
            };
        };

        this.regularRequestCaptureIPFactory = function (requestId, captured, deferred) {
            return function (details) {
                if (captured.browserRequestId !== details.requestId) {
                    // it's not a request we're looking at
                    return;
                }

                if (details.ip) {
                    captured.ip = details.ip;
                }

                deferred.resolve(captured);
            };
        };

        this.filterHeaders = function (request) {
            return {requestHeaders: filterHeaders(request.requestHeaders)};
        }.bind(this);

        this.nextRequestHeaderInjecter = function (request) {
            // Avoid race conditions
            if (null === this.nextRequest || null !== this.nextRequest.browserRequestId) {
                return;
            }

            this.nextRequest.requestHeaders = request.requestHeaders;
            this.nextRequest.method = request.method;
            this.nextRequest.url = request.url;
            this.nextRequest.browserRequestId = request.requestId;

            slDebug.log('listeners', 'Before injecter', request.requestHeaders);
            Object.keys(this.nextRequest.blackfireHeaders).forEach(function (key) {
                request.requestHeaders.push({
                    name: key,
                    value: this.nextRequest.blackfireHeaders[key]
                });
            }.bind(this));
            slDebug.log('listeners', 'After injecter', request.requestHeaders);

            return {
                requestHeaders: request.requestHeaders
            };
        }.bind(this);

        this.nextRequestBodyCapture = function (request) {
            // Avoid race conditions
            if (null === this.nextRequest || null !== this.nextRequest.browserRequestId) {
                return;
            }

            if (!request.requestBody) {
                return;
            }

            if (request.requestBody.error) {
                window.console.error('Error in request', request.requestBody.error);
            }

            if (request.requestBody.raw) {
                this.nextRequest.body.raw = request.requestBody.raw.map(function (item) {
                    return arrayBuffer2Base64(item.bytes);
                });
            }
            if (request.requestBody.formData) {
                this.nextRequest.body.formData = request.requestBody.formData;
            }
        }.bind(this);

        this.doNotifyEndOfNextRequest = function (response) {
            if (null === this.nextRequest || this.nextRequest.browserRequestId !== response.requestId) {
                return; // this is not the response we expect
            }

            var blackfireResponseHeaders = {};

            if (null !== this.nextRequest.responseHeaders) {
                this.nextRequest.responseHeaders.forEach(function (data) {
                    if (isBlackfireHeader(data.name)) {
                        return;
                    }
                    blackfireResponseHeaders[data.name.toLowerCase()] = data.value;
                });
            }

            if (response.ip) {
                this.nextRequest.ip = response.ip;
            }

            slDebug.log('listeners', 'Executing next request callback with headers', blackfireResponseHeaders);
            this.nextRequest.callback(this.nextRequest.url, blackfireResponseHeaders, this.nextRequest);
            this.nextRequest.responseHeaders = null;
            this.cancelOnNextRequestEnd();
        }.bind(this);

        this.doCaptureOfNextRequest = function (response) {
            if (null === this.nextRequest || this.nextRequest.browserRequestId !== response.requestId || null !== this.nextRequest.responseHeaders) {
                return; // this is not the response we expect
            }

            this.nextRequest.responseHeaders = response.responseHeaders;
        }.bind(this);
    }

    ListenersManager.prototype = {
        isListeningOnNextRequest: function () {
            return null !== this.nextRequest;
        },

        notifyOnNextRequestEnd: function (blackfireHeaders, tabId, scope, callback) {
            if (this.nextRequestHeaders) {
                throw "A next request listener is already active";
            }

            var scopes = scope ? [scope] : [];

            slDebug.log('listeners', 'Adding a notifier for the end of the next request with scopes', scopes);
            this.nextRequest = new NextRequest(blackfireHeaders, callback);
            chrome.webRequest.onBeforeSendHeaders.addListener(this.nextRequestHeaderInjecter, { urls: [], types: scopes, tabId: tabId }, ["blocking", "requestHeaders"]);
            chrome.webRequest.onBeforeRequest.addListener(this.nextRequestBodyCapture, { urls: [], types: scopes, tabId: tabId }, ["requestBody"]);
            chrome.webRequest.onResponseStarted.addListener(this.doCaptureOfNextRequest, { urls: [], types: scopes, tabId: tabId }, ["responseHeaders"]);
            chrome.webRequest.onBeforeRedirect.addListener(this.doCaptureOfNextRequest, { urls: [], types: scopes, tabId: tabId }, ["responseHeaders"]);
            chrome.webRequest.onCompleted.addListener(this.doNotifyEndOfNextRequest, { urls: [], types: scopes, tabId: tabId });
            chrome.webRequest.onErrorOccurred.addListener(this.doNotifyEndOfNextRequest, { urls: [], types: scopes, tabId: tabId });
        },

        cancelOnNextRequestEnd: function () {
            this.nextRequest = null;
            slDebug.log('listeners', 'Next request done, listener removed');
            chrome.webRequest.onResponseStarted.removeListener(this.doCaptureOfNextRequest);
            chrome.webRequest.onBeforeRequest.removeListener(this.nextRequestBodyCapture);
            chrome.webRequest.onBeforeRedirect.removeListener(this.doCaptureOfNextRequest);
            chrome.webRequest.onCompleted.removeListener(this.doNotifyEndOfNextRequest);
            chrome.webRequest.onErrorOccurred.removeListener(this.doNotifyEndOfNextRequest);
            chrome.webRequest.onBeforeSendHeaders.removeListener(this.nextRequestHeaderInjecter);
        },

        captureRequest: function (requestId) {
            var deferredBody = Q.defer(),
                deferredHeaders = Q.defer(),
                deferredIP = Q.defer(),
                captured = new Request(),
                listenerBody = this.regularRequestCaptureBodyFactory(requestId, captured, deferredBody),
                listenerIP = this.regularRequestCaptureIPFactory(requestId, captured, deferredIP),
                listenerHeaders = this.regularRequestCaptureHeadersFactory(requestId, captured, deferredHeaders);

            chrome.webRequest.onBeforeRequest.addListener(listenerBody, {urls: [], types: [], tabId: -1}, ["requestBody"]);
            chrome.webRequest.onBeforeSendHeaders.addListener(listenerHeaders, { urls: [], types: [], tabId: -1 }, ["blocking", "requestHeaders"]);
            chrome.webRequest.onCompleted.addListener(listenerIP, { urls: [], types: [], tabId: -1 });
            chrome.webRequest.onErrorOccurred.addListener(listenerIP, { urls: [], types: [], tabId: -1 });

            deferredHeaders.promise.then(function (request) {
                chrome.webRequest.onBeforeSendHeaders.removeListener(listenerHeaders);

                return request;
            });

            deferredBody.promise.then(function (request) {
                chrome.webRequest.onBeforeRequest.removeListener(listenerBody);

                return request;
            });

            deferredIP.promise.then(function (request) {
                chrome.webRequest.onCompleted.removeListener(listenerIP);
                chrome.webRequest.onErrorOccurred.removeListener(listenerIP);

                return request;
            })

            // IP listener is the last one
            return deferredIP.promise;
        },

        /**
         * Adds Blackfire headers
         */
        enableFilterHeaders: function (url) {
            var urls = url ? [url] : [];

            chrome.webRequest.onBeforeSendHeaders.addListener(this.filterHeaders, {urls: urls, types: ['xmlhttprequest']}, ["blocking", "requestHeaders"]);
        },

        /**
         * Stops adding Blackfire headers
         */
        disableFilterHeaders: function () {
            chrome.webRequest.onBeforeSendHeaders.removeListener(this.filterHeaders);
        }
    };

    window.ListenersManager = ListenersManager;
}(window, Q));
