/*global chrome */
/*global window */
/*global createDeferred */

(function (window) {
    "use strict";

    function getCurrentTab() {
        var deferred = createDeferred();

        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
            deferred.resolve(tabs[0]);
        });

        return deferred.promise;
    }

    window.profiler = window.profiler || {};

    window.profiler.getCurrentTab = getCurrentTab;
}(window));
