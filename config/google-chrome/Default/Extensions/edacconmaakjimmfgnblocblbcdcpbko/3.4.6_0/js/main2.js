/* Copyright (c) 2015 Session Buddy */

try {
    var recordDateTime = window.File && window.FileReader && window.FileList && window.Blob && !!new Blob();
} catch (ex) {}

function iWindow1Val(iSession1Val, arrayToCompare, tokenComponentImg, extractSessionRoot, seqProp, formatActiveSessionTab) {
    iPredicateVal.SBDB.fieldNmVal(function(getRecoverySession) {
        iPredicateVal.SBDB.fieldNm(function(rangeCumulative) {
            iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                iPredicateVal.SBDB.normalizeTabList(function(evalRerenderVal) {
                    iPredicateVal.SBDB.iSessionConfig2Val(function(findActiveWindow) {
                        iPredicateVal.SBDB.rateActionQualifierVal(function(iRegisterValue2) {
                            iPredicateVal.SBDB.setWindowTab(function(sbAnnotationVal) {
                                var iWindowSeq = createElement('div', 'revisionIdx');
                                var copySessionWindow;
                                var unfilteredWindowCount = 0;
                                var filteredWindowCount = 0;
                                var unfilteredTabCount = 0;
                                var filteredTabCount = 0;
                                var filterTab = 0;
                                for (var i = 0; i < iSession1Val.length; i++) {
                                    if (extractSessionRoot) {
                                        iSession1Val[i].focused = false;
                                    }
                                    if (SbUtil.iSpeedVal(iSession1Val[i], 0, bShowHideURLsVal, evalRerenderVal)) {
                                        filteredWindowCount++;
                                        filteredTabCount += iSession1Val[i].tabs.length;
                                    } else {
                                        unfilteredWindowCount++;
                                        filterTab = 0;
                                        for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                                            if (SbUtil.cfgIdVal(iSession1Val[i].tabs[j], bShowHideURLsVal, evalRerenderVal)) {
                                                filteredTabCount++;
                                            } else {
                                                unfilteredTabCount++;
                                                filterTab++;
                                                if (filterTab == 1) {
                                                    iWindowSeq.appendChild(copySessionWindow = setWindowSource(iSession1Val[i].tabs[j], i + 1, j + 1, sbAnnotationVal, arrayToCompare, false, findActiveWindow, iRegisterValue2));
                                                } else {
                                                    iWindowSeq.appendChild(setWindowSource(iSession1Val[i].tabs[j], i + 1, j + 1, sbAnnotationVal, arrayToCompare, false, findActiveWindow, iRegisterValue2));
                                                }
                                            }
                                        }
                                        iWindowSeq.insertBefore(copyTabState(iSession1Val[i], i + 1, unfilteredWindowCount, filterTab, unfilteredWindowCount == 1, arrayToCompare, tokenComponentImg, rangeCumulative, getRecoverySession), copySessionWindow);
                                    }
                                }
                                if (unfilteredTabCount < 1) {
                                    q('evalSbNm').setAttribute('class', 'iSelLengthVal');
                                    if (filteredTabCount < 1) {
                                        copyImportedSession('no tabs');
                                    } else {
                                        copyImportedSession(filteredTabCount + ' tab' + (filteredTabCount > 1 ? 's in this session are' : ' in this session is') + ' hidden. <span id="openWindow" style="text-decoration:underline;cursor:pointer;">Click here</span> to adjust Tab Filter settings.');
                                        q('openWindow').addEventListener('click', function() {
                                            iIdVal(q('session1WindowIdxVal'));
                                            saveDisplayedSession('saveImportedSession');
                                        }, false);
                                    }
                                } else {
                                    q('evalSbNm').setAttribute('class', 'evalSbNm');
                                    $('.val1, .revise, .iFirstInList').qtip('destroy', true);
                                    var container = q('evalSbNm');
                                    while (container.firstChild) {
                                        container.removeChild(container.firstChild);
                                    }
                                    container.appendChild(iWindowSeq);
                                }
                                selectWindowTab = iSession1Val;
                                orientationVal = new Date();
                                if (notifyWindowTab) {
                                    q('assessStyleVal').style.display = 'block';
                                    q('evalSbNm').style.top = '201px';
                                    q('iSessionConfig').style.top = '201px';
                                    reloadSavedSession(iSession1Val, notifyWindowTab, bShowHideURLsVal, evalRerenderVal, function(sbConfigs, renderUrl, btnCaretForward) {
                                        var iText = formatActiveSessionTab && formatActiveSessionTab.toLowerCase().indexOf(notifyWindowTab.toLowerCase()) > -1 ? 'the session name' : '';
                                        var extractTabStatus = renderUrl > 0 ? renderUrl + (renderUrl === 1 ? ' tab title' : ' tab titles') : '';
                                        var refreshSessionSource = btnCaretForward > 0 ? btnCaretForward + (btnCaretForward === 1 ? ' tab URL' : ' tab URLs') : '';
                                        var isFilteredWindowVisible = false;
                                        if (iText && extractTabStatus && refreshSessionSource) {
                                            q('iSession1').innerText = '"' + notifyWindowTab + '" matches ' + iText + ', ' + extractTabStatus + ', and ' + refreshSessionSource;
                                            isFilteredWindowVisible = true;
                                        } else if (iText && (extractTabStatus || refreshSessionSource)) {
                                            q('iSession1').innerText = '"' + notifyWindowTab + '" matches ' + iText + ' and ' + extractTabStatus + refreshSessionSource;
                                            isFilteredWindowVisible = true;
                                        } else if (extractTabStatus && refreshSessionSource) {
                                            q('iSession1').innerText = '"' + notifyWindowTab + '" matches ' + extractTabStatus + ' and ' + refreshSessionSource;
                                            isFilteredWindowVisible = true;
                                        } else if (iText || extractTabStatus || refreshSessionSource) {
                                            q('iSession1').innerText = '"' + notifyWindowTab + '" matches ' + iText + extractTabStatus + refreshSessionSource;
                                            isFilteredWindowVisible = true;
                                        }
                                        if (isFilteredWindowVisible) {
                                            q('assessStyleVal').classList.remove('val8');
                                        } else {
                                            if (addSessionConfigs.evalSCtrlKeyVal.length > 1) {
                                                q('iSession1').innerText = '"' + notifyWindowTab + '" does not match any tabs in the selected sessions';
                                            } else {
                                                q('iSession1').innerText = '"' + notifyWindowTab + '" has no matches in the selected session';
                                            }
                                            q('assessStyleVal').classList.add('val8');
                                        }
                                    });
                                } else {
                                    q('assessStyleVal').style.display = 'none';
                                    q('evalSbNm').style.top = '151px';
                                    q('iSessionConfig').style.top = '151px';
                                }
                                if (seqProp) {
                                    seqProp(unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount);
                                }
                            });
                        });
                    });
                });
            });
        });
    });
}

function isRangeDirBackVal() {
    clearTimeout(evalOutMatchedTabTitles);
    evalOutMatchedTabTitles = null;
    q('stopAnim').classList.add('invisible');
    return evalSessionStorageKey(q('dateVal'), q('initTabLayout'), q('headerErrVal')) || evalSessionStorageKey(q('iMsg'), q('iBaseDate')) || evalSessionStorageKey(q('bMergeSaveElVal'), q('iCountVal'));
}

function flashSessionVal(setSessionTransaction) {
    handleSync.appMenuButtonVal(setSessionTransaction ? 'left' : 'right');
}

function stylePrimaryTileEl(iTokenHTML) {
    iTokenHTML.style.setProperty('-webkit-border-bottom-left-radius', '0px');
    iTokenHTML.style.setProperty('-webkit-border-bottom-right-radius', '0px');
    iTokenHTML.style.setProperty('border-bottom-color', 'hsl(219, 44%, 94%)');
}

function stylePrimaryTabEl(sessionStorageKeyVal, registerSessionWindow) {
    sessionStorageKeyVal.style.setProperty('-webkit-border-bottom-left-radius', '');
    sessionStorageKeyVal.style.setProperty('-webkit-border-bottom-right-radius', '');
    sessionStorageKeyVal.style.setProperty('border-bottom-color', '');
    registerSessionWindow.style.setProperty('-webkit-border-top-left-radius', '');
    registerSessionWindow.style.setProperty('-webkit-border-top-right-radius', '');
    registerSessionWindow.style.setProperty('border-top-color', '');
}

function styleSecondaryTileEl(iTokenHTML) {
    iTokenHTML.style.setProperty('-webkit-border-top-left-radius', '0px');
    iTokenHTML.style.setProperty('-webkit-border-top-right-radius', '0px');
    iTokenHTML.style.setProperty('border-top-color', 'hsl(219, 44%, 94%)');
}

function styleSecondaryTabEl(sessionStorageKeyVal, registerSessionWindow) {
    sessionStorageKeyVal.style.setProperty('-webkit-border-top-left-radius', '');
    sessionStorageKeyVal.style.setProperty('-webkit-border-top-right-radius', '');
    sessionStorageKeyVal.style.setProperty('border-top-color', '');
    registerSessionWindow.style.setProperty('-webkit-border-bottom-left-radius', '');
    registerSessionWindow.style.setProperty('-webkit-border-bottom-right-radius', '');
    registerSessionWindow.style.setProperty('border-bottom-color', '');
}

function seal(sessionStorageKeyVal, registerSessionWindow) {
    stylePrimaryTileEl(sessionStorageKeyVal);
    styleSecondaryTileEl(registerSessionWindow);
}

var activeTabVal = null;

var severity;

var extractMatchText;

var createWindowTab;

function iTabSeqVal() {
    if (iPredicateVal.matchTextVal('Platform: ' + q('createSessionTab').innerText + '\n' + 'Language: ' + q('popWindowConfig').innerText + '\n' + 'User Agent: ' + q('parseCurrentWindow').innerText + '\n' + 'Pixel Ratio: ' + Util.addTitle() + '\n' + 'SB ID: ' + q('evalSbNmVal').innerText + '\n' + 'SB Version: ' + q('showWindowCount').innerText + '\n' + 'SB Status: ' + q('btnCaretClrVal').innerText + '\n')) {
        clearTimeout(iExclusive);
        document.querySelector('#requireMove').style.opacity = '1';
        iExclusive = setTimeout(function() {
            document.querySelector('#requireMove').style.opacity = '0';
        }, 1e3);
    }
}

function childCount() {
    vTransition();
}

function bypassTabSource() {
    vTransition(function() {
        setWindowCount();
    });
}

function sbSessionConfigVal() {
    if (iPredicateVal.matchTextVal(q('copyTabArray').value)) {
        ga('send', 'event', 'feature', 'export_clipboard', updateSessionRoot());
        $('#iPropNm').html('Copied');
        clearTimeout(toggleSessionMode);
        $('#iPropNm').fadeIn('fast');
        toggleSessionMode = setTimeout(function() {
            $('#iPropNm').fadeOut('slow');
        }, 1500);
    }
}

function actionTimeframeVal() {
    currentComponent(function(t) {
        try {
            argsVal(t, 'session_buddy_backup_' + moment().format('YYYY_MM_DD_HH_mm_ss') + '.json');
            ga('send', 'event', 'feature', 'backup_file');
            maxCount('Backup file saved to <a href="javascript:void(0);" class="evalSessionId">downloads folder</a>', 0, 15 * 1e3);
        } catch (ex) {
            maxCount('Failed to save backup file', 2);
        }
    });
}

function argsVal(text, filename) {
    saveAs(new Blob(['﻿', text], {
        type: 'text/plain;charset=UTF-8'
    }), filename);
}

function iSearchTerm() {
    try {
        var ext = '.txt';
        switch (updateSessionRoot()) {
          case 'CSV':
            ext = '.csv';
            break;

          case 'JSON':
            ext = '.json';
            break;

          case 'HTML':
            ext = '.html';
            break;

          case 'Markdown':
            ext = '.md';
            break;
        }
        argsVal(q('copyTabArray').value, 'session_buddy_export_' + moment().format('YYYY_MM_DD_HH_mm_ss') + ext);
        ga('send', 'event', 'feature', 'export_file', updateSessionRoot());
        $('#iPropNm').html('Saved to <a href="#" class="evalSessionId" style="color:hsl(120, 52%, 30%);text-decoration:underline;">downloads folder</a>');
        clearTimeout(toggleSessionMode);
        $('#iPropNm').fadeIn('fast');
        toggleSessionMode = setTimeout(function() {
            $('#iPropNm').fadeOut('slow');
        }, 5e3);
    } catch (ex) {}
}

function sClickOriginDelete() {
    if (parseFloat(q('evalSessionConfig').value)) {
        vTransition();
        saveVal('trigger1', function() {
            setSessionSource('trigger2', 20);
        });
        event.stopPropagation();
        q('paypalForm').submit();
    } else {
        alert('Please enter a valid donation amount.');
        q('hDebug').focus();
        return false;
    }
}

function mode() {
    evalReg1(q('iSessionCountVal').value);
    vTransition();
}

function getTabCount() {
    iCondition(q('lxMtype').value, iCount);
}

function renderTabTitle() {
    if (q('setSession').checked) {
        iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionMerge_WarnOnMerge', false);
    }
    evalSbTokenAddedCbVal(function(formatActiveSessionTab) {
        evalRequestHonoredVal(formatActiveSessionTab);
    });
}

function iCount(iIdsVal, correctPLimit) {
    if (correctPLimit) {
        txType(iIdsVal, correctPLimit);
        vTransition();
        if (q('setSession').checked) {
            iPredicateVal.SBDB.evalOutRemovedSessionConfigs('sessionSave_AskForName', false);
        }
    }
}

function applicationExVal(cb) {
    iPredicateVal.SBDB.setTabStatus(function(iStatTypeCodeNm) {
        if (iStatTypeCodeNm) {
            $('html, body, input.evalSbGroupVal, .iWindowsVal').addClass('flashCountVal');
        } else {
            $('html, body, input.evalSbGroupVal, .iWindowsVal').removeClass('flashCountVal');
        }
        if (cb) {
            cb();
        }
    });
}

function val2() {
    vTransition();
    eventVal(function(subArrayVal, addTabSource, showCurrentWindow, adornment, iPositionVal, createTabArray, rangeCumulativeVal, formatSessionWindow, evalSessionConfig2Val) {
        applicationExVal(function() {
            setActiveTab(formatSessionWindow, function() {
                syncSavedSession(adornment, function() {
                    if (iPositionVal) {
                        if (q('appActionCoordinate').checked) {
                            SbUtil.evalSelLength(function(unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount) {
                                SbUtil.firstInList(unfilteredTabCount, filteredTabCount);
                            });
                        } else {
                            SbUtil.firstInList();
                        }
                        iPredicateVal.codeVal();
                    }
                    iPredicateVal.evalSDupeVal();
                    var complete = function() {
                        iPredicateVal.popTabTitle({
                            id: 'propNm',
                            data: {
                                showCurrentWindow: showCurrentWindow,
                                subArrayVal: subArrayVal,
                                addTabSource: addTabSource,
                                rangeCumulativeVal: rangeCumulativeVal,
                                session2WindowIdxVal: q('reloadWindowSource').checked,
                                createTabArray: createTabArray,
                                enableKeyboardShortcuts: q('btnCaretSelVal').checked
                            }
                        });
                    };
                    if (evalSessionConfig2Val) {
                        showCurrentWindow = true;
                        addTabSource = true;
                        iPredicateVal.SBDB.setSessionWindow(function(evalSelectedLineitems) {
                            SbUtil.dateDisplayType = evalSelectedLineitems;
                            iPredicateVal.SBDB.nm(function(format) {
                                SbUtil.customDateFormat = format;
                                complete();
                            });
                        });
                    } else {
                        complete();
                    }
                });
            });
        });
    });
}

function setActiveTab(appStatus, seqProp) {
    if (appStatus) {
        if (q('evalRangeCumulative').checked) {
            iPredicateVal.addedConfigsVal();
            if (seqProp) {
                seqProp();
            }
        } else {
            clearTimeout(iPredicateVal.doNotSync);
            SbUtil.removeCurrentWindow();
            iPredicateVal.SBDB.elMetricsVal(function(positionCurrentWindow) {
                if (positionCurrentWindow > 0) {
                    console.log(positionCurrentWindow + (positionCurrentWindow === 1 ? ' previous session deleted' : ' previous sessions deleted'));
                }
            });
            if (seqProp) {
                seqProp();
            }
        }
    } else if (seqProp) {
        seqProp();
    }
}

function syncSavedSession(appStatus, seqProp) {
    if (appStatus) {
        SbUtil.iFormat(function() {
            iPredicateVal.codeVal();
            if (seqProp) {
                seqProp();
            }
        });
    } else if (seqProp) {
        seqProp();
    }
}

function copyTabList(appStatus, seqProp) {
    if (appStatus) {
        iIds(undefined, undefined, undefined, false, undefined, seqProp);
    } else if (seqProp) {
        seqProp();
    }
}

function newNm(appStatus, seqProp) {
    if (appStatus) {
        optimizeSessionSource(undefined, seqProp);
    } else if (seqProp) {
        seqProp();
    }
}

function concatenateVal(appStatus, cb) {
    if (appStatus) {
        iDate(addSessionConfigs.sbRange(), addSessionConfigs.elHiddenVal(), cb);
    } else if (cb) {
        cb();
    }
}

function saveDisplayedSession(extractPreviousSession, windowTab, iShift, seqProp) {
    var btnSM = function() {
        var iSessionConfig1Val = q('normalizeSessionTransactions').children;
        for (var i = 0; i < iSessionConfig1Val.length; i++) {
            if (iSessionConfig1Val[i] && iSessionConfig1Val[i].tagName && iSessionConfig1Val[i].tagName.toUpperCase() == 'DIV') {
                if (iSessionConfig1Val[i].id == extractPreviousSession) {
                    iSessionConfig1Val[i].style.display = 'block';
                } else {
                    iSessionConfig1Val[i].style.display = 'none';
                }
            }
        }
        if (!windowTab) {
            q('compressOpts').style.left = (document.body.clientWidth - $('#compressOpts').width()) / 2 + 'px';
        }
        if (!iShift) {
            q('compressOpts').style.top = 100 + 'px';
        }
        q('compressOpts').style.display = 'inline-block';
        q('opacityAnimation').style.display = 'block';
        q('opacityAnimation').style.height = document.body.clientHeight;
        q('opacityAnimation').style.width = document.body.clientWidth;
        q('compressOpts').className = 'compressOpts';
        q('opacityAnimation').className = 'iAdditiveVal';
        window.setTimeout(function() {
            if (seqProp) {
                seqProp();
            }
        }, 50);
    };
    adjustImportedSession = false;
    isRangeDirBackVal();
    searchRequest('Session Buddy');
    iTypeVal('500');
    q('sessionConfigVal').className = 'sbButton';
    q('sessionConfigVal').dataset.type = '';
    q('sessionConfigVal').style.display = 'none';
    q('sessionConfigVal').style.width = '60px';
    q('finalCssClsIdx').style.display = 'inline-block';
    q('finalCssClsIdx').innerHTML = 'Save';
    q('finalCssClsIdx').className = 'sbButton';
    q('finalCssClsIdx').dataset.type = '';
    q('finalCssClsIdx').style.width = '60px';
    q('iterateTabTransactions').style.display = 'inline-block';
    q('iterateTabTransactions').innerHTML = 'Cancel';
    q('iterateTabTransactions').className = 'sbButton';
    q('iterateTabTransactions').dataset.type = '4';
    q('iterateTabTransactions').style.width = '60px';
    Util.enable(q('sessionConfigVal'));
    Util.enable(q('finalCssClsIdx'));
    Util.enable(q('iterateTabTransactions'));
    severity = childCount;
    extractMatchText = childCount;
    createWindowTab = childCount;
    q('evalSDupe').style.display = 'none';
    if (extractPreviousSession == 'adjustRecoverySession') {
        evalPos(windowTab, iShift, function() {
            q('evalSelectedLineitemsVal').select();
            q('evalSelectedLineitemsVal').value = '';
            Util.disable(q('finalCssClsIdx'));
            btnSM();
        });
    } else if (extractPreviousSession == 'removeTabSource') {
        iIncludeSeqPropVal(windowTab, iShift, function() {
            reloadTabSource();
            btnSM();
        });
    } else if (extractPreviousSession == 'contextTo') {
        areaNm(windowTab, iShift, btnSM);
    } else if (extractPreviousSession == 'iRequestHonoredVal') {
        propNmVal(windowTab, iShift, function() {
            q('iSessionCountVal').focus();
            q('iSessionCountVal').select();
            btnSM();
        });
    } else if (extractPreviousSession == 'sessionModeVal') {
        addActiveSessionTab(windowTab, iShift, function() {
            q('lxMtype').focus();
            q('lxMtype').value = '';
            q('setSession').checked = false;
            q('noTextVal').innerText = 'Never ask for name';
            btnSM();
        });
    } else if (extractPreviousSession == 'exceptionTxt') {
        iRegisterValue1(windowTab, iShift, function() {
            q('setSession').checked = false;
            q('noTextVal').innerText = 'Don\'t ask again';
            btnSM();
        });
    } else if (extractPreviousSession == 'augmentActiveTab') {
        deltaRVal(windowTab, iShift, function() {
            btnSM();
        });
    } else if (extractPreviousSession == 'saveImportedSession') {
        adjustSession(windowTab, iShift, btnSM);
    }
}

function isDupeVal(cb, delay) {
    clearTimeout(countActiveWindows);
    countActiveWindows = setTimeout(function() {
        formatActiveTab(q('evalSelectedLineitemsVal').value.trim(), cb);
    }, delay || 1);
}

function sessionTypeVal(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    if (event.type !== 'drop' || event.which == 1 && !Util.iContentText(event) && !event.shiftKey) {
        $('#evalSelectedLineitemsVal').removeClass('evalSelectedLineitemsVal-dragover');
        var files = ev.dataTransfer && ev.dataTransfer.files || ev.target.files;
        if (files.length > 0) {
            var rdr = new FileReader(), f = files[0];
            if (!f.type.match('image.*') || !f.type) {
                rdr.onload = function() {
                    return function(ev) {
                        q('evalSelectedLineitemsVal').value = ev.target.result;
                        $('#evalSelectedLineitemsVal').scrollTop(0).scrollLeft(0);
                        isDupeVal(toggleActiveTab);
                    };
                }();
                rdr.readAsText(f);
            } else {
                $('#extendedSessionConfig').show().text('Not a valid import file' + (f.type ? ' (' + f.type + ')' : '')).addClass('inferTypes');
            }
        }
    }
}

function evalPos(windowTab, iShift, seqProp) {
    iPredicateVal.SBDB.setTabStatus(function(iStatTypeCodeNm) {
        searchRequest('Import');
        iTypeVal('600');
        q('evalSelectedLineitemsVal').style.height = '';
        q('evalSelectedLineitemsVal').style.width = parseInt(q('compressOpts').style.width) - 37 + 'px';
        document.body.addEventListener('mousemove', bHideURLs, false);
        activeTabVal = effectiveIdx;
        $('#getTabTransactions').append('<span id="extendedSessionConfig" class="extendedSessionConfig">');
        if (recordDateTime) {
            $('#getTabTransactions').append($('<input type="file" id="requestHonoredVal" class="requestHonoredVal" title=" ">'));
            $('#getTabTransactions').append('<span id="iShowSuccessStatus" class="iShowSuccessStatus">');
            if (iStatTypeCodeNm) {
                $('#requestHonoredVal').addClass('flashCountVal');
            }
            $('#extendedSessionConfig').css('left', '107px');
            $('#requestHonoredVal').on('change', sessionTypeVal);
        }
        q('finalCssClsIdx').dataset.type = '3';
        q('finalCssClsIdx').innerHTML = 'Save';
        extractMatchText = bypassTabSource;
        q('evalSelectedLineitemsVal').value = '';
        if (seqProp) {
            seqProp();
        }
    });
}

function iIncludeSeqPropVal(windowTab, iShift, seqProp) {
    searchRequest('Export');
    if (recordDateTime) {
        iTypeVal('690');
    } else {
        iTypeVal('600');
    }
    q('copyTabArray').style.height = '';
    q('copyTabArray').style.width = parseInt(q('compressOpts').style.width) - 47 + 'px';
    document.body.addEventListener('mousemove', sDupeVal, false);
    activeTabVal = bImgShowURLsVal;
    q('getTabTransactions').appendChild(createElement('span', 'iPropNm', 'iPropNm'));
    q('iterateTabTransactions').innerHTML = 'Close';
    if (recordDateTime) {
        q('sessionConfigVal').dataset.type = '3';
        q('sessionConfigVal').style.width = '115px';
        q('sessionConfigVal').innerHTML = 'Copy to Clipboard';
        q('sessionConfigVal').style.display = 'inline-block';
        createWindowTab = sbSessionConfigVal;
        q('finalCssClsIdx').dataset.type = '3';
        q('finalCssClsIdx').style.width = '115px';
        q('finalCssClsIdx').innerHTML = 'Save to File';
        extractMatchText = iSearchTerm;
    } else {
        q('finalCssClsIdx').dataset.type = '3';
        q('finalCssClsIdx').style.width = '115px';
        q('finalCssClsIdx').innerHTML = 'Copy to Clipboard';
        extractMatchText = sbSessionConfigVal;
    }
    q('copyTabArray').rows = 10;
    iPredicateVal.SBDB.adjustCurrentTab(function(sessionConfig1Val) {
        iPredicateVal.SBDB.filterCurrentWindow(function(isCtrlKeyVal) {
            iPredicateVal.SBDB.iPosString(function(setTabAction) {
                iPredicateVal.SBDB.mergeTabs(function(initTabCache) {
                    iPredicateVal.SBDB.evalOffsetVal(function(isFilterRequired) {
                        iPredicateVal.SBDB.filterSessionSource(function(iCreationDateTime) {
                            q('sessionRootVal').checked = initTabCache;
                            q('evalRunningVal').checked = setTabAction;
                            q('evalOptionDescVal').checked = isFilterRequired;
                            q('cacheWindow').checked = iCreationDateTime;
                            if (iSessionConfigs === 'app') {
                                $('#nmMatchTextVal').show();
                                q('sessionExport_Scope').value = sessionConfig1Val;
                            } else {
                                $('#nmMatchTextVal').hide();
                            }
                            switch (isCtrlKeyVal) {
                              case 'CSV':
                                iIdVal(q('debugVal'));
                                break;

                              case 'JSON':
                                iIdVal(q('optArgs'));
                                break;

                              case 'HTML':
                                iIdVal(q('outMatchedTabsVal'));
                                break;

                              case 'Markdown':
                                iIdVal(q('currentTab'));
                                break;

                              default:
                                iIdVal(q('extractWindowArray'));
                            }
                            if (seqProp) {
                                seqProp();
                            }
                        });
                    });
                });
            });
        });
    });
}

function areaNm(windowTab, iShift, seqProp) {
    searchRequest('Love Session Buddy?');
    iTypeVal('400');
    q('compressOpts').style.top = '15px';
    q('finalCssClsIdx').dataset.type = '3';
    q('finalCssClsIdx').style.width = '100px';
    q('finalCssClsIdx').innerHTML = 'Donate';
    extractMatchText = sClickOriginDelete;
    q('iterateTabTransactions').innerHTML = 'Cancel';
    if (seqProp) {
        seqProp();
    }
}

function propNmVal(windowTab, iShift, seqProp) {
    searchRequest('Name Session');
    iTypeVal('350');
    q('iSessionCountVal').addEventListener('keydown', conditionVal, false);
    activeTabVal = windowMode;
    q('finalCssClsIdx').dataset.type = '3';
    q('finalCssClsIdx').innerHTML = 'OK';
    q('finalCssClsIdx').style.display = 'inline-block';
    extractMatchText = mode;
    if (seqProp) {
        seqProp();
    }
}

function conditionVal() {
    if (event.keyCode === 13) {
        evalReg1(this.value);
        vTransition(function() {
            q('sbDialogs').focus();
        });
    }
}

function addActiveSessionTab(windowTab, iShift, seqProp) {
    searchRequest('Save Session');
    iTypeVal('370');
    q('evalSDupe').style.display = 'inline';
    q('lxMtype').addEventListener('keydown', toggleWindowMode, false);
    q('finalCssClsIdx').dataset.type = '3';
    q('finalCssClsIdx').innerHTML = 'OK';
    q('finalCssClsIdx').style.display = 'inline-block';
    extractMatchText = getTabCount;
    iSessionConfigsAllVal = iCondition;
    activeTabVal = evalSbSessionConfigsVal;
    if (seqProp) {
        seqProp();
    }
}

function toggleWindowMode() {
    if (event.keyCode === 13) {
        iSessionConfigsAllVal(this.value, iCount);
    }
}

function iRegisterValue1(windowTab, iShift, seqProp) {
    searchRequest('Merge Selected Sessions');
    iTypeVal('380');
    q('evalSDupe').style.display = 'inline';
    q('iterateTabTransactions').innerHTML = 'No';
    q('finalCssClsIdx').dataset.type = '3';
    q('finalCssClsIdx').innerHTML = 'Yes';
    q('finalCssClsIdx').style.display = 'inline-block';
    extractMatchText = renderTabTitle;
    if (seqProp) {
        seqProp();
    }
}

function deltaRVal(windowTab, iShift, seqProp) {
    searchRequest('About Session Buddy');
    iTypeVal('500');
    q('finalCssClsIdx').style.display = 'none';
    q('iterateTabTransactions').innerHTML = 'Close';
    if (SbUtil.iExpectStatusVal) {
        q('btnCaretClrVal').innerText = 'Error';
        q('btnCaretClrVal').style.color = 'hsl(0, 60%, 50%)';
        q('popTabTransactions').style.color = 'hsl(0, 60%, 50%)';
        q('popTabTransactions').style.textDecoration = 'underline';
        q('popTabTransactions').style.fontWeight = 'bold';
    } else {
        q('btnCaretClrVal').innerText = 'OK';
        q('btnCaretClrVal').style.color = 'hsl(0, 0%, 30%)';
        q('popTabTransactions').style.color = 'hsl(0, 0%, 30%)';
        q('popTabTransactions').style.textDecoration = 'none';
        q('popTabTransactions').style.fontWeight = '300';
    }
    if (seqProp) {
        seqProp();
    }
}

function adjustSession(windowTab, iShift, seqProp) {
    chromeSessionAdapter = new Date();
    searchRequest('Session Buddy Settings');
    iTypeVal('535');
    q('finalCssClsIdx').dataset.type = '3';
    iPredicateVal.SBDB.fieldNm(function(rangeCumulative) {
        iPredicateVal.SBDB.setSessionWindow(function(contextFrom) {
            iPredicateVal.SBDB.nm(function(insertUndoActionVal) {
                iPredicateVal.SBDB.detailTxt(function(iSplitterVal) {
                    iPredicateVal.SBDB.findSession(function(processCurrentWindow) {
                        iPredicateVal.SBDB.limitVal(function(searchRequestVal) {
                            iPredicateVal.SBDB.neutralizeWindowFocus(function(iTokenAddedCallback) {
                                iPredicateVal.SBDB.addSession(function(addMatchText) {
                                    iPredicateVal.SBDB.iSetNmVal(function(rerender) {
                                        iPredicateVal.SBDB.iSessionConfig2Val(function(contentShwVal) {
                                            iPredicateVal.SBDB.evalSessionConfig2(function(pKey) {
                                                iPredicateVal.SBDB.iWindow2TabIdx(function(reloadSessionWindow) {
                                                    iPredicateVal.SBDB.rateActionQualifierVal(function(evalRangeSelect) {
                                                        iPredicateVal.SBDB.setTabStatus(function(renderTab) {
                                                            iPredicateVal.SBDB.initControlVal(function(requestActiveSessionTab) {
                                                                iPredicateVal.SBDB.iShowWindowsVal(function(registerValue1Val) {
                                                                    iPredicateVal.SBDB.iWindowIdVal(function(txtComponentMain) {
                                                                        iPredicateVal.SBDB.tabRow(function(sbPropVal) {
                                                                            iPredicateVal.SBDB.deferCurrentSessionNotifyVal(function(requireTabAction) {
                                                                                iPredicateVal.SBDB.normalizeTabList(function(nodeVal) {
                                                                                    iPredicateVal.SBDB.fieldNmVal(function(getRecoverySession) {
                                                                                        iWindows1(q('iBaselineVal'), getRecoverySession);
                                                                                        iWindows1(q('evalRangeCumulative'), txtComponentMain);
                                                                                        iWindows1(q('iContextToVal'), registerValue1Val);
                                                                                        iWindows1(q('extractTabTransactions'), rerender);
                                                                                        iWindows1(q('popTabAction'), addMatchText);
                                                                                        iWindows1(q('intendedParentVal'), searchRequestVal);
                                                                                        iWindows1(q('optionDescVal'), iTokenAddedCallback);
                                                                                        iWindows1(q('appActionCoordinate'), requestActiveSessionTab);
                                                                                        iWindows1(q('updateTitle'), processCurrentWindow);
                                                                                        iWindows1(q('evalRevisionIdxVal'), rangeCumulative);
                                                                                        iWindows1(q('reloadWindowSource'), sbPropVal);
                                                                                        iWindows1(q('sbSel'), contentShwVal);
                                                                                        iWindows1(q('evalQueue'), pKey);
                                                                                        iWindows1(q('serializeSession'), reloadSessionWindow);
                                                                                        iWindows1(q('limit'), evalRangeSelect);
                                                                                        iWindows1(q('mergeSessionTabs'), renderTab);
                                                                                        iWindows1(q('evalSession1'), requireTabAction);
                                                                                        iWindows1(q('evalRecoverySessionVal'), nodeVal);
                                                                                        iWindows1(q('btnCaretSelVal'), iSplitterVal);
                                                                                        iWindows1(q('addedTokenElVal'), contextFrom);
                                                                                        iWindows1(q('adapterSelVal'), insertUndoActionVal);
                                                                                        evalSbTokenAddedCb(q('evalRangeCumulative').checked);
                                                                                        extractMatchText = val2;
                                                                                        evalSessionCountVal();
                                                                                        if (seqProp) {
                                                                                            seqProp();
                                                                                        }
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function iWindows1(addDisplayedSession, iRestoreTypeVal) {
    if (addDisplayedSession.type == 'checkbox') {
        addDisplayedSession.checked = iRestoreTypeVal;
    } else if (addDisplayedSession.type == 'radio') {
        var adjustWindowTab = document.getElementsByName(addDisplayedSession.name);
        if (adjustWindowTab) {
            for (var i = 0; i < adjustWindowTab.length; i++) {
                if (adjustWindowTab[i].value == iRestoreTypeVal) {
                    adjustWindowTab[i].checked = true;
                    break;
                }
            }
        }
    } else {
        addDisplayedSession.value = iRestoreTypeVal;
    }
    addDisplayedSession.dataset.init = iRestoreTypeVal;
}

function vTransition(cb) {
    if ($('#compressOpts').hasClass('getDisplayedSession') && $('#opacityAnimation').hasClass('parseScheme')) {
        if ($.isFunction(cb)) {
            cb();
        }
        return;
    }
    if (activeTabVal) {
        activeTabVal();
        activeTabVal = null;
    }
    q('compressOpts').className = 'compressOpts getDisplayedSession';
    q('opacityAnimation').className = 'parseScheme';
    window.setTimeout(function() {
        q('compressOpts').style.display = 'none';
        q('opacityAnimation').style.display = 'none';
        if ($.isFunction(cb)) {
            cb();
        }
    }, 300);
    if (document.additive(q('compressOpts'), document.activeElement)) {
        document.activeElement.blur();
    }
    adjustImportedSession = true;
    $('#iPropNm').remove();
    $('#requestHonoredVal').remove();
    $('#extendedSessionConfig').remove();
    $('#iShowSuccessStatus').off('change', sessionTypeVal);
    $('#iShowSuccessStatus').remove();
}

function unifyActiveWindows() {
    document.body.addEventListener('mousemove', tokenIdIdxVal, true);
    document.body.addEventListener('mouseup', currentTabVal, true);
    q('compressOpts').startX = event.clientX;
    q('compressOpts').startY = event.clientY;
    q('compressOpts').startLeft = window.parseInt(q('compressOpts').style.left);
    q('compressOpts').startTop = window.parseInt(q('compressOpts').style.top);
    return false;
}

function currentTabVal() {
    document.body.removeEventListener('mousemove', tokenIdIdxVal, true);
    document.body.removeEventListener('mouseup', currentTabVal, true);
    return false;
}

function tokenIdIdxVal() {
    q('compressOpts').style.left = q('compressOpts').startLeft + event.clientX - q('compressOpts').startX + 'px';
    q('compressOpts').style.top = q('compressOpts').startTop + event.clientY - q('compressOpts').startY + 'px';
    q('compressOpts').style.display = 'none';
    q('compressOpts').offsetHeight;
    q('compressOpts').style.display = 'inline-block';
    return false;
}

function searchRequest(hideActiveTab) {
    if (hideActiveTab || hideActiveTab === '') {
        q('descVal').innerHTML = hideActiveTab;
    }
}

function iTypeVal(evalSbTokenVal) {
    if (Util.isNumeric(evalSbTokenVal)) {
        q('compressOpts').style.width = window.parseInt(evalSbTokenVal) + 'px';
    }
}

function reloadTabSource() {
    if (updateSessionRoot() === 'JSON') {
        $('#iWidthVal').hide();
        $('#session2Val').hide();
        $('#evalRegisterValue4Val').show();
        $('#searchTab').show();
    } else {
        $('#iWidthVal').show();
        $('#session2Val').show();
        $('#evalRegisterValue4Val').hide();
        $('#searchTab').hide();
    }
    if (q('copyTabArray').value) {
        Util.enable(q('finalCssClsIdx'));
        Util.enable(q('sessionConfigVal'));
    } else {
        Util.disable(q('finalCssClsIdx'));
        Util.disable(q('sessionConfigVal'));
    }
}

function sDupeVal() {
    iRestoreType(q('copyTabArray'), 47);
}

function bHideURLs() {
    iRestoreType(q('evalSelectedLineitemsVal'), 37);
}

function iRestoreType(iSession2, offset) {
    if (event && event.which == 1) {
        q('compressOpts').style.width = parseInt(iSession2.style.width) + offset + 'px';
    }
}

function effectiveIdx() {
    document.body.removeEventListener('mousemove', bHideURLs, false);
}

function windowMode() {
    document.body.removeEventListener('keydown', conditionVal, false);
}

function bImgShowURLsVal() {
    document.body.removeEventListener('mousemove', sDupeVal, false);
    iContextFrom();
}

function evalSbSessionConfigsVal() {
    document.body.removeEventListener('keydown', toggleWindowMode, false);
    SbUtil.btnCaretBackward();
}

function setWindowSource(sbConfigsVal, iTabVal, iWindow1, btnCaretBackwardVal, arrayToCompare, currentLinkVal, registerTabAction, titleTxt) {
    var formatSessionTab = createElement('div', 'idx1' + sbConfigsVal.id, 'formatImportedSession');
    var allowUserIntActionVal = createElement('div', undefined, (sbConfigsVal.active || sbConfigsVal.selected) && titleTxt ? 'allowUserIntActionVal highlight' : 'allowUserIntActionVal');
    var iModelConfig = createElement('img', 'sheetElsVal' + iTabVal + '_' + iWindow1, 'modelConfigVal');
    if (Util.addTitle() > 1) {
        iModelConfig.setAttribute('src', '/images/retina/x.gif');
    } else {
        iModelConfig.setAttribute('src', '/images/x.gif');
    }
    iModelConfig.dataset.wSeq = iTabVal;
    iModelConfig.dataset.tSeq = iWindow1;
    iModelConfig.addEventListener('click', arrayToCompare, false);
    allowUserIntActionVal.appendChild(iModelConfig);
    iModelConfig = createElement('img', undefined, 'popActiveWindow');
    iModelConfig.setAttribute('src', SbUtil.windowConfig(sbConfigsVal));
    allowUserIntActionVal.appendChild(iModelConfig);
    if (sbConfigsVal.pinned) {
        iModelConfig = createElement('div', undefined, 'revise');
        $(iModelConfig).on('click', function() {
            Util.initPreviousSession(undefined, sbConfigsVal.url, undefined, true, sbConfigsVal.incognito);
            event.preventDefault();
        });
        $(iModelConfig).qtip({
            content: {
                text: 'This tab is pinned'
            },
            position: {
                my: 'bottom center',
                at: 'top center',
                adjust: {
                    y: -9
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
        allowUserIntActionVal.appendChild(iModelConfig);
    }
    var registerValue2Val = createElement('a', undefined, 'registerValue2Val');
    registerValue2Val.textContent = SbUtil.bAppImportVal(sbConfigsVal);
    if (notifyWindowTab) {
        registerValue2Val.innerHTML = iMsVal(registerValue2Val.textContent, refreshTabArray || (refreshTabArray = new RegExp(Util.iBaseDateVal(notifyWindowTab), 'gi')), 'requestWindowTab');
    }
    registerValue2Val.setAttribute('href', sbConfigsVal.url);
    registerValue2Val.addEventListener('click', function() {
        Util.initPreviousSession(sbConfigsVal.id, sbConfigsVal.url, undefined, undefined, sbConfigsVal.incognito);
        event.preventDefault();
    }, false);
    allowUserIntActionVal.appendChild(registerValue2Val);
    if (registerTabAction && SbUtil.notifyActiveTab(sbConfigsVal)) {
        registerValue2Val.style.fontStyle = 'italic';
    }
    formatSessionTab.appendChild(allowUserIntActionVal);
    if (btnCaretBackwardVal) {
        allowUserIntActionVal = createElement('div', undefined, 'updateSessionConfig');
        allowUserIntActionVal.textContent = sbConfigsVal.url;
        if (notifyWindowTab) {
            allowUserIntActionVal.innerHTML = iMsVal(allowUserIntActionVal.textContent, refreshTabArray || (refreshTabArray = new RegExp(Util.iBaseDateVal(notifyWindowTab), 'gi')), 'refreshSessionWindow');
        }
        formatSessionTab.appendChild(allowUserIntActionVal);
    }
    return formatSessionTab;
}

function filterPreviousSession(getRecoverySession) {
    switch (getRecoverySession) {
      case 'RestoreSessionIntoASingleWindow':
        return 'cfAlias';

      case 'RestoreSessionIntoThisWindow':
        return 'getActiveWindow';

      default:
        return 'iWidthOverride';
    }
}

function copyTabState(removedSessionConfigsVal, leafLineitemRenderDelegate, sortVal, iTokenId, adjustActiveSessionTab, arrayToCompare, tokenComponentImg, pTarget, getRecoverySession) {
    var val1 = createElement('div', 'openWindowTab' + removedSessionConfigsVal.id, 'val1');
    if (adjustActiveSessionTab) {
        val1.setAttribute('style', 'margin-top:0px;');
    }
    var sbTailContainer = createElement('img', 'sheetElsVal' + leafLineitemRenderDelegate, 'modelConfigVal');
    if (Util.addTitle() > 1) {
        sbTailContainer.setAttribute('src', '/images/retina/x.gif');
    } else {
        sbTailContainer.setAttribute('src', '/images/x.gif');
    }
    sbTailContainer.dataset.wSeq = leafLineitemRenderDelegate;
    sbTailContainer.addEventListener('click', arrayToCompare, false);
    val1.appendChild(sbTailContainer);
    var bypassSessionMode = document.createElement('a');
    bypassSessionMode.dataset.wid = removedSessionConfigsVal.id;
    var iShowURLsVal;
    if (tokenComponentImg === false) {
        bypassSessionMode.addEventListener('click', function(ev) {
            contentChangedCbVal(leafLineitemRenderDelegate);
            ev.preventDefault();
        }, false);
        iShowURLsVal = '<span class="isRemoveSubheaderVal ' + filterPreviousSession(getRecoverySession) + '">Restore this window</span>';
        bypassSessionMode.setAttribute('class', 'tabAction');
    } else {
        if (tokenComponentImg === removedSessionConfigsVal.id) {
            val1.classList.add('sEnabled');
            iShowURLsVal = 'This is the window you\'re currently viewing';
            bypassSessionMode.setAttribute('class', 'usePStats');
        } else {
            bypassSessionMode.addEventListener('click', function(ev) {
                var that = this;
                Util.iLimitedSetOfWindowsVal(this.dataset.wid, selectWindowTab, leafLineitemRenderDelegate, function(propagateActiveTab) {
                    that.dataset.wid = propagateActiveTab;
                });
                ev.preventDefault();
            }, false);
            iShowURLsVal = 'Navigate to this window';
            bypassSessionMode.setAttribute('class', 'tabAction');
        }
    }
    $(bypassSessionMode).qtip({
        content: {
            text: iShowURLsVal
        },
        position: {
            my: 'left center',
            at: 'right center',
            adjust: {
                x: 5
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
    if (removedSessionConfigsVal.incognito) {
        var iModelConfig = createElement('div', undefined, 'iFirstInList');
        $(iModelConfig).qtip({
            content: {
                text: 'This window is incognito'
            },
            position: {
                my: 'bottom center',
                at: 'top center',
                adjust: {
                    y: -9
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
        val1.appendChild(iModelConfig);
    }
    bypassSessionMode.textContent = SbUtil.requireSessionSource(removedSessionConfigsVal, sortVal);
    val1.appendChild(bypassSessionMode);
    if (iTokenId && iTokenId > 0 && pTarget) {
        var copySavedSession = createElement('span', undefined, 'requestTabAction');
        copySavedSession.textContent = ' (' + iTokenId + ')';
        val1.appendChild(copySavedSession);
    }
    return val1;
}

function iMsVal(txt, re, className) {
    var arr = [], r = '';
    txt.replace(re, function(iWindow2, oMatchedTabs) {
        arr.push({
            string: iWindow2,
            offset: oMatchedTabs
        });
    });
    var cursor = 0, match;
    for (var i = 0; i < arr.length; i++) {
        match = arr[i];
        r += Util.evalSeqProp(txt.substring(cursor, match.offset)) + '<span class="' + className + '">' + Util.evalSeqProp(match.string) + '</span>';
        cursor = match.offset + match.string.length;
    }
    r += Util.evalSeqProp(txt.substring(cursor));
    return r;
}

function foundTabCandidatesVal(maxCountVal, finalCssClsIdxVal, iStringVal) {
    if (Util.isString(maxCountVal)) {
        if (iStringVal && maxCountVal) {
            q('iFinalCssClsVal').innerHTML = iMsVal(maxCountVal, refreshTabArray || (refreshTabArray = new RegExp(Util.iBaseDateVal(notifyWindowTab), 'gi')), 'enableSel');
        } else {
            q('iFinalCssClsVal').textContent = maxCountVal;
        }
    }
    if (finalCssClsIdxVal) {
        adjustTabCount(finalCssClsIdxVal);
    } else {
        evalSelLengthVal();
    }
}

function adjustTabCount(finalCssClsIdxVal) {
    $('#iFinalCssClsVal').qtip({
        content: {
            text: finalCssClsIdxVal
        },
        position: {
            my: 'bottom left',
            at: 'top left',
            adjust: {
                x: 15,
                y: 6
            }
        },
        show: {
            delay: 300
        },
        style: {
            tip: {
                corner: true,
                width: 12,
                mimic: 'bottom center',
                offset: 5
            }
        }
    });
    q('iFinalCssClsVal').classList.add('iWindowId');
    q('iFinalCssClsVal').addEventListener('click', filterActiveTab, false);
    q('iFinalCssClsVal').addEventListener('mouseover', sessionRoot, false);
}

function sessionRoot() {
    $('#iFinalCssClsVal').qtip('enable');
}

function evalSelLengthVal() {
    $('#iFinalCssClsVal').qtip('hide');
    $('#iFinalCssClsVal').qtip('disable');
    q('iFinalCssClsVal').classList.remove('iWindowId');
    q('iFinalCssClsVal').removeEventListener('click', filterActiveTab);
    q('iFinalCssClsVal').removeEventListener('mouseover', sessionRoot);
}

function isNavPanelPositionRight(sbClrVal, evalSbRange) {
    if (sbClrVal || sbClrVal === '') {
        q('currentTime').innerHTML = sbClrVal;
    }
    if (evalSbRange || evalSbRange === '') {
        q('evalSClickOriginDelete').innerHTML = evalSbRange;
    }
}

function syncSession(hexDigitVal, copySessionRoot) {
    iCleanVal = hexDigitVal;
    $('#btnCaretForwardVal').qtip({
        content: {
            text: copySessionRoot
        },
        position: {
            my: 'bottom center',
            at: 'top center',
            adjust: {
                y: -12
            }
        },
        show: {
            delay: 600
        },
        style: {
            tip: {
                corner: true,
                width: 12
            }
        }
    });
}

function overallSpeedVal() {
    $(event.currentTarget).qtip('hide');
    $(event.currentTarget).qtip('disable');
    if (iCleanVal) {
        iCleanVal();
    }
}

function iStartIdxVal(txTypeVal) {
    if (txTypeVal) {
        q('btnCaretForwardVal').style.visibility = 'visible';
        $('#btnCaretForwardVal').qtip('enable');
    } else {
        q('btnCaretForwardVal').style.visibility = 'hidden';
        $('#btnCaretForwardVal').qtip('hide');
        $('#btnCaretForwardVal').qtip('disable');
    }
}

function copyImportedSession(hideActiveTab) {
    if (hideActiveTab || hideActiveTab === '') {
        q('evalSbNm').innerHTML = hideActiveTab;
    }
}

function selectSessionTab(overrideProhibitedRefresh, updateActiveSessionTab, serializeTabConfig, popTotal, syncTabMode, setSessionStat, evalSbClr, chromeSessionBackerVal, updateWindowCache, reg2Val, updateWindowMode, evalOptionDescDisabledVal, objectVal) {
    this.filterTabArray = overrideProhibitedRefresh;
    this.iShiftVal = updateActiveSessionTab == 'right';
    this.resetTabMode = serializeTabConfig;
    this.sessionStatVal = popTotal;
    this.currentWindowState = $(syncTabMode);
    this.sbLink = setSessionStat;
    this.additiveVal = evalSbClr;
    this.dtLog = chromeSessionBackerVal;
    this.hideWindow = updateWindowCache;
    this.cacheSessionState = reg2Val;
    this.updateWindowTitle = updateWindowMode;
    this.donotCache = evalOptionDescDisabledVal;
    this.idx4Val = objectVal;
    var onlyCountDupesVal = 50;
    var tabStat = 327;
    var doSync = 260;
    var evalSequence = 173;
    var moveWindowTab = 67;
    this.augmentSession = false;
    this.debugValRightVal = null;
    var that = this;
    this.iRerender = function() {
        that.sbSessionConfigsVal();
        var offsetX = !that.hideWindow.classList.contains('invisible');
        var sClickOriginDeleteVal = !that.idx4Val.classList.contains('invisible');
        if (sClickOriginDeleteVal && that.sessionStatVal.clientWidth > tabStat + onlyCountDupesVal) {
            that.donotCache.style.maxWidth = that.sessionStatVal.clientWidth - tabStat + 'px';
            that.idx4Val.style.display = that.hideWindow.style.display = '';
            that.cacheSessionState.style.display = that.updateWindowTitle.style.display = 'inline-block';
        } else if (offsetX && that.sessionStatVal.clientWidth > doSync + onlyCountDupesVal) {
            that.donotCache.style.maxWidth = that.sessionStatVal.clientWidth - doSync + 'px';
            that.idx4Val.style.display = 'none';
            that.hideWindow.style.display = '';
            that.cacheSessionState.style.display = that.updateWindowTitle.style.display = 'inline-block';
        } else if (that.sessionStatVal.clientWidth > evalSequence + onlyCountDupesVal) {
            that.donotCache.style.maxWidth = that.sessionStatVal.clientWidth - evalSequence + 'px';
            that.idx4Val.style.display = that.hideWindow.style.display = 'none';
            that.cacheSessionState.style.display = that.updateWindowTitle.style.display = 'inline-block';
        } else if (that.sessionStatVal.clientWidth > moveWindowTab + onlyCountDupesVal) {
            that.donotCache.style.maxWidth = that.sessionStatVal.clientWidth - moveWindowTab + 'px';
            that.idx4Val.style.display = that.hideWindow.style.display = that.cacheSessionState.style.display = 'none';
            that.updateWindowTitle.style.display = 'inline-block';
        } else {
            that.donotCache.style.maxWidth = that.sessionStatVal.clientWidth + 'px';
            that.idx4Val.style.display = that.hideWindow.style.display = that.cacheSessionState.style.display = that.updateWindowTitle.style.display = 'none';
        }
    };
    this.sbSessionConfigsVal = function(addWindowStatus) {
        var normalizeSavedSession = that.sessionStatVal.clientWidth;
        var bw = 10;
        var colorSessionTile = bw + (addWindowStatus || maxCount() ? 340 : 40);
        if (normalizeSavedSession < colorSessionTile) {
            that.currentWindowState.width(normalizeSavedSession - bw);
        } else if (normalizeSavedSession < colorSessionTile + 98) {
            that.currentWindowState.width(normalizeSavedSession - (bw + 55));
        } else if (normalizeSavedSession < colorSessionTile + 145) {
            that.currentWindowState.width(normalizeSavedSession - (bw + 140));
        } else {
            that.currentWindowState.width(normalizeSavedSession - (bw + 190));
        }
    };
    this.sbTokenDeletedCbVal = function(respVal) {
        if (that.iShiftVal) {
            if (that.resetTabMode.clientWidth - respVal < 130) {
                respVal = 130;
            } else if (that.resetTabMode.clientWidth - respVal > 500) {
                respVal = 500;
            } else {
                respVal = that.resetTabMode.clientWidth - respVal - 5;
            }
        } else {
            if (respVal < 130) {
                respVal = 130;
            } else if (respVal > 500) {
                respVal = 500;
            } else {
                respVal = respVal - 5;
            }
        }
        if (that.iShiftVal) {
            that.dtLog.style.width = respVal + 'px';
            that.additiveVal.style.width = respVal - 51 + 'px';
            that.sbLink.style.right = respVal + 'px';
            that.sessionStatVal.style.right = respVal + 10 + 'px';
        } else {
            that.dtLog.style.width = respVal + 'px';
            that.additiveVal.style.width = respVal - 51 + 'px';
            that.sbLink.style.left = respVal + 'px';
            that.sessionStatVal.style.left = respVal + 10 + 'px';
        }
        that.filterTabArray = parseInt(that.dtLog.style.width);
        that.iRerender();
    };
    this.msgSync = function() {
        that.iShiftVal = !that.iShiftVal;
        that.unifyTabLineItems();
    };
    this.appMenuButtonVal = function(updateActiveSessionTab) {
        if (that.iShiftVal != (that.iShiftVal = updateActiveSessionTab == 'right')) {
            that.unifyTabLineItems();
        }
    };
    this.unifyTabLineItems = function() {
        if (that.iShiftVal) {
            that.sessionStatVal.style.left = '0px';
            that.sessionStatVal.style.right = that.filterTabArray + 11 + 'px';
            that.sessionStatVal.style.width = '';
            that.sbLink.style.left = '';
            that.sbLink.style.right = that.filterTabArray + 'px';
            that.sbLink.style.borderLeft = '';
            that.sbLink.style.borderRight = '1px solid hsl(0, 0%, 91%)';
            that.dtLog.style.left = '';
            that.dtLog.style.right = '0px';
            that.dtLog.style.width = that.filterTabArray + 'px';
            that.additiveVal.style.width = that.filterTabArray - 51 + 'px';
            q('suppressOpts').style.padding = '0px 0px 0px 12px';
            q('lnkClearSearch').style.paddingRight = '0px';
            q('lnkClearSearch').style.marginRight = '0px';
            q('evalSbNm').style.marginRight = '2px';
            q('evalSbNm').style.marginLeft = '12px';
            q('lnkClearSearch').setAttribute('pp', 'right');
            q('iSpeed').style.marginRight = '2px';
            q('iSpeed').style.marginLeft = '11px';
            q('assessStyleVal').style.marginRight = '2px';
            q('assessStyleVal').style.marginLeft = '11px';
            q('processSessionState').style.marginLeft = '0px';
            q('processSessionState').style.marginRight = '0px';
            q('iCountVal').style.right = '3px';
            q('stopAnim').style.right = '149px';
            q('initTabLayout').style.right = '48px';
            q('iBaseDate').style.right = '2px';
            q('iUrl').style.right = '2px';
            q('iFinalCssClsVal').style.marginLeft = '9px';
            q('session2WindowIdx').style.right = '2px';
            that.additiveVal.style.left = '11px';
        } else {
            that.dtLog.style.left = '0px';
            that.dtLog.style.right = '';
            that.dtLog.style.width = that.filterTabArray + 'px';
            that.additiveVal.style.width = that.filterTabArray - 51 + 'px';
            that.sbLink.style.left = that.filterTabArray + 'px';
            that.sbLink.style.right = '';
            that.sbLink.style.borderRight = '';
            that.sbLink.style.borderLeft = '1px solid hsl(0, 0%, 91%)';
            that.sessionStatVal.style.left = that.filterTabArray + 11 + 'px';
            that.sessionStatVal.style.right = '0px';
            that.sessionStatVal.style.width = '';
            q('suppressOpts').style.padding = '0px 0px 0px 9px';
            q('lnkClearSearch').style.paddingRight = '0px';
            q('lnkClearSearch').style.marginRight = '0px';
            q('lnkClearSearch').setAttribute('pp', 'left');
            q('evalSbNm').style.marginRight = '';
            q('evalSbNm').style.marginLeft = '';
            q('iSpeed').style.marginRight = '11px';
            q('iSpeed').style.marginLeft = '5px';
            q('assessStyleVal').style.marginRight = '11px';
            q('assessStyleVal').style.marginLeft = '0px';
            q('processSessionState').style.marginLeft = '0px';
            q('processSessionState').style.marginRight = '0px';
            q('iCountVal').style.right = '11px';
            q('stopAnim').style.right = '158px';
            q('initTabLayout').style.right = '57px';
            q('iBaseDate').style.right = '12px';
            q('iUrl').style.right = '12px';
            q('iFinalCssClsVal').style.marginLeft = '0';
            q('session2WindowIdx').style.right = '13px';
            that.additiveVal.style.left = '10px';
        }
        that.resetTabMode.style.display = 'block';
    };
    window.addEventListener('resize', function() {
        that.iRerender();
    }, false);
    that.unifyTabLineItems();
    that.iRerender();
}

function parseCurrentSession(evalSbTailContainer, seqProp) {
    if (seqProp) {
        iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
            iPredicateVal.SBDB.expectStatusVal(evalSbTailContainer, true, function(selTypeVal) {
                if (!selTypeVal || !Util.isNumeric(selTypeVal)) {
                    iPredicateVal.SBDB.resetIcon(evalSbTailContainer, window.parseInt(iChildCount) + 10, function() {
                        seqProp(false);
                    });
                } else {
                    seqProp(window.parseInt(selTypeVal) > -1 && window.parseInt(selTypeVal) < window.parseInt(iChildCount));
                }
            });
        });
    }
}

function copyWindow(evalSbTailContainer, queue, seqProp) {
    iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
        iPredicateVal.SBDB.resetIcon(evalSbTailContainer, window.parseInt(iChildCount) + queue, seqProp);
    });
}

function setSessionSource(evalSbTailContainer, queue) {
    iPredicateVal.SBDB.expectStatusVal('seqInterpolation2', true, function(iChildCount) {
        iPredicateVal.SBDB.expectStatusVal(evalSbTailContainer, true, function(selTypeVal) {
            if (selTypeVal > -1 && queue > window.parseInt(selTypeVal) - window.parseInt(iChildCount)) {
                iPredicateVal.SBDB.resetIcon(evalSbTailContainer, window.parseInt(iChildCount) + queue);
            }
        });
    });
}

function saveVal(evalSbTailContainer, seqProp) {
    iPredicateVal.SBDB.resetIcon(evalSbTailContainer, -1, seqProp);
}