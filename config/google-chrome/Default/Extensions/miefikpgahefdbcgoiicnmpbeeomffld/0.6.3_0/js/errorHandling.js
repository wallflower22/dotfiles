/*global window */
/*global PROFILER_URL */

(function (window) {
    "use strict";

    function InfoMessage(info, details, isError) {
        this.info = info;
        this.details = undefined === details ? null : details;
        this.isError = !!isError;
    }

    function handleJqXHRError(url, exception, jqXHR) {
        var info = '',
            details = '';

        if (jqXHR.status === 0 || jqXHR.status === 502) {
            info = 'Unable to connect to server.';
            details = 'This URL is non reachable: ' + url + '.';
        } else if (exception === 'timeout') {
            info = 'Request timed-out.';
            details = 'The request to this URL timed-out: ' + url;
        } else if (exception === 'abort') {
            info = 'Request aborted.';
            details = 'The request to this URL has been aborted: ' + url;
        } else {
            if (null !== jqXHR.getResponseHeader('X-Varnish')
                    || (null !== jqXHR.getResponseHeader('via') && 0 < ((' ' + jqXHR.getResponseHeader('via') + ' ').toLowerCase().indexOf(' varnish ')))) {
                info = 'Are you authorized to profile this page?';
                details = 'Are you authorized to profile this page? Probe not found, invalid signature or <a href="' + window.PROXY_HELP_URL + '" target="_blank">Varnish related issue</a>' + (window.DEFAULT_DEBUG ? ' to profile ' + url : '') + '.';
            } else {
                info = 'Are you authorized to profile this page?';
                details = 'Are you authorized to profile this page? Probe not found or invalid signature' + (window.DEFAULT_DEBUG ? ' to profile ' + url : '') + '.';
            }
        }

        return new InfoMessage(info, details, true);
    }

    function handleApiError(exception, jqXHR) {
        var data = { closable : true, classname : 'alert-failure' };

        if (jqXHR.status === 0) {
            data.closable = false;
            data.msg = PROFILER_URL + ' is non reachable';
        } else if (exception === 'timeout') {
            data.msg = PROFILER_URL + ' request timed-out.';
        } else if (exception === 'abort') {
            data.msg = PROFILER_URL + ' request aborted.';
        } else if (jqXHR.status >= 500) {
            data.msg = PROFILER_URL + ' failure, retry later.';
        } else if (jqXHR.status >= 400) {
            switch (jqXHR.status) {
            case 401:
                data.closable = false;
                data.classname = 'alert-info';
                data.msg = 'You are not authenticated, <a target="_blank" href="' + window.NEW_SESSION_URL + '">please login</a>.';
                break;
            case 403:
                data.closable = false;
                data.classname = 'alert-info';
                data.msg = 'Your account has not yet been activated, you will be notified once it is.';
                break;
            default:
                data.msg = 'Extension error, please report this bug (code ' + jqXHR.status + ').';
                break;
            }
        } else {
            data.msg = 'Unhandled error, please report this bug.';
        }

        return data;
    }

    window.InfoMessage = InfoMessage;
    window.handleJqXHRError = handleJqXHRError;
    window.handleApiError = handleApiError;
}(window));
