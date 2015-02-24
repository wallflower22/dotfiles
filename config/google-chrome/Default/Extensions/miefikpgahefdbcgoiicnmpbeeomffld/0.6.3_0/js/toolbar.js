/*global createDeferred */
/*global slDebug */
/*global chrome */
/*global RavenClient */
/*global extMessage */

(function () {
    "use strict";

    function Toolbar(tabId, slot) {
        this.tabId = tabId;
        this.slot = slot;
        this.loaded = createDeferred();
        this.lastStatus = null;
    }

    function ToolbarStack() {
        this.stack = {};
    }

    ToolbarStack.prototype = {
        broadcast: function (name, message) {
            Object.keys(this.stack).forEach(function (key) {
                extMessage(this.stack[key].tabId, name, message);
            }.bind(this));
        },

        extendSize: function (tabId) {
            return this.setSize(tabId, 100);
        },

        reduceSize: function (tabId) {
            return this.setSize(tabId, 50);
        },

        setLoaded: function (tabId) {
            if (!this.stack[tabId]) {
                return;
            }

            this.stack[tabId].loaded.resolve();
        },

        remove: function (tabId) {
            var deferred = createDeferred(),
                that = this;

            slDebug.log('toolbar', 'ToolbarStack remove toolbar in tab', tabId);

            if (!that.stack[tabId]) {
                deferred.resolve();

                return deferred.promise;
            }

            var code = '(function () {' +
                'var script = document.createElement("script");' +
                '' +
                'script.textContent = "(function () {' +
                'var toolbar = document.getElementById(\\"blackfire-toolbar\\");' +
                'if (null === toolbar) {' +
                '    return;' +
                '}' +
                'toolbar.parentNode.removeChild(toolbar);' +
                '}());";' +
                '' +
                '(document.head||document.documentElement).appendChild(script);' +
                'script.parentNode.removeChild(script);' +
                '}());';

            chrome.tabs.executeScript(tabId, {
                code: code
            }, function () {
                delete that.stack[tabId];
                deferred.resolve();
            });

            return deferred.promise;
        },

        reinsert: function (tabId) {
            var deferred = createDeferred();

            if (!this.stack[tabId]) {
                deferred.resolve();

                return deferred.promise;
            }

            var lastStatus = this.stack[tabId].lastStatus;

            if (null === lastStatus) {
                delete this.stack[tabId];

                deferred.resolve();

                return deferred.promise;
            }

            this.insert(tabId, this.stack[tabId].slot, true)
                .then(function (toolbar) {
                    if (lastStatus === null) {
                        deferred.resolve();
                    }

                    toolbar.setStatus.apply(toolbar, lastStatus)
                        .then(function () {
                            deferred.resolve();
                        })
                        .fail(RavenClient.captureException);
                })
                .fail(RavenClient.captureException);

            return deferred.promise;
        },

        insert: function (tabId, slot, force) {
            var deferred = createDeferred(),
                that = this,
                iframeUrl,
                content;

            slDebug.log('toolbar', 'ToolbarStack inject intoolbar in tab', tabId, 'for slot ', slot);

            function sameToolbar(slot1, slot2) {
                return slot1.id === slot2.id;
            }

            if (force !== true && that.stack[tabId] && sameToolbar(that.stack[tabId].slot, slot)) {
                deferred.resolve();
                slDebug.log('toolbar', 'ToolbarStack already injected, stopping');

                return deferred.promise;
            }

            var tmpdeferred = createDeferred();

            if (that.stack[tabId]) {
                this.remove(tabId)
                    .then(tmpdeferred.resolve)
                    .fail(RavenClient.captureException);
            } else {
                tmpdeferred.resolve();
            }

            tmpdeferred.promise
                .then(function () {
                    iframeUrl = 'chrome-extension://' + chrome.runtime.id + '/toolbar/toolbar.html?slot-id=' + encodeURIComponent(slot.id);
                    content = '<iframe id="blackfire-toolbar" frameborder="0" style="z-index:2147483647;width:100%;border:none;position: fixed;top:0;left:0;right:0;height:50px;bottom: auto;" src="' + iframeUrl+ '"></iframe>';

                    var code = '(function () {' +
                        'var script = document.createElement("script");' +
                        '' +
                        'script.textContent = "(function () {' +
                        'var root = document.getElementById(\\"blackfire-toolbar\\");' +
                        'if (null !== root) {' +
                        '    return;' +
                        '}' +
                        'var toolbar = \\"' + encodeURI(content) + '\\",' +
                        '    range = document.createRange();' +
                        '' +
                        'range.selectNode(document.body);' +
                        'var fragment = range.createContextualFragment(decodeURI(toolbar));' +
                        'document.body.appendChild(fragment);' +
                        '}());";' +
                        '' +
                        '(document.head||document.documentElement).appendChild(script);' +
                        'script.parentNode.removeChild(script);' +
                        '}());';
    
                    chrome.tabs.executeScript(tabId, {
                        code: code
                    }, function () {
                        var toolbar = that.stack[tabId] = new Toolbar(tabId, slot);
                        that.stack[tabId].loaded.promise
                            .then(function () {
                                return deferred.resolve(toolbar);
                            })
                            .fail(RavenClient.captureException);
                    });
                });

            return deferred.promise;
        },

        setStatus: function (tabId, status, percentage) {
            if (undefined === this.stack[tabId]) {
                slDebug.log('toolbar', 'ToolbarStack skipped setStatus', tabId, ' with status ', status, percentage);

                return;
            }
            slDebug.log('toolbar', 'ToolbarStack setStatus', tabId, ' with status ', status, percentage);

            return this.insert(tabId, this.stack[tabId].slot)
                .then(this.stack[tabId].setStatus.bind(this.stack[tabId], status, percentage));
        },

        setFinished: function (tabId, infoMessage) {
            if (undefined === this.stack[tabId]) {

                slDebug.log('toolbar', 'ToolbarStack skipped setFinished', tabId, ' with info ', infoMessage);
                return false;
            }

            slDebug.log('toolbar', 'ToolbarStack setFinisged', tabId, ' with info ', infoMessage);

            return this.insert(tabId, this.stack[tabId].slot)
                .then(this.stack[tabId].setFinished.bind(this.stack[tabId], infoMessage))
                .fail(RavenClient.captureException);
        },

        setErrored: function (tabId, infoMessage) {
            if (undefined === this.stack[tabId]) {

                slDebug.log('toolbar', 'ToolbarStack skipped setErrored', tabId, ' with info ', infoMessage);
                return false;
            }

            slDebug.log('toolbar', 'ToolbarStack setErrored', tabId, ' with info ', infoMessage);

            return this.insert(tabId, this.stack[tabId].slot)
                .then(this.stack[tabId].setErrored.bind(this.stack[tabId], infoMessage))
                .fail(RavenClient.captureException);
        },

        setAborted: function (tabId, infoMessage) {
            if (undefined === this.stack[tabId]) {

                slDebug.log('toolbar', 'ToolbarStack skipped setAborted', tabId, ' with info ', infoMessage);
                return false;
            }

            slDebug.log('toolbar', 'ToolbarStack setAborted', tabId, ' with info ', infoMessage);

            return this.insert(tabId, this.stack[tabId].slot)
                .then(this.stack[tabId].setAborted.bind(this.stack[tabId], infoMessage))
                .fail(RavenClient.captureException);
        },

        setSize: function (tabId, size) {
            var deferred = createDeferred(),
                that = this;

            slDebug.log('toolbar', 'ToolbarStack set size in tab', tabId);

            if (!that.stack[tabId]) {
                deferred.resolve();

                return deferred.promise;
            }

            var code = '(function () {' +
                'var script = document.createElement("script");' +
                '' +
                'script.textContent = "(function () {' +
                'var toolbar = document.getElementById(\\"blackfire-toolbar\\");' +
                'if (null === toolbar) {' +
                '    return;' +
                '}' +
                'toolbar.style.height = \\"' + size + 'px\\";' +
                '}());";' +
                '' +
                '(document.head||document.documentElement).appendChild(script);' +
                'script.parentNode.removeChild(script);' +
                '}());';

            chrome.tabs.executeScript(tabId, {
                code: code
            }, function () {
                deferred.resolve();
            });

            return deferred.promise;
        }
    };


    Toolbar.prototype = {

        setStatus: function (status, percentage, classes, infoMessage, url) {
            slDebug.log('toolbar', 'Setting status with params', status, percentage, classes, infoMessage, url);

            classes = undefined === classes ? [] : ('string' === typeof classes ? [classes] : classes);
            infoMessage = (undefined === infoMessage || null === infoMessage) ? null : infoMessage;
            url = (undefined === url || null === url) ? null : url;

            if (status !== 'aborted') {
                this.lastStatus = [status, percentage, classes, infoMessage, url];
            } else {
                this.lastStatus = null;
            }

            return extMessage(this.tabId, 'toolbarSetStatus', {
                status: status,
                percentage: percentage,
                classes: classes,
                infoMessage: infoMessage,
                url: url
            });
        },

        setFinished: function (infoMessage) {
            return this.setStatus('completed', 100, [], infoMessage, PROFILER_URL + '/profile-slots/' + this.slot.profileSlot + '/graph');
        },

        setErrored: function (infoMessage) {
            return this.setStatus('errored', 100, ['errored'], infoMessage);
        },

        setAborted: function (infoMessage) {
            return this.setStatus('aborted', 100, ['aborted'], infoMessage);
        }
    };

    window.Toolbar = Toolbar;
    window.ToolbarStack = ToolbarStack;
}());
