/* Copyright (c) 2015 Session Buddy */

BrowserAPI.getCurrentWindow(function(w) {
    var v = BrowserAPI.getViews({
        windowId: w.id,
        type: 'tab'
    });
    var sbUrl = BrowserAPI.getURL('main.html');
    var doCloseWindow = false;
    for (var i = 0; i < v.length; i++) {
        if (v[i].location.href.substring(0, sbUrl.length) === sbUrl) {
            v[i].lxMid();
            doCloseWindow = true;
            break;
        }
    }
    if (doCloseWindow) {
        window.close();
    } else {
        history.replaceState(null, '', sbUrl + '#o');
        window.location.reload();
    }
});