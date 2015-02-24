/* Copyright (c) 2015 Session Buddy */

(function() {
    var BrowserAPI = this.BrowserAPI = {
        getWindow: function(w, cb) {
            chrome.windows.get(w, cb);
        },
        extensionId: function() {
            return chrome.i18n.getMessage('@@extension_id');
        },
        getWindowAndTabs: function(w, cb) {
            chrome.windows.get(w, {
                populate: true
            }, cb);
        },
        getAllWindows: function(cb) {
            chrome.windows.getAll(undefined, cb);
        },
        getAllWindowsAndTabs: function(cb) {
            chrome.windows.getAll({
                populate: true
            }, cb);
        },
        getCurrentWindow: function(cb) {
            chrome.windows.getCurrent(cb);
        },
        getCurrentWindowAndTabs: function(cb) {
            if (cb) {
                chrome.windows.getCurrent(function(w) {
                    chrome.tabs.getAllInWindow(w.id, function(t) {
                        w.tabs = t;
                        cb(w);
                    });
                });
            }
        },
        focusWindow: function(w, cb) {
            chrome.windows.update(w, {
                focused: true
            }, cb);
        },
        activateTab: function(tid, cb) {
            chrome.tabs.update(tid, {
                active: true
            });
        },
        activateTabAndFocusWindow: function(t, cb) {
            BrowserAPI.focusWindow(t.windowId, function() {
                BrowserAPI.activateTab(t.id);
            });
        },
        getBackgroundPage: function() {
            return chrome.extension.getBackgroundPage();
        },
        getURL: function(s) {
            return chrome.extension.getURL(s);
        },
        getViews: function(opts) {
            return chrome.extension.getViews(opts);
        },
        getI18nMessage: function(s, subs) {
            return chrome.i18n.getMessage(s, subs);
        },
        setBrowserIcon: function(addWindowState, isSessionConfigSaved) {
            var p;
            if (isSessionConfigSaved) {
                p = {
                    '19': '/images/logo/_ACTIVE/' + addWindowState,
                    '38': '/images/logo/_ACTIVE/' + isSessionConfigSaved
                };
            } else {
                p = '/images/logo/_ACTIVE/' + addWindowState;
            }
            chrome.browserAction.setIcon({
                path: p
            });
        }
    };
})();