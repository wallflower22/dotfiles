/*global window */
/*global Raven */

(function (window, Raven) {
    "use strict";

    var connected = false;

    function RavenClient(raven, ravenPublicKey, ravenId) {
        this.raven = raven;
        this._initialize(ravenPublicKey, ravenId);
    }

    RavenClient.prototype = {
        _initialize: function (ravenPublicKey, ravenId) {
            if (true === connected) {
                throw new Error('Raven is already connected');
            }

            var dsn = 'https://' + ravenPublicKey + '@app.getsentry.com/' + ravenId,
                origin = window.PROFILER_URL,
                prefix = '[ChromeCompanion] ';

            if (null === ravenPublicKey || null === ravenId) {
                return;
            }

            Raven.setUserContext({});
            Raven.config(dsn).install();

            window.document.addEventListener('ravenHandle', function (oEvent) {
                if (oEvent.stackInfo) {
                    oEvent.stackInfo.message = prefix + oEvent.stackInfo.message;
                }
            });

            if (window.chrome.webRequest) {
                window.chrome.webRequest.onBeforeSendHeaders.addListener(function (request) {
                    request.requestHeaders.push({
                        name: 'Origin',
                        value: origin
                    });

                    return {requestHeaders: request.requestHeaders};
                }, {urls: ['*://app.getsentry.com/api/' + window.RAVEN_ID + '/*']}, ["blocking", "requestHeaders"]);
            }

            connected = true;
        },
        setUserInfo: function (info) {
            var manifest = window.chrome.runtime.getManifest(),
                context = { name: manifest.name, version: manifest.version };

            Object.keys(info).forEach(function (key) {
                context[key] = info[key];
            });

            this.raven.setUserContext(context);
        },
        captureException: function (e, extra) {
            if (true === connected) {
                this.raven.captureException(e, extra);

                return;
            }

            if (e.stack) {
                window.console.error('RavenException: ', e.stack, extra);
            } else {
                window.console.log('RavenException: ', e, extra);
            }
        },
        captureMessage: function (message, extra) {
            if (true === connected) {
                this.raven.captureMessage(message, { extra: extra });

                return;
            }

            if (extra.data && extra.data.stack) {
                window.console.error('RavenMessage: ', extra.data.stack, message, extra);
            } else {
                window.console.log('RavenMessage: ', message, extra);
            }
        }
    };

    window.RavenClient = new RavenClient(Raven, window.RAVEN_PUBLIC_KEY, window.RAVEN_ID);
}(window, Raven));
