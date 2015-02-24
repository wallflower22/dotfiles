/*global chrome */
/*global createDeferred */

(function (window, Q) {
    "use strict";

    var CACHE_VERSION = '1',
        CACHE_KEY = 'companion-cache-version',
        initialized = false,
        initializingDefer = null;

    function LocalStorage(data) {
        this.data = data;
    }

    LocalStorage.prototype = {
        _initialize: function () {
            if (true === initialized) {
                return initializingDefer.promise;
            }

            if (null === initializingDefer) {
                initializingDefer = Q.defer();
                initialized = true;
            }

            chrome.storage.local.get(CACHE_KEY, function (items) {
                if (!chrome.runtime.lastError && items[CACHE_KEY] === CACHE_VERSION) {
                    initializingDefer.resolve();

                    return;
                }

                chrome.storage.local.clear(function () {
                    var data = {};
                    data[CACHE_KEY] = CACHE_VERSION;

                    chrome.storage.local.set(data, function () {
                        initializingDefer.resolve();
                    });
                });
            });


            return initializingDefer.promise;
        },

        get: function (key, defaultValue) {
            var deferred = createDeferred();

            this._initialize()
                .then(function () {
                    chrome.storage.local.get(key, function (items) {
                        if (chrome.runtime.lastError) {
                            deferred.reject(chrome.runtime.lastError);
                        } else {
                            deferred.resolve(items[key] === undefined ? defaultValue : items[key]);
                        }
                    });
                })
                .fail(RavenClient.captureException);

            return deferred.promise;
        },
        set: function (key, value) {
            var deferred = createDeferred(),
                data = {};

            data[key] = value;

            this._initialize()
                .then(function () {
                    chrome.storage.local.set(data, function () {
                        if (chrome.runtime.lastError) {
                            deferred.reject(chrome.runtime.lastError);
                        } else {
                            deferred.resolve();
                        }
                    });
                })
                .fail(RavenClient.captureException);

            return deferred.promise;
        },
        remove: function (key) {
            var deferred = createDeferred();

            this._initialize()
                .then(function () {
                    chrome.storage.local.set(key, function () {
                        if (chrome.runtime.lastError) {
                            deferred.reject(chrome.runtime.lastError);
                        } else {
                            deferred.resolve();
                        }
                    });
                })
                .fail(RavenClient.captureException);

            return deferred.promise;
        },
        clear: function () {
            var deferred = createDeferred();

            chrome.storage.local.clear(function () {
                if (chrome.runtime.lastError) {
                    deferred.reject(chrome.runtime.lastError);
                } else {
                    deferred.resolve();
                }
            });

            return deferred.promise;
        }
    };

    window.LocalStorage = LocalStorage;
}(window, Q));
