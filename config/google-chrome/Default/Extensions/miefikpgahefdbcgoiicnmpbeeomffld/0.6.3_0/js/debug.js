/*global window */
/*global LocalStorage */
/*global RavenClient */

(function (window, RavenClient) {
    "use strict";

    var storage = new LocalStorage(),
        available = [
            'api', 'profiling', 'tabs', 'other', 'domains', 'listeners', 'storage', 'toolbar', 'message'
        ],
        i = 0;

    function getArgs(args) {
        if (args.length === 0) {
            return [];
        }

        var arrayArgs = [], j = 0;

        for (j; j < args.length; j += 1) {
            arrayArgs.push(args[j]);
        }

        return arrayArgs;
    }

    function doLog(method, args) {
        var type = args.shift();

        if (undefined === window['DEBUG_' + type.toUpperCase()]) {
            window.console.log('Undefined log type', 'DEBUG_' + type.toUpperCase());
        }

        if (true !== window['DEBUG_' + type.toUpperCase()]) {
            return;
        }

        args.unshift('font-weight:bold');
        args.unshift('%c' + type + ':');

        window.console[method].apply(window.console, args);
    }

    function log() {
        doLog('log', getArgs(arguments));
    }

    function info() {
        doLog('info', getArgs(arguments));
    }

    function warn() {
        doLog('warn', getArgs(arguments));
    }

    function error() {
        doLog('error', getArgs(arguments));
    }

    function updateConf(key, value) {
        window['DEBUG_' + key.toUpperCase()] = !!value;
        storage.set('debug_conf_' + key.toLowerCase(), !!value);
    }

    function initConf(key, result) {
        window['DEBUG_' + key.toUpperCase()] = result;
    }

    available.forEach(function (type) {
        storage.get('debug_conf_' + type, window.DEFAULT_DEBUG)
            .then(initConf.bind(null, type))
            .fail(RavenClient.captureException);
    });

    window.slDebug = {
        available: available,
        log: log,
        info: info,
        warn: warn,
        error: error,
        updateConf: updateConf
    };
}(window, RavenClient));
