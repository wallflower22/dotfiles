/* Copyright (c) 2015 Session Buddy */

console.log('LOAD ' + new Date().toLocaleTimeString());

console.log('-----------------------------');

var installationID, doNotSync, evalSbLocaleDescVal, iTokenComponent, SBDB, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, updateTabUrl = false, iTagNm = false;

function requestCurrentWindow(evalOptDefaultRTypeVal) {
    SBDB.iApplicationEx(undefined, function(windowIdx) {
        if (windowIdx) {
            if (windowIdx.action === 'createTabList') {
                popTabTitle({
                    id: 'showActiveSessionTab'
                });
                SBDB.appMsgVal(Util.severityVal(windowIdx.register1), false, function(cacheIcon) {
                    SBDB.idx7Val(undefined, Util.severityVal(windowIdx.register1), function(setMatchText) {
                        var keepActionOpenVal = optProp(setMatchText.rows);
                        SBDB.addCurrentSessionSource(undefined, Util.severityVal(windowIdx.register1), function(initSessionConfig) {
                            keepActionOpenVal = keepActionOpenVal.concat(createCurrentWindow(initSessionConfig.rows));
                            popTabTitle({
                                id: 'propagateImportedSession',
                                data: {
                                    iRegisterValue3: keepActionOpenVal,
                                    sbTokenAddedCbVal: false,
                                    iTabId: Util.severityVal(windowIdx.register2),
                                    iStartCountingAt: Util.severityVal(windowIdx.register3)
                                },
                                iBackwards: evalOptDefaultRTypeVal
                            });
                            popTabTitle({
                                id: 'propagateImportedSession',
                                data: {
                                    iRegisterValue3: keepActionOpenVal
                                },
                                fctRefVal: evalOptDefaultRTypeVal
                            });
                        });
                    });
                });
            } else if (windowIdx.action === 'evalRegisterValue2Val') {
                popTabTitle({
                    id: 'showActiveSessionTab'
                });
                SBDB.appMsgVal([Util.severityVal(windowIdx.register2)], true, function(cacheIcon) {
                    SBDB.appMsgVal(Util.severityVal(windowIdx.register1), false, function(cacheIcon) {
                        SBDB.idx7Val(undefined, Util.severityVal(windowIdx.register1), function(setMatchText) {
                            var keepActionOpenVal = optProp(setMatchText.rows);
                            SBDB.addCurrentSessionSource(undefined, Util.severityVal(windowIdx.register1), function(initSessionConfig) {
                                keepActionOpenVal = keepActionOpenVal.concat(createCurrentWindow(initSessionConfig.rows));
                                popTabTitle({
                                    id: 'iChildCountVal',
                                    data: {
                                        evalSbTokenDeletedCb: [Util.severityVal(windowIdx.register2)],
                                        iOnlyCountDupes: keepActionOpenVal,
                                        sbTokenAddedCbVal: true,
                                        iTabId: Util.severityVal(windowIdx.register2),
                                        iStartCountingAt: Util.severityVal(windowIdx.register3),
                                        sActionPendingVal: true
                                    },
                                    iBackwards: evalOptDefaultRTypeVal
                                });
                                popTabTitle({
                                    id: 'iChildCountVal',
                                    data: {
                                        evalSbTokenDeletedCb: [Util.severityVal(windowIdx.register2)],
                                        iOnlyCountDupes: keepActionOpenVal
                                    },
                                    fctRefVal: evalOptDefaultRTypeVal
                                });
                            });
                        });
                    });
                });
            } else if (windowIdx.action === 'iSearchTermsVal') {
                popTabTitle({
                    id: 'stopAnimationVal',
                    data: {
                        windows: Util.severityVal(windowIdx.register1),
                        extractWindowTitle: Util.severityVal(windowIdx.register2)
                    },
                    iBackwards: evalOptDefaultRTypeVal
                });
                popTabTitle({
                    id: 'showActiveSessionTab'
                });
            }
        }
    });
}

function evalSessionRoot(evalOptDefaultRTypeVal, seqProp) {
    var bMerge = '';
    var iRangeVal = [];
    if (evalOptDefaultRTypeVal) {
        bMerge = 'DELETE FROM Undo WHERE tabIdentifier=?';
        iRangeVal = [evalOptDefaultRTypeVal];
    } else {
        bMerge = 'DELETE FROM Undo';
        iRangeVal = [];
    }
    SBDB.nmVal.db.transaction(function(tx) {
        tx.executeSql(bMerge, iRangeVal, function(tx, setMatchText) {
            if (seqProp) {
                seqProp();
            }
        }, function(tx, sqlErr) {
            SbUtil.windowStartIdx(sqlErr, 2, SbUtil.sessionMode, '87534360394');
        });
    });
}

function iLinear(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache) {
    evalSessionRoot(undefined, function() {
        timerToCall(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache);
    });
}

function sbNodeRanges(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache) {
    evalSessionRoot(evalOptDefaultRTypeVal, function() {
        timerToCall(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache);
    });
}

function timerToCall(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache) {
    SBDB.lastFrameVal(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache);
}

function createCurrentWindow(data6) {
    var iOffsetVal = [];
    if (data6) {
        for (var i = 0; i < data6.length; i++) {
            iOffsetVal.push(SbUtil.sbLinkVal('previous', data6.item(i).id, undefined, undefined, undefined, data6.item(i).recordingDateTime, data6.item(i).unfilteredWindowCount, data6.item(i).filteredWindowCount, data6.item(i).unfilteredTabCount, data6.item(i).filteredTabCount));
        }
    }
    return iOffsetVal;
}

function optProp(data6) {
    var iOffsetVal = [];
    if (data6) {
        for (var i = 0; i < data6.length; i++) {
            iOffsetVal.push(SbUtil.sbLinkVal('saved', data6.item(i).id, undefined, undefined, data6.item(i).name, data6.item(i).modificationDateTime, data6.item(i).unfilteredWindowCount, data6.item(i).filteredWindowCount, data6.item(i).unfilteredTabCount, data6.item(i).filteredTabCount));
        }
    }
    return iOffsetVal;
}

function setUpSBDB(iWindowCount, cacheImportedSession) {
    var arr = [];
    arr.push('CREATE TABLE IF NOT EXISTS Settings (key TEXT PRIMARY KEY, value NUMERIC)');
    arr.push(sSet('dbSetupStatus', 10, true));
    arr.push(sSet('dbSetupStatusTimeStamp', new Date().toJSON(), true));
    arr.push(sSet('installationID', uuid.v4()));
    arr.push(sSet('installationTimeStamp', new Date().toJSON()));
    arr.push(sSet('mergedSessionNameIncrement', 1));
    arr.push(sSet('versionMessageReceived', ''));
    arr.push('CREATE TABLE IF NOT EXISTS UserSettings (key TEXT PRIMARY KEY, value NUMERIC)');
    arr.push(usSet('dateDisplayType', 'relative'));
    arr.push(usSet('sessionSummaryRender_PreviousSessionQueueSize', 3));
    arr.push(usSet('sessionSummaryRender_PanelPosition', 'left'));
    arr.push(usSet('sessionSummaryRender_PanelWidth', '260'));
    arr.push(usSet('sessionSummaryRender_ShowAnnotation', 'true'));
    arr.push(usSet('sessionRender_RenderSessionURL', 'false'));
    arr.push(usSet('sessionRender_ShowAdminTabsInItalic', 'false'));
    arr.push(usSet('sessionRender_ShowDateGroupHeadersInNavigationPane', 'false'));
    arr.push(usSet('sessionRender_ShowSessionCountsInNavigationPane', 'false'));
    arr.push(usSet('sessionRender_ShowFocusedItemsInBold', 'false'));
    arr.push(usSet('sessionMerge_WarnOnMerge', 'true'));
    arr.push(usSet('sessionSave_AskForName', 'true'));
    arr.push(usSet('sessionEdit_HideDuplicateTabsInMerge', 'true'));
    arr.push(usSet('customDateFormat', ''));
    arr.push(usSet('appMode', ''));
    arr.push(usSet('sessionEdit_IgnoreUrlParamsInTabCompare', 'false'));
    arr.push(usSet('sessionSave_ShowSaveCurrentInRightClickMenus', 'true'));
    arr.push(usSet('enableKeyboardShortcuts', 'true'));
    arr.push(usSet('sessionRender_ShowExtensionBadge', 'false'));
    arr.push(usSet('tabFiltering_FilterSessionBuddyTabs', 'true'));
    arr.push(usSet('tabFiltering_FilterChromeAdministrativeTabs', 'false'));
    arr.push(usSet('sessionExport_ShowWindows', 'false'));
    arr.push(usSet('sessionExport_ShowTitles', 'false'));
    arr.push(usSet('sessionExport_ShowURLs', 'true'));
    arr.push(usSet('sessionExport_Format', 'Text'));
    arr.push(usSet('sessionRestore_DefaultRestoreType', 'RestoreSessionIntoASetOfWindows'));
    arr.push('CREATE TABLE IF NOT EXISTS Undo (id INTEGER PRIMARY KEY AUTOINCREMENT, creationDateTime NUMERIC, tabIdentifier TEXT, action TEXT, description TEXT, register1 TEXT, register2 TEXT, register3 TEXT, register4 TEXT, register5 TEXT)');
    arr.push('CREATE TABLE IF NOT EXISTS SavedSessions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, generationDateTime NUMERIC, creationDateTime NUMERIC, modificationDateTime NUMERIC, tags TEXT, users TEXT, deleted TEXT, thumbnail TEXT, windows TEXT, unfilteredWindowCount INTEGER, filteredWindowCount INTEGER, unfilteredTabCount INTEGER, filteredTabCount INTEGER)');
    arr.push('CREATE TABLE IF NOT EXISTS PreviousSessions (id INTEGER PRIMARY KEY AUTOINCREMENT, recordingDateTime NUMERIC, creationDateTime NUMERIC, users TEXT, deleted TEXT, thumbnail TEXT, windows TEXT, unfilteredWindowCount INTEGER, filteredWindowCount INTEGER, unfilteredTabCount INTEGER, filteredTabCount INTEGER)');
    arr.push('UPDATE Settings SET value=20 WHERE key=\'dbSetupStatus\'');
    arr.push('UPDATE Settings SET value=\'' + new Date().toJSON() + '\' WHERE key=\'dbSetupStatusTimeStamp\'');
    iWindowCount.nmVal.suppressSel(arr, cacheImportedSession, function(tx, err) {
        SbUtil.windowStartIdx(err, 2, SbUtil.sessionMode, '489302834');
        return true;
    });
}

function sSet(k, v, overwrite) {
    return kvInsert(k, v, 'Settings', overwrite);
}

function usSet(k, v) {
    return kvInsert(k, v, 'UserSettings');
}

function kvInsert(k, v, table, overwrite) {
    if (Util.isString(v)) {
        v = '\'' + v + '\'';
    }
    return 'INSERT OR ' + (overwrite ? 'REPLACE' : 'IGNORE') + ' INTO ' + table + ' (key, value) VALUES (\'' + k + '\', ' + v + ')';
}

function popSessionConfig() {
    try {
        moment.locale([window.navigator.language, 'en-US']);
        SBDB.iSessionStorageKeyVal(function(s) {
            SbUtil.copyTabTitle = s;
            SBDB.setSessionWindow(function(evalSelectedLineitems) {
                SbUtil.dateDisplayType = evalSelectedLineitems;
                SBDB.nm(function(format) {
                    SbUtil.customDateFormat = format;
                    bShowURLsVal(function(instID) {
                        installationID = instID;
                        SBDB.installationID = instID;
                        evalSessionRoot(undefined, function() {
                            sortCurrentTab(function(sbTab) {
                                SbUtil.iFormat(function() {
                                    evalSDupeVal(function() {
                                        SBDB.sessionConfigsAllVal(function(positionCurrentWindow) {
                                            if (positionCurrentWindow > 0) {
                                                console.log(positionCurrentWindow + (positionCurrentWindow === 1 ? ' session reaped.' : ' sessions reaped.'));
                                            }
                                            SbUtil.setWindow(function() {
                                                tblPlace();
                                                updateTabUrl = true;
                                                if (!SbUtil.iExpectStatusVal) {
                                                    showTab(function() {
                                                        codeVal(addedConfigsVal);
                                                    });
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
    } catch (ex) {
        SbUtil.windowStartIdx(ex, 2, SbUtil.sessionMode, '20349802938');
    }
}

function bShowURLsVal(seqProp) {
    SBDB.expectStatusVal('installationID', true, function(installationID) {
        var normalizeTabAliases = !installationID;
        installationID = installationID || uuid.v4();
        SBDB.expectStatusVal('guidGen', true, function(iFlashSessionVal) {
            if (!iFlashSessionVal) {
                SBDB.nmVal.db.transaction(function(tx) {
                    tx.executeSql('SELECT id FROM PreviousSessions', null, function(tx, data) {
                        var arr = [];
                        for (var i = 0; i < data.rows.length; i++) {
                            arr.push('UPDATE PreviousSessions SET thumbnail=\'' + sessionConfigsVal(data.rows.item(i).id) + '\' WHERE id=' + data.rows.item(i).id + ' AND (thumbnail IS NULL OR thumbnail=\'\')');
                        }
                        SBDB.nmVal.suppressSel(arr, function(tx, rowsAffected) {
                            console.log('Generated ' + rowsAffected + ' Previous Session guids');
                            tx.executeSql('SELECT id FROM SavedSessions', null, function(tx, data) {
                                var arr = [];
                                for (var i = 0; i < data.rows.length; i++) {
                                    arr.push('UPDATE SavedSessions SET thumbnail=\'' + sessionConfigsVal(data.rows.item(i).id) + '\' WHERE id=' + data.rows.item(i).id + ' AND (thumbnail IS NULL OR thumbnail=\'\')');
                                }
                                SBDB.nmVal.suppressSel(arr, function(tx, rowsAffected) {
                                    console.log('Generated ' + rowsAffected + ' Saved Session guids');
                                    SBDB.resetIcon('guidGen', +new Date());
                                    if (normalizeTabAliases) {
                                        SBDB.resetIcon('installationID', installationID, function() {
                                            finish(installationID);
                                        });
                                    } else {
                                        finish(installationID);
                                    }
                                }, function(tx, sqlErr) {
                                    SbUtil.windowStartIdx(sqlErr, 2, SbUtil.sessionMode, '28942348');
                                });
                            }, function(tx, sqlErr) {
                                SbUtil.windowStartIdx(sqlErr, 2, SbUtil.sessionMode, '28942347');
                            });
                        }, function(tx, sqlErr) {
                            SbUtil.windowStartIdx(sqlErr, 2, SbUtil.sessionMode, '28942350');
                        });
                    }, function(tx, sqlErr) {
                        SbUtil.windowStartIdx(sqlErr, 2, SbUtil.sessionMode, '28942349');
                    });
                });
            } else {
                if (normalizeTabAliases) {
                    SBDB.resetIcon('installationID', installationID, function() {
                        finish(installationID);
                    });
                } else {
                    finish(installationID);
                }
            }
        });
    });
    function finish(installationID) {
        SBDB.expectStatusVal('userDistributionIndex', true, function(iStateVal) {
            if (!iStateVal) {
                SBDB.resetIcon('userDistributionIndex', Math.floor(Math.random() * 100) + 1);
            }
        });
        if (seqProp) {
            seqProp(installationID);
        }
    }
}

function sortCurrentTab(seqProp) {
    var wins;
    SBDB.iWindowIdVal(function(txtComponentMain) {
        if (txtComponentMain) {
            SbUtil.iSession2WindowIdxVal(function(activeWindow) {
                if (activeWindow && activeWindow !== '[]' && (wins = Util.severityVal(activeWindow)) && Util.isArray(wins) && wins.length && wins[0].hasOwnProperty('tabs') && wins[0].tabs.length) {
                    SbUtil.appActionCoordinateVal(function(iExpectStatus) {
                        SbUtil.currentSessionSrc(Util.severityVal(activeWindow), undefined, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
                            SBDB.selActionTypeVal(Util.severityVal(activeWindow), iExpectStatus, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(sbTab) {
                                if (sbTab || sbTab === 0) {
                                    console.log('Generated Previous Session ' + sbTab + '; unfiltered windows: ' + doc + ', filtered windows: ' + registerSessionSource + ', unfiltered tabs: ' + renderActiveSessionTab + ', filtered tabs: ' + showActiveTab);
                                }
                                if (seqProp) {
                                    seqProp(sbTab);
                                }
                            });
                        });
                    });
                } else {
                    if (seqProp) {
                        seqProp(null);
                    }
                }
            });
        } else {
            if (seqProp) {
                seqProp(null);
            }
        }
    });
}

function showTab(seqProp) {
    SbUtil.evalSbRegExp(function(addWindowState, isSessionConfigSaved) {
        BrowserAPI.setBrowserIcon(addWindowState, isSessionConfigSaved);
        if (seqProp) {
            seqProp();
        }
    });
}

function tblPlace() {
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.id === 'evalOutMatchedTabUrls') {
            chrome.tabs.update(sender.tab.id, {
                active: true
            });
        }
    });
    chrome.tabs.onAttached.addListener(deleteCount);
    chrome.tabs.onDetached.addListener(deleteCount);
    chrome.tabs.onMoved.addListener(deleteCount);
    if (chrome.tabs.onSelectionChanged) {
        chrome.tabs.onSelectionChanged.addListener(evalSClickOriginDeleteVal);
    } else if (chrome.tabs.onActiveChanged) {
        chrome.tabs.onActiveChanged.addListener(evalSClickOriginDeleteVal);
    }
    chrome.tabs.onCreated.addListener(function() {
        deleteCount();
        queueVal();
    });
    chrome.tabs.onRemoved.addListener(function() {
        evalSClickOriginDeleteVal();
        queueVal();
    });
    chrome.tabs.onUpdated.addListener(function() {
        deleteCount();
        queueVal();
    });
    chrome.windows.onCreated.addListener(function() {
        if (iTagNm) {
            iTagNm = false;
            sortCurrentTab(deleteCount);
        } else {
            deleteCount();
        }
    });
    chrome.windows.onRemoved.addListener(function(iOffset) {
        BrowserAPI.getAllWindows(function(wins) {
            if (wins.length === 0) {
                clearTimeout(doNotSync);
                iTagNm = true;
            } else {
                evalSClickOriginDeleteVal();
            }
        });
    });
}

function deleteCount(offsetY) {
    clearTimeout(doNotSync);
    clearTimeout(evalSbLocaleDescVal);
    SBDB.iWindowIdVal(offsetY ? selSelModeVal : primaryNode);
    evalSbLocaleDescVal = setTimeout(sortCurrentSession, 2e3);
}

function primaryNode(txtComponentMain) {
    if (txtComponentMain) {
        doNotSync = setTimeout(addedConfigsVal, 2e3);
    }
}

function selSelModeVal(txtComponentMain) {
    if (txtComponentMain) {
        doNotSync = setTimeout(addedConfigsVal, 3e4);
    }
}

function evalSClickOriginDeleteVal() {
    deleteCount(true);
}

function addedConfigsVal() {
    clearTimeout(doNotSync);
    BrowserAPI.getAllWindowsAndTabs(iCaret);
}

function iCaret(iSession1Val) {
    SbUtil.unifyCurrentSession(iSession1Val);
}

function sortCurrentSession() {
    clearTimeout(evalSbLocaleDescVal);
    BrowserAPI.getAllWindowsAndTabs(reloadSessionRoot);
}

function reloadSessionRoot(iSession1Val) {
    chrome.extension.sendMessage({
        id: 'augmentWindowArray',
        data: {
            windows: iSession1Val,
            date: +new Date()
        }
    });
}

function queueVal() {
    clearTimeout(iTokenComponent);
    iTokenComponent = setTimeout(codeVal, 500);
}

function codeVal(seqProp) {
    clearTimeout(iTokenComponent);
    if (seqProp) {
        SbUtil.evalSelLength(function(unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount) {
            bodyNoSel(unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount);
            seqProp();
        });
    } else {
        SbUtil.evalSelLength(bodyNoSel);
    }
}

function bodyNoSel(unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount) {
    if (unfilteredWindowCount != window.unfilteredWindowCount || filteredWindowCount != window.filteredWindowCount || unfilteredTabCount != window.unfilteredTabCount || filteredTabCount != window.filteredTabCount) {
        SbUtil.firstInList(unfilteredTabCount, filteredTabCount);
        chrome.extension.sendMessage({
            id: 'dirty',
            data: {
                unfilteredWindowCount: unfilteredWindowCount,
                filteredWindowCount: filteredWindowCount,
                unfilteredTabCount: unfilteredTabCount,
                filteredTabCount: filteredTabCount,
                date: +new Date()
            }
        });
        window.unfilteredWindowCount = unfilteredWindowCount;
        window.filteredWindowCount = filteredWindowCount;
        window.unfilteredTabCount = unfilteredTabCount;
        window.filteredTabCount = filteredTabCount;
    }
}

function resetTabUrl() {
    if (SbUtil.iExpectStatusVal) {
        chrome.tabs.create({
            url: 'status.html'
        });
    } else if (updateTabUrl) {
        BrowserAPI.getCurrentWindowAndTabs(function(w) {
            if (w.incognito) {
                setTimeout(function() {
                    chrome.windows.getAll({
                        populate: true
                    }, function(wins) {
                        var iTextVal;
                        for (var i = 0; i < wins.length; i++) {
                            if (!wins[i].incognito) {
                                iTextVal = wins[i].id;
                                for (var j = 0; j < wins[i].tabs.length; j++) {
                                    if (SbUtil.iNumber(wins[i].tabs[j])) {
                                        BrowserAPI.activateTabAndFocusWindow(wins[i].tabs[j]);
                                        return;
                                    }
                                }
                            }
                        }
                        if (!Util.isUndefined(iTextVal)) {
                            chrome.tabs.create({
                                windowId: iTextVal,
                                url: 'main.html'
                            });
                        } else {
                            chrome.windows.create({
                                url: 'main.html',
                                focused: true
                            });
                        }
                    });
                }, 50);
            } else {
                for (var i = 0; i < w.tabs.length; i++) {
                    if (SbUtil.iNumber(w.tabs[i])) {
                        chrome.tabs.update(w.tabs[i].id, {
                            active: true
                        });
                        return;
                    }
                }
                chrome.tabs.query({
                    currentWindow: true,
                    active: true
                }, function(t) {
                    if (t.length === 1 && t[0].url === 'chrome://newtab/') {
                        chrome.tabs.update({
                            url: 'main.html'
                        });
                    } else {
                        chrome.tabs.create({
                            url: 'main.html'
                        });
                    }
                });
            }
        });
    }
}

function evalSbAnimSpeedVal() {
    initCurrentTab();
    SbUtil.processSessionTransactions();
}

function initCurrentTab() {
    BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
        Util.tabStatVal(iSession1Val, function(iSession1Val) {
            SbUtil.currentSessionSrc(iSession1Val, undefined, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
                SBDB.evalRespVal(iSession1Val, undefined, new Date().toJSON(), doc, registerSessionSource, renderActiveSessionTab, showActiveTab, function(sbTab, creationDateTime) {
                    if (sbTab || sbTab === 0) {
                        try {
                            SbUtil.dropOverlays(true);
                            chrome.extension.sendMessage({
                                id: 'propagateImportedSession',
                                data: {
                                    iRegisterValue3: [{
                                        id: sbTab,
                                        type: 'saved',
                                        utcDateString: creationDateTime,
                                        name: undefined,
                                        unfilteredWindowCount: doc,
                                        filteredWindowCount: registerSessionSource,
                                        unfilteredTabCount: renderActiveSessionTab,
                                        filteredTabCount: showActiveTab
                                    }]
                                }
                            });
                        } catch (ex) {
                            console.error(ex);
                        }
                    }
                });
            });
        });
    });
}

function evalSDupeVal(seqProp) {
    SBDB.findSession(function(value) {
        if (value) {
            SbUtil.iExclusiveVal(evalSbAnimSpeedVal, seqProp);
        } else {
            SbUtil.showTabState(seqProp);
        }
    });
}

function matchTextVal(iSessionStorageKey) {
    q('b').value = iSessionStorageKey;
    if (q('b').value.length > 0) {
        q('b').select();
        document.execCommand('copy');
        return true;
    }
    return false;
}

function popTabTitle(createWindowSource, seqProp) {
    if (seqProp) {
        chrome.extension.sendMessage(createWindowSource, seqProp);
    } else {
        chrome.extension.sendMessage(createWindowSource);
    }
}

function debug() {
    SbUtil.requireCurrentSessionSource('debug');
}

function nodebug() {
    SbUtil.requireCurrentSessionSource('');
}

function sessionConfigsVal(seq) {
    return +new Date() + '.' + (seq || 0) + '_' + (installationID || uuid.v4()) + '.' + uuid.v4();
}

var iterationSeries = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1e3, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 11e3, 12e3, 13e3, 14e3, 15e3, 16e3, 17e3, 18e3, 19e3, 2e4, 3e4, 4e4, 5e4];

var querySessionAction;

(function() {
    var u = chrome.runtime.getManifest();
    if (u && u.content_security_policy) {
        u = u.content_security_policy.match('https?://.*?(?=;)');
        if (u && u.length && u[0].length) {
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments);
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, 'script', u[0] + '/analytics.js', 'ga');
            ga('create', 'UA-57872757-3', 'auto');
            ga('set', 'checkProtocolTask', function() {});
            querySessionAction = function(name, value) {
                if (value) {
                    var label;
                    for (var i = 0; i < iterationSeries.length; i++) {
                        if (value <= iterationSeries[i]) {
                            label = (i === 0 ? '1' : iterationSeries[i - 1] + 1) + '-' + iterationSeries[i];
                            break;
                        }
                    }
                    if (!label) {
                        label = iterationSeries[iterationSeries.length - 1] + '+';
                    }
                    ga('send', 'event', 'segment', name, label, value, {
                        nonInteraction: 1
                    });
                    return true;
                }
            };
        }
    }
    ga = window.ga || function() {};
    querySessionAction = querySessionAction || function() {};
    chrome.browserAction.onClicked.addListener(resetTabUrl);
    try {
        SbUtil.txtGroupNm(SBDB = new popSession(), function() {
            SBDB.isConfigured(function(c) {
                if (c) {
                    SBDB.expectStatusVal('dbSetupStatus', function(v) {
                        if (v == 20 || v == 22 || v == 25) {
                            popSessionConfig();
                        } else {
                            SbUtil.windowStartIdx({
                                message: 'Unexpected dbSetupStatus: ' + v,
                                type: 'SB'
                            }, 2, SbUtil.sessionMode, '703095823');
                        }
                    });
                } else {
                    setUpSBDB(SBDB, popSessionConfig);
                }
            });
        });
    } catch (ex) {
        SbUtil.windowStartIdx(ex, 2, SbUtil.sessionMode, '103948101');
    }
})();