/*global window */
/*global EXTENSION_VERSION */
/*global USER_AGENT */
/*global navigator */

(function (window) {
    "use strict";

    function filterHeaders(requestHeaders) {
        var headers = {}, sensioHeaders = {}, name;

        requestHeaders.forEach(function (data) {
            if (data.name.substr(0, 28).toLowerCase() === 'x-blackfire-header-') {
                sensioHeaders[data.name.substr(28).toLowerCase()] = {
                    name  : data.name.substr(28),
                    value : data.value
                };
            } else {
                headers[data.name.toLowerCase()] = {
                    name  : data.name,
                    value : data.value
                };
            }
        });

        for (name in sensioHeaders) {
            if (sensioHeaders.hasOwnProperty(name)) {
                headers[name] = sensioHeaders[name];
            }
        }

        return Object.keys(headers).map(function (k) { return headers[k]; });
    }

    function hasBlackfireHeader(requestHeaders) {
        var i;

        for (i = 0; i < requestHeaders.length; i += 1) {
            if (isBlackfireHeader(requestHeaders[i].name)) {
                return true;
            }
        }

        return false;
    }

    function formatHeadersAsKeyValues(requestHeaders, removeBlackfireHeaders) {
        var headers = {};

        requestHeaders.forEach(function (data) {
            if (removeBlackfireHeaders && isBlackfireHeader(data.name)) {
                return;
            }
            headers[data.name] = data.value;
        });

        return headers;
    }

    function isBlackfireHeader(header) {
        return 'x-blackfire' === header.substr(0, 11).toLowerCase();
    }

    function getBlackfireErrorHeader(headers) {
        if (undefined !== headers['x-blackfire-error']) {
            return headers['x-blackfire-error'];
        }

        return null;
    }

    function getBlackfireResponseFromJqXHR(jqXHR) {
        return jqXHR.getResponseHeader('X-Blackfire-Response');
    }

    function getBlackfireErrorFromJqXHR(jqXHR) {
        return jqXHR.getResponseHeader('X-Blackfire-Error');
    }

    function getUserAgent() {
        var match = /Chrome\/([0-9.]+)/.exec(navigator.userAgent),
            version = null !== match ? match[1] : 'Unknown';

        return USER_AGENT.replace("{chrome-version}", version).replace("{extension-version}", EXTENSION_VERSION);
    }

    function parseQueryString(QS) {
        var data = {};

        QS.split('&').forEach(function (pair) {
            var pieces = pair.split('=', 2);
            data[pieces[0]] = decodeURIComponent(pieces[1]);
        });

        return data;
    }

    window.parseQueryString = parseQueryString;
    window.hasBlackfireHeader = hasBlackfireHeader;
    window.filterHeaders = filterHeaders;
    window.getUserAgent = getUserAgent;
    window.isBlackfireHeader = isBlackfireHeader;
    window.formatHeadersAsKeyValues = formatHeadersAsKeyValues;
    window.getBlackfireErrorHeader = getBlackfireErrorHeader;
    window.getBlackfireResponseFromJqXHR = getBlackfireResponseFromJqXHR;
    window.getBlackfireErrorFromJqXHR = getBlackfireErrorFromJqXHR;
}(window));
