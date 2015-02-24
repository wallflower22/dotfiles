/* Copyright (c) 2015 Session Buddy */

var toggleSessionMode, iExclusive, evalSessionStorageKeyVal, encodingDistribution_UTF8, clean, iSessionConfigsAllVal, evalSessionIdVal, cpHtmlStr = '<a id="sbRangeVal">Undo</a>';

function descIgnoreParm(str) {
    return /^[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&'\(\)\*\+,;=:@])|[\/\?])*)?$/i.test(str);
}

var addSessionConfigs = null;

if (document.URL.length === 0) {
    addSessionConfigs = new sbDialogs();
}

var chromeSessionAdapter;

var handleSync;

var tabIdentifier = null;

var optIdx = true;

var adjustImportedSession = true;

var selectWindowTab;

var iSBDBVal;

var detOpt;

var orientationVal;

var openPreviousSession = false;

var lineitemsAddedCbVal;

var stdHVal;

var getCurrentTab;

var iDateVal;

var val9;

var iAdditive;

var iVal = false;

var iCleanVal = null;

var notifyWindowTab = '';

var refreshTabArray = null;

var tabStatus = false;

var iContextTo = null;

var evalOutMatchedTabTitles;

var countActiveWindows;

function debug() {
    SbUtil.requireCurrentSessionSource('debug');
}

function nodebug() {
    SbUtil.requireCurrentSessionSource('');
}

document.addEventListener('DOMContentLoaded', initDOM, false);

function initDOM() {
    iPredicateVal = BrowserAPI.getBackgroundPage();
    applicationExVal(function() {
        if (iPredicateVal && iPredicateVal.updateTabUrl) {
            if (!('Util' in window) && iPredicateVal && 'Util' in iPredicateVal) {
                Util = iPredicateVal.Util;
            }
            tabIdentifier = uuid.v4();
            if (!('SbUtil' in window) && iPredicateVal && 'SbUtil' in iPredicateVal) {
                SbUtil = iPredicateVal.SbUtil;
            }
            window.ga = iPredicateVal.ga;
            window.querySessionAction = iPredicateVal.querySessionAction;
            ga('send', 'pageview', '/main.html');
            window.q = iPredicateVal.q.bind(window);
            window.isAllowLoggingVal = iPredicateVal.isAllowLoggingVal.bind(window);
            window.createElement = iPredicateVal.createElement.bind(window);
            window.evalSbIdxVal = iPredicateVal.evalSbIdxVal.bind(window);
            window.adjustWindow = iPredicateVal.adjustWindow.bind(window);
            document.iApplicationExVal = iPredicateVal.document.iApplicationExVal.bind(document);
            document.additive = iPredicateVal.document.additive.bind(document);
            window.String.prototype.selMode = iPredicateVal.String.prototype.selMode;
            window.String.prototype.evalOptionDescDisabled = iPredicateVal.String.prototype.evalOptionDescDisabled;
            window.String.prototype.contains = iPredicateVal.String.prototype.contains;
            window.Array.prototype.contains = iPredicateVal.Array.prototype.contains;
            window.Array.prototype.compare = iPredicateVal.Array.prototype.compare;
            window.Date.prototype.cacheIdVal = iPredicateVal.Date.prototype.cacheIdVal;
            q('evalSbGroupVal').value = '';
            window.addEventListener('resize', isRangeDirBackVal, false);
            iPredicateVal.SBDB.setWindowTab(windowSrc);
            if (Util.sessionNmVal === 'MacOS') {
                q('splitter').classList.add('setSessionTab');
            }
            searchTermVal();
            iPredicateVal.SBDB.tabRow(function(toggleSessionTabMode) {
                iPredicateVal.SBDB.evalSessionConfigsToAddVal(function(isSBTabVal) {
                    handleSync = new selectSessionTab(isSBTabVal, toggleSessionTabMode, q('iSessionConfigHead'), q('refreshCurrentSession'), q('iNumberVal'), q('splitter'), q('evalSbGroupVal'), q('resetCurrentSessionCache'), q('evalOnlyCountDupesVal'), q('serializeTab'), q('iMsg'), q('iFinalCssClsVal'), q('saveSession'));
                    SbUtil.idx2();
                    if (window.location.href === BrowserAPI.getURL('main.html') + '#o') {
                        saveDisplayedSession('saveImportedSession');
                        history.replaceState(null, '', 'main.html');
                    } else {
                        if (!$('#btnD' + 'onate').length) {
                            maxCount('Contact&nbsp;&nbsp;<a href="mailto:support@sessionbuddy.com?Subject=Session%20Buddy%20Error%205417" style="font-weight:300;">support@sessionbuddy.com</a>', 2, -1);
                            return;
                        } else {
                            var versionMessage = '3.4';
                            iPredicateVal.SBDB.expectStatusVal('suppressOneTimeStartupMessageForLongTermUser', true, function(sortTabList) {
                                if (sortTabList === 'true') {
                                    iPredicateVal.SBDB.expectStatusVal('versionMessageReceived', true, function(value) {
                                        if (value != versionMessage) {
                                            setTimeout(function() {
                                                maxCount('Session Buddy has been updated<br><a href="http://www.sessionbuddy.com/release/v34/v34.html" target="_blank">Learn more</a>', 3, -1);
                                            }, 2e3);
                                            iPredicateVal.SBDB.resetIcon('versionMessageReceived', versionMessage);
                                        } else {
                                            iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
                                                iPredicateVal.SBDB.expectStatusVal('message131', true, function(searchCurrentSession) {
                                                    if (!searchCurrentSession && iChildCount && iChildCount > 30 || searchCurrentSession && iChildCount > searchCurrentSession) {
                                                        iPredicateVal.SBDB.expectStatusVal('suppressMessage132', true, function(effectiveIdxVal) {
                                                            if (effectiveIdxVal !== 'true') {
                                                                setTimeout(function() {
                                                                    maxCount('Love Session Buddy?&nbsp;&nbsp;Please rate it!<br><div>&nbsp;<a id="iOrderString">Rate now</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="hasMod">Ask later</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="sbFct">Already did</a></div>', 3, -1);
                                                                }, 2e3);
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                } else {
                                    ga('send', 'event', 'application', 'new_user', undefined, undefined, {
                                        nonInteraction: 1
                                    });
                                    iPredicateVal.SBDB.resetIcon('suppressOneTimeStartupMessageForLongTermUser', 'true');
                                    iPredicateVal.SBDB.resetIcon('versionMessageReceived', versionMessage);
                                }
                            });
                        }
                    }
                    appMenuButton();
                    $('#rArrayVal').qtip({
                        content: {
                            text: 'Hide tab URLs'
                        },
                        position: {
                            my: 'top center',
                            at: 'bottom center',
                            adjust: {
                                y: 17
                            }
                        },
                        show: {
                            delay: 500
                        },
                        style: {
                            tip: {
                                corner: true,
                                width: 12
                            }
                        }
                    });
                    $('#appExceptionVal').qtip({
                        content: {
                            text: 'Show tab URLs'
                        },
                        position: {
                            my: 'top center',
                            at: 'bottom center',
                            adjust: {
                                y: 17
                            }
                        },
                        show: {
                            delay: 500
                        },
                        style: {
                            tip: {
                                corner: true,
                                width: 12
                            }
                        }
                    });
                    $('#iMsg').qtip({
                        content: {
                            text: 'Session actions'
                        },
                        position: {
                            my: 'bottom right',
                            at: 'top center',
                            adjust: {
                                x: 7,
                                y: -18
                            }
                        },
                        show: {
                            delay: 1e3
                        },
                        style: {
                            tip: {
                                corner: true,
                                mimic: 'bottom center',
                                offset: 5,
                                width: 12
                            }
                        }
                    });
                    $('#evalOnlyCountDupesVal').qtip({
                        content: {
                            text: 'Save'
                        },
                        position: {
                            my: 'bottom center',
                            at: 'top center',
                            adjust: {
                                y: -18
                            }
                        },
                        show: {
                            delay: 500
                        },
                        style: {
                            tip: {
                                corner: true,
                                width: 12
                            }
                        }
                    });
                    $('#runningVal').qtip({
                        content: {
                            text: 'Merge selected sessions'
                        },
                        position: {
                            my: 'bottom center',
                            at: 'top center',
                            adjust: {
                                y: -18
                            }
                        },
                        show: {
                            delay: 500
                        },
                        style: {
                            tip: {
                                corner: true,
                                width: 12
                            }
                        }
                    });
                    $('#refreshWindowCount').qtip({
                        content: {
                            text: 'Save'
                        },
                        position: {
                            my: 'bottom center',
                            at: 'top center',
                            adjust: {
                                y: -18
                            }
                        },
                        show: {
                            delay: 500
                        },
                        style: {
                            tip: {
                                corner: true,
                                width: 12
                            }
                        }
                    });
                    setTimeout(evalSeparatorIdxVal, 5);
                });
            });
        } else {
            setTimeout(initDOM, 1e3);
        }
    });
}

function appMenuButton() {
    var evalSbSel = document.querySelector('body');
    evalSbSel.addEventListener('mousedown', isRangeDirBackVal);
    evalSbSel.addEventListener('mousemove', modeReq);
    evalSbSel.addEventListener('mouseup', iState);
    evalSbSel.addEventListener('keydown', tabDesc);
    evalSbSel.addEventListener('keyup', countSessionWindows);
    var iAlsoSelectVal = document.getElementById('evalSelectedLineitemsVal');
    iAlsoSelectVal.addEventListener('dragover', sbSelModeVal, false);
    iAlsoSelectVal.addEventListener('dragenter', evalSelType, false);
    iAlsoSelectVal.addEventListener('dragleave', iIgnoreEnterAndEsc, false);
    iAlsoSelectVal.addEventListener('drop', sessionTypeVal, false);
    function sbSelModeVal(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'copy';
    }
    function evalSelType(ev) {
        $('#evalSelectedLineitemsVal').addClass('evalSelectedLineitemsVal-dragover');
        ev.stopPropagation();
        ev.preventDefault();
    }
    function iIgnoreEnterAndEsc(ev) {
        $('#evalSelectedLineitemsVal').removeClass('evalSelectedLineitemsVal-dragover');
        ev.stopPropagation();
        ev.preventDefault();
    }
    $('#iNumberVal,#getTabTransactions').delegate('.evalSessionId', 'click', function() {
        chrome.tabs.create({
            url: 'chrome://downloads/'
        });
    });
    function cacheMergedTabs(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab, keepActionOpen) {
        addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
        if (allowUserIntAction) {
            iDate(evalSbTailContainerVal, popWindowArray, iSelectedSessionConfigsAll, popSessionTab, keepActionOpen);
        }
    }
    $(window).on('popstate', function(ev) {
        if (ev.originalEvent) {
            ev = ev.originalEvent;
        }
        if (ev.state === null) {
            addSessionConfigs.convertToTileText(function(el, id, type) {
                if (el) {
                    addSessionConfigs.applicationEx(id, type, 'single', cacheMergedTabs, 'replace');
                } else {
                    addSessionConfigs.sbSummaryConfigVal(cacheMergedTabs, false, 'single', 'replace');
                }
            });
        } else if (ev.state.type === 'selection') {
            addSessionConfigs.evalSbAnnotation(ev.state.data.head, ev.state.data.all, function(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab, keepActionOpen) {
                if (allowUserIntAction) {
                    addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
                    iDate(evalSbTailContainerVal, popWindowArray, iSelectedSessionConfigsAll, popSessionTab, keepActionOpen);
                } else {
                    addSessionConfigs.sbSummaryConfigVal(cacheMergedTabs, false, 'single', 'title');
                }
            }, 'title');
        }
    });
    $('#finalCssClsVal').delegate('#sbRangeVal', 'click', function() {
        iPredicateVal.requestCurrentWindow(tabIdentifier);
    }).delegate('#iOrderString', 'click', function() {
        maxCount(false);
        window.open('https://chrome.google.com/webstore/detail/edacconmaakjimmfgnblocblbcdcpbko/reviews', '_blank');
        val4();
    }).delegate('#hasMod', 'click', function() {
        maxCount(false);
        iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
            iPredicateVal.SBDB.resetIcon('message131', iChildCount + 30);
        });
    }).delegate('#sbFct', 'click', function() {
        maxCount(false);
        val4();
    });
    evalSbSel.querySelector('#addedTokenElVal').addEventListener('click', function() {
        evalSessionCountVal();
    });
    evalSbSel.querySelector('#iAnnotationClsVal').addEventListener('click', function() {
        evalSessionCountVal();
    });
    evalSbSel.querySelector('#toggleSessionWindowMode').addEventListener('click', function() {
        evalSessionCountVal();
    });
    evalSbSel.querySelector('#adapterSelVal').addEventListener('keyup', function() {
        evalSessionCountVal();
    });
    evalSbSel.querySelector('#evalSbGroupVal').addEventListener('keyup', function() {
        if (event.keyCode === 27) {
            showCurrentTab();
        } else if (event.keyCode === 13) {
            windowStatVal(this.value !== '', this.value);
        } else if (window.evalSbIdxVal(event)) {
            allowLogging(this.value);
        }
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalSbGroupVal').addEventListener('keydown', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#brchLineitemRenderDelegate').addEventListener('click', function() {
        showCurrentTab();
        event.stopPropagation();
        q('evalSbGroupVal').focus();
    });
    evalSbSel.querySelector('#suppressOpts').addEventListener('mousedown', function(ev) {
        q('sbDialogs').focus();
        ev.preventDefault();
    });
    evalSbSel.querySelector('#lnkClearSearch').addEventListener('scroll', function() {
        sbNm(this, q('msgNm'));
    });
    evalSbSel.querySelector('#lnkClearSearch').addEventListener('mouseover', function() {
        clearTimeout(val9);
        this.setAttribute('scrolling', '5');
    });
    evalSbSel.querySelector('#lnkClearSearch').addEventListener('mouseout', function() {
        if (!document.additive(evalSbSel.querySelector('#suppressOpts'), document.elementFromPoint(event.x, event.y))) {
            baselineVal();
        }
    });
    evalSbSel.querySelector('#refreshCurrentSession').addEventListener('mouseover', function() {
        baselineVal();
    });
    evalSbSel.querySelector('#resetDisplayedSession').addEventListener('mouseover', function() {
        baselineVal();
    });
    evalSbSel.querySelector('#splitter').addEventListener('mousedown', iShowTitlesVal);
    evalSbSel.querySelector('#keyVal').addEventListener('click', function() {
        maxCount(false);
    });
    evalSbSel.querySelector('#btnDonate').addEventListener('mousedown', function() {
        popActiveTab(this);
    });
    evalSbSel.querySelector('#btnDonate').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#btnDonate').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#btnDonate').addEventListener('click', function() {
        getPreviousSession(this, saveDisplayedSession, 'contextTo', undefined, undefined, function() {
            q('iterateTabTransactions').innerHTML = 'Maybe Later';
            q('finalCssClsIdx').innerHTML = 'Donate';
            q('iterateTabTransactions').style.width = '80px';
        });
    });
    $('#rArrayVal').on('mousedown', function() {
        $(this).qtip('hide');
        $(this).qtip('disable');
        popActiveTab(this, bShowHideURLs, false);
    });
    $('#rArrayVal').on('mouseover', function() {
        $(this).qtip('enable');
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#rArrayVal').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    evalSbSel.querySelector('#rArrayVal').addEventListener('mouseout', function() {
        session1(this);
    });
    $('#appExceptionVal').on('mousedown', function() {
        $(this).qtip('hide');
        $(this).qtip('disable');
        popActiveTab(this, bShowHideURLs, true);
    });
    $('#appExceptionVal').on('mouseover', function() {
        $(this).qtip('enable');
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#appExceptionVal').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    evalSbSel.querySelector('#appExceptionVal').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#bMergeSaveElVal').addEventListener('mousedown', function(ev) {
        popActiveTab(this);
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    });
    evalSbSel.querySelector('#bMergeSaveElVal').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#bMergeSaveElVal').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#bMergeSaveElVal').addEventListener('click', function(ev) {
        limitedSetOfWindowsVal(this, 'iCountVal');
        ev.stopPropagation();
    });
    $('#evalOnlyCountDupesVal').on('mousedown', function() {
        $(this).qtip('hide');
        $(this).qtip('disable');
        popActiveTab(this, function() {
            txStatus();
            isRangeDirBackVal();
            event.stopPropagation();
        });
    });
    evalSbSel.querySelector('#evalOnlyCountDupesVal').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    $('#evalOnlyCountDupesVal').on('mouseover', function() {
        $(this).qtip('enable');
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#evalOnlyCountDupesVal').addEventListener('mouseout', function() {
        session1(this);
    });
    $('#runningVal').on('mousedown', function() {
        $(this).qtip('hide');
        $(this).qtip('disable');
        recoverySession(this, function() {
            evalSearchTerms();
            isRangeDirBackVal();
            event.stopPropagation();
        });
    });
    evalSbSel.querySelector('#runningVal').addEventListener('mouseup', function() {
        dirtyVal(this);
    });
    $('#runningVal').on('mouseover', function() {
        $(this).qtip('enable');
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#runningVal').addEventListener('mouseout', function() {
        session1(this);
    });
    $('#refreshWindowCount').on('mousedown', function() {
        $(this).qtip('hide');
        $(this).qtip('disable');
        session1WindowIdx(this, function() {
            txStatus();
            isRangeDirBackVal();
            event.stopPropagation();
        });
    });
    evalSbSel.querySelector('#refreshWindowCount').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    $('#refreshWindowCount').on('mouseover', function() {
        $(this).qtip('enable');
        refreshTabUrl(this, q('runningVal'));
    });
    evalSbSel.querySelector('#refreshWindowCount').addEventListener('mouseout', function() {
        formatCurrentTab(this, q('runningVal'));
    });
    evalSbSel.querySelector('#headerErrVal').addEventListener('click', function() {
        augmentActiveWindow(this, saveTabList);
    });
    evalSbSel.querySelector('#headerErrVal').addEventListener('mousedown', function() {
        recoverySession(this);
    });
    evalSbSel.querySelector('#headerErrVal').addEventListener('mouseup', function() {
        dirtyVal(this);
    });
    evalSbSel.querySelector('#headerErrVal').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#headerErrVal').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#dateVal').addEventListener('click', function() {
        iIncludeSeqProp(this, 'initTabLayout', q('headerErrVal'));
        event.stopPropagation();
    });
    evalSbSel.querySelector('#dateVal').addEventListener('mousedown', function() {
        session1WindowIdx(this, undefined, q('headerErrVal'));
        event.stopPropagation();
        return false;
    });
    evalSbSel.querySelector('#dateVal').addEventListener('mouseover', function() {
        refreshTabUrl(this, q('headerErrVal'));
    });
    evalSbSel.querySelector('#dateVal').addEventListener('mouseout', function() {
        formatCurrentTab(this, q('headerErrVal'));
    });
    evalSbSel.querySelector('#iMsg').addEventListener('click', function() {
        limitedSetOfWindowsVal(this, 'iBaseDate');
        event.stopPropagation();
    });
    $('#iMsg').on('mousedown', function() {
        $(this).qtip('hide');
        $(this).qtip('disable');
        popActiveTab(this);
        event.stopPropagation();
    });
    $('#iMsg').on('mouseover', function() {
        $(this).qtip('enable');
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#iMsg').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#sbIdx').addEventListener('mousedown', function() {
        syncTabState(this, saveDisplayedSession, 'adjustRecoverySession', undefined, undefined, function() {
            q('evalSelectedLineitemsVal').focus();
            q('evalSelectedLineitemsVal').select();
        });
    });
    $('.serializeSessionTransactions').on('mouseover', function() {
        var el = $(this);
        if (el.attr('id') === 'idx4') {
            evalOutMatchedTabTitles = setTimeout(function() {
                $('#stopAnim').css('right', $('#iCountVal').width() + 16 + 'px');
                q('stopAnim').classList.remove('invisible');
            }, 400);
        } else if (el.attr('id') !== 'evalOrderVal' && el.attr('id') !== 'headerDataPreviousVal' && el.attr('id') !== 'selectCurrentWindow') {
            clearTimeout(evalOutMatchedTabTitles);
            evalOutMatchedTabTitles = null;
            q('stopAnim').classList.add('invisible');
        }
    });
    evalSbSel.querySelector('#idx4').addEventListener('mousedown', function() {
        $('#stopAnim').css('right', $('#iCountVal').width() + 16 + 'px');
        clearTimeout(evalOutMatchedTabTitles);
        evalOutMatchedTabTitles = null;
        q('stopAnim').classList.remove('invisible');
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalOrderVal').addEventListener('mousedown', function() {
        iSessionConfigs = 'app';
        $('#copyTabArray').scrollTop(0).scrollLeft(0);
        syncTabState(this, saveDisplayedSession, 'removeTabSource', undefined, undefined, function() {
            $('#sessionExport_Scope').val('all');
            sbTokenDeletedCb();
        });
    });
    evalSbSel.querySelector('#headerDataPreviousVal').addEventListener('mousedown', function() {
        iSessionConfigs = 'app';
        $('#copyTabArray').scrollTop(0).scrollLeft(0);
        syncTabState(this, saveDisplayedSession, 'removeTabSource', undefined, undefined, function() {
            $('#sessionExport_Scope').val('selected');
            sbTokenDeletedCb();
        });
    });
    evalSbSel.querySelector('#selectCurrentWindow').addEventListener('mousedown', function() {
        syncTabState(this, actionTimeframeVal);
    });
    evalSbSel.querySelector('#Div2').addEventListener('mousedown', function() {
        syncTabState(this, saveDisplayedSession, 'saveImportedSession');
    });
    evalSbSel.querySelector('#Div3').addEventListener('mousedown', function() {
        syncTabState(this, function() {
            window.open('https://groups.google.com/forum/?fromgroups#!forum/sessionbuddy-discuss', '_blank');
        });
    });
    evalSbSel.querySelector('#Div1').addEventListener('mousedown', function() {
        syncTabState(this, function() {
            window.open('https://chrome.google.com/webstore/detail/edacconmaakjimmfgnblocblbcdcpbko/reviews', '_blank');
        });
    });
    evalSbSel.querySelector('#Div4').addEventListener('mousedown', function() {
        syncTabState(this, saveDisplayedSession, 'contextTo');
    });
    evalSbSel.querySelector('#Div10').addEventListener('mousedown', function() {
        syncTabState(this, saveDisplayedSession, 'augmentActiveTab');
    });
    evalSbSel.querySelector('#syncTabLineItems').addEventListener('mousedown', function() {
        syncTabState(this, pList);
    });
    evalSbSel.querySelector('#recordDateTimeVal').addEventListener('mousedown', function() {
        syncTabState(this, adjustSessionTab);
    });
    evalSbSel.querySelector('#evalSearchTermsVal').addEventListener('mousedown', function() {
        syncTabState(this, headerErr);
    });
    evalSbSel.querySelector('#arrayToCompareVal').addEventListener('mousedown', function() {
        syncTabState(this, function() {
            iIdVal(q('iSelectedSessionConfigHead'));
            saveDisplayedSession('saveImportedSession');
        });
    });
    evalSbSel.querySelector('#sheetEls').addEventListener('mousedown', function() {
        syncTabState(this, filterActiveTab);
    });
    evalSbSel.querySelector('#currentWindowVal').addEventListener('mousedown', function() {
        syncTabState(this, copyCurrentSession);
    });
    evalSbSel.querySelector('#iFilterVal').addEventListener('mousedown', function() {
        syncTabState(this, brchNodePropId);
    });
    evalSbSel.querySelector('#restoreWindow').addEventListener('mousedown', function() {
        syncTabState(this, cachePtArea);
    });
    evalSbSel.querySelector('#subArray').addEventListener('mousedown', function() {
        syncTabState(this, filterTabLineItem);
    });
    evalSbSel.querySelector('#searchActiveSessionTab').addEventListener('mousedown', function() {
        syncTabState(this, targetLen);
    });
    evalSbSel.querySelector('#reloadTabConfig').addEventListener('mousedown', function() {
        syncTabState(this, normalizeCurrentTab);
    });
    evalSbSel.querySelector('#attachConfigVal').addEventListener('mousedown', function() {
        iSessionConfigs = 'view';
        $('#copyTabArray').scrollTop(0).scrollLeft(0);
        syncTabState(this, saveDisplayedSession, 'removeTabSource', undefined, undefined, function() {
            sbTokenDeletedCb();
        });
    });
    evalSbSel.querySelector('#btnCaretForwardVal').addEventListener('click', overallSpeedVal);
    evalSbSel.querySelector('#evalSbConfigs').addEventListener('mouseover', function() {
        syncActiveWindow();
    });
    evalSbSel.querySelector('#evalSbConfigs').addEventListener('mouseout', function() {
        positionSessionWindow();
    });
    evalSbSel.querySelector('#tokenComponentVal').addEventListener('click', function() {
        showCurrentTab();
        event.stopPropagation();
        q('evalSbGroupVal').focus();
    });
    evalSbSel.querySelector('#evalSbNm').addEventListener('scroll', function() {
        sbNm(this, q('iSessionConfig'));
    });
    evalSbSel.querySelector('#compressOpts').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#compressOpts').addEventListener('keydown', function() {
        if (event.keyCode === 27) {
            vTransition();
        }
        event.stopPropagation();
    });
    evalSbSel.querySelector('#compressOpts').addEventListener('keyup', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#subEls').addEventListener('mousedown', function() {
        unifyActiveWindows();
        return false;
    });
    $('#activeSessionTabVal').on('click', vTransition);
    evalSbSel.querySelector('#evalSelectedLineitemsVal').addEventListener('input', function() {
        isDupeVal(toggleActiveTab, 400);
    });
    evalSbSel.querySelector('#sessionExport_Scope').addEventListener('change', function() {
        sbTokenDeletedCb();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#sessionStorageKey').addEventListener('click', function() {
        if (Util.txAltVal(sessionRootVal)) {
            sessionRootVal.checked = !sessionRootVal.checked;
            sbTokenDeletedCb();
        }
        event.stopPropagation();
    });
    evalSbSel.querySelector('#sessionRootVal').addEventListener('click', function() {
        sbTokenDeletedCb();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#iWindow2Val').addEventListener('click', function() {
        if (Util.txAltVal(evalRunningVal)) {
            evalRunningVal.checked = !evalRunningVal.checked;
            sbTokenDeletedCb();
        }
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalRunningVal').addEventListener('click', function() {
        sbTokenDeletedCb();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#iWidthVal').addEventListener('click', function() {
        if (Util.txAltVal(evalOptionDescVal)) {
            evalOptionDescVal.checked = !evalOptionDescVal.checked;
            sbSelVal(evalOptionDescVal, cacheWindow);
            sbTokenDeletedCb();
        }
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalOptionDescVal').addEventListener('click', function() {
        sbSelVal(evalOptionDescVal, cacheWindow);
        sbTokenDeletedCb();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#session2Val').addEventListener('click', function() {
        if (Util.txAltVal(cacheWindow)) {
            cacheWindow.checked = !cacheWindow.checked;
            sbSelVal(cacheWindow, evalOptionDescVal);
            sbTokenDeletedCb();
        }
        event.stopPropagation();
    });
    evalSbSel.querySelector('#cacheWindow').addEventListener('click', function() {
        sbSelVal(cacheWindow, evalOptionDescVal);
        sbTokenDeletedCb();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#exclusivityPredicates').addEventListener('change', function() {
        fctRef();
    });
    evalSbSel.querySelector('#cacheSessionTransactions').addEventListener('click', function() {
        q('exclusivityPredicates').checked = 'true';
        fctRef();
    });
    evalSbSel.querySelector('#evalSessionConfigIdx').addEventListener('click', function() {
        q('reloadWindowSource').checked = 'true';
    });
    evalSbSel.querySelector('#evalSessionConfigVal').addEventListener('click', function() {
        q('iTitleVal').checked = 'true';
    });
    evalSbSel.querySelector('#requestSessionTransactions').addEventListener('change', function() {
        fctRef();
    });
    evalSbSel.querySelector('#iAssessStyleVal').addEventListener('click', function() {
        q('requestSessionTransactions').checked = 'true';
        fctRef();
    });
    evalSbSel.querySelector('#currentSessionCountsNotify').addEventListener('change', function() {
        fctRef();
    });
    evalSbSel.querySelector('#iTokenComponentEl').addEventListener('click', function() {
        q('currentSessionCountsNotify').checked = 'true';
        fctRef();
    });
    evalSbSel.querySelector('#parsePreviousSession').addEventListener('change', function() {
        fctRef();
        if (this.checked) {
            q('hDebug').focus();
        }
    });
    evalSbSel.querySelector('#hDebug').addEventListener('focus', function() {
        if (!q('parsePreviousSession').checked) {
            q('parsePreviousSession').checked = 'true';
        }
        fctRef();
        this.style.borderColor = 'hsl(211, 33%, 46%)';
    });
    evalSbSel.querySelector('#hDebug').addEventListener('blur', function() {
        this.style.borderColor = 'hsl(211, 33%, 66%)';
    });
    evalSbSel.querySelector('#hDebug').addEventListener('change', function() {
        fctRef();
    });
    evalSbSel.querySelector('#hDebug').addEventListener('keyup', function() {
        fctRef();
    });
    evalSbSel.querySelector('#extractWindowArray').addEventListener('mousedown', function() {
        registerCurrentSessionSource();
        sbTokenDeletedCb();
        reloadTabSource();
    });
    evalSbSel.querySelector('#debugVal').addEventListener('mousedown', function() {
        registerCurrentSessionSource();
        sbTokenDeletedCb();
        reloadTabSource();
    });
    evalSbSel.querySelector('#optArgs').addEventListener('mousedown', function() {
        registerCurrentSessionSource();
        sbTokenDeletedCb();
        reloadTabSource();
    });
    evalSbSel.querySelector('#outMatchedTabsVal').addEventListener('mousedown', function() {
        registerCurrentSessionSource();
        sbTokenDeletedCb();
        reloadTabSource();
    });
    evalSbSel.querySelector('#currentTab').addEventListener('mousedown', function() {
        registerCurrentSessionSource();
        sbTokenDeletedCb();
        reloadTabSource();
    });
    evalSbSel.querySelector('#iSelectedSessionConfigHead').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#evalPropVal').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#session1WindowIdxVal').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#iLeafLineitemType').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#contentChangedCb').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#cleanVal').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#iWinVal').addEventListener('mousedown', registerCurrentSessionSource);
    evalSbSel.querySelector('#positionActiveTab').addEventListener('click', function() {
        if (Util.txAltVal(evalRangeCumulative)) {
            evalSbTokenAddedCb(evalRangeCumulative.checked = !evalRangeCumulative.checked);
        }
    });
    evalSbSel.querySelector('#evalRangeCumulative').addEventListener('click', function() {
        evalSbTokenAddedCb(this.checked);
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalRangeCumulative').addEventListener('change', function() {
        evalSbTokenAddedCb(this.checked);
    });
    evalSbSel.querySelector('#iContextToVal').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#iContextToVal').addEventListener('change', function() {
        evalSbTokenAddedCb(evalRangeCumulative.checked);
    });
    evalSbSel.querySelector('#iContextToVal').addEventListener('keyup', function() {
        evalSbTokenAddedCb(evalRangeCumulative.checked);
    });
    evalSbSel.querySelector('#iId').addEventListener('click', function() {
        if (Util.txAltVal(extractTabTransactions)) {
            extractTabTransactions.checked = !extractTabTransactions.checked;
            evalSessionCountVal();
        }
    });
    evalSbSel.querySelector('#extractTabTransactions').addEventListener('click', function() {
        evalSessionCountVal();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#altHash').addEventListener('click', function() {
        if (Util.txAltVal(popTabAction)) {
            popTabAction.checked = !popTabAction.checked;
        }
    });
    evalSbSel.querySelector('#popTabAction').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#adjustWindowArray').addEventListener('click', function() {
        if (Util.txAltVal(intendedParentVal)) {
            intendedParentVal.checked = !intendedParentVal.checked;
        }
    });
    evalSbSel.querySelector('#intendedParentVal').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#saveWindowArray').addEventListener('click', function() {
        if (Util.txAltVal(optionDescVal)) {
            optionDescVal.checked = !optionDescVal.checked;
        }
    });
    evalSbSel.querySelector('#optionDescVal').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#localeNmVal').addEventListener('click', function() {
        if (Util.txAltVal(appActionCoordinate)) {
            appActionCoordinate.checked = !appActionCoordinate.checked;
        }
    });
    evalSbSel.querySelector('#appActionCoordinate').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalSearchTerm').addEventListener('click', function() {
        if (Util.txAltVal(updateTitle)) {
            updateTitle.checked = !updateTitle.checked;
        }
    });
    evalSbSel.querySelector('#updateTitle').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#rStyle').addEventListener('click', function() {
        if (Util.txAltVal(evalRevisionIdxVal)) {
            evalRevisionIdxVal.checked = !evalRevisionIdxVal.checked;
        }
    });
    evalSbSel.querySelector('#evalRevisionIdxVal').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#sCtrlKeyVal').addEventListener('click', function() {
        if (Util.txAltVal(sbSel)) {
            sbSel.checked = !sbSel.checked;
        }
    });
    evalSbSel.querySelector('#sbSel').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#findWindowTab').addEventListener('click', function() {
        if (Util.txAltVal(evalQueue)) {
            evalQueue.checked = !evalQueue.checked;
        }
    });
    evalSbSel.querySelector('#uIdVal').addEventListener('click', function() {
        if (Util.txAltVal(serializeSession)) {
            serializeSession.checked = !serializeSession.checked;
        }
    });
    evalSbSel.querySelector('#filterSavedSession').addEventListener('click', function() {
        if (Util.txAltVal(limit)) {
            limit.checked = !limit.checked;
        }
    });
    evalSbSel.querySelector('#syncCurrentSession').addEventListener('click', function() {
        if (Util.txAltVal(mergeSessionTabs)) {
            mergeSessionTabs.checked = !mergeSessionTabs.checked;
        }
    });
    evalSbSel.querySelector('#evalQueue').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#serializeSession').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#limit').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#mergeSessionTabs').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalSbSelLineitemVal').addEventListener('click', function() {
        if (Util.txAltVal(evalSession1)) {
            evalSession1.checked = !evalSession1.checked;
        }
    });
    evalSbSel.querySelector('#evalSession1').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#iRemovedTabCount').addEventListener('click', function() {
        if (Util.txAltVal(evalRecoverySessionVal)) {
            evalRecoverySessionVal.checked = !evalRecoverySessionVal.checked;
        }
    });
    evalSbSel.querySelector('#evalRecoverySessionVal').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#iSessionConfig1').addEventListener('click', function() {
        if (Util.txAltVal(btnCaretSelVal)) {
            btnCaretSelVal.checked = !btnCaretSelVal.checked;
            evalSessionCountVal();
        }
    });
    evalSbSel.querySelector('#btnCaretSelVal').addEventListener('click', function() {
        evalSessionCountVal();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#evalSDupe').addEventListener('click', function() {
        if (Util.txAltVal(setSession)) {
            setSession.checked = !setSession.checked;
        }
    });
    evalSbSel.querySelector('#setSession').addEventListener('click', function() {
        event.stopPropagation();
    });
    evalSbSel.querySelector('#sessionConfigVal').addEventListener('mousedown', function() {
        popActiveTab(this);
    });
    evalSbSel.querySelector('#sessionConfigVal').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    evalSbSel.querySelector('#sessionConfigVal').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#sessionConfigVal').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#sessionConfigVal').addEventListener('click', function() {
        getPreviousSession(this, createWindowTab);
    });
    evalSbSel.querySelector('#Div8').addEventListener('click', function() {
        augmentActiveWindow(this, saveTabList);
    });
    evalSbSel.querySelector('#Div8').addEventListener('mousedown', function() {
        recoverySession(this);
    });
    evalSbSel.querySelector('#Div8').addEventListener('mouseup', function() {
        dirtyVal(this);
    });
    evalSbSel.querySelector('#Div8').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#Div8').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#Div9').addEventListener('click', function() {
        iIncludeSeqProp(this, 'initTabLayout', q('headerErrVal'));
        event.stopPropagation();
    });
    evalSbSel.querySelector('#Div9').addEventListener('mousedown', function(ev) {
        session1WindowIdx(this);
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    });
    evalSbSel.querySelector('#Div9').addEventListener('mouseover', function() {
        refreshTabUrl(this, q('headerErrVal'));
    });
    evalSbSel.querySelector('#Div9').addEventListener('mouseout', function() {
        formatCurrentTab(this, q('headerErrVal'));
    });
    evalSbSel.querySelector('#finalCssClsIdx').addEventListener('mousedown', function() {
        popActiveTab(this);
    });
    evalSbSel.querySelector('#finalCssClsIdx').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    evalSbSel.querySelector('#finalCssClsIdx').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#finalCssClsIdx').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#finalCssClsIdx').addEventListener('click', function() {
        getPreviousSession(this, extractMatchText);
    });
    evalSbSel.querySelector('#iterateTabTransactions').addEventListener('mousedown', function() {
        popActiveTab(this);
    });
    evalSbSel.querySelector('#iterateTabTransactions').addEventListener('mouseup', function() {
        tokenComponentImgVal(this);
    });
    evalSbSel.querySelector('#iterateTabTransactions').addEventListener('mouseover', function() {
        cachePtAreaVal(this);
    });
    evalSbSel.querySelector('#iterateTabTransactions').addEventListener('mouseout', function() {
        session1(this);
    });
    evalSbSel.querySelector('#iterateTabTransactions').addEventListener('click', function() {
        getPreviousSession(this, severity);
    });
    evalSbSel.querySelector('#opacityAnimation').addEventListener('click', function() {
        vTransition();
        event.stopPropagation();
    });
    evalSbSel.querySelector('#iTabSeqVal').addEventListener('click', function() {
        iTabSeqVal();
        event.stopPropagation();
    });
}

function baselineVal() {
    var that = document.querySelector('#lnkClearSearch');
    if (that) {
        clearTimeout(val9);
        val9 = setTimeout(function(that) {
            that.removeAttribute('scrolling');
        }, 600, that);
    }
}

function evalSeparatorIdxVal() {
    window.addEventListener('resize', oldSessionId, false);
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (!request.iBackwards && request.fctRefVal != tabIdentifier || request.iBackwards && request.iBackwards === tabIdentifier) {
            if (request.id === 'augmentWindowArray') {
                if (detOpt && detOpt === 'current') {
                    evalRegisterValue2(request.data.windows, selectWindowTab);
                }
                addSessionConfigs.selSelMode(undefined, 'current', new Date(request.data.date));
            } else if (request.id === 'dirty') {
                addSessionConfigs.evalRemovedTabCount(undefined, 'current', request.data.unfilteredWindowCount, request.data.filteredWindowCount, request.data.unfilteredTabCount, request.data.filteredTabCount);
            } else if (request.id === 'iChildCountVal') {
                iChildCountVal(request.data.evalSbTokenDeletedCb, request.data.iOnlyCountDupes, request.data.sbTokenAddedCbVal, request.data.sActionPendingVal, request.data.iTabId, request.data.iStartCountingAt);
            } else if (request.id === 'iEvent') {
                addSessionConfigs.processSessionRoot(request.data.iRegisterValue3, undefined, function() {});
            } else if (request.id === 'showActiveSessionTab') {
                maxCount(false);
            } else if (request.id === 'tabStateVal') {
                tabStateVal(request.data.sActionPending);
            } else if (request.id === 'propagateImportedSession') {
                addSessionConfigs.sbAddedToken(request.data.iRegisterValue3, function(allowUserIntAction, lineitemElSelected) {
                    if (request.data.sbTokenAddedCbVal) {
                        var iWindowVal = null;
                        var mergeActiveTabs = null;
                        if (request.data.iTabId && request.data.iStartCountingAt) {
                            if (SbUtil.vTxVal(request.data.iTabId, lineitemElSelected) > -1) {
                                iWindowVal = request.data.iTabId;
                            } else {
                                iWindowVal = addSessionConfigs.sbRange();
                            }
                            mergeActiveTabs = [];
                            for (var i = 0; i < request.data.iStartCountingAt.length; i++) {
                                if (SbUtil.vTxVal(request.data.iStartCountingAt[i], lineitemElSelected) > -1) {
                                    mergeActiveTabs.push(request.data.iStartCountingAt[i]);
                                }
                            }
                            mergeActiveTabs = mergeActiveTabs.concat(addSessionConfigs.elHiddenVal());
                        } else {
                            iWindowVal = lineitemElSelected[lineitemElSelected.length - 1];
                            mergeActiveTabs = lineitemElSelected.length > 1 ? lineitemElSelected : undefined;
                        }
                        addSessionConfigs.evalSbAnnotation(iWindowVal, mergeActiveTabs, function(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab) {
                            if (allowUserIntAction) {
                                addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
                                isBSaveRelevant(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab);
                            }
                        });
                    }
                });
            } else if (request.id === 'posStringVal') {
                if (request.data.extractWindowTitle.type === 'saved') {
                    addSessionConfigs.evalRemovedTabCount(request.data.extractWindowTitle.id, request.data.extractWindowTitle.type, request.data.extractWindowTitle.unfilteredWindowCount, request.data.extractWindowTitle.filteredWindowCount, request.data.extractWindowTitle.unfilteredTabCount, request.data.extractWindowTitle.filteredTabCount);
                    addSessionConfigs.selSelMode(request.data.extractWindowTitle.id, request.data.extractWindowTitle.type, new Date(Util.cachePtPair(request.data.extractWindowTitle.utcDateString)));
                }
            } else if (request.id === 'expr') {
                if (request.data.extractWindowTitle.type === 'previous') {
                    addSessionConfigs.evalRemovedTabCount(request.data.extractWindowTitle.id, request.data.extractWindowTitle.type, request.data.extractWindowTitle.unfilteredWindowCount, request.data.extractWindowTitle.filteredWindowCount, request.data.extractWindowTitle.unfilteredTabCount, request.data.extractWindowTitle.filteredTabCount);
                }
            } else if (request.id === 'evalSession2WindowIdxVal') {
                windowSrc(request.data);
                optimizeSessionSource();
            } else if (request.id === 'stopAnimationVal') {
                optimizeSessionSource(request.data.windows, function() {
                    if (detOpt === 'saved') {
                        iCondition(undefined, function(iIdsVal, correctPLimit) {
                            if (!iIdsVal) {
                                iPredicateVal.popTabTitle({
                                    id: 'posStringVal',
                                    data: {
                                        extractWindowTitle: correctPLimit
                                    }
                                });
                                iPredicateVal.popTabTitle({
                                    id: 'tabStateVal',
                                    data: {
                                        sActionPending: correctPLimit.id
                                    },
                                    fctRefVal: tabIdentifier
                                });
                            }
                        }, undefined, request.data.extractWindowTitle.utcDateString);
                    } else if (detOpt === 'previous') {
                        iCondition(undefined, function(iIdsVal, correctPLimit) {
                            if (!iIdsVal) {
                                iPredicateVal.popTabTitle({
                                    id: 'expr',
                                    data: {
                                        extractWindowTitle: correctPLimit
                                    }
                                });
                            }
                        }, undefined, undefined, true);
                    } else {
                        registerValue4();
                    }
                }, request.data.extractWindowTitle && request.data.extractWindowTitle.utcDateString);
            } else if (request.id === 'optimizeSessionSource') {
                optimizeSessionSource(undefined, request.data.callback);
            } else if (request.id === 'propNm') {
                copyTabList(request.data.showCurrentWindow, function() {
                    newNm(request.data.subArrayVal && !request.data.addTabSource, function() {
                        concatenateVal(request.data.addTabSource, function() {
                            if (request.data.rangeCumulativeVal) {
                                flashSessionVal(request.data.session2WindowIdxVal);
                            }
                            addSavedSession();
                            if (request.data.createTabArray) {
                                if (request.data.enableKeyboardShortcuts) {
                                    addSessionConfigs.bConfigVal();
                                } else {
                                    addSessionConfigs.saveSessionLayout();
                                }
                            }
                        });
                    });
                });
            } else if (request.id === 'directionVal') {
                addSessionConfigs.halfStep(request.data.id, request.data.type, request.data.name);
                if (iSBDBVal === request.data.id) {
                    if (notifyWindowTab) {
                        optimizeSessionSource();
                    } else {
                        if (request.data.name && request.data.name.trim()) {
                            foundTabCandidatesVal(request.data.name.trim(), 'Rename this session');
                            q('iSessionCountVal').value = request.data.name.trim();
                            q('iFinalCssClsVal').classList.add('alsoSelectVal');
                        } else {
                            foundTabCandidatesVal(tabMode(request.data.type), 'Name this session');
                            q('iSessionCountVal').value = '';
                            q('iFinalCssClsVal').classList.remove('alsoSelectVal');
                        }
                    }
                    addSessionConfigs.evalWindowRestoreOptions('title');
                }
            }
        }
    });
    addSessionConfigs = new sbDialogs(q('lnkClearSearch'), 0, true, true, isBSaveRelevant, augmentCurrentWindow);
    q('lnkClearSearch').innerHTML = '';
    addSessionConfigs.iFlashSession();
    iIds(undefined, undefined, undefined, undefined, undefined, function() {
        q('sbDialogs').focus();
        q('lnkClearSearch').scrollTop = 0;
        Util.enable(q('rArrayVal'));
        Util.enable(q('appExceptionVal'));
        Util.enable(q('evalSbGroupVal'));
        Util.enable(q('iMsg'));
        addCurrentSessionCache(q('lnkClearSearch'), q('msgNm'));
        iPredicateVal.SBDB.expectStatusVal('trigger1', true, function(v) {
            if (!v) {
                iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
                    if (iChildCount && iChildCount > 40) {
                        setTimeout(function() {
                            $('#btnDon' + 'ate').fadeIn('slow');
                        }, 2 * 1e3);
                    }
                });
            }
        });
        iPredicateVal.SBDB.expectStatusVal('trigger3', true, function(v) {
            if (!v) {
                iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
                    if (iChildCount) {
                        if (querySessionAction('historic_sb_tab_load_count', iChildCount)) {
                            ga('send', 'event', 'application', 'historic_sb_tab_load_count', undefined, iChildCount, {
                                nonInteraction: 1
                            });
                            iPredicateVal.SBDB.resetIcon('trigger3', 1);
                        }
                    }
                });
            }
        });
        iPredicateVal.SBDB.expectStatusVal('trigger4', true, function(v) {
            if (!v) {
                iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
                    if (iChildCount) {
                        if (iChildCount > 48) {
                            iPredicateVal.SBDB.filterAdjascentTabs(function(ssCount) {
                                if (iChildCount > 52) {
                                    if (querySessionAction('historic_saved_session_count', ssCount)) {
                                        ga('send', 'event', 'application', 'historic_saved_session_count', undefined, ssCount, {
                                            nonInteraction: 1
                                        });
                                        iPredicateVal.SBDB.resetIcon('trigger4', 1);
                                    }
                                } else {
                                    if (querySessionAction('usage_threshold_1_saved_session_count', ssCount)) {
                                        ga('send', 'event', 'application', 'usage_threshold_1_saved_session_count', undefined, ssCount, {
                                            nonInteraction: 1
                                        });
                                        iPredicateVal.SBDB.resetIcon('trigger4', 1);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    });
    q('fctWrapperVal').innerText = new Date().getFullYear();
    q('removedTabCounts').innerText = chrome.app.getDetails().version;
    q('evalSbNmVal').innerHTML = '<span style="cursor:pointer;text-decoration:underline;">' + BrowserAPI.extensionId() + '</span>';
    q('findCurrentTab').innerHTML = Util.addTitle();
    q('showWindowCount').innerText = chrome.app.getDetails().version;
    q('createSessionTab').innerText = navigator.platform;
    q('parseCurrentWindow').innerText = navigator.userAgent;
    q('popWindowConfig').innerText = navigator.language;
    $('#evalSbNmVal').on('click', function() {
        Util.initPreviousSession(undefined, 'chrome://extensions/?id=' + BrowserAPI.extensionId(), true);
    });
    if (SbUtil.sessionMode) {
        q('refreshCurrentSession').appendChild(createElement('div', 'iShowSuccessStatusVal', 'currentTimeVal iPos', 'tabIdentifier: ' + tabIdentifier));
        q('refreshCurrentSession').appendChild(createElement('div', 'iSelMode', 'currentTimeVal sbTokenAddedCb', 'extension: ' + BrowserAPI.extensionId()));
    }
    SbUtil.btnCaretBackward();
    if (SbUtil.sessionMode) {
        var iSeverityVal = document.querySelector('#iCountVal');
        if (iSeverityVal) {
            iSeverityVal.appendChild(createElement('div', undefined, 'serializeSessionTransactions', 'Disable Debug')).addEventListener('mousedown', function() {
                nodebug();
            });
        }
    }
}

function iChildCountVal(syncActiveTab, iTriggerNm, updateSessionState, bImgShowURLs, evalOrientation, idx5Val) {
    if (bImgShowURLs) {
        q('sbDialogs').focus();
    }
    addSessionConfigs.processSessionRoot(syncActiveTab, updateSessionState, function(allowUserIntAction, addSessionStatus) {
        addSessionConfigs.sbAddedToken(iTriggerNm, function(allowUserIntAction, lineitemElSelected) {
            if (updateSessionState) {
                var iWindowVal = null;
                var mergeActiveTabs = null;
                if (evalOrientation && idx5Val) {
                    if (SbUtil.vTxVal(evalOrientation, lineitemElSelected) > -1) {
                        iWindowVal = evalOrientation;
                    }
                    mergeActiveTabs = [];
                    for (var i = 0; i < idx5Val.length; i++) {
                        if (SbUtil.vTxVal(idx5Val[i], lineitemElSelected) > -1) {
                            mergeActiveTabs.push(idx5Val[i]);
                        }
                    }
                } else {
                    iWindowVal = lineitemElSelected[lineitemElSelected.length - 1];
                    mergeActiveTabs = lineitemElSelected.length > 1 ? lineitemElSelected : undefined;
                }
                addSessionConfigs.evalSbAnnotation(iWindowVal, mergeActiveTabs, function(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab) {
                    if (allowUserIntAction) {
                        addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
                        isBSaveRelevant(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab);
                    }
                }, 'replace');
            }
        });
    });
}

function isBSaveRelevant(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab, keepActionOpen, cb) {
    if (allowUserIntAction) {
        iDate(evalSbTailContainerVal, popWindowArray, function() {
            iSelectedSessionConfigsAll();
            if (cb) {
                cb();
            }
        }, popSessionTab, keepActionOpen);
    }
}

function augmentCurrentWindow(allowUserIntAction, addSessionStatus, evalOrientation, iPixelWidth) {
    if (allowUserIntAction) {
        iPredicateVal.SBDB.appMsgVal(addSessionStatus, true, function(cacheIcon) {
            iPredicateVal.iLinear(tabIdentifier, 'createTabList', 'Sessions deleted', function() {
                iPredicateVal.popTabTitle({
                    id: 'showActiveSessionTab',
                    fctRefVal: tabIdentifier
                });
                iPredicateVal.popTabTitle({
                    id: 'iEvent',
                    data: {
                        iRegisterValue3: addSessionStatus
                    },
                    fctRefVal: tabIdentifier
                });
                maxCount((cacheIcon > 1 ? cacheIcon + ' sessions' : 'Session') + ' deleted<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                evalSessionIdVal = true;
            }, JSON.stringify(addSessionStatus), JSON.stringify(evalOrientation), JSON.stringify(iPixelWidth));
        });
    }
}

function iDate(tabPreState, tabPostStates, cb, popSessionTab, keepActionOpen) {
    if (tabPostStates && tabPostStates.length) {
        invertFlags(undefined, undefined, undefined, tabPostStates, cb);
    } else if (tabPreState.type === 'current') {
        debugValRight(cb);
    } else if (tabPreState.type === 'previous') {
        serializeTabList(tabPreState.id, cb);
    } else if (tabPreState.type === 'saved') {
        componentVal(tabPreState.id, false, cb, !keepActionOpen);
    }
}

function optimizeSessionSource(iSession1Val, seqProp, deferEnableSyncFct) {
    if (!iSession1Val) {
        iSession1Val = selectWindowTab;
    }
    if (detOpt === 'current') {
        isHalfstepVal(iSession1Val, undefined, false, seqProp);
    } else if (detOpt === 'previous') {
        registerValue2(iSBDBVal, iSession1Val, deferEnableSyncFct, false, seqProp);
    } else if (detOpt === 'saved') {
        resetSessionWindow(iSBDBVal, iSession1Val, notifyWindowTab ? q('iSessionCountVal').value.trim() : undefined, undefined, deferEnableSyncFct, false, false, seqProp);
    } else if (detOpt === 'combined') {
        selDir(iSession1Val, undefined, undefined, undefined, false, undefined, undefined, seqProp);
    }
}

function debugValRight(seqProp) {
    BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
        isHalfstepVal(iSession1Val, new Date(), true, function() {
            iPredicateVal.SBDB.cachePtPairVal(tabIdentifier, function(windowIdx) {
                if (windowIdx && windowIdx.action != 'createTabList') {
                    maxCount(false);
                    evalSessionIdVal = false;
                }
                (seqProp || iSelectedSessionConfigsAll)();
            });
        });
    });
}

function isHalfstepVal(iSession1Val, setTab, evalReg2Val, seqProp) {
    chrome.windows.getCurrent(function(w) {
        iWindow1Val(iSession1Val, createRecoverySession, w.id, false, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
            requestWindowState(doc, registerSessionSource, renderActiveSessionTab, showActiveTab);
            if (setTab) {
                idx8(q('currentTime'), setTab, 'requestDisplayedSession', true);
                addSessionConfigs.iStatTypeCodeNmVal(q('ntc'), setTab);
            }
            if (evalReg2Val) {
                iStartIdxVal(false);
                positionSessionWindow();
                openPreviousSession = false;
            }
            isNavPanelPositionRight(null, SbUtil.iStartIdx(doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
            if (iSBDBVal != -13 || detOpt != 'current') {
                q('iSessionCountVal').value = '';
                iSBDBVal = -13;
                iPosStringVal = undefined;
                if (SbUtil.sessionMode) {
                    var requestRecoverySession = q('evalPositionVal') || createElement('span', 'evalPositionVal', 'currentTimeVal iPos');
                    requestRecoverySession.innerHTML = 'Session Id: ' + iSBDBVal;
                    requestRecoverySession.style.right = '-9px';
                    requestRecoverySession.style.bottom = '3px';
                    requestRecoverySession.style.position = 'relative';
                    q('iSpeed').insertBefore(requestRecoverySession, q('evalSClickOriginDelete'));
                }
            }
            if (detOpt != 'current') {
                syncSession(debugValRight, 'The displayed session differs from the current session. Click to refresh.');
                foundTabCandidatesVal('Current Session');
                q('iFinalCssClsVal').classList.remove('alsoSelectVal');
                detOpt = 'current';
            }
            if (seqProp) {
                seqProp();
            } else {
                iSelectedSessionConfigsAll();
            }
        });
    });
}

function serializeTabList(requestHonored, seqProp) {
    if (!requestHonored && detOpt === 'previous') {
        requestHonored = iSBDBVal;
    }
    iPredicateVal.SBDB.serializeActiveSessionTab(requestHonored, undefined, function(iSearchTerms) {
        if (iSearchTerms) {
            registerValue2(requestHonored, Util.severityVal(iSearchTerms.windows), new Date(Util.cachePtPair(iSearchTerms.recordingDateTime)), true, function() {
                iPredicateVal.SBDB.cachePtPairVal(tabIdentifier, function(windowIdx) {
                    if (windowIdx && windowIdx.action != 'createTabList') {
                        maxCount(false);
                        evalSessionIdVal = false;
                    }
                    (seqProp || iSelectedSessionConfigsAll)();
                });
            }, iSearchTerms.thumbnail);
        }
    });
}

function registerValue2(requestHonored, iSession1Val, iSelActionTypeVal, evalReg2Val, seqProp, gid) {
    iWindow1Val(iSession1Val, requestActiveTab, false, false, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
        SbUtil.iWidthOverrideVal(requestHonored, function(evalOpacityAnimation) {
            foundTabCandidatesVal('Previous Session');
            evalPredicateVal(doc, registerSessionSource, renderActiveSessionTab, showActiveTab);
            if (iSelActionTypeVal) {
                idx8(q('currentTime'), iSelActionTypeVal, 'tabSrc', true);
            }
            if (evalReg2Val) {
                iStartIdxVal(false);
                positionSessionWindow();
                openPreviousSession = false;
            }
            isNavPanelPositionRight(null, SbUtil.iStartIdx(doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
            if (iSBDBVal != requestHonored || detOpt != 'previous') {
                q('iSessionCountVal').value = '';
                iSBDBVal = requestHonored;
                iPosStringVal = gid;
                if (SbUtil.sessionMode) {
                    var requestRecoverySession = q('evalPositionVal') || createElement('span', 'evalPositionVal', 'currentTimeVal iPos');
                    requestRecoverySession.innerHTML = 'Session Id: ' + iSBDBVal;
                    requestRecoverySession.style.right = '-9px';
                    requestRecoverySession.style.bottom = '3px';
                    requestRecoverySession.style.position = 'relative';
                    q('iSpeed').insertBefore(requestRecoverySession, q('evalSClickOriginDelete'));
                }
            }
            if (detOpt != 'previous') {
                syncSession(serializeTabList, 'The session has been edited. Click to refresh.');
                q('iFinalCssClsVal').classList.remove('alsoSelectVal');
                detOpt = 'previous';
            }
            if (seqProp) {
                seqProp();
            } else {
                iSelectedSessionConfigsAll();
            }
        });
    });
}

function componentVal(requestHonored, sbTokenVal, seqProp, iTabCount) {
    if (!requestHonored && detOpt === 'saved') {
        requestHonored = iSBDBVal;
    }
    iPredicateVal.SBDB.renderWindowTab(requestHonored, undefined, function(iSearchTerms) {
        if (iSearchTerms) {
            resetSessionWindow(requestHonored, Util.severityVal(iSearchTerms.windows), iSearchTerms.name, new Date(Util.cachePtPair(iSearchTerms.creationDateTime)), new Date(Util.cachePtPair(iSearchTerms.modificationDateTime)), true, sbTokenVal, iTabCount ? function() {
                iPredicateVal.SBDB.cachePtPairVal(tabIdentifier, function(windowIdx) {
                    if (windowIdx && windowIdx.action != 'createTabList') {
                        maxCount(false);
                        evalSessionIdVal = false;
                    }
                    (seqProp || iSelectedSessionConfigsAll)();
                });
            } : seqProp, iSearchTerms.thumbnail);
        }
    });
}

function resetSessionWindow(requestHonored, iSession1Val, formatActiveSessionTab, iRegisterValue1Val, cacheSessionRoot, evalReg2Val, sbTokenVal, seqProp, gid) {
    iWindow1Val(iSession1Val, requestActiveTab, false, false, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
        if (sbTokenVal) {
            addSessionConfigs.evalRemovedTabCount(requestHonored, 'saved', doc, registerSessionSource, renderActiveSessionTab, showActiveTab);
            addSessionConfigs.selSelMode(requestHonored, 'saved', cacheSessionRoot);
        }
        iSiblingSequenceVal(doc, registerSessionSource, renderActiveSessionTab, showActiveTab);
        if (iRegisterValue1Val && (+iRegisterValue1Val === +cacheSessionRoot || !cacheSessionRoot)) {
            idx8(q('currentTime'), iRegisterValue1Val, 'propagateCurrentTab');
        } else if (cacheSessionRoot) {
            idx8(q('currentTime'), cacheSessionRoot, 'formatTabTitle');
        }
        if (evalReg2Val) {
            iStartIdxVal(false);
            positionSessionWindow();
            openPreviousSession = false;
        }
        isNavPanelPositionRight(null, SbUtil.iStartIdx(doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
        if (iSBDBVal != requestHonored || detOpt != 'saved' || formatActiveSessionTab == '' || formatActiveSessionTab && formatActiveSessionTab.trim().length > 0) {
            if (formatActiveSessionTab && formatActiveSessionTab.trim()) {
                foundTabCandidatesVal(formatActiveSessionTab.trim(), 'Rename this session', notifyWindowTab);
                q('iFinalCssClsVal').classList.add('alsoSelectVal');
                q('iSessionCountVal').value = formatActiveSessionTab.trim();
            } else {
                foundTabCandidatesVal('Saved Session', 'Name this session');
                q('iFinalCssClsVal').classList.remove('alsoSelectVal');
                q('iSessionCountVal').value = '';
            }
            iSBDBVal = requestHonored;
            iPosStringVal = gid;
            if (SbUtil.sessionMode) {
                var requestRecoverySession = q('evalPositionVal') || createElement('span', 'evalPositionVal', 'currentTimeVal iPos');
                requestRecoverySession.innerHTML = 'Session Id: ' + iSBDBVal;
                requestRecoverySession.style.right = '-9px';
                requestRecoverySession.style.bottom = '3px';
                requestRecoverySession.style.position = 'relative';
                q('iSpeed').insertBefore(requestRecoverySession, q('evalSClickOriginDelete'));
            }
        }
        if (detOpt != 'saved') {
            syncSession(getActiveSessionTab, 'The session has been updated in a different Session Buddy tab. Click to refresh.');
            detOpt = 'saved';
        }
        if (seqProp) {
            seqProp();
        } else {
            iSelectedSessionConfigsAll();
        }
    }, formatActiveSessionTab && formatActiveSessionTab.trim());
}

function getActiveSessionTab() {
    componentVal(undefined, true);
}

function invertFlags(normalizeActiveWindow, evalOptDefaultRType, data7, evalRegisterValue3, seqProp) {
    if (!evalRegisterValue3 && detOpt === 'combined') {
        evalRegisterValue3 = addSessionConfigs.elHiddenVal();
    }
    iPredicateVal.SBDB.iSetNmVal(function(activeSessionTab) {
        iBackwardsVal(evalRegisterValue3, [], 0, 0, undefined, undefined, function(qualifyingArray, iWindowSeqVal, elMetrics, vTransitionVal) {
            deferAppExceptionVal(qualifyingArray, normalizeActiveWindow, !activeSessionTab, function(alsoSel, extractRecoverySession) {
                selDir(normalizeActiveWindow ? normalizeActiveWindow.concat(alsoSel) : alsoSel, evalOptDefaultRType ? evalOptDefaultRType + iWindowSeqVal : iWindowSeqVal, data7 ? data7 + extractRecoverySession : extractRecoverySession, activeSessionTab, true, elMetrics, vTransitionVal, function() {
                    iPredicateVal.SBDB.cachePtPairVal(tabIdentifier, function(windowIdx) {
                        if (windowIdx && windowIdx.action != 'createTabList') {
                            maxCount(false);
                            evalSessionIdVal = false;
                        }
                        if (seqProp) {
                            seqProp();
                        }
                    });
                });
            });
        });
    });
}

function selDir(iSession1Val, iWindowSeqVal, extractRecoverySession, formatSavedSession, evalReg2Val, elMetrics, vTransitionVal, seqProp) {
    iWindow1Val(iSession1Val, iWindowSeqVal === 1 ? requestActiveTab : createRecoverySession, false, true, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
        iSessionConfig2(doc, registerSessionSource, renderActiveSessionTab, showActiveTab, iWindowSeqVal);
        if (evalReg2Val) {
            iStartIdxVal(false);
            clearTimeout(stdHVal);
            openPreviousSession = false;
            lineitemsAddedCbVal = iWindowSeqVal;
            if (iWindowSeqVal) {
                if (iWindowSeqVal > 1) {
                    foundTabCandidatesVal(BrowserAPI.getI18nMessage('linksets', [iWindowSeqVal]));
                    q('iFinalCssClsVal').classList.remove('alsoSelectVal');
                    q('iSessionTypeVal').innerHTML = iWindowSeqVal;
                } else {
                    foundTabCandidatesVal(elMetrics);
                    if (vTransitionVal) {
                        q('iFinalCssClsVal').classList.add('alsoSelectVal');
                    } else {
                        q('iFinalCssClsVal').classList.remove('alsoSelectVal');
                    }
                }
            }
            if (extractRecoverySession !== undefined && extractRecoverySession !== null) {
                if (extractRecoverySession > 0) {
                    isNavPanelPositionRight('<div id="appStatusHiddenVal" class="tabDetail" style="cursor:pointer;"><input style="position:relative;top:-1px;" id="oMatchedTabTitlesVal" ' + (extractRecoverySession ? '' : 'disabled') + 'type="checkbox" ' + (formatSavedSession ? 'checked ' : '') + '/><span style="padding-left: 6px;">Hide duplicate tabs&nbsp;&nbsp;(' + extractRecoverySession + ')</span></div>', SbUtil.iStartIdx(doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                    q('appStatusHiddenVal').addEventListener('click', function() {
                        if (Util.txAltVal(q('oMatchedTabTitlesVal'))) {
                            q('oMatchedTabTitlesVal').checked = !q('oMatchedTabTitlesVal').checked;
                            evalSaveVal(q('oMatchedTabTitlesVal').checked);
                        }
                        event.stopPropagation();
                    }, false);
                    q('oMatchedTabTitlesVal').addEventListener('click', function() {
                        evalSaveVal(this.checked);
                        event.stopPropagation();
                    }, false);
                } else {
                    isNavPanelPositionRight('<div style="left: -3px;position: relative;cursor:default;"><span style="padding-left: 2px;">(No duplicate tabs)</span></div>', SbUtil.iStartIdx(doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                }
            }
        } else {
            q('evalSClickOriginDelete').innerHTML = SbUtil.iStartIdx(doc, registerSessionSource, renderActiveSessionTab, showActiveTab);
        }
        if (iSBDBVal != -14 || detOpt != 'combined') {
            q('iSessionCountVal').value = '';
            iSBDBVal = -14;
            iPosStringVal = undefined;
            if (SbUtil.sessionMode) {
                var requestRecoverySession = q('evalPositionVal') || createElement('span', 'evalPositionVal', 'currentTimeVal iPos');
                requestRecoverySession.innerHTML = 'Session Id: ' + iSBDBVal;
                requestRecoverySession.style.right = '-9px';
                requestRecoverySession.style.bottom = '3px';
                requestRecoverySession.style.position = 'relative';
                q('iSpeed').insertBefore(requestRecoverySession, q('evalSClickOriginDelete'));
            }
        }
        if (detOpt != 'combined') {
            syncSession(invertFlags, 'The displayed session has been modified. Click to refresh.');
            detOpt = 'combined';
        }
        if (seqProp) {
            seqProp();
        } else {
            iSelectedSessionConfigsAll();
        }
    });
}

function iSelectedSessionConfigsAll() {
    handleSync.iRerender();
}

function searchTermVal() {
    var data4 = q('iContextToVal');
    if (data4) {
        data4.innerHTML = '';
        var evalSbProp = null;
        for (var i = 0; i <= iPredicateVal.SBDB.isNm; i++) {
            evalSbProp = document.createElement('option');
            evalSbProp.setAttribute('value', i);
            evalSbProp.innerHTML = i;
            data4.appendChild(evalSbProp);
        }
    }
}

function windowSrc(restoreImportedSession) {
    var onBtn, offBtn;
    if (restoreImportedSession === 'true' || restoreImportedSession === true) {
        onBtn = $('#appExceptionVal');
        offBtn = $('#rArrayVal');
    } else if (restoreImportedSession !== undefined) {
        onBtn = $('#rArrayVal');
        offBtn = $('#appExceptionVal');
    }
    onBtn.addClass('iFlashCount');
    offBtn.removeClass('iFlashCount').removeClass('iTitleTextVal');
}

function iRange() {
    getCurrentTab = setInterval(function() {
        $('.nto').each(function() {
            var d = $(this).attr('data-d');
            if (d) {
                addSessionConfigs.iStatTypeCodeNmVal(this, new Date(+d));
            }
        });
    }, 60 * 1e3);
}

function iSelActionType() {
    clearInterval(getCurrentTab);
    getCurrentTab = null;
}

function idx8(evalSbToken, htmlEncodeRegExVal, iSearchRequestVal, formatActiveWindow) {
    if (iSearchRequestVal == undefined) {
        iSearchRequestVal = 'refreshTabConfig';
    }
    clearTimeout(stdHVal);
    var txtGroupNmVal = new Date().getTime() - new Date(htmlEncodeRegExVal).getTime();
    if (formatActiveWindow || optIdx) {
        if (SbUtil.dateDisplayType === 'relative') {
            evalSbToken.textContent = moment(htmlEncodeRegExVal).format(SbUtil.customDateFormat);
        } else {
            evalSbToken.textContent = moment(htmlEncodeRegExVal).fromNow();
        }
    }
    if (SbUtil.dateDisplayType !== 'relative') {
        if (txtGroupNmVal < 1e3 * 60) {
            stdHVal = setTimeout(idx8, 5 * 1e3, evalSbToken, htmlEncodeRegExVal, iSearchRequestVal);
        } else if (txtGroupNmVal < 1e3 * 60 * 60) {
            stdHVal = setTimeout(idx8, 60 * 1e3, evalSbToken, htmlEncodeRegExVal, iSearchRequestVal);
        } else if (txtGroupNmVal < 1e3 * 60 * 60 * 24) {
            stdHVal = setTimeout(idx8, 60 * 60 * 1e3, evalSbToken, htmlEncodeRegExVal, iSearchRequestVal);
        } else if (txtGroupNmVal < 1e3 * 60 * 60 * 24 * 365) {
            stdHVal = setTimeout(idx8, 60 * 60 * 1e3 * 24, evalSbToken, htmlEncodeRegExVal, iSearchRequestVal);
        }
    }
}

function syncActiveWindow() {
    optIdx = false;
}

function positionSessionWindow() {
    optIdx = true;
}

function iIdxVal() {
    iPredicateVal.SBDB.setWindowTab(function(iRestoreTypeVal) {
        bShowHideURLs(!iRestoreTypeVal);
    });
}

function requireSessionCache(iArrayToCompareVal) {
    if (!$('#compressOpts').is(':visible') && (!Util.contentShw(iArrayToCompareVal) || (iArrayToCompareVal.ctrlKey && Util.sessionNmVal != 'MacOS' || iArrayToCompareVal.metaKey && Util.sessionNmVal === 'MacOS') && iArrayToCompareVal.keyCode === 90)) {
        if (iArrayToCompareVal.keyCode === 86) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            iIdxVal();
        } else if (iArrayToCompareVal.keyCode === 84) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            saveDisplayedSession('adjustRecoverySession', undefined, undefined, function() {
                q('evalSelectedLineitemsVal').focus();
                q('evalSelectedLineitemsVal').select();
            });
        } else if (iArrayToCompareVal.keyCode === 81) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            isRangeDirBackVal();
            if (detOpt === 'combined' && addSessionConfigs.evalSCtrlKeyVal.length > 1) {
                evalSearchTerms();
            }
        } else if (iArrayToCompareVal.keyCode === 72) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            isRangeDirBackVal();
            vTransition(function() {
                if (q('oMatchedTabTitlesVal') && Util.txAltVal(q('oMatchedTabTitlesVal'))) {
                    q('oMatchedTabTitlesVal').checked = !q('oMatchedTabTitlesVal').checked;
                    evalSaveVal(q('oMatchedTabTitlesVal').checked);
                }
            });
        } else if (iArrayToCompareVal.keyCode === 87) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            filterActiveTab();
        } else if (iArrayToCompareVal.keyCode === 90) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            if (evalSessionIdVal) {
                isRangeDirBackVal();
                vTransition(function() {
                    iPredicateVal.requestCurrentWindow(tabIdentifier);
                });
            }
        } else if (iArrayToCompareVal.keyCode === 67) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            isRangeDirBackVal();
            vTransition(function() {
                addSessionConfigs.applicationEx(-13, 'current', 'single');
            });
        } else if (iArrayToCompareVal.keyCode === 83) {
            if (detOpt === 'current' || detOpt === 'previous') {
                iArrayToCompareVal.preventDefault();
                iArrayToCompareVal.stopPropagation();
                isRangeDirBackVal();
                vTransition(function() {
                    txStatus();
                });
            }
        }
    }
    return true;
}

function evalSbGroup(iArrayToCompareVal) {
    if (window.q && !$('#compressOpts').is(':visible')) {
        if (iArrayToCompareVal.keyCode === 70) {
            iArrayToCompareVal.preventDefault();
            iArrayToCompareVal.stopPropagation();
            q('evalSbGroupVal').focus();
            q('evalSbGroupVal').select();
            vTransition();
            isRangeDirBackVal();
        } else if (iArrayToCompareVal.keyCode === 37) {
            $('#sbDialogs').focus();
        } else if (iArrayToCompareVal.keyCode === 39) {
            $('#evalSbNm').focus();
        }
    }
    return true;
}

function countSessionWindows() {
    iPredicateVal.SBDB.detailTxt(function(value) {
        if (value) {
            evalSbGroup(event);
        }
    });
    return true;
}

function tabDesc(ev) {
    if (ev.keyCode === 27) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!isRangeDirBackVal()) {
            showCurrentTab();
            q('evalSbGroupVal').focus();
        }
        vTransition();
        return false;
    } else {
        iPredicateVal.SBDB.detailTxt(function(value) {
            if (value) {
                requireSessionCache(ev);
            }
        });
    }
    return true;
}

function initTab(requestHonored, tileSelect_Next, seqProp) {
    if (requestHonored != iSBDBVal || detOpt != tileSelect_Next) {
        iPredicateVal.SBDB.cachePtPairVal(tabIdentifier, function(windowIdx) {
            if (windowIdx && windowIdx.action != 'createTabList') {
                maxCount(false);
                evalSessionIdVal = false;
            }
            if (seqProp) {
                seqProp();
            }
        });
    } else {
        if (seqProp) {
            seqProp();
        }
    }
}

function bShowHideURLs(iRestoreTypeVal) {
    iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionRender_RenderSessionURL', iRestoreTypeVal, function(data, value) {
        iPredicateVal.popTabTitle({
            id: 'evalSession2WindowIdxVal',
            data: value
        });
    }, function(err) {
        console.error(err);
    });
}

function sbSelVal(augmentImportedSession, upperLimit) {
    if (!augmentImportedSession.checked && !upperLimit.checked) {
        upperLimit.checked = true;
    }
}

function currentComponent(seqProp) {
    iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(evalOutMatchedTabUrlsVal) {
        iPredicateVal.SBDB.normalizeTabList(function(appMsg) {
            iPredicateVal.SBDB.serializeActiveSessionTab(undefined, undefined, function(p, tx) {
                iPredicateVal.SBDB.renderWindowTab(undefined, tx, function(s) {
                    BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                        finish(p, s, iSession1Val);
                    });
                });
            });
            function finish(p, s, c) {
                var subComponentCount = 0;
                if (p) {
                    subComponentCount += p.length;
                }
                if (s) {
                    subComponentCount += s.length;
                }
                if (c) {
                    subComponentCount++;
                }
                iWindow1TabIdxVal(p, s, c, undefined, true, true, true, true, 'JSON_All', evalOutMatchedTabUrlsVal, appMsg, function(t) {
                    if (seqProp) {
                        seqProp(t);
                    }
                });
            }
        });
    });
}

function sbTokenDeletedCb(seqProp) {
    iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(evalOutMatchedTabUrlsVal) {
        iPredicateVal.SBDB.normalizeTabList(function(appMsg) {
            if (iSessionConfigs === 'app') {
                switch ($('#sessionExport_Scope').val()) {
                  case 'selected':
                    var pids = [], sids = [], cid;
                    for (var i = 0; i < addSessionConfigs.evalSCtrlKeyVal.length; i++) {
                        switch (addSessionConfigs.iRangeSelect(addSessionConfigs.evalSCtrlKeyVal[i])) {
                          case 'current':
                            cid = true;
                            break;

                          case 'saved':
                            sids.push(addSessionConfigs.sbNodeRangesVal(addSessionConfigs.evalSCtrlKeyVal[i]));
                            break;

                          case 'previous':
                            pids.push(addSessionConfigs.sbNodeRangesVal(addSessionConfigs.evalSCtrlKeyVal[i]));
                            break;
                        }
                    }
                    var calculatedVal1 = addSessionConfigs.iRangeSelect(addSessionConfigs.initCurrentWindow), establishedVal1 = addSessionConfigs.sbNodeRangesVal(addSessionConfigs.initCurrentWindow);
                    if (!cid && calculatedVal1 === 'current') {
                        cid = true;
                    } else if (calculatedVal1 === 'saved') {
                        if (sids.indexOf(establishedVal1) === -1) {
                            sids.push(establishedVal1);
                        }
                    } else if (calculatedVal1 === 'previous') {
                        if (pids.indexOf(establishedVal1) === -1) {
                            pids.push(establishedVal1);
                        }
                    }
                    iPredicateVal.SBDB.serializeActiveSessionTab(pids, undefined, function(p, tx) {
                        iPredicateVal.SBDB.renderWindowTab(sids, tx, function(s) {
                            if (cid) {
                                BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                                    finish(p, s, iSession1Val);
                                });
                            } else {
                                finish(p, s);
                            }
                        });
                    });
                    break;

                  case 'all':
                    iPredicateVal.SBDB.serializeActiveSessionTab(undefined, undefined, function(p, tx) {
                        iPredicateVal.SBDB.renderWindowTab(undefined, tx, function(s) {
                            BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                                finish(p, s, iSession1Val);
                            });
                        });
                    });
                    break;

                  case 'previous':
                    iPredicateVal.SBDB.serializeActiveSessionTab(undefined, undefined, function(p) {
                        finish(p);
                    });
                    break;

                  case 'saved':
                    iPredicateVal.SBDB.renderWindowTab(undefined, undefined, function(s) {
                        finish(undefined, s);
                    });
                    break;
                }
            } else {
                iWindow1TabIdxVal(undefined, undefined, undefined, selectWindowTab, q('sessionRootVal').checked, q('evalRunningVal').checked, q('evalOptionDescVal').checked, q('cacheWindow').checked, updateSessionRoot(), evalOutMatchedTabUrlsVal, appMsg, function(t) {
                    q('copyTabArray').value = t;
                    reloadTabSource();
                    if (seqProp) {
                        seqProp();
                    }
                });
            }
            function finish(p, s, c) {
                var subComponentCount = 0;
                if (p) {
                    subComponentCount += p.length;
                }
                if (s) {
                    subComponentCount += s.length;
                }
                if (c) {
                    subComponentCount++;
                }
                q('currentSearchReq').textContent = ' (' + subComponentCount + ')';
                iWindow1TabIdxVal(p, s, c, undefined, q('sessionRootVal').checked, q('evalRunningVal').checked, q('evalOptionDescVal').checked, q('cacheWindow').checked, updateSessionRoot(), evalOutMatchedTabUrlsVal, appMsg, function(t) {
                    q('copyTabArray').value = t;
                    reloadTabSource();
                    if (seqProp) {
                        seqProp();
                    }
                });
            }
        });
    });
}

function propagateSavedSession(s, o) {
    return s.replace(/{([^{}]+)}/g, function(a, b) {
        var r = o[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
}

function toggleActiveTab(format, iOpacityAnimation, normalizeWindowTab) {
    var copyActiveTab = 0, isSessionConfigSavedVal = 0, updateWindowArray = 0;
    var iShowTitles, iNowVal = 'Found ', objhttpVal = 'Import:';
    encodingDistribution_UTF8 = null;
    if (format) {
        objhttpVal += ' ' + format + ':';
        encodingDistribution_UTF8 = format;
    }
    try {
        if (iOpacityAnimation && (copyActiveTab = iOpacityAnimation.sessions.length)) {
            for (var i = 0; i < copyActiveTab; i++) {
                isSessionConfigSavedVal += iOpacityAnimation.sessions[i].windows.length;
                for (var j = 0; j < iOpacityAnimation.sessions[i].windows.length; j++) {
                    updateWindowArray += iOpacityAnimation.sessions[i].windows[j].tabs.length;
                }
            }
            iShowTitles = pluralize(copyActiveTab, 'session', 'sessions');
            objhttpVal += ' ' + iShowTitles;
            if (!normalizeWindowTab || normalizeWindowTab.toLowerCase() === 's') {
                iNowVal += iShowTitles;
            }
            if (isSessionConfigSavedVal) {
                iShowTitles = pluralize(isSessionConfigSavedVal, 'window', 'windows');
                objhttpVal += ' ' + iShowTitles;
                if (normalizeWindowTab.toLowerCase() === 'w') {
                    iNowVal += iShowTitles;
                }
            }
            if (updateWindowArray) {
                iShowTitles = pluralize(updateWindowArray, 'tab', 'tabs');
                objhttpVal += ' ' + iShowTitles;
                if (normalizeWindowTab.toLowerCase() === 't') {
                    iNowVal += iShowTitles;
                }
            }
        } else {
            iOpacityAnimation = null;
            objhttpVal += iNowVal = 'That doesn\'t look right';
        }
    } catch (ex) {
        console.log(ex);
        iOpacityAnimation = null;
        objhttpVal += iNowVal = 'That doesn\'t look right';
    }
    evalSessionStorageKeyVal = null;
    if ($('#compressOpts').is(':visible') && $('#adjustRecoverySession').is(':visible')) {
        if (q('evalSelectedLineitemsVal').value.trim()) {
            $('#extendedSessionConfig').show().text(iNowVal);
            if (iOpacityAnimation) {
                $('#extendedSessionConfig').removeClass('inferTypes');
                Util.enable(q('finalCssClsIdx'));
                evalSessionStorageKeyVal = iOpacityAnimation;
            } else {
                $('#extendedSessionConfig').addClass('inferTypes');
                Util.disable(q('finalCssClsIdx'));
            }
        } else {
            $('#extendedSessionConfig').hide();
            Util.disable(q('finalCssClsIdx'));
        }
    }
    console.log(objhttpVal);
}

function pluralize(count, singular, plural) {
    if (count == 1) {
        return count + ' ' + singular;
    }
    return count + ' ' + plural;
}

function formatActiveTab(t, cb) {
    var arr, i;
    var tabCnt = /^\{[\s\S]*\"(?:sessions|windows|tabs)\"\:[\s\S]*\}$/g;
    var selectSession = /^(?:Session,)?(?:Window,)?(?:Title,URL|Title|URL)(?:\n".+")+$/g;
    var field = '[^\\s].*';
    var nl = '\\n';
    var selLength = '(?:\\n\\s*)';
    var iTab = selLength + '*' + nl;
    var saveSessionTab = selLength + '+' + nl;
    var enableSyncFct = ['   ', '\\t'];
    var addSessionState = '(?:' + enableSyncFct.join('|') + ')';
    var optimizeSessionCombine = '(?:';
    for (i = 0; i < enableSyncFct.length; i++) {
        if (i > 0) {
            optimizeSessionCombine += '|';
        }
        optimizeSessionCombine += enableSyncFct[i] + enableSyncFct[i];
    }
    optimizeSessionCombine += ')';
    var requireWindowLayout = optimizeSessionCombine + field + '\\n' + optimizeSessionCombine + field;
    var evalRegisterValue1Val = requireWindowLayout + '(?:' + saveSessionTab + requireWindowLayout + ')*';
    var tabs = optimizeSessionCombine + field + '(?:' + iTab + optimizeSessionCombine + field + ')*';
    var win = field + iTab + evalRegisterValue1Val;
    var session = field + '(?:' + iTab + addSessionState + win + ')+';
    var replacements = {
        iTab: iTab,
        session: session
    };
    var createDateTime = new RegExp(propagateSavedSession('^{session}(?:{iTab}{session})*$', replacements), 'g');
    requireWindowLayout = addSessionState + field + '\\n' + addSessionState + field;
    evalRegisterValue1Val = requireWindowLayout + '(?:' + saveSessionTab + requireWindowLayout + ')*';
    win = field + iTab + evalRegisterValue1Val;
    replacements = {
        iTab: iTab,
        win: win
    };
    var deferEnableSelVal = new RegExp(propagateSavedSession('^{win}(?:{iTab}{win})*$', replacements), 'g');
    requireWindowLayout = field + '\\n' + field;
    evalRegisterValue1Val = requireWindowLayout + '(?:' + saveSessionTab + requireWindowLayout + ')*';
    replacements = {
        evalRegisterValue1Val: evalRegisterValue1Val
    };
    var iTabIdVal = new RegExp(propagateSavedSession('^{evalRegisterValue1Val}$', replacements), 'g');
    win = field + iTab + tabs;
    session = field + '(?:' + iTab + addSessionState + win + ')+';
    replacements = {
        iTab: iTab,
        session: session
    };
    var iAllowLogging = new RegExp(propagateSavedSession('^{session}(?:{iTab}{session})*$', replacements), 'g');
    tabs = addSessionState + field + '(?:' + iTab + addSessionState + field + ')*';
    win = field + iTab + tabs;
    replacements = {
        iTab: iTab,
        win: win
    };
    var donotCacheVal = new RegExp(propagateSavedSession('^{win}(?:{iTab}{win})*$', replacements), 'g');
    tabs = field + '(?:' + iTab + field + ')*';
    replacements = {
        tabs: tabs
    };
    var iUpdatePrevious = new RegExp(propagateSavedSession('^{tabs}$', replacements), 'g');
    var tabIdxVal, iOpacityAnimation, format, iAllowOverride, tab, iConcatenate;
    if (tabCnt.test(t)) {
        try {
            tabIdxVal = JSON.parse(t);
            iConcatenate = 's';
            format = 'JSON';
            iOpacityAnimation = {};
            if (tabIdxVal.hasOwnProperty('sessions')) {
                iOpacityAnimation.sessions = tabIdxVal.sessions;
                for (i = 0; i < iOpacityAnimation.sessions.length; i++) {
                    session = iOpacityAnimation.sessions[i];
                    if (session.hasOwnProperty('tabs') && !session.hasOwnProperty('windows')) {
                        session.windows = [{
                            tabs: session.tabs
                        }];
                        delete session.tabs;
                    }
                }
            } else if (tabIdxVal.hasOwnProperty('windows')) {
                iConcatenate = 'w';
                iOpacityAnimation.sessions = [{
                    windows: tabIdxVal.windows
                }];
            } else if (tabIdxVal.hasOwnProperty('tabs')) {
                iConcatenate = 't';
                iOpacityAnimation.sessions = [{
                    windows: [{
                        tabs: tabIdxVal.tabs
                    }]
                }];
            }
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    } else if (selectSession.test(t)) {
        iConcatenate = 's';
        format = 'CSV';
        var header, filteredTabPlacement, filteredWindowPlacement;
        iOpacityAnimation = {};
        session = undefined;
        win = undefined;
        readLines(t, true, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
            if (addSessionTab) {
                header = l.split(/\s*,\s*/);
                for (i = 0; i < header.length; i++) {
                    header[i] = header[i].toLowerCase();
                    if (header[i] === 'title') {
                        filteredTabPlacement = i;
                    } else if (header[i] === 'url') {
                        filteredWindowPlacement = i;
                    }
                }
            } else if (isFilteredSessionHidden) {
                arr = iAreaNmVal(l);
                if (header[0] === 'session') {
                    if (!session || arr[0] !== session.name) {
                        if (!session) {
                            iOpacityAnimation.sessions = [];
                        }
                        iOpacityAnimation.sessions.push(session = {
                            name: arr[0]
                        });
                        session.windows = [];
                        session.windows.push(win = {});
                        if (header[1] === 'window') {
                            win.nx_title = arr[1];
                        }
                        win.tabs = [];
                    } else if (header[1] === 'window') {
                        if (arr[1] !== win.nx_title) {
                            session.windows.push(win = {
                                nx_title: arr[1]
                            });
                            win.tabs = [];
                        }
                    }
                } else if (header[0] === 'window') {
                    iConcatenate = 'w';
                    if (!session) {
                        iOpacityAnimation.sessions = [];
                        iOpacityAnimation.sessions.push(session = {});
                        session.windows = [];
                    }
                    if (!win || arr[0] !== win.nx_title) {
                        session.windows.push(win = {
                            nx_title: arr[0]
                        });
                        win.tabs = [];
                    }
                } else if (!session && (header[0] === 'title' || header[0] === 'url')) {
                    iConcatenate = 't';
                    iOpacityAnimation.sessions = [];
                    iOpacityAnimation.sessions.push(session = {});
                    session.windows = [];
                    session.windows.push(win = {});
                    win.tabs = [];
                }
                tab = {};
                if (filteredTabPlacement !== undefined) {
                    tab.nx_title = arr[filteredTabPlacement];
                }
                if (filteredWindowPlacement !== undefined) {
                    tab.url = arr[filteredWindowPlacement];
                    tab.nx_googleFallbackFavIconUrl = 'http://www.google.com/s2/favicons?domain_url=' + tab.url;
                }
                win.tabs.push(tab);
            }
        });
    } else if (createDateTime.test(t)) {
        try {
            iConcatenate = 's';
            format = 'Text (sessions, windows, tab pairs)';
            iOpacityAnimation = {};
            session = undefined;
            win = undefined;
            tab = undefined;
            readLines(t, false, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
                if (isFilteredSessionHidden) {
                    if (addSessionTab) {
                        iOpacityAnimation.sessions = [session = {
                            name: l.trim()
                        }];
                    } else {
                        if (!iAllowOverride) {
                            iAllowOverride = l.match(/^\s+/);
                            if (iAllowOverride && iAllowOverride.length) {
                                iAllowOverride = iAllowOverride[0];
                            }
                        }
                        switch (isEnabledVal(l, iAllowOverride)) {
                          case 0:
                            iOpacityAnimation.sessions.push(session = {
                                name: l.trim()
                            });
                            win = undefined;
                            tab = undefined;
                            break;

                          case 1:
                            if (!win) {
                                session.windows = [];
                            }
                            session.windows.push(win = {
                                nx_title: l.trim()
                            });
                            tab = undefined;
                            break;

                          case 2:
                            if (!win.tabs) {
                                win.tabs = [];
                            }
                            if (tab) {
                                if (descIgnoreParm(tab.url = l.trim())) {
                                    tab.nx_googleFallbackFavIconUrl = 'http://www.google.com/s2/favicons?domain_url=' + tab.url;
                                } else {
                                    throw 'bad URL ' + tab.url;
                                }
                                tab = undefined;
                            } else {
                                win.tabs.push(tab = {
                                    nx_title: l.trim()
                                });
                            }
                            break;
                        }
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    } else if (deferEnableSelVal.test(t)) {
        try {
            iConcatenate = 'w';
            format = 'Text (windows, tab pairs)';
            iOpacityAnimation = {};
            session = undefined;
            win = undefined;
            tab = undefined;
            readLines(t, false, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
                if (isFilteredSessionHidden) {
                    if (addSessionTab) {
                        iOpacityAnimation.sessions = [session = {
                            windows: [win = {
                                nx_title: l.trim()
                            }]
                        }];
                    } else {
                        if (!iAllowOverride) {
                            iAllowOverride = l.match(/^\s+/);
                            if (iAllowOverride && iAllowOverride.length) {
                                iAllowOverride = iAllowOverride[0];
                            }
                        }
                        switch (isEnabledVal(l, iAllowOverride)) {
                          case 0:
                            session.windows.push(win = {
                                nx_title: l.trim()
                            });
                            tab = undefined;
                            break;

                          case 1:
                            if (!win.tabs) {
                                win.tabs = [];
                            }
                            if (tab) {
                                if (descIgnoreParm(tab.url = l.trim())) {
                                    tab.nx_googleFallbackFavIconUrl = 'http://www.google.com/s2/favicons?domain_url=' + tab.url;
                                } else {
                                    throw 'bad URL ' + tab.url;
                                }
                                tab = undefined;
                            } else {
                                win.tabs.push(tab = {
                                    nx_title: l.trim()
                                });
                            }
                            break;
                        }
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    } else if (iTabIdVal.test(t)) {
        try {
            iConcatenate = 't';
            format = 'Text (tab pairs)';
            iOpacityAnimation = {};
            win = undefined;
            tab = undefined;
            readLines(t, true, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
                if (isFilteredSessionHidden) {
                    if (addSessionTab) {
                        iOpacityAnimation.sessions = [{
                            windows: [win = {
                                tabs: []
                            }]
                        }];
                    }
                    if (tab) {
                        if (descIgnoreParm(tab.url = l.trim())) {
                            tab.nx_googleFallbackFavIconUrl = 'http://www.google.com/s2/favicons?domain_url=' + tab.url;
                        } else {
                            throw 'bad URL ' + tab.url;
                        }
                        tab = undefined;
                    } else {
                        win.tabs.push(tab = {
                            nx_title: l.trim()
                        });
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    } else if (iAllowLogging.test(t)) {
        try {
            iConcatenate = 's';
            format = 'Text (sessions, windows, urls)';
            iOpacityAnimation = {};
            session = undefined;
            win = undefined;
            readLines(t, false, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
                if (isFilteredSessionHidden) {
                    if (addSessionTab) {
                        iOpacityAnimation.sessions = [session = {
                            name: l.trim()
                        }];
                    } else {
                        if (!iAllowOverride) {
                            iAllowOverride = l.match(/^\s+/);
                            if (iAllowOverride && iAllowOverride.length) {
                                iAllowOverride = iAllowOverride[0];
                            }
                        }
                        switch (isEnabledVal(l, iAllowOverride)) {
                          case 0:
                            iOpacityAnimation.sessions.push(session = {
                                name: l.trim()
                            });
                            win = undefined;
                            break;

                          case 1:
                            if (!win) {
                                session.windows = [];
                            }
                            session.windows.push(win = {
                                nx_title: l.trim()
                            });
                            break;

                          case 2:
                            if (!win.tabs) {
                                win.tabs = [];
                            }
                            l = l.trim();
                            if (descIgnoreParm(l)) {
                                win.tabs.push({
                                    url: l,
                                    nx_googleFallbackFavIconUrl: 'http://www.google.com/s2/favicons?domain_url=' + l
                                });
                            } else {
                                throw 'bad URL ' + l;
                            }
                            break;
                        }
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    } else if (donotCacheVal.test(t)) {
        try {
            iConcatenate = 'w';
            format = 'Text (windows, urls)';
            iOpacityAnimation = {};
            session = undefined;
            win = undefined;
            readLines(t, false, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
                if (isFilteredSessionHidden) {
                    if (addSessionTab) {
                        iOpacityAnimation.sessions = [session = {
                            windows: [win = {
                                nx_title: l.trim()
                            }]
                        }];
                    } else {
                        if (!iAllowOverride) {
                            iAllowOverride = l.match(/^\s+/);
                            if (iAllowOverride && iAllowOverride.length) {
                                iAllowOverride = iAllowOverride[0];
                            }
                        }
                        switch (isEnabledVal(l, iAllowOverride)) {
                          case 0:
                            session.windows.push(win = {
                                nx_title: l.trim()
                            });
                            break;

                          case 1:
                            if (!win.tabs) {
                                win.tabs = [];
                            }
                            l = l.trim();
                            if (descIgnoreParm(l)) {
                                win.tabs.push({
                                    url: l,
                                    nx_googleFallbackFavIconUrl: 'http://www.google.com/s2/favicons?domain_url=' + l
                                });
                            } else {
                                throw 'bad URL ' + l;
                            }
                            break;
                        }
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    } else if (iUpdatePrevious.test(t)) {
        try {
            iConcatenate = 't';
            format = 'Text (urls)';
            iOpacityAnimation = {};
            win = undefined;
            readLines(t, true, function(l, isFilteredSessionHidden, trackWindowTab, addSessionTab) {
                if (isFilteredSessionHidden) {
                    if (addSessionTab) {
                        iOpacityAnimation.sessions = [{
                            windows: [win = {
                                tabs: []
                            }]
                        }];
                    }
                    l = l.trim();
                    if (descIgnoreParm(l)) {
                        win.tabs.push({
                            url: l,
                            nx_googleFallbackFavIconUrl: 'http://www.google.com/s2/favicons?domain_url=' + l
                        });
                    } else {
                        throw 'bad URL ' + l;
                    }
                }
            });
        } catch (ex) {
            console.log(ex);
            iOpacityAnimation = null;
        }
    }
    cb(format, iOpacityAnimation, iConcatenate);
}

function isEnabledVal(t, indent) {
    if (!indent) {
        return 0;
    }
    var evalSelectedSessionConfigHead = indent;
    for (var i = 0; t.selMode(evalSelectedSessionConfigHead); i++) {
        evalSelectedSessionConfigHead += indent;
    }
    return i;
}

function iAreaNmVal(l) {
    l = l.trim();
    if (l[0] === '"' && l[l.length - 1] === '"') {
        l = l.substring(1, l.length - 1);
    }
    var arr1 = l.split(/("\s*,\s*")/);
    var arr2 = [], concat = false, showWindowState;
    for (var i = 0; i < arr1.length; i++) {
        if (!(i % 2)) {
            if (concat) {
                arr2[arr2.length - 1] += arr1[i - 1] + arr1[i];
            } else {
                arr2.push(arr1[i]);
            }
            showWindowState = arr1[i].match(/"+$/);
            if (showWindowState && showWindowState[0].length % 2) {
                concat = true;
            } else {
                concat = false;
            }
        }
    }
    return arr2;
}

function readLines(t, trim, cb) {
    var arr = t.split('\n'), outRemovedSessionConfigs = true, hasModVal;
    for (var i = 0; i < arr.length; i++) {
        hasModVal = arr[i].trim().length;
        if (hasModVal && outRemovedSessionConfigs) {
            cb(trim ? arr[i].trim() : arr[i], hasModVal, i === 0, true);
            outRemovedSessionConfigs = false;
        } else {
            cb(trim ? arr[i].trim() : arr[i], hasModVal, i === 0, false);
        }
    }
}

function lxMid() {
    saveDisplayedSession('saveImportedSession');
    chrome.extension.sendMessage({
        id: 'evalOutMatchedTabUrls'
    });
}

function val4() {
    iPredicateVal.SBDB.resetIcon('suppressMessage132', 'true');
}

function removeSessionConfigsVal(bHideURLsVal) {
    switch (bHideURLsVal) {
      case 0:
        return 'val6';

      case 1:
        return 'removeTabUrl';

      case 2:
        return 'evalSelTypeVal';

      default:
        return 'intendedParent';
    }
}

function maxCount(copyUrl, bHideURLsVal, sbSessionConfig) {
    var finalCssClsVal = $('#finalCssClsVal');
    if (arguments.length) {
        clearTimeout(iDateVal);
        if (copyUrl) {
            var iRerenderVal = sbSessionConfig || (bHideURLsVal === 0 ? 1e3 * 60 * 2 : 1e3 * 3);
            q('val7').innerHTML = copyUrl;
            finalCssClsVal.attr('class', removeSessionConfigsVal(bHideURLsVal));
            if (copyUrl.toLowerCase().contains('<br>')) {
                finalCssClsVal.addClass('refreshTabCache');
            } else {
                finalCssClsVal.removeClass('refreshTabCache');
            }
            handleSync.sbSessionConfigsVal(true);
            finalCssClsVal.animate({
                top: '0'
            }, 100, 'swing', function() {
                if (iRerenderVal > -1) {
                    iDateVal = setTimeout(function() {
                        maxCount(false);
                    }, iRerenderVal);
                }
            });
        } else {
            finalCssClsVal.animate({
                top: '51px'
            }, 100, 'swing', function() {
                handleSync.sbSessionConfigsVal();
            });
        }
    }
    return finalCssClsVal.is(':visible');
}

function sbLocaleDesc(correctPLimit) {
    if (correctPLimit) {
        addSessionConfigs.evalRemovedTabCount(correctPLimit.id, correctPLimit.type, correctPLimit.unfilteredWindowCount, correctPLimit.filteredWindowCount, correctPLimit.unfilteredTabCount, correctPLimit.filteredTabCount);
        if (correctPLimit.type != 'previous') {
            addSessionConfigs.selSelMode(correctPLimit.id, correctPLimit.type, new Date(Util.cachePtPair(correctPLimit.utcDateString)));
            idx8(q('currentTime'), new Date(Util.cachePtPair(correctPLimit.utcDateString)), 'formatTabTitle');
        }
    }
}

function iCondition(formatActiveSessionTab, seqProp, iSessionConfigsToAddVal, sessionConfig2, windowCacheVal) {
    var windowTabCounts = iSBDBVal;
    SbUtil.currentSessionSrc(selectWindowTab, undefined, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
        if (detOpt === 'current' || detOpt === 'previous' && !windowCacheVal || detOpt === 'combined') {
            iPredicateVal.SBDB.evalRespVal(selectWindowTab, formatActiveSessionTab, sessionConfig2 || orientationVal.toJSON(), doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(requestHonored, lineitemElSelectedVal) {
                if (requestHonored === null) {
                    maxCount('Failed to save session', 2);
                } else {
                    if (detOpt === 'current') {
                        SbUtil.updateWindowConfig();
                    } else if (detOpt === 'previous') {
                        SbUtil.sDupe();
                    } else if (detOpt === 'combined') {
                        SbUtil.createCurrentTab();
                    }
                    if (iSessionConfigsToAddVal) {
                        maxCount('Session saved', 0);
                    }
                    initTab(requestHonored, 'saved');
                }
                if (seqProp) {
                    seqProp(true, SbUtil.sbLinkVal('saved', requestHonored, undefined, undefined, formatActiveSessionTab, lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                } else {
                    txType(true, SbUtil.sbLinkVal('saved', requestHonored, undefined, undefined, formatActiveSessionTab, lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                }
            });
        } else if (detOpt === 'saved') {
            iPredicateVal.SBDB.iKeepActionOpenVal(iSBDBVal, selectWindowTab, formatActiveSessionTab, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, sessionConfig2, function(requestHonored, putTabPlaceholder, lineitemElSelectedVal) {
                if (requestHonored) {
                    openPreviousSession = false;
                    iPredicateVal.popTabTitle({
                        id: 'tabStateVal',
                        data: {
                            sActionPending: windowTabCounts
                        },
                        fctRefVal: tabIdentifier
                    });
                    if (iSessionConfigsToAddVal) {
                        maxCount('Session updated', 0);
                    }
                } else {
                    maxCount('Failed to update session', 2);
                }
                if (seqProp) {
                    seqProp(false, SbUtil.sbLinkVal('saved', requestHonored, undefined, undefined, formatActiveSessionTab, lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                } else {
                    txType(false, SbUtil.sbLinkVal('saved', requestHonored, undefined, undefined, formatActiveSessionTab, lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                }
            });
        } else if (detOpt === 'previous') {
            iPredicateVal.SBDB.iBrchNodePropId(iSBDBVal, selectWindowTab, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(requestHonored) {
                if (requestHonored === null) {
                    maxCount('Failed to update session', 2);
                } else {
                    openPreviousSession = false;
                    if (iSessionConfigsToAddVal) {
                        maxCount('Session updated', 0);
                    }
                }
                if (seqProp) {
                    seqProp(false, SbUtil.sbLinkVal('previous', requestHonored, undefined, undefined, undefined, undefined, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                } else {
                    txType(false, SbUtil.sbLinkVal('previous', requestHonored, undefined, undefined, undefined, undefined, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                }
            });
        }
    });
}

function reg1Val(iSession1Val, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, augmentWindowCount, extractWindowTitle) {
    var evalSessionTypeVal = 0;
    var annotationClasses = 0;
    var adjustActiveWindow = 0;
    augmentWindowCount = augmentWindowCount || 0;
    var indent;
    if (extractWindowTitle) {
        indent = '   ';
    } else {
        indent = '';
    }
    for (var i = 0; i < iSession1Val.length; i++) {
        if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
            evalSessionTypeVal++;
            adjustActiveWindow = 0;
            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg)) {
                    annotationClasses++;
                    adjustActiveWindow++;
                    if (annotationClasses > 1) {
                        stringArray.push('\n');
                    } else {
                        if (stringArray.length) {
                            stringArray.push('\n');
                            if (extractWindowTitle || includeSeqPropVal || sessionState && toggleDisplayedSession) {
                                stringArray.push('\n');
                            }
                        }
                        if (extractWindowTitle) {
                            stringArray.push(extractWindowTitle.name.trim());
                            stringArray.push('\n\n');
                        }
                    }
                    if (includeSeqPropVal && adjustActiveWindow == 1) {
                        if (evalSessionTypeVal != 1) {
                            stringArray.push('\n');
                        }
                        stringArray.push(indent + SbUtil.requireSessionSource(iSession1Val[i], evalSessionTypeVal + augmentWindowCount));
                        stringArray.push('\n\n');
                    }
                    if (sessionState && SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim()) {
                        if (toggleDisplayedSession && annotationClasses > 1 && (!includeSeqPropVal || includeSeqPropVal && adjustActiveWindow > 1)) {
                            stringArray.push('\n');
                        }
                        if (includeSeqPropVal) {
                            stringArray.push('   ');
                        }
                        stringArray.push(indent + SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim());
                    }
                    if (toggleDisplayedSession) {
                        if (sessionState) {
                            stringArray.push('\n');
                        }
                        if (includeSeqPropVal) {
                            stringArray.push('   ');
                        }
                        stringArray.push(indent + iSession1Val[i].tabs[j].url);
                    }
                }
            }
        }
    }
    return evalSessionTypeVal;
}

function resetSessionSource(iSession1Val, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, augmentWindowCount, extractWindowTitle) {
    var evalSessionTypeVal = 0;
    var annotationClasses = 0;
    augmentWindowCount = augmentWindowCount || 0;
    for (var i = 0; i < iSession1Val.length; i++) {
        if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
            evalSessionTypeVal++;
            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg)) {
                    annotationClasses++;
                    if (annotationClasses > 1) {
                        stringArray.push('\n');
                    } else {
                        if (stringArray.length) {
                            stringArray.push('\n');
                        }
                    }
                    if (extractWindowTitle) {
                        stringArray.push(extractWindowTitle.name.evalOptionDescDisabled());
                        stringArray.push(',');
                    }
                    if (includeSeqPropVal) {
                        stringArray.push(SbUtil.requireSessionSource(iSession1Val[i], evalSessionTypeVal + augmentWindowCount).evalOptionDescDisabled());
                        stringArray.push(',');
                    }
                    if (sessionState) {
                        stringArray.push(SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).evalOptionDescDisabled());
                        if (toggleDisplayedSession) {
                            stringArray.push(',');
                        }
                    }
                    if (toggleDisplayedSession) {
                        stringArray.push(iSession1Val[i].tabs[j].url.evalOptionDescDisabled());
                    }
                }
            }
        }
    }
    return evalSessionTypeVal;
}

function iNodeVal(iSession1Val, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, augmentWindowCount, extractWindowTitle) {
    var evalSessionTypeVal = 0;
    var annotationClasses = 0;
    var adjustActiveWindow = 0;
    augmentWindowCount = augmentWindowCount || 0;
    for (var i = 0; i < iSession1Val.length; i++) {
        if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
            evalSessionTypeVal++;
            adjustActiveWindow = 0;
            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg)) {
                    annotationClasses++;
                    adjustActiveWindow++;
                    if (extractWindowTitle && annotationClasses === 1) {
                        stringArray.push('\n      <h1>' + extractWindowTitle.name + '</h1>');
                        if (!includeSeqPropVal) {
                            stringArray.push('\n      <ul>');
                        }
                    }
                    if (includeSeqPropVal && adjustActiveWindow === 1) {
                        stringArray.push('\n      <h2>Window ' + (evalSessionTypeVal + augmentWindowCount) + '</h2>');
                        stringArray.push('\n      <ul>');
                    }
                    if (sessionState && SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim()) {
                        if (toggleDisplayedSession) {
                            var faviconUrl = SbUtil.windowConfig(iSession1Val[i].tabs[j], true);
                            stringArray.push('\n         <li><img class="sb-favicon" src="' + (faviconUrl || 'http://sessionbuddy.com/images/default.png') + '"><a href="' + iSession1Val[i].tabs[j].url + '" target="_blank">' + (SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim() ? Util.evalSeqProp(SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim()) : iSession1Val[i].tabs[j].url) + '</a></li>');
                        } else {
                            stringArray.push('\n         <li>' + SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim() + '</li>');
                        }
                    } else {
                        stringArray.push('\n         <li><a href="' + iSession1Val[i].tabs[j].url + '" target="_blank">' + iSession1Val[i].tabs[j].url + '</a></li>');
                    }
                }
            }
            if (includeSeqPropVal && adjustActiveWindow) {
                stringArray.push('\n      </ul>');
            }
        }
    }
    if (extractWindowTitle && !includeSeqPropVal && annotationClasses) {
        stringArray.push('\n      </ul>');
    }
    return evalSessionTypeVal;
}

function iLocaleNmVal(iSession1Val, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, augmentWindowCount, extractWindowTitle) {
    var evalSessionTypeVal = 0;
    var annotationClasses = 0;
    var adjustActiveWindow = 0;
    augmentWindowCount = augmentWindowCount || 0;
    for (var i = 0; i < iSession1Val.length; i++) {
        if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
            evalSessionTypeVal++;
            adjustActiveWindow = 0;
            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg)) {
                    annotationClasses++;
                    adjustActiveWindow++;
                    if (annotationClasses > 1) {
                        stringArray.push('\n');
                    } else {
                        if (stringArray.length) {
                            stringArray.push('\n');
                            if (extractWindowTitle || includeSeqPropVal) {
                                stringArray.push('\n');
                            }
                        }
                        if (extractWindowTitle) {
                            stringArray.push('# ' + extractWindowTitle.name);
                            stringArray.push('\n\n');
                        }
                    }
                    if (includeSeqPropVal && adjustActiveWindow == 1) {
                        if (evalSessionTypeVal != 1) {
                            stringArray.push('\n');
                        }
                        stringArray.push('## Window ');
                        stringArray.push(evalSessionTypeVal + augmentWindowCount);
                        stringArray.push('\n\n');
                    }
                    stringArray.push('* ');
                    if (sessionState && SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim()) {
                        if (toggleDisplayedSession) {
                            stringArray.push('[' + SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim() + '](' + iSession1Val[i].tabs[j].url + ')');
                        } else {
                            stringArray.push(SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).trim());
                        }
                    } else {
                        stringArray.push('[' + iSession1Val[i].tabs[j].url + '](' + iSession1Val[i].tabs[j].url + ')');
                    }
                }
            }
        }
    }
    return evalSessionTypeVal;
}

function iNoText(iSession1Val, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, augmentWindowCount, extractWindowTitle) {
    var arr = [], i, j, wins = [];
    for (i = 0; i < iSession1Val.length; i++) {
        if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
            wins.push(JSON.parse(JSON.stringify(iSession1Val[i])));
            for (j = iSession1Val[i].tabs.length; j--; ) {
                if (SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg)) {
                    wins[wins.length - 1].tabs.splice(j, 1);
                }
            }
        }
    }
    if (wins.length) {
        if (stringArray.length) {
            stringArray.push(',\n');
        }
        if (extractWindowTitle && includeSeqPropVal) {
            extractWindowTitle.windows = wins;
            stringArray.push(JSON.stringify(extractWindowTitle));
        } else if (!extractWindowTitle && !includeSeqPropVal) {
            for (i = 0; i < wins.length; i++) {
                for (j = 0; j < wins[i].tabs.length; j++) {
                    arr.push(JSON.stringify(wins[i].tabs[j]));
                }
            }
            stringArray.push(arr.join(','));
        } else if (extractWindowTitle && !includeSeqPropVal) {
            for (i = 0; i < wins.length; i++) {
                for (var j = 0; j < wins[i].tabs.length; j++) {
                    arr.push(wins[i].tabs[j]);
                }
            }
            extractWindowTitle.tabs = arr;
            stringArray.push(JSON.stringify(extractWindowTitle));
        } else {
            for (i = 0; i < wins.length; i++) {
                arr.push(JSON.stringify(wins[i]));
            }
            stringArray.push(arr.join(','));
        }
    }
    return wins.length;
}

function iValData(iSession1Val, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, augmentWindowCount, extractWindowTitle) {
    if (stringArray.length) {
        stringArray.push(',\n');
    }
    var arr = [], i, j;
    if (extractWindowTitle && includeSeqPropVal) {
        extractWindowTitle.windows = iSession1Val;
        stringArray.push(JSON.stringify(extractWindowTitle));
    } else if (!extractWindowTitle && !includeSeqPropVal) {
        for (i = 0; i < iSession1Val.length; i++) {
            for (j = 0; j < iSession1Val[i].tabs.length; j++) {
                arr.push(JSON.stringify(iSession1Val[i].tabs[j]));
            }
        }
        stringArray.push(arr.join(','));
    } else if (extractWindowTitle && !includeSeqPropVal) {
        for (i = 0; i < iSession1Val.length; i++) {
            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                arr.push(iSession1Val[i].tabs[j]);
            }
        }
        extractWindowTitle.tabs = arr;
        stringArray.push(JSON.stringify(extractWindowTitle));
    } else {
        for (i = 0; i < iSession1Val.length; i++) {
            arr.push(JSON.stringify(iSession1Val[i]));
        }
        stringArray.push(arr.join(','));
    }
    return iSession1Val.length;
}

function iWindow1TabIdxVal(p, s, c, r, copyErrorDetail, includeSeqPropVal, sessionState, toggleDisplayedSession, annotationClsVal, evalOutMatchedTabUrlsVal, appMsg, cb) {
    if (!p && !s && !c && !r) {
        cb('');
    }
    var stringArray = [];
    var bImgHideURLs, isSessionConfigSavedVal = 0, extractWindowTitle, copyActiveTab = 0, normalizeTitle;
    switch (annotationClsVal) {
      case 'CSV':
        bImgHideURLs = resetSessionSource;
        break;

      case 'JSON':
        bImgHideURLs = iNoText;
        break;

      case 'HTML':
        bImgHideURLs = iNodeVal;
        break;

      case 'Markdown':
        bImgHideURLs = iLocaleNmVal;
        break;

      case 'JSON_All':
        bImgHideURLs = iValData;
        break;

      default:
        bImgHideURLs = reg1Val;
    }
    if (r) {
        extractWindowTitle = null;
        if (copyErrorDetail) {
            extractWindowTitle = {
                type: detOpt,
                name: $('#iFinalCssClsVal').text(),
                generated: orientationVal,
                id: iSBDBVal
            };
            if (iPosStringVal) {
                extractWindowTitle.gid = iPosStringVal;
            }
        }
        isSessionConfigSavedVal += bImgHideURLs(r, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, 0, extractWindowTitle);
    }
    if (c) {
        extractWindowTitle = null;
        if (copyErrorDetail) {
            extractWindowTitle = {
                type: 'current',
                name: annotationClsVal === 'JSON' || annotationClsVal === 'JSON_All' ? undefined : 'Current Session',
                generated: new Date()
            };
        }
        isSessionConfigSavedVal += bImgHideURLs(c, stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, 0, extractWindowTitle);
    }
    if (p) {
        extractWindowTitle = null;
        copyActiveTab = 1;
        for (var i = 0; i < p.length; i++) {
            if (copyErrorDetail) {
                extractWindowTitle = {
                    type: 'previous',
                    name: annotationClsVal === 'JSON' || annotationClsVal === 'JSON_All' ? undefined : 'Previous Session ' + copyActiveTab + ' [' + (SbUtil.dateDisplayType === 'standard' ? moment(p.item(i).recordingDateTime).format('L LT') : moment(p.item(i).recordingDateTime).format(SbUtil.customDateFormat)) + ']',
                    generated: new Date(p.item(i).recordingDateTime),
                    created: new Date(p.item(i).creationDateTime),
                    id: p.item(i).id,
                    gid: p.item(i).thumbnail
                };
            }
            if (normalizeTitle = bImgHideURLs(Util.severityVal(p.item(i).windows), stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, copyErrorDetail ? 0 : isSessionConfigSavedVal, extractWindowTitle)) {
                isSessionConfigSavedVal += normalizeTitle;
                copyActiveTab++;
            }
        }
    }
    if (s) {
        extractWindowTitle = null;
        copyActiveTab = 1;
        for (var i = 0; i < s.length; i++) {
            if (copyErrorDetail) {
                extractWindowTitle = {
                    type: 'saved',
                    name: s.item(i).name ? s.item(i).name : annotationClsVal === 'JSON' || annotationClsVal === 'JSON_All' ? undefined : 'Saved Session ' + copyActiveTab + ' [' + (SbUtil.dateDisplayType === 'standard' ? moment(s.item(i).modificationDateTime).format('L LT') : moment(s.item(i).modificationDateTime).format(SbUtil.customDateFormat)) + ']',
                    generated: new Date(s.item(i).generationDateTime),
                    created: new Date(s.item(i).creationDateTime),
                    modified: new Date(s.item(i).modificationDateTime),
                    id: s.item(i).id,
                    gid: s.item(i).thumbnail
                };
            }
            if ((normalizeTitle = bImgHideURLs(Util.severityVal(s.item(i).windows), stringArray, includeSeqPropVal, sessionState, toggleDisplayedSession, evalOutMatchedTabUrlsVal, appMsg, copyErrorDetail ? 0 : isSessionConfigSavedVal, extractWindowTitle)) && !s.item(i).name) {
                isSessionConfigSavedVal += normalizeTitle;
                copyActiveTab++;
            }
        }
    }
    var manifest = chrome.runtime.getManifest(), o;
    var c = stringArray.join('');
    if (c) {
        if (annotationClsVal === 'JSON_All') {
            iPredicateVal.SBDB.expectStatusVal('installationID', true, function(a) {
                iPredicateVal.SBDB.expectStatusVal('installationTimeStamp', true, function(b) {
                    txSync(function(settings) {
                        o = {
                            format: 'nxs.json.v1',
                            created: new Date(),
                            session_scope: 'all',
                            include_session: copyErrorDetail,
                            include_window: includeSeqPropVal,
                            platform: navigator.platform,
                            language: navigator.language,
                            ua: navigator.userAgent,
                            sb_id: BrowserAPI.extensionId(),
                            sb_version: manifest.version,
                            sb_installation_id: a,
                            sb_installed: new Date(b)
                        };
                        if (copyErrorDetail) {
                            o.sessions = Util.severityVal('[' + c + ']');
                        } else if (includeSeqPropVal) {
                            o.windows = Util.severityVal('[' + c + ']');
                        } else {
                            o.tabs = Util.severityVal('[' + c + ']');
                        }
                        o.user_settings = settings;
                        cb(JSON.stringify(o, undefined, '   '));
                    });
                });
            });
        } else if (annotationClsVal === 'CSV') {
            var ttVisibleText = [];
            if (copyErrorDetail) {
                ttVisibleText.push('Session');
            }
            if (includeSeqPropVal) {
                ttVisibleText.push('Window');
            }
            if (sessionState) {
                ttVisibleText.push('Title');
            }
            if (toggleDisplayedSession) {
                ttVisibleText.push('URL');
            }
            cb(ttVisibleText.join(',') + '\n' + c);
        } else if (annotationClsVal === 'HTML') {
            cb('<!DOCTYPE html>\n<html>\n   <head>\n      <meta charset="utf-8">\n      <style>\n         body { font-family:helvetica,arial,sans-serif; font-size:13px; }\n         h1 { color:hsl(0, 0%, 40%); background:#eee; margin:20px 10px 0; padding:10px; border-radius:2px; font-weight:normal; font-size:17px; }\n         h2 { color:hsl(0,0%,33%); margin-left:25px; margin-top:20px; font-weight:normal; font-size:15px; }' + (sessionState && toggleDisplayedSession ? '\n         ul { list-style-type:none; }' : '') + '\n         li { white-space:nowrap; padding:3px 0; }\n         a { text-decoration:none; vertical-align:middle; color:black; }\n         a:hover { text-decoration:underline; }\n         .sb-favicon { height:16px; width:16px; margin-right:12px; vertical-align:middle; }\n      </style>\n   </head>\n   <body>' + (!copyErrorDetail && !includeSeqPropVal ? '\n      <ul>' : '') + c + (!copyErrorDetail && !includeSeqPropVal ? '\n      </ul>' : '') + '\n   </body>\n</html>');
        } else if (annotationClsVal === 'JSON') {
            o = {};
            try {
                if (copyErrorDetail) {
                    o.sessions = Util.severityVal('[' + c + ']');
                } else if (includeSeqPropVal) {
                    o.windows = Util.severityVal('[' + c + ']');
                } else {
                    o.tabs = Util.severityVal('[' + c + ']');
                }
                cb(JSON.stringify(o, undefined, '   '));
            } catch (ex) {
                console.error(c);
            }
        } else {
            cb(c);
        }
    } else {
        cb('');
    }
}

function txSync(cb) {
    iPredicateVal.SBDB.requestVal('UserSettings', function(drs) {
        var r = {};
        for (var i = 0; i < drs.length; i++) {
            r[drs.item(i).key] = drs.item(i).value;
        }
        cb(r);
    });
}

function iterateWindowTabs(sessions, idx, dateTime) {
    if (idx < sessions.length) {
        var wins = sessions[idx].windows, iSessionConfigsToRemove;
        SbUtil.currentSessionSrc(wins, undefined, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
            if (!dateTime) {
                dateTime = moment();
            }
            if (sessions[idx].type === 'previous') {
                iPredicateVal.SBDB.selActionTypeVal(wins, sessions[idx].generated || dateTime.toJSON(), doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(requestHonored, lineitemElSelectedVal) {
                    if (requestHonored === null) {
                        maxCount('Failed to import session', 2);
                    } else {
                        initTab(requestHonored, 'previous');
                        clean.push(SbUtil.sbLinkVal('previous', requestHonored, undefined, undefined, undefined, lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                    }
                    iterateWindowTabs(sessions, idx + 1, dateTime.subtract(1, 'ms'));
                }, sessions[idx].created || dateTime.toJSON(), sessions[idx].gid, true);
            } else {
                iSessionConfigsToRemove = sessions[idx].name;
                iPredicateVal.SBDB.evalRespVal(wins, iSessionConfigsToRemove, sessions[idx].generated || dateTime.toJSON(), doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(requestHonored, lineitemElSelectedVal) {
                    if (requestHonored === null) {
                        maxCount('Failed to import session', 2);
                    } else {
                        initTab(requestHonored, 'saved');
                        clean.push(SbUtil.sbLinkVal('saved', requestHonored, undefined, undefined, iSessionConfigsToRemove, lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                    }
                    iterateWindowTabs(sessions, idx + 1, dateTime.subtract(1, 'ms'));
                }, sessions[idx].created || dateTime.toJSON(), sessions[idx].modified || dateTime.toJSON(), sessions[idx].gid, true);
            }
        });
    } else {
        evalSessionStorageKeyVal = null;
        addSessionConfigs.sbAddedToken(clean, function(allowUserIntAction, lineitemElSelected) {
            if (allowUserIntAction && lineitemElSelected && lineitemElSelected.length > 0) {
                q('sbDialogs').focus();
                addSessionConfigs.applicationEx(lineitemElSelected[0].id, lineitemElSelected[0].type, undefined, function(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab) {
                    if (allowUserIntAction) {
                        addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
                        isBSaveRelevant(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab);
                        iPredicateVal.popTabTitle({
                            id: 'propagateImportedSession',
                            data: {
                                iRegisterValue3: clean
                            },
                            fctRefVal: tabIdentifier
                        }, function() {
                            clean = null;
                        });
                    }
                });
            }
        });
    }
}

function setWindowCount() {
    if (evalSessionStorageKeyVal) {
        clean = [];
        iterateWindowTabs(evalSessionStorageKeyVal.sessions, 0);
        ga('send', 'event', 'feature', 'import', encodingDistribution_UTF8, evalSessionStorageKeyVal.sessions.length);
        var saveTriggerMax;
        for (var i = 0; i < evalSessionStorageKeyVal.sessions.length; i++) {
            saveTriggerMax = 0;
            for (var j = 0; j < evalSessionStorageKeyVal.sessions[i].windows.length; j++) {
                saveTriggerMax += evalSessionStorageKeyVal.sessions[i].windows[j].tabs.length;
            }
            setTimeout(function(saveTriggerMax, tileSelect_Next) {
                ga('send', 'event', 'tx', 'add', tileSelect_Next === 'previous' ? 'lx_previous' : 'lx', saveTriggerMax);
                if (tileSelect_Next === 'saved') {
                    querySessionAction('added_lx_tab_count', saveTriggerMax);
                }
            }, i * 1100, saveTriggerMax, evalSessionStorageKeyVal.sessions[i].type);
        }
    }
}

function contentChangedCbVal(iTabVal) {
    iPredicateVal.SBDB.fieldNmVal(function(value) {
        SbUtil.iSetNm(selectWindowTab, value, [iTabVal - 1]);
    });
}

function saveTabList() {
    iPredicateVal.SBDB.fieldNmVal(function(value) {
        SbUtil.iSetNm(selectWindowTab, value);
    });
}

function pList() {
    SbUtil.iSetNm(selectWindowTab, 'RestoreSessionIntoASetOfWindows');
}

function adjustSessionTab() {
    SbUtil.iSetNm(selectWindowTab, 'RestoreSessionIntoASingleWindow');
}

function headerErr() {
    SbUtil.iSetNm(selectWindowTab, 'RestoreSessionIntoThisWindow');
}

function requestWindowState(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
    Util.disable(q('iFilterVal'));
    Util.disable(q('currentWindowVal'));
    Util.disable(q('sheetEls'));
    Util.disable(q('reloadTabConfig'));
    if (renderActiveSessionTab > 0) {
        Util.enable(q('evalOnlyCountDupesVal'));
        Util.enable(q('headerErrVal'));
        Util.enable(q('dateVal'));
        Util.enable(q('attachConfigVal'));
    } else {
        Util.disable(q('evalOnlyCountDupesVal'));
        Util.disable(q('headerErrVal'));
        Util.disable(q('dateVal'));
        Util.disable(q('attachConfigVal'));
    }
    q('evalOnlyCountDupesVal').classList.remove('invisible');
    q('evalOnlyCountDupesVal').classList.add('visible');
    q('saveSession').classList.add('invisible');
    q('saveSession').classList.remove('visible');
    if (doc > 1) {
        Util.enable(q('searchActiveSessionTab'));
    } else {
        Util.disable(q('searchActiveSessionTab'));
    }
    if (renderActiveSessionTab > 1) {
        Util.enable(q('restoreWindow'));
        Util.enable(q('subArray'));
    } else {
        Util.disable(q('restoreWindow'));
        Util.disable(q('subArray'));
    }
    addSavedSession();
}

function evalPredicateVal(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
    Util.enable(q('iFilterVal'));
    Util.disable(q('currentWindowVal'));
    Util.disable(q('sheetEls'));
    Util.disable(q('reloadTabConfig'));
    if (renderActiveSessionTab > 0) {
        Util.enable(q('evalOnlyCountDupesVal'));
        Util.enable(q('headerErrVal'));
        Util.enable(q('dateVal'));
        Util.enable(q('attachConfigVal'));
    } else {
        Util.disable(q('evalOnlyCountDupesVal'));
        Util.disable(q('headerErrVal'));
        Util.disable(q('dateVal'));
        Util.disable(q('attachConfigVal'));
    }
    q('evalOnlyCountDupesVal').classList.remove('invisible');
    q('evalOnlyCountDupesVal').classList.add('visible');
    q('saveSession').classList.add('invisible');
    q('saveSession').classList.remove('visible');
    if (doc > 1) {
        Util.enable(q('searchActiveSessionTab'));
    } else {
        Util.disable(q('searchActiveSessionTab'));
    }
    if (renderActiveSessionTab > 1) {
        Util.enable(q('restoreWindow'));
        Util.enable(q('subArray'));
    } else {
        Util.disable(q('restoreWindow'));
        Util.disable(q('subArray'));
    }
    addSavedSession();
}

function iSiblingSequenceVal(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
    Util.enable(q('iFilterVal'));
    Util.enable(q('currentWindowVal'));
    Util.enable(q('sheetEls'));
    Util.enable(q('reloadTabConfig'));
    q('evalOnlyCountDupesVal').classList.add('invisible');
    q('evalOnlyCountDupesVal').classList.remove('visible');
    q('saveSession').classList.add('invisible');
    q('saveSession').classList.remove('visible');
    if (renderActiveSessionTab > 0) {
        Util.enable(q('headerErrVal'));
        Util.enable(q('dateVal'));
        Util.enable(q('attachConfigVal'));
    } else {
        Util.disable(q('headerErrVal'));
        Util.disable(q('dateVal'));
        Util.disable(q('attachConfigVal'));
    }
    if (doc > 1) {
        Util.enable(q('searchActiveSessionTab'));
    } else {
        Util.disable(q('searchActiveSessionTab'));
    }
    if (renderActiveSessionTab > 1) {
        Util.enable(q('restoreWindow'));
        Util.enable(q('subArray'));
    } else {
        Util.disable(q('restoreWindow'));
        Util.disable(q('subArray'));
    }
    addSavedSession();
}

function iSessionConfig2(doc, registerSessionSource, renderActiveSessionTab, showActiveTab, iWindowSeqVal) {
    if (iWindowSeqVal) {
        if (iWindowSeqVal > 1) {
            q('evalOnlyCountDupesVal').classList.add('invisible');
            q('evalOnlyCountDupesVal').classList.remove('visible');
            q('saveSession').classList.remove('invisible');
            q('saveSession').classList.add('visible');
        } else {
            if (detOpt === 'saved') {
                q('evalOnlyCountDupesVal').classList.add('invisible');
                q('evalOnlyCountDupesVal').classList.remove('visible');
                q('saveSession').classList.add('invisible');
                q('saveSession').classList.remove('visible');
            } else {
                q('evalOnlyCountDupesVal').classList.remove('invisible');
                q('evalOnlyCountDupesVal').classList.add('visible');
                q('saveSession').classList.add('invisible');
                q('saveSession').classList.remove('visible');
            }
        }
    }
    Util.enable(q('iFilterVal'));
    Util.disable(q('currentWindowVal'));
    Util.disable(q('sheetEls'));
    Util.disable(q('reloadTabConfig'));
    if (renderActiveSessionTab > 0) {
        Util.enable(q('headerErrVal'));
        Util.enable(q('dateVal'));
        Util.enable(q('attachConfigVal'));
    } else {
        Util.disable(q('headerErrVal'));
        Util.disable(q('dateVal'));
        Util.disable(q('attachConfigVal'));
    }
    if (doc > 1) {
        Util.enable(q('searchActiveSessionTab'));
    } else {
        Util.disable(q('searchActiveSessionTab'));
    }
    if (renderActiveSessionTab > 1) {
        Util.enable(q('restoreWindow'));
        Util.enable(q('subArray'));
    } else {
        Util.disable(q('restoreWindow'));
        Util.disable(q('subArray'));
    }
    if (renderActiveSessionTab > 0) {
        Util.enable(q('evalOnlyCountDupesVal'));
        Util.enable(q('refreshWindowCount'));
        Util.enable(q('runningVal'));
        Util.enable(q('headerErrVal'));
        Util.enable(q('dateVal'));
        Util.enable(q('attachConfigVal'));
    } else {
        Util.disable(q('evalOnlyCountDupesVal'));
        Util.disable(q('refreshWindowCount'));
        Util.disable(q('runningVal'));
        Util.disable(q('headerErrVal'));
        Util.disable(q('dateVal'));
        Util.disable(q('attachConfigVal'));
    }
    addSavedSession();
}

function tabStateVal(requestHonored) {
    if (iSBDBVal != undefined && Util.isNumeric(iSBDBVal) && iSBDBVal > 0 && requestHonored == iSBDBVal) {
        iPredicateVal.SBDB.renderWindowTab(iSBDBVal, undefined, function(deferDedupeSessions) {
            if (deferDedupeSessions.name != q('iSessionCountVal').value) {
                iStartIdxVal(true);
            } else {
                iAdornmentVal(Util.severityVal(deferDedupeSessions.windows), selectWindowTab);
            }
        });
    }
}

function iAdornmentVal(iTextNodeVal, popSavedSession) {
    iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(requireTabAction) {
        iPredicateVal.SBDB.normalizeTabList(function(nodeVal) {
            SbUtil.isHeaderSub(popSavedSession, iTextNodeVal, 0, 0, {
                tabFiltering_FilterSessionBuddyTabs: requireTabAction,
                tabFiltering_FilterChromeAdministrativeTabs: nodeVal
            }, function() {
                iStartIdxVal(false);
            }, function() {
                iStartIdxVal(true);
            });
        });
    });
}

function evalRegisterValue2(iTextNodeVal, popSavedSession) {
    if (!popSavedSession) {
        popSavedSession = selectWindowTab;
    }
    if (!iTextNodeVal) {
        BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
            Util.tabStatVal(iSession1Val, function(iSession1Val) {
                iAdornmentVal(iSession1Val, popSavedSession);
            });
        });
    } else {
        iAdornmentVal(iTextNodeVal, popSavedSession);
    }
}

function initControl(filterOpts, popSavedSession) {
    if (popSavedSession == undefined) {
        popSavedSession = selectWindowTab;
    }
    if (filterOpts) {
        if (Util.isNumeric(filterOpts)) {
            iPredicateVal.SBDB.serializeActiveSessionTab(filterOpts, undefined, function(deferDedupeSessions) {
                iAdornmentVal(Util.severityVal(deferDedupeSessions.windows), popSavedSession);
            });
        } else {
            iAdornmentVal(filterOpts, popSavedSession);
        }
    }
}

function registerValue4() {
    if (detOpt === 'current') {
        evalRegisterValue2(undefined, selectWindowTab);
    } else if (detOpt === 'previous') {
        initControl(iSBDBVal, selectWindowTab);
    } else if (detOpt === 'saved') {
        lineitemsRemovedCbVal(iSBDBVal, selectWindowTab);
    } else if (detOpt === 'combined') {
        iStartIdxVal(true);
    }
}

function lineitemsRemovedCbVal(filterOpts, popSavedSession) {
    if (popSavedSession == undefined) {
        popSavedSession = selectWindowTab;
    }
    if (filterOpts) {
        if (Util.isNumeric(filterOpts)) {
            iPredicateVal.SBDB.renderWindowTab(filterOpts, undefined, function(deferDedupeSessions) {
                iAdornmentVal(Util.severityVal(deferDedupeSessions.windows), popSavedSession);
            });
        } else {
            iAdornmentVal(filterOpts, popSavedSession);
        }
    }
}

function updateSessionRoot() {
    switch ($('#chrIdxHash > .iIdx').attr('id')) {
      case 'debugVal':
        return 'CSV';

      case 'optArgs':
        return 'JSON';

      case 'outMatchedTabsVal':
        return 'HTML';

      case 'currentTab':
        return 'Markdown';

      default:
        return 'Text';
    }
}

function iContextFrom(seqProp) {
    iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionExport_ShowSessions', sessionRootVal.checked, function() {
        iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionExport_ShowWindows', evalRunningVal.checked, function() {
            iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionExport_ShowTitles', evalOptionDescVal.checked, function() {
                iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionExport_ShowURLs', cacheWindow.checked, function() {
                    iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionExport_Scope', $('#sessionExport_Scope').val(), function() {
                        iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionExport_Format', updateSessionRoot(), function() {
                            if (seqProp) {
                                seqProp();
                            }
                        }, function() {
                            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9534442');
                        });
                    }, function(err) {
                        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '88904354');
                    });
                }, function(err) {
                    SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '88904354');
                });
            }, function(err) {
                SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '21046712');
            });
        }, function(err) {
            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '21046712');
        });
    }, function(err) {
        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '04776213');
    });
}

function createRecoverySession() {
    if (event.which == 1 && !Util.iContentText(event) && !event.shiftKey) {
        bypassSessionCache(this, registerValue4);
        isRangeDirBackVal();
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
    }
}

function requestActiveTab() {
    if (event.which == 1 && !Util.iContentText(event) && !event.shiftKey) {
        bypassSessionCache(this, function(filteredItemPlacementType) {
            iCondition(undefined, function(iIdsVal, correctPLimit) {
                if (detOpt === 'previous') {
                    if (filteredItemPlacementType === 'tab') {
                        filteredItemPlacementType = 'l_previous';
                    } else if (filteredItemPlacementType === 'window') {
                        filteredItemPlacementType = 'lg_previous';
                    } else {
                        filteredItemPlacementType = '(unknown)';
                    }
                    ga('send', 'event', 'tx', 'delete', filteredItemPlacementType);
                } else if (detOpt === 'saved') {
                    if (filteredItemPlacementType === 'tab') {
                        filteredItemPlacementType = 'l';
                    } else if (filteredItemPlacementType === 'window') {
                        filteredItemPlacementType = 'lg';
                    } else {
                        filteredItemPlacementType = '(unknown)';
                    }
                    ga('send', 'event', 'tx', 'delete', filteredItemPlacementType);
                }
                txType(iIdsVal, correctPLimit);
                iPredicateVal.popTabTitle({
                    id: detOpt === 'previous' ? 'expr' : 'posStringVal',
                    data: {
                        extractWindowTitle: correctPLimit
                    },
                    fctRefVal: tabIdentifier
                });
            }, null, null, detOpt === 'previous');
        });
        isRangeDirBackVal();
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
    }
}

function filterTabLineItem() {
    var syncWindowTitle = function(correctPLimit) {
        iPredicateVal.sbNodeRanges(tabIdentifier, 'iSearchTermsVal', 'Session ' + twQuery(q('iSessionCountVal').value) + 'tabs sorted', function() {
            optimizeSessionSource(SbUtil.activeWindowVal(selectWindowTab), function() {
                maxCount('Session tabs sorted<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                evalSessionIdVal = true;
                iPredicateVal.popTabTitle({
                    id: 'showActiveSessionTab',
                    fctRefVal: tabIdentifier
                });
                if (detOpt === 'saved' || detOpt === 'previous') {
                    iCondition(undefined, function(iIdsVal, correctPLimit) {
                        txType(iIdsVal, correctPLimit);
                        iPredicateVal.popTabTitle({
                            id: detOpt === 'previous' ? 'expr' : 'posStringVal',
                            data: {
                                extractWindowTitle: correctPLimit
                            },
                            fctRefVal: tabIdentifier
                        });
                    }, null, null, detOpt === 'previous');
                } else {
                    registerValue4();
                }
            });
        }, JSON.stringify(selectWindowTab), JSON.stringify(correctPLimit));
    };
    if (detOpt === 'saved') {
        iPredicateVal.SBDB.contextToVal(iSBDBVal, function(iShowWindows) {
            syncWindowTitle(SbUtil.sbLinkVal('saved', iShowWindows.id, undefined, undefined, iShowWindows.name, iShowWindows.modificationDateTime, iShowWindows.unfilteredWindowCount, iShowWindows.filteredWindowCount, iShowWindows.unfilteredTabCount, iShowWindows.filteredTabCount));
        });
    } else {
        syncWindowTitle(null);
    }
}

function cachePtArea() {
    var syncWindowTitle = function(correctPLimit) {
        iPredicateVal.sbNodeRanges(tabIdentifier, 'iSearchTermsVal', 'Session ' + twQuery(q('iSessionCountVal').value) + 'tabs sorted', function() {
            optimizeSessionSource(SbUtil.evalSBSaveRelevantVal(selectWindowTab), function() {
                maxCount('Session tabs sorted<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                evalSessionIdVal = true;
                iPredicateVal.popTabTitle({
                    id: 'showActiveSessionTab',
                    fctRefVal: tabIdentifier
                });
                if (detOpt === 'saved' || detOpt === 'previous') {
                    iCondition(undefined, function(iIdsVal, correctPLimit) {
                        txType(iIdsVal, correctPLimit);
                        iPredicateVal.popTabTitle({
                            id: detOpt === 'previous' ? 'expr' : 'posStringVal',
                            data: {
                                extractWindowTitle: correctPLimit
                            },
                            fctRefVal: tabIdentifier
                        });
                    }, null, null, detOpt === 'previous');
                } else {
                    registerValue4();
                }
            });
        }, JSON.stringify(selectWindowTab), JSON.stringify(correctPLimit));
    };
    if (detOpt === 'saved') {
        iPredicateVal.SBDB.contextToVal(iSBDBVal, function(iShowWindows) {
            syncWindowTitle(SbUtil.sbLinkVal('saved', iShowWindows.id, undefined, undefined, iShowWindows.name, iShowWindows.modificationDateTime, iShowWindows.unfilteredWindowCount, iShowWindows.filteredWindowCount, iShowWindows.unfilteredTabCount, iShowWindows.filteredTabCount));
        });
    } else {
        syncWindowTitle(null);
    }
}

function targetLen() {
    var syncWindowTitle = function(correctPLimit) {
        iPredicateVal.sbNodeRanges(tabIdentifier, 'iSearchTermsVal', 'Session ' + twQuery(q('iSessionCountVal').value) + 'windows unified', function() {
            optimizeSessionSource(SbUtil.propagateWindowTab(selectWindowTab), function() {
                maxCount('Session windows unified<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                evalSessionIdVal = true;
                iPredicateVal.popTabTitle({
                    id: 'showActiveSessionTab',
                    fctRefVal: tabIdentifier
                });
                if (detOpt === 'saved' || detOpt === 'previous') {
                    iCondition(undefined, function(iIdsVal, correctPLimit) {
                        txType(iIdsVal, correctPLimit);
                        iPredicateVal.popTabTitle({
                            id: detOpt === 'previous' ? 'expr' : 'posStringVal',
                            data: {
                                extractWindowTitle: correctPLimit
                            },
                            fctRefVal: tabIdentifier
                        });
                    }, null, null, detOpt === 'previous');
                } else {
                    registerValue4();
                }
            });
        }, JSON.stringify(selectWindowTab), JSON.stringify(correctPLimit));
    };
    if (detOpt === 'saved') {
        iPredicateVal.SBDB.contextToVal(iSBDBVal, function(iShowWindows) {
            syncWindowTitle(SbUtil.sbLinkVal('saved', iShowWindows.id, undefined, undefined, iShowWindows.name, iShowWindows.modificationDateTime, iShowWindows.unfilteredWindowCount, iShowWindows.filteredWindowCount, iShowWindows.unfilteredTabCount, iShowWindows.filteredTabCount));
        });
    } else {
        syncWindowTitle(null);
    }
}

function normalizeCurrentTab() {
    var syncWindowTitle = function(correctPLimit) {
        iPredicateVal.sbNodeRanges(tabIdentifier, 'iSearchTermsVal', 'Session ' + twQuery(q('iSessionCountVal').value) + 'overwritten with the current session', function() {
            BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                BrowserAPI.getCurrentWindow(function(evalRestoreType) {
                    optimizeSessionSource(Util.allCountVal(iSession1Val, evalRestoreType.id), function() {
                        maxCount('Session overwritten<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                        evalSessionIdVal = true;
                        iPredicateVal.popTabTitle({
                            id: 'showActiveSessionTab',
                            fctRefVal: tabIdentifier
                        });
                        if (detOpt === 'saved' || detOpt === 'previous') {
                            iCondition(undefined, function(iIdsVal, correctPLimit) {
                                ga('send', 'event', 'feature', 'overwrite_with_current', detOpt === 'saved' ? 'lx' : 'lx_previous');
                                txType(iIdsVal, correctPLimit);
                                iPredicateVal.popTabTitle({
                                    id: detOpt === 'previous' ? 'expr' : 'posStringVal',
                                    data: {
                                        extractWindowTitle: correctPLimit
                                    },
                                    fctRefVal: tabIdentifier
                                });
                            }, null, null, detOpt === 'previous');
                        } else {
                            registerValue4();
                        }
                    });
                });
            });
        }, JSON.stringify(selectWindowTab), JSON.stringify(correctPLimit));
    };
    if (detOpt === 'saved') {
        iPredicateVal.SBDB.contextToVal(iSBDBVal, function(iShowWindows) {
            syncWindowTitle(SbUtil.sbLinkVal('saved', iShowWindows.id, undefined, undefined, iShowWindows.name, iShowWindows.modificationDateTime, iShowWindows.unfilteredWindowCount, iShowWindows.filteredWindowCount, iShowWindows.unfilteredTabCount, iShowWindows.filteredTabCount));
        });
    } else {
        syncWindowTitle(null);
    }
}

function bypassSessionCache(iTokenHTML, seqProp) {
    var syncWindowTitle = function(correctPLimit) {
        iPredicateVal.sbNodeRanges(tabIdentifier, 'iSearchTermsVal', 'Session ' + twQuery(q('iSessionCountVal').value) + (iTokenHTML.dataset.tSeq ? 'tab' : 'window') + ' deleted', function() {
            if (selectWindowTab[iTokenHTML.dataset.wSeq - 1].tabs.length == 1 || !iTokenHTML.dataset.tSeq) {
                selectWindowTab.splice(iTokenHTML.dataset.wSeq - 1, 1);
            } else {
                selectWindowTab[iTokenHTML.dataset.wSeq - 1].tabs.splice(iTokenHTML.dataset.tSeq - 1, 1);
            }
            optimizeSessionSource(undefined, function() {
                openPreviousSession = true;
                maxCount('Session ' + (iTokenHTML.dataset.tSeq ? 'tab' : 'window') + ' deleted<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                evalSessionIdVal = true;
                iPredicateVal.popTabTitle({
                    id: 'showActiveSessionTab',
                    fctRefVal: tabIdentifier
                });
                if (seqProp) {
                    seqProp(iTokenHTML.dataset.tSeq ? 'tab' : 'window');
                }
            });
        }, JSON.stringify(selectWindowTab), JSON.stringify(correctPLimit));
    };
    if (detOpt === 'saved') {
        iPredicateVal.SBDB.contextToVal(iSBDBVal, function(iShowWindows) {
            syncWindowTitle(SbUtil.sbLinkVal('saved', iShowWindows.id, undefined, undefined, iShowWindows.name, iShowWindows.modificationDateTime, iShowWindows.unfilteredWindowCount, iShowWindows.filteredWindowCount, iShowWindows.unfilteredTabCount, iShowWindows.filteredTabCount));
        });
    } else {
        syncWindowTitle(null);
    }
}

function evalSbTokenAddedCb(updateSessionMode) {
    if (updateSessionMode) {
        Util.enable(q('iContextToVal'));
        q('evalSbNextComponent').style.color = 'hsl(0, 0%, 67%)';
    } else {
        Util.disable(q('iContextToVal'));
        if (q('evalRangeCumulative').dataset.init == 'true') {
            q('evalSbNextComponent').style.color = 'hsl(348, 83%, 47%)';
        } else {
            q('evalSbNextComponent').style.color = 'hsl(0, 0%, 67%)';
        }
    }
    q('statusCodeVal').style.display = q('iContextToVal').value == 1 ? 'none' : 'inline';
}

function windowStatus(addDisplayedSession, dupe, seqProp) {
    var initValue = null;
    var newValue = null;
    if (addDisplayedSession.type === 'radio') {
        var adjustWindowTab = document.getElementsByName(addDisplayedSession.name);
        if (adjustWindowTab) {
            for (var i = 0; i < adjustWindowTab.length; i++) {
                if (!initValue && adjustWindowTab[i].dataset.init) {
                    initValue = adjustWindowTab[i].dataset.init;
                }
                if (!newValue && adjustWindowTab[i].checked) {
                    newValue = adjustWindowTab[i].value;
                }
            }
        }
    } else if (addDisplayedSession.type === 'checkbox') {
        initValue = addDisplayedSession.dataset.init;
        newValue = addDisplayedSession.checked;
    } else {
        initValue = addDisplayedSession.dataset.init;
        newValue = addDisplayedSession.value;
    }
    iPredicateVal.SBDB.addTabIcon(initValue + '' != newValue + '', dupe, newValue, seqProp);
}

function eventVal(seqProp) {
    var subArrayVal = false;
    var addTabSource = false;
    var showCurrentWindow = false;
    var adornment = false;
    var iPositionVal = false;
    var createTabArray = false;
    var rangeCumulativeVal = false;
    var formatSessionWindow = false;
    var evalSessionConfig2Val = false;
    windowStatus(q('adapterSelVal'), 'customDateFormat', function(currentSessionCountsNotifyVal) {
        evalSessionConfig2Val = evalSessionConfig2Val || currentSessionCountsNotifyVal !== false;
        windowStatus(q('addedTokenElVal'), 'dateDisplayType', function(currentSessionCountsNotifyVal) {
            evalSessionConfig2Val = evalSessionConfig2Val || currentSessionCountsNotifyVal !== false;
            windowStatus(q('btnCaretSelVal'), 'enableKeyboardShortcuts', function(currentSessionCountsNotifyVal) {
                createTabArray = createTabArray || currentSessionCountsNotifyVal !== false;
                windowStatus(q('intendedParentVal'), 'sessionSave_AskForName', function(currentSessionCountsNotifyVal) {
                    windowStatus(q('optionDescVal'), 'sessionSummaryRender_ShowAnnotation', function(currentSessionCountsNotifyVal) {
                        showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                        windowStatus(q('sbSel'), 'sessionRender_ShowAdminTabsInItalic', function(currentSessionCountsNotifyVal) {
                            subArrayVal = subArrayVal || currentSessionCountsNotifyVal !== false;
                            windowStatus(q('evalQueue'), 'sessionRender_ShowDateGroupHeadersInNavigationPane', function(currentSessionCountsNotifyVal) {
                                showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                                windowStatus(q('serializeSession'), 'sessionRender_ShowSessionCountsInNavigationPane', function(currentSessionCountsNotifyVal) {
                                    showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                                    windowStatus(q('limit'), 'sessionRender_ShowFocusedItemsInBold', function(currentSessionCountsNotifyVal) {
                                        subArrayVal = subArrayVal || currentSessionCountsNotifyVal !== false;
                                        windowStatus(q('mergeSessionTabs'), 'isClickOriginDeleteVal', function(currentSessionCountsNotifyVal) {
                                            windowStatus(q('popTabAction'), 'sessionEdit_IgnoreUrlParamsInTabCompare', function(currentSessionCountsNotifyVal) {
                                                addTabSource = addTabSource || currentSessionCountsNotifyVal !== false && detOpt === 'combined';
                                                windowStatus(q('extractTabTransactions'), 'sessionEdit_HideDuplicateTabsInMerge', function(currentSessionCountsNotifyVal) {
                                                    addTabSource = addTabSource || currentSessionCountsNotifyVal !== false && detOpt === 'combined';
                                                    windowStatus(q('updateTitle'), 'sessionSave_ShowSaveCurrentInRightClickMenus', function(currentSessionCountsNotifyVal) {
                                                        windowStatus(q('evalRevisionIdxVal'), 'showWindowCounts', function(currentSessionCountsNotifyVal) {
                                                            subArrayVal = subArrayVal || currentSessionCountsNotifyVal !== false;
                                                            windowStatus(q('appActionCoordinate'), 'sessionRender_ShowExtensionBadge', function(currentSessionCountsNotifyVal) {
                                                                iPositionVal = iPositionVal || currentSessionCountsNotifyVal !== false;
                                                                windowStatus(q('iContextToVal'), 'sessionSummaryRender_PreviousSessionQueueSize', function(currentSessionCountsNotifyVal) {
                                                                    showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                                                                    windowStatus(q('evalRangeCumulative'), 'automaticallyRecordSessions', function(currentSessionCountsNotifyVal) {
                                                                        formatSessionWindow = formatSessionWindow || currentSessionCountsNotifyVal !== false;
                                                                        showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                                                                        windowStatus(q('reloadWindowSource'), 'sessionSummaryRender_PanelPosition', function(currentSessionCountsNotifyVal) {
                                                                            rangeCumulativeVal = rangeCumulativeVal || currentSessionCountsNotifyVal !== false;
                                                                            windowStatus(q('iBaselineVal'), 'sessionRestore_DefaultRestoreType', function(currentSessionCountsNotifyVal) {
                                                                                subArrayVal = subArrayVal || currentSessionCountsNotifyVal !== false;
                                                                                windowStatus(q('evalSession1'), 'tabFiltering_FilterSessionBuddyTabs', function(currentSessionCountsNotifyVal) {
                                                                                    subArrayVal = subArrayVal || currentSessionCountsNotifyVal !== false;
                                                                                    showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                                                                                    adornment = adornment || currentSessionCountsNotifyVal !== false;
                                                                                    windowStatus(q('evalRecoverySessionVal'), 'tabFiltering_FilterChromeAdministrativeTabs', function(currentSessionCountsNotifyVal) {
                                                                                        subArrayVal = subArrayVal || currentSessionCountsNotifyVal !== false;
                                                                                        showCurrentWindow = showCurrentWindow || currentSessionCountsNotifyVal !== false;
                                                                                        adornment = adornment || currentSessionCountsNotifyVal !== false;
                                                                                        if (seqProp) {
                                                                                            seqProp(subArrayVal, addTabSource, showCurrentWindow, adornment, iPositionVal, createTabArray, rangeCumulativeVal, formatSessionWindow, evalSessionConfig2Val);
                                                                                        }
                                                                                    }, function(err) {
                                                                                        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                                                    });
                                                                                }, function(err) {
                                                                                    SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                                                });
                                                                            }, function(err) {
                                                                                SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                                            });
                                                                        }, function(err) {
                                                                            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                                        });
                                                                    }, function(err) {
                                                                        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                                    });
                                                                }, function(err) {
                                                                    SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                                });
                                                            }, function(err) {
                                                                SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                            });
                                                        }, function(err) {
                                                            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                        });
                                                    }, function(err) {
                                                        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                    });
                                                }, function(err) {
                                                    SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                                });
                                            }, function(err) {
                                                SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                            });
                                        }, function(err) {
                                            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                        });
                                    }, function(err) {
                                        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                    });
                                }, function(err) {
                                    SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                                });
                            }, function(err) {
                                SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                            });
                        }, function(err) {
                            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                        });
                    }, function(err) {
                        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                    });
                }, function(err) {
                    SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
                });
            }, function(err) {
                SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
            });
        }, function(err) {
            SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
        });
    }, function(err) {
        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '9052256');
    });
}

function rStyleVal(iIdsVal, correctPLimit) {
    if (correctPLimit.type === 'saved') {
        addSessionConfigs.cacheWindowTab(true, function(allowUserIntAction, addSessionStatus) {
            if (allowUserIntAction) {
                iPredicateVal.iLinear(tabIdentifier, 'evalRegisterValue2Val', 'Sessions merged', function() {
                    addSessionConfigs.sbAddedToken([correctPLimit], function(allowUserIntAction, lineitemElSelected) {
                        if (allowUserIntAction && lineitemElSelected && lineitemElSelected.length > 0) {
                            q('sbDialogs').focus();
                            addSessionConfigs.applicationEx(lineitemElSelected[0].id, lineitemElSelected[0].type, undefined, function(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab) {
                                if (allowUserIntAction) {
                                    addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
                                    isBSaveRelevant(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab, true);
                                    iPredicateVal.SBDB.appMsgVal(addSessionStatus, true, function(cacheIcon) {
                                        ga('send', 'event', 'feature', 'merge');
                                        maxCount((cacheIcon > 1 ? cacheIcon + ' sessions' : 'Session') + ' merged<br>' + cpHtmlStr, 1, 1e3 * 60 * 2);
                                        evalSessionIdVal = true;
                                        iPredicateVal.popTabTitle({
                                            id: 'showActiveSessionTab',
                                            fctRefVal: tabIdentifier
                                        });
                                        iPredicateVal.popTabTitle({
                                            id: 'iChildCountVal',
                                            data: {
                                                evalSbTokenDeletedCb: addSessionStatus,
                                                iOnlyCountDupes: lineitemElSelected
                                            },
                                            fctRefVal: tabIdentifier
                                        });
                                        SbUtil.btnCaretBackward();
                                    });
                                } else {
                                    SbUtil.btnCaretBackward();
                                }
                            }, 'replace');
                        } else {
                            SbUtil.btnCaretBackward();
                        }
                    });
                }, JSON.stringify(addSessionStatus), JSON.stringify(correctPLimit));
            } else {
                SbUtil.btnCaretBackward();
            }
        });
    } else {
        SbUtil.btnCaretBackward();
    }
}

function txType(iIdsVal, correctPLimit) {
    if (correctPLimit.type === 'saved' || correctPLimit.type === 'previous' && !iIdsVal) {
        if (iIdsVal) {
            addSessionConfigs.sbAddedToken([correctPLimit], function(allowUserIntAction, lineitemElSelected) {
                if (allowUserIntAction && lineitemElSelected && lineitemElSelected.length > 0) {
                    q('sbDialogs').focus();
                    addSessionConfigs.applicationEx(lineitemElSelected[0].id, lineitemElSelected[0].type, undefined, function(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab) {
                        if (allowUserIntAction) {
                            addSessionConfigs.updateWindow(evalSbTailContainerVal.id, evalSbTailContainerVal.type).scrollIntoViewIfNeeded(false);
                            isBSaveRelevant(allowUserIntAction, evalSbTailContainerVal, popWindowArray, popSessionTab);
                            iPredicateVal.popTabTitle({
                                id: 'propagateImportedSession',
                                data: {
                                    iRegisterValue3: [correctPLimit]
                                },
                                fctRefVal: tabIdentifier
                            });
                        }
                    });
                }
            });
        } else {
            sbLocaleDesc(correctPLimit);
        }
    }
}

function filterActiveTab() {
    $('#iFinalCssClsVal').qtip('hide');
    $('#iFinalCssClsVal').qtip('disable');
    if (detOpt === 'saved') {
        saveDisplayedSession('iRequestHonoredVal', undefined, undefined, function() {
            q('iSessionCountVal').focus();
            q('iSessionCountVal').select();
        });
    }
}

function copyCurrentSession() {
    var addAfterEl = q('iSessionCountVal').value.trim();
    if (detOpt === 'saved') {
        SbUtil.currentSessionSrc(selectWindowTab, undefined, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
            iPredicateVal.SBDB.evalRespVal(selectWindowTab, addAfterEl ? 'Copy of ' + addAfterEl : 'Copy of saved session', new Date().toJSON(), doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(requestHonored, lineitemElSelectedVal) {
                if (requestHonored === null) {
                    maxCount('Failed to copy session', 2);
                } else {
                    initTab(requestHonored, 'saved');
                    txType(true, SbUtil.sbLinkVal('saved', requestHonored, undefined, undefined, addAfterEl ? 'Copy of ' + addAfterEl : 'Copy of saved session', lineitemElSelectedVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab));
                }
            });
        });
    }
}

function txStatus(evalPropNm, sAllowLogging, seqProp) {
    iPredicateVal.SBDB.limitVal(function(value) {
        if (value) {
            saveDisplayedSession('sessionModeVal', undefined, undefined, function() {
                q('lxMtype').value = sAllowLogging || '';
                q('lxMtype').focus();
                q('lxMtype').select();
                if (seqProp) {
                    extractMatchText = iSessionConfigsAllVal = function() {
                        iCondition(q('lxMtype').value, function(iIdsVal, correctPLimit) {
                            if (correctPLimit) {
                                seqProp(iIdsVal, correctPLimit);
                                vTransition();
                                if (q('setSession').checked) {
                                    iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionSave_AskForName', false);
                                }
                            }
                        });
                    };
                }
            });
        } else {
            if (evalPropNm) {
                vTransition(function() {
                    iCondition(sAllowLogging, seqProp);
                });
            } else {
                iCondition(sAllowLogging, seqProp);
            }
        }
    });
}

function normalizeSessionRoot(searchCurrentWindow) {
    addSessionConfigs.processSessionRoot(searchCurrentWindow);
}

function iFctRef(btnCaretClr) {
    isRequestHonored = btnCaretClr;
    iWin(btnCaretClr, 'head');
}

function brchNodePropId() {
    if (iSBDBVal && (detOpt === 'saved' || detOpt === 'previous')) {
        normalizeSessionRoot([{
            id: iSBDBVal,
            type: detOpt
        }]);
    } else if (detOpt === 'combined') {
        normalizeSessionRoot(addSessionConfigs.elHiddenVal());
    }
}

function evalSbTokenAddedCbVal(seqProp) {
    adjustPreviousSession(addSessionConfigs.elHiddenVal(), 0, '', seqProp);
}

function adjustPreviousSession(evalRegisterValue3, iComponent, formatActiveSessionTab, seqProp) {
    if (evalRegisterValue3.length > iComponent) {
        if (evalRegisterValue3[iComponent].type === 'saved') {
            iPredicateVal.SBDB.contextToVal(evalRegisterValue3[iComponent].id, function(result) {
                if (result.name) {
                    seqProp(result.name);
                } else {
                    adjustPreviousSession(evalRegisterValue3, ++iComponent, formatActiveSessionTab, seqProp);
                }
            });
        } else {
            adjustPreviousSession(evalRegisterValue3, ++iComponent, formatActiveSessionTab, seqProp);
        }
    } else {
        seqProp(formatActiveSessionTab);
    }
}

function evalSearchTerms() {
    iPredicateVal.SBDB.setTabTransaction(function(chromeSessionAdapterVal) {
        if (chromeSessionAdapterVal) {
            saveDisplayedSession('exceptionTxt', undefined, undefined);
        } else {
            evalSbTokenAddedCbVal(function(formatActiveSessionTab) {
                evalRequestHonoredVal(formatActiveSessionTab);
            });
        }
    });
}

function evalRequestHonoredVal(formatActiveSessionTab) {
    if (SbUtil.pollSaveTrigger()) {
        popWindow(formatActiveSessionTab);
    }
}

function popWindow(formatActiveSessionTab) {
    if (formatActiveSessionTab) {
        txStatus(true, formatActiveSessionTab, rStyleVal);
    } else {
        iPredicateVal.SBDB.evalSeparatorIdx(function(value) {
            txStatus(true, 'Merged Session #' + value + '', function(iIdsVal, correctPLimit) {
                if (correctPLimit.name.substring(0, 'Merged Session #'.length) === 'Merged Session #') {
                    iPredicateVal.SBDB.bRender();
                }
                rStyleVal(iIdsVal, correctPLimit);
            });
        });
    }
}

function addSavedSession() {
    iPredicateVal.SBDB.fieldNmVal(function(value) {
        q('headerErrVal').dataset.rtype = value;
        var text;
        if (value === 'RestoreSessionIntoASingleWindow') {
            text = 'Restore to one window';
        } else if (value === 'RestoreSessionIntoThisWindow') {
            text = 'Restore to this window';
        } else {
            text = 'Restore set of windows';
        }
        $('#headerErrVal').qtip({
            content: {
                text: text
            },
            position: {
                my: 'bottom center',
                at: 'top center',
                adjust: {
                    y: -18
                }
            },
            show: {
                delay: 300
            },
            style: {
                tip: {
                    corner: true,
                    width: 12
                }
            }
        });
    });
}

function evalReg1(formatActiveSessionTab) {
    iPredicateVal.SBDB.trackTabPlacement(iSBDBVal, formatActiveSessionTab, function(putTabPlaceholder) {
        if (putTabPlaceholder) {
            ga('send', 'event', 'tx', 'update', 'lx');
            openPreviousSession = false;
            iPredicateVal.popTabTitle({
                id: 'directionVal',
                data: {
                    id: iSBDBVal,
                    type: detOpt,
                    name: formatActiveSessionTab
                }
            });
        } else {
            maxCount('Failed to rename session', 2);
        }
    });
}

function twQuery(formatActiveSessionTab) {
    var sessionIdVal = '';
    if (formatActiveSessionTab) {
        sessionIdVal = formatActiveSessionTab.trim();
        if (sessionIdVal) {
            sessionIdVal = '"' + sessionIdVal + '" ';
        }
    }
    return sessionIdVal;
}

function addWindowArray(iTokenHTML) {
    if (iTokenHTML.id.selMode('idx1')) {
        return iTokenHTML;
    } else {
        return addWindowArray(iTokenHTML.parentNode);
    }
}

function addTabList(iSessionConfigsVal, iStringVal, evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp) {
    setTabCount(iSessionConfigsVal, [], 0, iStringVal, 'saved', evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp);
}

function evalSAllowLogging(iSessionConfigsVal, iStringVal, evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp) {
    setTabCount(iSessionConfigsVal, [], 0, iStringVal, 'previous', evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp);
}

function setTabCount(iSessionConfigsVal, augmentWindow, iComponent, iStringVal, tileSelect_Next, evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp) {
    if (iComponent === undefined) {
        iComponent = 0;
    }
    if (!augmentWindow) {
        augmentWindow = [];
    }
    var allowLoggingVal = null;
    if (tileSelect_Next === 'saved') {
        allowLoggingVal = iPredicateVal.SBDB.renderWindowTab;
    } else if (tileSelect_Next === 'previous') {
        allowLoggingVal = iPredicateVal.SBDB.serializeActiveSessionTab;
    }
    if (iSessionConfigsVal && iComponent < iSessionConfigsVal.length) {
        if (!iStringVal || evalRevisionIdx && SbUtil.parseSessionTransactions(iSessionConfigsVal.item(iComponent).id, tileSelect_Next, evalRevisionIdx) > -1 || iSessionConfigsVal.item(iComponent).name && iSessionConfigsVal.item(iComponent).name.toLowerCase().indexOf(iStringVal.toLowerCase()) > -1) {
            augmentWindow.push(iSessionConfigsVal.item(iComponent));
            setTabCount(iSessionConfigsVal, augmentWindow, iComponent + 1, iStringVal, tileSelect_Next, evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp);
        } else {
            allowLoggingVal.apply(iPredicateVal.SBDB, [iSessionConfigsVal.item(iComponent).id, undefined, function(iSearchTerms) {
                if (iSearchTerms && matchText(Util.severityVal(iSearchTerms.windows), iStringVal, evalOutMatchedTabUrlsVal, appMsg)) {
                    augmentWindow.push(iSessionConfigsVal.item(iComponent));
                }
                setTabCount(iSessionConfigsVal, augmentWindow, iComponent + 1, iStringVal, tileSelect_Next, evalRevisionIdx, evalOutMatchedTabUrlsVal, appMsg, seqProp);
            }]);
        }
    } else {
        if (seqProp) {
            seqProp(augmentWindow);
        }
    }
}

function matchText(iSession1Val, iStringVal, evalOutMatchedTabUrlsVal, appMsg) {
    if (iStringVal) {
        for (var i = 0; i < iSession1Val.length; i++) {
            if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
                for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                    if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg) && (SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).toLowerCase().indexOf(iStringVal.toLowerCase()) > -1 || iSession1Val[i].tabs[j].url.toLowerCase().indexOf(iStringVal.toLowerCase()) > -1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    } else {
        return true;
    }
}

function reloadSavedSession(iSession1Val, iTokenIdVal, evalOutMatchedTabUrlsVal, appMsg, seqProp) {
    var sbConfigs = 0;
    var renderUrl = 0;
    var btnCaretForward = 0;
    var matched = false;
    for (var i = 0; i < iSession1Val.length; i++) {
        if (!SbUtil.iSpeedVal(iSession1Val[i], 0, evalOutMatchedTabUrlsVal, appMsg)) {
            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], evalOutMatchedTabUrlsVal, appMsg)) {
                    matched = false;
                    if (SbUtil.bAppImportVal(iSession1Val[i].tabs[j]).toLowerCase().indexOf(iTokenIdVal.toLowerCase()) > -1) {
                        renderUrl++;
                        matched = true;
                    }
                    if (iSession1Val[i].tabs[j].url.toLowerCase().indexOf(iTokenIdVal.toLowerCase()) > -1) {
                        btnCaretForward++;
                        matched = true;
                    }
                    if (matched) {
                        sbConfigs++;
                    }
                }
            }
        }
    }
    if (seqProp) {
        seqProp(sbConfigs, renderUrl, btnCaretForward);
    }
}

function iIds(startAt, showSessionRoot, iNewNmVal, endActionsVal, iStringVal, seqProp, htmlEncodeRegEx) {
    if (SbUtil.dateDisplayType === 'relative') {
        iRange();
    } else {
        iSelActionType();
    }
    iStringVal = notifyWindowTab;
    startAt = addSessionConfigs.sbRange();
    showSessionRoot = addSessionConfigs.elHiddenVal();
    var headerDataPrevious = function(tabArray, iNm) {
        iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(evalOutMatchedTabUrlsVal) {
            if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                iPredicateVal.SBDB.normalizeTabList(function(appMsg) {
                    if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                        iPredicateVal.SBDB.detailTxt(function(evalOrientationVal) {
                            if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                iPredicateVal.SBDB.neutralizeWindowFocus(function(iTokenAddedCallback) {
                                    if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                        iPredicateVal.SBDB.evalSessionConfig2(function(sessionNm) {
                                            if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                iPredicateVal.SBDB.iWindow2TabIdx(function(iURLsStringVal) {
                                                    if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                        iPredicateVal.SBDB.idx7Val(undefined, iStringVal, function(getWindowIndex) {
                                                            if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                                addTabList(getWindowIndex.rows, iStringVal, showSessionRoot && showSessionRoot.length > 0 ? showSessionRoot : startAt ? [startAt] : [], evalOutMatchedTabUrlsVal, appMsg, function(evalRateActionQualifier) {
                                                                    if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                                        evalSAllowLogging(tabArray, iStringVal, showSessionRoot && showSessionRoot.length > 0 ? showSessionRoot : startAt ? [startAt] : [], evalOutMatchedTabUrlsVal, appMsg, function(cacheSessionWindow) {
                                                                            if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                                                BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                                                                                    if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                                                        SbUtil.currentSessionSrc(iSession1Val, undefined, function(initCurrentSessionCache, iCtrl, parseTabConfig, evalRegisterValue5Val) {
                                                                                            if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                                                                                                addSessionConfigs.render(matchText(iSession1Val, iStringVal, evalOutMatchedTabUrlsVal, appMsg) || (startAt && startAt.id == -13 || showSessionRoot && SbUtil.parseSessionTransactions(-13, 'current', showSessionRoot) > -1) ? [{
                                                                                                    id: -13,
                                                                                                    unfilteredWindowCount: initCurrentSessionCache,
                                                                                                    filteredWindowCount: iCtrl,
                                                                                                    unfilteredTabCount: parseTabConfig,
                                                                                                    filteredTabCount: evalRegisterValue5Val
                                                                                                }] : [], cacheSessionWindow, evalRateActionQualifier, undefined, tabArray ? cacheSessionWindow.length : undefined, undefined, startAt, showSessionRoot, endActionsVal ? undefined : iNm, iTokenAddedCallback, evalOrientationVal, sessionNm, iURLsStringVal, function() {
                                                                                                    if (seqProp) {
                                                                                                        seqProp();
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        }, showSessionRoot && showSessionRoot.length > 0 ? showSessionRoot : startAt ? [startAt] : []);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    iPredicateVal.SBDB.iWindowIdVal(function(txtComponentMain) {
        if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
            iPredicateVal.SBDB.iShowWindowsVal(function(deferCurrentSessionCountsNotify) {
                if (!htmlEncodeRegEx || htmlEncodeRegEx == iContextTo) {
                    if (deferCurrentSessionCountsNotify > 0 && txtComponentMain) {
                        iPredicateVal.SBDB.addCurrentSessionSource(undefined, iStringVal, function(iAppModeVal) {
                            headerDataPrevious(iAppModeVal.rows, deferCurrentSessionCountsNotify);
                        }, showSessionRoot && showSessionRoot.length > 0 ? showSessionRoot : startAt ? [startAt] : []);
                    } else {
                        headerDataPrevious(undefined, undefined);
                    }
                }
            });
        }
    });
}

function evalSaveVal(removeActiveTab) {
    iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionEdit_HideDuplicateTabsInMerge', removeActiveTab, function() {
        invertFlags(undefined, undefined, undefined, addSessionConfigs.elHiddenVal());
    }, function(err) {
        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '77592423');
    });
}

function iBackwardsVal(evalRegisterValue3, iSession1Val, iWindowSeqVal, iComponent, elMetrics, vTransitionVal, seqProp) {
    if (iSession1Val === undefined) {
        iSession1Val = [];
    }
    if (iWindowSeqVal === undefined) {
        iWindowSeqVal = 0;
    }
    if (iComponent === undefined) {
        iComponent = 0;
    }
    if (iComponent < evalRegisterValue3.length) {
        var olConfig = evalRegisterValue3[iComponent];
        if (olConfig) {
            if (olConfig.type === 'current') {
                BrowserAPI.getAllWindowsAndTabs(function(syncSessionTab) {
                    if (evalRegisterValue3.length === 1 && !elMetrics) {
                        iBackwardsVal(evalRegisterValue3, iSession1Val.concat(syncSessionTab), iWindowSeqVal + 1, iComponent + 1, tabMode(olConfig.type), false, seqProp);
                    } else {
                        iBackwardsVal(evalRegisterValue3, iSession1Val.concat(syncSessionTab), iWindowSeqVal + 1, iComponent + 1, undefined, undefined, seqProp);
                    }
                });
            } else if (olConfig.type === 'saved') {
                iPredicateVal.SBDB.renderWindowTab(olConfig.id, undefined, function(iSearchTerms) {
                    if (iSearchTerms) {
                        if (evalRegisterValue3.length === 1 && !elMetrics) {
                            iBackwardsVal(evalRegisterValue3, iSession1Val.concat(Util.severityVal(iSearchTerms.windows)), iWindowSeqVal + 1, iComponent + 1, iSearchTerms.name ? iSearchTerms.name : tabMode(olConfig.type), iSearchTerms.name ? true : false, seqProp);
                        } else {
                            iBackwardsVal(evalRegisterValue3, iSession1Val.concat(Util.severityVal(iSearchTerms.windows)), iWindowSeqVal + 1, iComponent + 1, undefined, undefined, seqProp);
                        }
                    }
                });
            } else if (olConfig.type === 'previous') {
                iPredicateVal.SBDB.serializeActiveSessionTab(olConfig.id, undefined, function(iSearchTerms) {
                    if (iSearchTerms) {
                        if (evalRegisterValue3.length === 1 && !elMetrics) {
                            SbUtil.iWidthOverrideVal(olConfig.id, function(evalOpacityAnimation) {
                                iBackwardsVal(evalRegisterValue3, iSession1Val.concat(Util.severityVal(iSearchTerms.windows)), iWindowSeqVal + 1, iComponent + 1, 'Previous Session', false, seqProp);
                            });
                        } else {
                            iBackwardsVal(evalRegisterValue3, iSession1Val.concat(Util.severityVal(iSearchTerms.windows)), iWindowSeqVal + 1, iComponent + 1, undefined, undefined, seqProp);
                        }
                    }
                });
            }
        } else {
            iBackwardsVal(evalRegisterValue3, iSession1Val, iWindowSeqVal, iComponent + 1, elMetrics, vTransitionVal, seqProp);
        }
    } else {
        if (seqProp) {
            seqProp(iSession1Val, iWindowSeqVal, elMetrics, vTransitionVal);
        }
    }
}

function evalSbRangeVal(iSession1Val, k, l, iUpdatePreviousVal, exp, bShowHideURLsVal, evalRerenderVal) {
    var iFinalCssCls = 0;
    var component = Util.notifyDisplayedSession(iSession1Val[k].tabs[l].url, exp);
    for (var i = k; i < iSession1Val.length; i++) {
        for (var j = i == k ? l : 0; j < iSession1Val[i].tabs.length; j++) {
            if (!iSession1Val[i].tabs[j].searchCurrentTab) {
                if (!(i == k && j == l)) {
                    if (Util.notifyDisplayedSession(iSession1Val[i].tabs[j].url, exp) == component) {
                        iSession1Val[i].tabs[j].searchCurrentTab = true;
                        if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], bShowHideURLsVal, evalRerenderVal)) {
                            iFinalCssCls++;
                        }
                    }
                }
            }
        }
    }
    return iFinalCssCls;
}

function deferAppExceptionVal(iSession1Val, iTextNodeVal, iUpdatePreviousVal, seqProp) {
    var iFinalCssCls = 0;
    if (iSession1Val) {
        iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
            iPredicateVal.SBDB.normalizeTabList(function(evalRerenderVal) {
                iPredicateVal.SBDB.addSession(function(addMatchText) {
                    for (var i = 0; i < iSession1Val.length; i++) {
                        for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                            if (!iSession1Val[i].tabs[j].searchCurrentTab) {
                                iFinalCssCls += evalSbRangeVal(iSession1Val, i, j, iUpdatePreviousVal, addMatchText, bShowHideURLsVal, evalRerenderVal);
                            }
                        }
                    }
                    if (!iUpdatePreviousVal) {
                        var adapterSel = [];
                        for (var i = 0; i < iSession1Val.length; i++) {
                            adapterSel.length = 0;
                            for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                                if (iSession1Val[i].tabs[j].searchCurrentTab) {
                                    adapterSel.push(j);
                                }
                            }
                            for (var j = adapterSel.length - 1; j > -1; j--) {
                                iSession1Val[i].tabs.splice(adapterSel[j], 1);
                            }
                        }
                        adapterSel.length = 0;
                        for (var i = 0; i < iSession1Val.length; i++) {
                            if (iSession1Val[i].tabs.length == 0) {
                                adapterSel.push(i);
                            }
                        }
                        for (var i = adapterSel.length - 1; i > -1; i--) {
                            iSession1Val.splice(adapterSel[i], 1);
                        }
                    }
                    if (iTextNodeVal) {}
                    if (seqProp) {
                        reqVal(iSession1Val);
                        seqProp(iSession1Val, iFinalCssCls);
                    }
                });
            });
        });
    } else {
        if (seqProp) {
            seqProp([], iFinalCssCls);
        }
    }
}

function reqVal(iSession1Val) {
    for (var i = 0; i < iSession1Val.length; i++) {
        for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
            if (iSession1Val[i].tabs[j].searchCurrentTab) {
                iSession1Val[i].tabs[j].searchCurrentTab = null;
            }
        }
    }
}

function modeReq() {
    if (iVal) {
        handleSync.sbTokenDeletedCbVal(event.clientX);
    }
}

function iShowTitlesVal() {
    vTx();
    iVal = true;
}

function iState() {
    if (iVal) {
        iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionSummaryRender_PanelWidth', parseInt(q('resetCurrentSessionCache').style.width), function(data, isFilterAsync) {}, function(err) {
            console.error(err);
        });
        $('body').removeClass('resp');
        timeToCallVal();
        iVal = false;
    }
}

function vTx() {
    document.addEventListener('selectstart', sortTabLineItems, false);
    document.addEventListener('dragstart', sortTabLineItems, false);
}

function timeToCallVal() {
    document.removeEventListener('selectstart', sortTabLineItems, false);
    document.removeEventListener('dragstart', sortTabLineItems, false);
}

function sortTabLineItems() {
    if (iVal) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        event.cancelBubble = true;
        return false;
    }
}

function registerCurrentSessionSource() {
    if (event.which == 1 && !Util.iContentText(event) && !event.shiftKey) {
        iIdVal(event.srcElement);
    }
}

function evalSessionCountVal() {
    q('adapterSelVal').style.visibility = 'hidden';
    q('tpa').style.visibility = 'hidden';
    if (q('iAnnotationClsVal').checked) {
        q('dateDisplay').textContent = moment(chromeSessionAdapter).format(q('adapterSelVal').value);
        q('adapterSelVal').style.visibility = 'visible';
        q('tpa').style.visibility = 'visible';
    } else if (q('toggleSessionWindowMode').checked) {
        q('dateDisplay').textContent = moment(chromeSessionAdapter).fromNow();
    } else {
        q('dateDisplay').textContent = moment(chromeSessionAdapter).format('L LT');
    }
    if (q('extractTabTransactions').checked) {
        Util.enable(q('popTabAction'));
        q('findMatchText').className = 'iAdornment';
        q('altHash').classList.add('tabDetail');
    } else {
        Util.disable(q('popTabAction'));
        q('findMatchText').className = 'iTokenDeletedCallback';
        q('altHash').classList.remove('tabDetail');
    }
}

function iIdVal(iCodeVal) {
    var things = iCodeVal.parentNode.children;
    iCodeVal.classList.add('iIdx');
    var evalSbNodeRanges = null;
    for (var i = 0; i < things.length; i++) {
        if (iCodeVal == things[i]) {
            evalSbNodeRanges = i;
        } else {
            things[i].classList.remove('iIdx');
        }
    }
    $(iCodeVal).closest('.evalSbSelVal').find('.nodeRangeVal').each(function(i, el) {
        if (evalSbNodeRanges === i) {
            el.classList.add('extractTabUrl');
        } else {
            el.classList.remove('extractTabUrl');
        }
    });
}

function sbNm(id, popWindowStatus) {
    addCurrentSessionCache(id, popWindowStatus);
}

function oldSessionId() {
    addCurrentSessionCache(q('evalSbNm'), q('iSessionConfig'));
    addCurrentSessionCache(q('lnkClearSearch'), q('msgNm'));
}

function addCurrentSessionCache(iTokenHTML, popWindowStatus) {
    if (iTokenHTML.scrollTop === 0) {
        popWindowStatus.classList.remove('iRemoveSessionConfigs');
    } else {
        popWindowStatus.classList.add('iRemoveSessionConfigs');
    }
    if (iTokenHTML.scrollHeight - iTokenHTML.clientHeight === iTokenHTML.scrollTop) {}
}

function fctRef() {
    if (q('parsePreviousSession').checked) {
        q('evalSessionConfig').value = parseFloat(q('hDebug').value);
    } else if (q('currentSessionCountsNotify').checked) {
        q('evalSessionConfig').value = q('currentSessionCountsNotify').value;
    } else if (q('requestSessionTransactions').checked) {
        q('evalSessionConfig').value = q('requestSessionTransactions').value;
    } else {
        q('evalSessionConfig').value = q('exclusivityPredicates').value;
    }
    if (Util.isNumeric(q('evalSessionConfig').value)) {
        Util.enable(q('finalCssClsIdx'));
    } else {
        Util.disable(q('finalCssClsIdx'));
    }
}

function tabMode(tileSelect_Next, selectPreviousSession) {
    if (tileSelect_Next === 'current') {
        return 'Current Session';
    } else if (tileSelect_Next === 'previous') {
        return 'Previous Session';
    } else if (tileSelect_Next === 'saved') {
        return 'Saved Session';
    } else if (tileSelect_Next === 'combined') {
        if (selectPreviousSession) {
            return BrowserAPI.getI18nMessage('linksets', [selectPreviousSession]);
        } else {
            return 'Multiple Sessions';
        }
    }
}

function allowLogging(tatePanelVal) {
    clearTimeout(iAdditive);
    q('brchLineitemRenderDelegate').style.display = 'none';
    $('#evalSbGroupVal').addClass('isTokenComponentVal');
    $('#evalSbGroupVal').removeClass('parseActiveTab');
    if (tatePanelVal.length > 1) {
        iAdditive = setTimeout(windowStatVal, 250, false, tatePanelVal);
    } else {
        windowStatVal(false, tatePanelVal);
    }
}

function windowStatVal(iLocaleNm, tatePanelVal) {
    clearTimeout(iAdditive);
    if (iLocaleNm) {
        q('brchLineitemRenderDelegate').style.display = 'none';
        $('#evalSbGroupVal').addClass('isTokenComponentVal');
        $('#evalSbGroupVal').removeClass('parseActiveTab');
    }
    if (iLocaleNm || tatePanelVal != notifyWindowTab) {
        notifyWindowTab = tatePanelVal;
        var isRequestHonoredVal = uuid.v4();
        iContextTo = isRequestHonoredVal;
        if (notifyWindowTab) {
            refreshTabArray = new RegExp(Util.iBaseDateVal(notifyWindowTab), 'gi');
        } else {
            refreshTabArray = null;
        }
        iIds(addSessionConfigs.sbRange(), addSessionConfigs.elHiddenVal(), undefined, undefined, idx5(notifyWindowTab), function() {
            if (!isRequestHonoredVal || isRequestHonoredVal == iContextTo) {
                iDate(addSessionConfigs.sbRange(), addSessionConfigs.elHiddenVal(), function() {
                    if (!isRequestHonoredVal || isRequestHonoredVal == iContextTo) {
                        iSelectedSessionConfigsAll();
                        addCurrentSessionCache(q('lnkClearSearch'), q('msgNm'));
                        addSessionConfigs.initCurrentWindow.scrollIntoViewIfNeeded(false);
                        if (notifyWindowTab === '') {
                            q('brchLineitemRenderDelegate').style.display = 'none';
                            $('#evalSbGroupVal').removeClass('isTokenComponentVal');
                            $('#evalSbGroupVal').removeClass('parseActiveTab');
                        } else {
                            q('brchLineitemRenderDelegate').style.display = 'block';
                            $('#evalSbGroupVal').addClass('parseActiveTab');
                            $('#evalSbGroupVal').removeClass('isTokenComponentVal');
                        }
                    }
                });
            }
        }, isRequestHonoredVal);
    } else {
        q('brchLineitemRenderDelegate').style.display = 'none';
        $('#evalSbGroupVal').removeClass('isTokenComponentVal');
        $('#evalSbGroupVal').removeClass('parseActiveTab');
    }
}

function idx5(iSessionStorageKey) {
    return iSessionStorageKey;
}

function showCurrentTab() {
    q('evalSbGroupVal').value = '';
    windowStatVal(false, '');
}