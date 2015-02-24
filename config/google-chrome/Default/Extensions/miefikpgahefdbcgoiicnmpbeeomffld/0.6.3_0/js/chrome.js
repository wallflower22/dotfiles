/*global window */
/*global slDebug */
/*global RavenClient */
/*global Q */
/*global chrome */

(function (window, chrome, RavenClient, Q) {
    "use strict";

    var activated = false,
        messageHandlers = {};

    function extMessage(tabId, name, message) {
        var deferred = Q.defer();

        message = message || {};
        message.__name__ = name;

        chrome.tabs.sendMessage(tabId, message, deferred.resolve);

        return deferred.promise;
    }

    function bgMessage(name, message) {
        var deferred = Q.defer();

        message = message || {};
        message.__name__ = name;

        chrome.runtime.sendMessage(message, deferred.resolve);

        return deferred.promise;
    }

    function installMessageListener(handlers, $scope) {
        Object.keys(handlers).forEach(function (key) {
            messageHandlers[key] = handlers[key];
        });

        if (activated) {
            return;
        }

        activated = true;

        chrome.runtime.onMessage.addListener(function (query, sender, sendResponse) {
            var functionName = query.__name__,
                message;

            delete query.__name__;

            message = 'Received unhandled message (got "' + functionName + '" available are ' + Object.keys(messageHandlers).join(', ') + '. Don\'t worry, it\'s probably a false positive';

            if ('function' !== typeof messageHandlers[functionName]) {
                if (undefined !== window.slDebug) {
                    slDebug.log('other', message, query, sender);
                } else {
                    window.console.log(message);
                }

                return true;
            }
            try {
                if ($scope) {
                    messageHandlers[functionName]($scope, query, sendResponse, sender);
                    $scope.$digest();
                } else {
                    messageHandlers[functionName](query, sendResponse, sender);
                }
            } catch (e) {
                RavenClient.captureException(e);
            }

            // allows sendResponse to be called after promise resolution
            return true;
        });
    }

    window.bgMessage              = bgMessage;
    window.fgMessage              = bgMessage;
    window.extMessage             = extMessage;
    window.installMessageListener = installMessageListener;
}(window, chrome, RavenClient, Q));
