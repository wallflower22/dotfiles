/*global slDebug */
/*global window */

(function (window) {
    "use strict";

    function MessageStorage() {
        this.storage = {};
    }

    MessageStorage.prototype = {
        push: function (tabId, type, message) {
            if (3 !== arguments.length) {
                slDebug.error('other', 'Invalid arguments');
                throw "MessageStorage:push is waiting for three arguments, " + arguments.length + " given";
            }

            if (tabId < 0) {
                return; // this is not in a tab. It might be an address bar search for example
            }

            if (undefined === this.storage[tabId]) {
                this.storage[tabId] = {};
            }

            if ('main_frame' === type) {
                this.storage[tabId][type] = message;
            } else {
                if (undefined === this.storage[tabId][type]) {
                    this.storage[tabId][type] = {};
                }
                this.storage[tabId][type][message.url] = message;
            }
        },

        get: function (tabId, type, url) {
            if (undefined === this.storage[tabId] || undefined === this.storage[tabId][type] || (type !== 'main_frame' && undefined === this.storage[tabId][type][url])) {
                slDebug.error('storage', 'storage is : ', this.storage, ' requested : ', tabId, type, url);
                return null;
            }
            if (type === 'main_frame') {
                return this.storage[tabId][type];
            }

            return this.storage[tabId][type][url];
        },

        hasTab: function (tabId) {
            return undefined !== this.storage[tabId];
        },

        getTab: function (tabId) {
            if (undefined === this.storage[tabId]) {
                slDebug.error('storage', "Unable to find message in tab id " + tabId);
                throw "Unable to find message in tab id " + tabId;
            }

            return this.storage[tabId];
        },

        remove: function (tabId) {
            delete this.storage[tabId];
        },

        all: function () {
            return this.storage;
        },

        count: function () {
            return Object.keys(this.storage).length;
        }
    };

    window.MessageStorage = MessageStorage;
}(window));
