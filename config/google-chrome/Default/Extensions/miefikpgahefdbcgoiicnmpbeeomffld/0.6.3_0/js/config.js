/*global window */
/*global slDebug */

(function (window) {
    "use strict";

    window.PROFILER_URL = 'https://blackfire.io';
    window.NEW_SESSION_URL = window.PROFILER_URL + '/session/new';
    window.CREDENTIALS_END_POINT = window.PROFILER_URL + '/account/credentials.json';
    window.API_END_POINT = window.PROFILER_URL + '/api/v1';
    window.PROXY_HELP_URL = window.PROFILER_URL + '/doc/configuration#reverse-proxy';
    window.USER_AGENT = 'Blackfire Companion - Chrome/{chrome-version} Extension/{extension-version}';
    window.EXTENSION_VERSION = '0.6.3';
    window.BADGE_BG_COLOR = "#82e83e";
    window.SLP_DIST = "";
    window.DEFAULT_DEBUG = false;
    window.RAVEN_PUBLIC_KEY = '45584aaf0abe419ba048c5ff4a49ea11';
    window.RAVEN_ID = '26887';

}(window));
