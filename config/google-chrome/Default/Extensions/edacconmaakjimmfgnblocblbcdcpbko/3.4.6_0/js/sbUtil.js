/* Copyright (c) 2015 Session Buddy */

(function() {
    var requestTabTransactions;
    var SBDB = null;
    var SbUtil = this.SbUtil = {
        dateDisplayType: 'standard',
        customDateFormat: 'LLLL',
        iExpectStatusVal: null,
        moveRequiredVal: {
            isLocked: false
        },
        sessionMode: false,
        copyTabTitle: false,
        iSession2WindowIdxVal: function(seqProp) {
            seqProp(localStorage.getItem('cachedSession'));
        },
        appActionCoordinateVal: function(seqProp) {
            seqProp(localStorage.getItem('cachedSessionTimeStamp'));
        },
        unifyCurrentSession: function(iSession1Val, iMsgVal) {
            if (iSession1Val) {
                localStorage.setItem('cachedSession', JSON.stringify(iSession1Val));
                localStorage.setItem('cachedSessionTimeStamp', iMsgVal || new Date().toJSON());
            }
        },
        removeCurrentWindow: function() {
            localStorage.setItem('cachedSession', '');
            localStorage.setItem('cachedSessionTimeStamp', '');
        },
        txtGroupNm: function(errorDetails2, seqProp) {
            SBDB = errorDetails2;
            if (seqProp) {
                seqProp();
            }
        },
        requireCurrentSessionSource: function(augmentTabList, prop) {
            if (augmentTabList && augmentTabList.trim().toLowerCase() === 'debug') {
                SbUtil.sessionMode = true;
                BrowserAPI.setBrowserIcon('logo_38x38_dev.png', 'logo_38x38_dev.png');
            } else {
                SbUtil.sessionMode = false;
                BrowserAPI.setBrowserIcon('logo_38x38.png', 'logo_38x38.png');
            }
            SBDB.sessionMode = SbUtil.sessionMode;
            if (!prop) {
                BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                    for (var i = 0; i < iSession1Val.length; i++) {
                        for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                            if (SbUtil.iNumber(iSession1Val[i].tabs[j])) {
                                chrome.tabs.reload(iSession1Val[i].tabs[j].id);
                            }
                        }
                    }
                });
            }
        },
        btnCaretBackward: function() {
            SbUtil.moveRequiredVal.isLocked = false;
        },
        pollSaveTrigger: function() {
            if (!SbUtil.moveRequiredVal.isLocked) {
                return SbUtil.moveRequiredVal.isLocked = true;
            }
            return false;
        },
        iNumber: function(sbConfigsVal) {
            return sbConfigsVal.url.selMode(BrowserAPI.getURL('main.html')) || sbConfigsVal.url.selMode(BrowserAPI.getURL('mainUI.html')) || sbConfigsVal.url.selMode(BrowserAPI.getURL('m.html'));
        },
        filterWindowTitle: function(sbConfigsVal) {
            return sbConfigsVal.url.selMode(BrowserAPI.getURL('status.html'));
        },
        notifyActiveTab: function(sbConfigsVal) {
            return SbUtil.iNumber(sbConfigsVal) || Util.dedupeSessions(sbConfigsVal);
        },
        statusCode: function(distributionIdx, sbIdxVal) {
            if (sbIdxVal) {
                return 'http://sessionbuddy.com/' + distributionIdx;
            } else {
                return BrowserAPI.getURL(distributionIdx);
            }
        },
        windowConfig: function(sbConfigsVal, sbIdxVal) {
            var menuLink, pb = 'images/';
            if (Util.addTitle() > 1) {
                pb += 'retina/';
            }
            if (SbUtil.sessionMode) {
                menuLink = SbUtil.statusCode(pb + 'default.png');
            } else {
                menuLink = sbConfigsVal.favIconUrl || sbConfigsVal.nx_googleFallbackFavIconUrl;
            }
            if (Util.addCurrentWindow(sbConfigsVal)) {
                menuLink = SbUtil.statusCode(pb + 'b.png', sbIdxVal);
            } else if (Util.dedupeSessions(sbConfigsVal)) {
                if (sbConfigsVal.url.selMode('chrome://chrome/extensions') || sbConfigsVal.url.selMode('chrome://settings/extensions') || sbConfigsVal.url.selMode('chrome://extensions')) {
                    menuLink = SbUtil.statusCode(pb + 'e.png', sbIdxVal);
                } else if (sbConfigsVal.url.selMode('chrome://chrome/settings') || sbConfigsVal.url.selMode('chrome://settings/browser') || sbConfigsVal.url.selMode('chrome://settings/')) {
                    menuLink = SbUtil.statusCode(pb + 'sc.png', sbIdxVal);
                } else if (sbConfigsVal.url.selMode('chrome://history') || sbConfigsVal.url.selMode('chrome://chrome/history')) {
                    menuLink = SbUtil.statusCode(pb + 'h.png', sbIdxVal);
                } else if (sbConfigsVal.url.selMode('chrome://downloads')) {
                    menuLink = SbUtil.statusCode(pb + 'j.png', sbIdxVal);
                } else {
                    menuLink = SbUtil.statusCode(pb + 'c.png', sbIdxVal);
                }
            } else if (SbUtil.iNumber(sbConfigsVal) || SbUtil.filterWindowTitle(sbConfigsVal)) {
                if (Util.addTitle() > 1) {
                    menuLink = SbUtil.statusCode('images/logo/_ACTIVE/logo_32x32.png', sbIdxVal);
                } else {
                    menuLink = SbUtil.statusCode('images/logo/_ACTIVE/logo_16x16.png', sbIdxVal);
                }
            } else if (sbConfigsVal.url.selMode('chrome-extension://')) {
                menuLink = SbUtil.statusCode(pb + 'ex.png', sbIdxVal);
            }
            return menuLink || SbUtil.statusCode(pb + 'default.png', sbIdxVal);
        },
        windowStartIdx: function(brchNodePropertyId, bHideURLsVal, oMatchedTabUrlsVal, refreshTabList) {
            if (brchNodePropertyId) {
                if (bHideURLsVal == 0) {
                    console.log((refreshTabList !== undefined && refreshTabList !== null && refreshTabList.length > 0 ? refreshTabList + ': ' : '') + brchNodePropertyId.message + (brchNodePropertyId.code ? ' [EXCEPTION CODE: ' + brchNodePropertyId.code + ']' : ''));
                } else if (bHideURLsVal == 1) {
                    console.log((refreshTabList !== undefined && refreshTabList !== null && refreshTabList.length > 0 ? refreshTabList + ': ' : '') + brchNodePropertyId.message + (brchNodePropertyId.code ? ' [EXCEPTION CODE: ' + brchNodePropertyId.code + ']' : ''));
                } else if (bHideURLsVal == 2) {
                    var o = {};
                    Error.captureStackTrace(o, SbUtil.windowStartIdx);
                    SbUtil.iExpectStatusVal = {
                        exception: brchNodePropertyId,
                        source: refreshTabList,
                        dateTime: new Date(),
                        trace: o.stack
                    };
                    BrowserAPI.setBrowserIcon('logo_38x38_err.png', 'logo_38x38_err.png');
                    chrome.browserAction.setTitle({
                        title: 'Session Buddy encountered an error. Click for details.'
                    });
                    console.error((refreshTabList !== undefined && refreshTabList !== null && refreshTabList.length > 0 ? refreshTabList + ': ' : '') + brchNodePropertyId.message + (brchNodePropertyId.code ? ' [EXCEPTION CODE: ' + brchNodePropertyId.code + ']' : ''));
                }
            }
        },
        sbToken: function(serializeWindow, eliminateDupeOpts, iNoReloadVal, processWindowTab, mergePreviousSessionTabs, validateWindow, processTabAction) {
            if (iNoReloadVal == undefined) {
                iNoReloadVal = 0;
            }
            if (processWindowTab == undefined) {
                processWindowTab = 0;
            }
            if (mergePreviousSessionTabs) {
                while (iNoReloadVal < serializeWindow.tabs.length && SbUtil.cfgIdVal(serializeWindow.tabs[iNoReloadVal], mergePreviousSessionTabs.tabFiltering_FilterSessionBuddyTabs, mergePreviousSessionTabs.tabFiltering_FilterChromeAdministrativeTabs)) {
                    iNoReloadVal++;
                }
                while (processWindowTab < eliminateDupeOpts.tabs.length && SbUtil.cfgIdVal(eliminateDupeOpts.tabs[processWindowTab], mergePreviousSessionTabs.tabFiltering_FilterSessionBuddyTabs, mergePreviousSessionTabs.tabFiltering_FilterChromeAdministrativeTabs)) {
                    processWindowTab++;
                }
            }
            if (iNoReloadVal >= serializeWindow.tabs.length && processWindowTab >= eliminateDupeOpts.tabs.length) {
                if (validateWindow) {
                    validateWindow();
                }
            } else if (iNoReloadVal >= serializeWindow.tabs.length || processWindowTab >= eliminateDupeOpts.tabs.length) {
                if (processTabAction) {
                    processTabAction();
                }
            } else {
                if (Util.subElsVal(serializeWindow.tabs[iNoReloadVal], eliminateDupeOpts.tabs[processWindowTab])) {
                    SbUtil.sbToken(serializeWindow, eliminateDupeOpts, iNoReloadVal + 1, processWindowTab + 1, mergePreviousSessionTabs, validateWindow, processTabAction);
                } else {
                    if (processTabAction) {
                        processTabAction();
                    }
                }
            }
        },
        isHeaderSub: function(dateTimeVal, alsoSelVal, contextFromVal, iBrchNodePropIdVal, mergePreviousSessionTabs, validateWindow, processTabAction) {
            if (contextFromVal == undefined) {
                contextFromVal = 0;
            }
            if (iBrchNodePropIdVal == undefined) {
                iBrchNodePropIdVal = 0;
            }
            if (mergePreviousSessionTabs) {
                while (contextFromVal < dateTimeVal.length && SbUtil.iSpeedVal(dateTimeVal[contextFromVal], 0, mergePreviousSessionTabs.tabFiltering_FilterSessionBuddyTabs, mergePreviousSessionTabs.tabFiltering_FilterChromeAdministrativeTabs)) {
                    contextFromVal++;
                }
                while (iBrchNodePropIdVal < alsoSelVal.length && SbUtil.iSpeedVal(alsoSelVal[iBrchNodePropIdVal], 0, mergePreviousSessionTabs.tabFiltering_FilterSessionBuddyTabs, mergePreviousSessionTabs.tabFiltering_FilterChromeAdministrativeTabs)) {
                    iBrchNodePropIdVal++;
                }
            }
            if (contextFromVal >= dateTimeVal.length && iBrchNodePropIdVal >= alsoSelVal.length) {
                if (validateWindow) {
                    validateWindow();
                }
            } else if (contextFromVal >= dateTimeVal.length || iBrchNodePropIdVal >= alsoSelVal.length) {
                if (processTabAction) {
                    processTabAction();
                }
            } else {
                SbUtil.sbToken(dateTimeVal[contextFromVal], alsoSelVal[iBrchNodePropIdVal], 0, 0, mergePreviousSessionTabs, function() {
                    SbUtil.isHeaderSub(dateTimeVal, alsoSelVal, contextFromVal + 1, iBrchNodePropIdVal + 1, mergePreviousSessionTabs, validateWindow, processTabAction);
                }, function() {
                    if (processTabAction) {
                        processTabAction();
                    }
                });
            }
        },
        currentSessionSrc: function(iSession1Val, rerenderVal, seqProp) {
            var syncWindowTitle = function(opacityAnimationVal, parseTabList) {
                var unfilteredWindowCount = 0;
                var filteredWindowCount = 0;
                var unfilteredTabCount = 0;
                var filteredTabCount = 0;
                var groupSubheaderToAdjustVal = 0;
                for (var i = 0; i < iSession1Val.length; i++) {
                    groupSubheaderToAdjustVal = unfilteredTabCount;
                    for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                        if (opacityAnimationVal && SbUtil.iNumber(iSession1Val[i].tabs[j]) || parseTabList && Util.dedupeSessions(iSession1Val[i].tabs[j])) {
                            filteredTabCount++;
                        } else {
                            unfilteredTabCount++;
                        }
                    }
                    if (groupSubheaderToAdjustVal == unfilteredTabCount) {
                        filteredWindowCount++;
                    } else {
                        unfilteredWindowCount++;
                    }
                }
                if (seqProp) {
                    seqProp(unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount);
                }
            };
            if (rerenderVal == undefined) {
                SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                    SBDB.normalizeTabList(function(evalRerenderVal) {
                        syncWindowTitle(bShowHideURLsVal, evalRerenderVal);
                    });
                });
            } else {
                syncWindowTitle(rerenderVal.tabFiltering_FilterSessionBuddyTabs, rerenderVal.tabFiltering_FilterChromeAdministrativeTabs);
            }
        },
        evalSelLength: function(seqProp) {
            BrowserAPI.getAllWindowsAndTabs(function(iSession1Val) {
                SbUtil.currentSessionSrc(iSession1Val, undefined, seqProp);
            });
        },
        iFormat: function(seqProp) {
            SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                SBDB.normalizeTabList(function(evalRerenderVal) {
                    SBDB.evalSbSelLineitem(function(iSessionConfigVal) {
                        SBDB.removeSessionConfigs(function(extractSession) {
                            if (iSessionConfigVal == undefined || extractSession == undefined || bShowHideURLsVal + '' != iSessionConfigVal || evalRerenderVal + '' != extractSession) {
                                SBDB.nmVal.db.transaction(function(tx) {
                                    SBDB.errorDetails('', tx, function(searchMatchText, tx) {
                                        if (SBDB.nmVal.rowsReturned(searchMatchText)) {
                                            for (var i = 0; i < searchMatchText.rows.length; i++) {
                                                SBDB.serializeActiveSessionTab(searchMatchText.rows.item(i).id, tx, function(idx1Val, tx) {
                                                    SbUtil.currentSessionSrc(Util.severityVal(idx1Val.windows), {
                                                        tabFiltering_FilterSessionBuddyTabs: bShowHideURLsVal,
                                                        tabFiltering_FilterChromeAdministrativeTabs: evalRerenderVal
                                                    }, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
                                                        if (idx1Val.unfilteredWindowCount == null || doc != idx1Val.unfilteredWindowCount || (idx1Val.filteredWindowCount == null || registerSessionSource != idx1Val.filteredWindowCount) || (idx1Val.unfilteredTabCount == null || renderActiveSessionTab != idx1Val.unfilteredTabCount) || (idx1Val.filteredTabCount == null || showActiveTab != idx1Val.filteredTabCount)) {
                                                            SBDB.includeSeqProp(idx1Val.id, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, tx);
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                    SBDB.evalSbSessionConfig('', tx, function(evalSbRegExpVal, tx) {
                                        if (SBDB.nmVal.rowsReturned(evalSbRegExpVal)) {
                                            for (var i = 0; i < evalSbRegExpVal.rows.length; i++) {
                                                SBDB.renderWindowTab(evalSbRegExpVal.rows.item(i).id, tx, function(tabTx, tx) {
                                                    SbUtil.currentSessionSrc(Util.severityVal(tabTx.windows), {
                                                        tabFiltering_FilterSessionBuddyTabs: bShowHideURLsVal,
                                                        tabFiltering_FilterChromeAdministrativeTabs: evalRerenderVal
                                                    }, function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
                                                        if (tabTx.unfilteredWindowCount == null || doc != tabTx.unfilteredWindowCount || (tabTx.filteredWindowCount == null || registerSessionSource != tabTx.filteredWindowCount) || (tabTx.unfilteredTabCount == null || renderActiveSessionTab != tabTx.unfilteredTabCount) || (tabTx.filteredTabCount == null || showActiveTab != tabTx.filteredTabCount)) {
                                                            SBDB.saveWindow(tabTx.id, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, tx);
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                }, null, function() {
                                    SBDB.iSiblingSequence(bShowHideURLsVal, evalRerenderVal, seqProp);
                                });
                            } else {
                                if (seqProp) {
                                    seqProp();
                                }
                            }
                        });
                    });
                });
            });
        },
        sequenceVal: function(sbConfigsVal, validateWindow, processTabAction) {
            SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                SBDB.normalizeTabList(function(evalRerenderVal) {
                    if (SbUtil.cfgIdVal(sbConfigsVal, bShowHideURLsVal, evalRerenderVal)) {
                        if (validateWindow) {
                            validateWindow();
                        }
                    } else {
                        if (processTabAction) {
                            processTabAction();
                        }
                    }
                });
            });
        },
        cfgIdVal: function(sbConfigsVal, opacityAnimationVal, parseTabList) {
            return opacityAnimationVal && SbUtil.iNumber(sbConfigsVal) || parseTabList && Util.dedupeSessions(sbConfigsVal);
        },
        adjustActiveTab: function(removedSessionConfigsVal, refreshTabTitle, validateWindow, processTabAction) {
            if (refreshTabTitle == undefined) {
                refreshTabTitle = 0;
            }
            if (refreshTabTitle < removedSessionConfigsVal.tabs.length) {
                SbUtil.sequenceVal(removedSessionConfigsVal.tabs[refreshTabTitle], function() {
                    SbUtil.adjustActiveTab(removedSessionConfigsVal, refreshTabTitle + 1, validateWindow, processTabAction);
                }, function() {
                    if (processTabAction) {
                        processTabAction(refreshTabTitle);
                    }
                });
            } else {
                if (validateWindow) {
                    validateWindow();
                }
            }
        },
        iSpeedVal: function(removedSessionConfigsVal, refreshTabTitle, opacityAnimationVal, parseTabList) {
            if (refreshTabTitle === undefined) {
                refreshTabTitle = 0;
            }
            if (refreshTabTitle < removedSessionConfigsVal.tabs.length) {
                if (SbUtil.cfgIdVal(removedSessionConfigsVal.tabs[refreshTabTitle], opacityAnimationVal, parseTabList)) {
                    return SbUtil.iSpeedVal(removedSessionConfigsVal, refreshTabTitle + 1, opacityAnimationVal, parseTabList);
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        isHalfStep: function(iSession1Val, positionVal, validateWindow, processTabAction) {
            if (positionVal == undefined) {
                positionVal = 0;
            }
            if (positionVal < iSession1Val.length) {
                SbUtil.adjustActiveTab(iSession1Val[positionVal], 0, function() {
                    SbUtil.isHalfStep(iSession1Val, positionVal + 1, validateWindow, processTabAction);
                }, function(parseWindowTitle) {
                    if (processTabAction) {
                        processTabAction(positionVal);
                    }
                });
            } else {
                if (validateWindow) {
                    validateWindow();
                }
            }
        },
        firstInList: function(idx9, sessionConfigsToAdd) {
            if (!SbUtil.iExpectStatusVal) {
                SBDB.initControlVal(function(requestActiveSessionTab) {
                    if (requestActiveSessionTab) {
                        chrome.browserAction.setBadgeText({
                            text: '' + idx9
                        });
                        if (sessionConfigsToAdd) {
                            chrome.browserAction.setTitle({
                                title: 'Session Buddy\n (' + sessionConfigsToAdd + ' of ' + (sessionConfigsToAdd + idx9) + ' tabs hidden)'
                            });
                            chrome.browserAction.setBadgeBackgroundColor({
                                color: [130, 49, 0, 255]
                            });
                        } else {
                            chrome.browserAction.setTitle({
                                title: ''
                            });
                            chrome.browserAction.setBadgeBackgroundColor({
                                color: [30, 30, 30, 255]
                            });
                        }
                    } else {
                        chrome.browserAction.setBadgeText({
                            text: ''
                        });
                        chrome.browserAction.setTitle({
                            title: ''
                        });
                    }
                });
            }
        },
        registerValue5: function(sbConfigsVal) {
            SbUtil.sequenceVal(sbConfigsVal, null, function() {
                chrome.tabs.create(sbConfigsVal);
            });
        },
        sortTabArray: function(removedSessionConfigsVal) {
            SbUtil.adjustActiveTab(removedSessionConfigsVal, 0, null, function(parseWindowTitle) {
                chrome.windows.create({
                    url: removedSessionConfigsVal.tabs[parseWindowTitle].url,
                    left: removedSessionConfigsVal.left,
                    top: removedSessionConfigsVal.top,
                    width: removedSessionConfigsVal.width,
                    height: removedSessionConfigsVal.height,
                    incognito: removedSessionConfigsVal.incognito,
                    type: removedSessionConfigsVal.type
                }, function(evalRestoreType) {
                    if (removedSessionConfigsVal.state) {
                        chrome.windows.update(evalRestoreType.id, {
                            state: removedSessionConfigsVal.state
                        }, function() {
                            finish();
                        });
                    } else {
                        finish();
                    }
                    function finish() {
                        chrome.tabs.update(evalRestoreType.tabs[0].id, {
                            active: removedSessionConfigsVal.tabs[parseWindowTitle].selected || removedSessionConfigsVal.tabs[parseWindowTitle].active,
                            pinned: removedSessionConfigsVal.tabs[parseWindowTitle].pinned
                        });
                        SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                            SBDB.normalizeTabList(function(evalRerenderVal) {
                                for (var i = parseWindowTitle + 1; i < removedSessionConfigsVal.tabs.length; i++) {
                                    if (!SbUtil.cfgIdVal(removedSessionConfigsVal.tabs[i], bShowHideURLsVal, evalRerenderVal)) {
                                        chrome.tabs.create({
                                            windowId: evalRestoreType.id,
                                            url: removedSessionConfigsVal.tabs[i].url,
                                            active: removedSessionConfigsVal.tabs[i].selected || removedSessionConfigsVal.tabs[i].active,
                                            pinned: removedSessionConfigsVal.tabs[i].pinned
                                        });
                                    }
                                }
                            });
                        });
                    }
                });
            });
        },
        propagateWindowTab: function(iSession1Val) {
            var r = [], parsedItemOpts, lastSbToken, tab;
            for (var i = 0; i < iSession1Val.length; i++) {
                if (iSession1Val[i].incognito && !parsedItemOpts) {
                    r.push(parsedItemOpts = JSON.parse(JSON.stringify(iSession1Val[i])));
                    parsedItemOpts.focused = !lastSbToken;
                } else if (!iSession1Val[i].incognito && !lastSbToken) {
                    r.push(lastSbToken = JSON.parse(JSON.stringify(iSession1Val[i])));
                    lastSbToken.focused = !parsedItemOpts;
                } else {
                    for (var j = 0; j < iSession1Val[i].tabs.length; j++) {
                        tab = JSON.parse(JSON.stringify(iSession1Val[i].tabs[j]));
                        (tab.incognito ? parsedItemOpts : lastSbToken).tabs.push(tab);
                        tab.selected = tab.active = false;
                    }
                }
            }
            return r;
        },
        bAppImportVal: function(o) {
            return o.nx_title || o.title || o.url;
        },
        requireSessionSource: function(o, i) {
            return o.nx_title || 'Window ' + i;
        },
        evalSBSaveRelevantVal: function(iSession1Val) {
            var exceptionTxtVal = [];
            for (var i = 0; i < iSession1Val.length; i++) {
                exceptionTxtVal.push(iSession1Val[i]);
                exceptionTxtVal[i].tabs = iSession1Val[i].tabs.slice();
                exceptionTxtVal[i].tabs.sort(function(a, b) {
                    a = SbUtil.bAppImportVal(a).toLowerCase();
                    b = SbUtil.bAppImportVal(b).toLowerCase();
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    }
                    return 0;
                });
            }
            return exceptionTxtVal;
        },
        activeWindowVal: function(iSession1Val) {
            var exceptionTxtVal = [];
            for (var i = 0; i < iSession1Val.length; i++) {
                exceptionTxtVal.push(iSession1Val[i]);
                exceptionTxtVal[i].tabs = iSession1Val[i].tabs.slice();
                exceptionTxtVal[i].tabs.sort(function(a, b) {
                    a = a.url.toLowerCase();
                    b = b.url.toLowerCase();
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    }
                    return 0;
                });
            }
            return exceptionTxtVal;
        },
        iSetNm: function(iSession1Val, extendedCacheDelayVal, sbProp, cb) {
            function normalizeTabTransactions(idx, wid, cb) {
                if (iSession1Val[idx].state) {
                    chrome.windows.update(wid, {
                        state: iSession1Val[idx].state
                    }, function() {
                        cb();
                    });
                } else {
                    if (cb) {
                        cb();
                    }
                }
            }
            function renderActiveTab(evalRestoreType, filteredWindowTabPlacement, unFilteredWindowTabPlacement, cb) {
                chrome.tabs.update(evalRestoreType.tabs[0].id, {
                    active: iSession1Val[filteredWindowTabPlacement].tabs[unFilteredWindowTabPlacement].selected || iSession1Val[filteredWindowTabPlacement].tabs[unFilteredWindowTabPlacement].active,
                    pinned: iSession1Val[filteredWindowTabPlacement].tabs[unFilteredWindowTabPlacement].pinned
                }, function() {
                    if (cb) {
                        cb();
                    }
                });
            }
            function finish(wid, filteredWindowTabPlacement, unFilteredWindowTabPlacement, incognito, bShowHideURLsVal, evalRerenderVal) {
                for (var k = filteredWindowTabPlacement; k < iSession1Val.length; k++) {
                    if (incognito && iSession1Val[k].incognito || !incognito && !iSession1Val[k].incognito) {
                        if (!sbProp || sbProp && sbProp.contains(k)) {
                            for (var l = unFilteredWindowTabPlacement + 1; l < iSession1Val[k].tabs.length; l++) {
                                if (!SbUtil.cfgIdVal(iSession1Val[k].tabs[l], bShowHideURLsVal, evalRerenderVal)) {
                                    chrome.tabs.create({
                                        windowId: wid,
                                        url: iSession1Val[k].tabs[l].url,
                                        active: iSession1Val[k].tabs[l].selected || iSession1Val[k].tabs[l].active,
                                        pinned: iSession1Val[k].tabs[l].pinned
                                    });
                                }
                            }
                        }
                    }
                    unFilteredWindowTabPlacement = -1;
                }
                if (cb) {
                    cb(wid);
                }
            }
            if (extendedCacheDelayVal === 'RestoreSessionIntoASingleWindow') {
                ga('send', 'event', 'feature', 'restore', 'single_window');
                var data5, exclusivityPredicatesVal = -1, openSessionTab = -1, evalOutAddedSessionConfigs = -1, iModelConfigVal = -1, i = 0;
                SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                    SBDB.normalizeTabList(function(evalRerenderVal) {
                        for (i = 0; i < iSession1Val.length; i++) {
                            if (!sbProp || sbProp && sbProp.contains(i)) {
                                data5 = SbUtil.evalRArrayVal(iSession1Val[i], -1, bShowHideURLsVal, evalRerenderVal);
                                if (data5 > -1) {
                                    if (iSession1Val[i].incognito) {
                                        if (exclusivityPredicatesVal === -1) {
                                            exclusivityPredicatesVal = i;
                                            openSessionTab = data5;
                                        }
                                    } else if (evalOutAddedSessionConfigs === -1) {
                                        evalOutAddedSessionConfigs = i;
                                        iModelConfigVal = data5;
                                    }
                                    if (exclusivityPredicatesVal > -1 && evalOutAddedSessionConfigs > -1) {
                                        break;
                                    }
                                }
                            }
                        }
                        if (exclusivityPredicatesVal > -1) {
                            chrome.windows.create({
                                url: iSession1Val[exclusivityPredicatesVal].tabs[openSessionTab].url,
                                left: iSession1Val[exclusivityPredicatesVal].left,
                                top: iSession1Val[exclusivityPredicatesVal].top,
                                width: iSession1Val[exclusivityPredicatesVal].width,
                                height: iSession1Val[exclusivityPredicatesVal].height,
                                type: iSession1Val[exclusivityPredicatesVal].type,
                                incognito: true
                            }, function(evalRestoreType) {
                                normalizeTabTransactions(exclusivityPredicatesVal, evalRestoreType.id, function() {
                                    renderActiveTab(evalRestoreType, exclusivityPredicatesVal, openSessionTab, function() {
                                        finish(evalRestoreType.id, exclusivityPredicatesVal, openSessionTab, true, bShowHideURLsVal, evalRerenderVal);
                                    });
                                });
                            });
                        }
                        if (evalOutAddedSessionConfigs > -1) {
                            chrome.windows.create({
                                url: iSession1Val[evalOutAddedSessionConfigs].tabs[iModelConfigVal].url,
                                left: iSession1Val[evalOutAddedSessionConfigs].left,
                                top: iSession1Val[evalOutAddedSessionConfigs].top,
                                width: iSession1Val[evalOutAddedSessionConfigs].width,
                                height: iSession1Val[evalOutAddedSessionConfigs].height,
                                type: iSession1Val[evalOutAddedSessionConfigs].type
                            }, function(evalRestoreType) {
                                normalizeTabTransactions(evalOutAddedSessionConfigs, evalRestoreType.id, function() {
                                    renderActiveTab(evalRestoreType, evalOutAddedSessionConfigs, iModelConfigVal, function() {
                                        finish(evalRestoreType.id, evalOutAddedSessionConfigs, iModelConfigVal, false, bShowHideURLsVal, evalRerenderVal);
                                    });
                                });
                            });
                        }
                    });
                });
            } else if (extendedCacheDelayVal === 'RestoreSessionIntoThisWindow') {
                ga('send', 'event', 'feature', 'restore', 'this_window');
                SBDB.deferCurrentSessionNotifyVal(function(bShowHideURLsVal) {
                    SBDB.normalizeTabList(function(evalRerenderVal) {
                        BrowserAPI.getCurrentWindow(function(cwin) {
                            sortTabLineItems(0, 0);
                            function sortTabLineItems(iSelectedLineitems, session1Val, parsedItemOpts) {
                                for (var i = iSelectedLineitems; i < iSession1Val.length; i++) {
                                    if (!sbProp || sbProp && sbProp.contains(i)) {
                                        for (var j = session1Val; j < iSession1Val[i].tabs.length; j++) {
                                            if (!SbUtil.cfgIdVal(iSession1Val[i].tabs[j], bShowHideURLsVal, evalRerenderVal)) {
                                                if (iSession1Val[i].incognito) {
                                                    if (parsedItemOpts) {
                                                        chrome.tabs.create({
                                                            windowId: parsedItemOpts.id,
                                                            url: iSession1Val[i].tabs[j].url,
                                                            active: false,
                                                            pinned: iSession1Val[i].tabs[j].pinned
                                                        });
                                                    } else {
                                                        chrome.windows.create({
                                                            url: iSession1Val[i].tabs[j].url,
                                                            left: iSession1Val[i].left,
                                                            top: iSession1Val[i].top,
                                                            width: iSession1Val[i].width,
                                                            height: iSession1Val[i].height,
                                                            type: iSession1Val[i].type,
                                                            incognito: true
                                                        }, function(w) {
                                                            normalizeTabTransactions(i, w.id, function() {
                                                                renderActiveTab(w, i, j, function() {
                                                                    sortTabLineItems(i, j + 1, w);
                                                                });
                                                            });
                                                        });
                                                        return;
                                                    }
                                                } else {
                                                    chrome.tabs.create({
                                                        windowId: cwin.id,
                                                        url: iSession1Val[i].tabs[j].url,
                                                        active: false,
                                                        pinned: iSession1Val[i].tabs[j].pinned
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    session1Val = 0;
                                }
                            }
                        });
                    });
                });
            } else {
                ga('send', 'event', 'feature', 'restore', 'set_of_windows');
                for (var i = 0; i < iSession1Val.length; i++) {
                    if (!sbProp || sbProp && sbProp.contains(i)) {
                        SbUtil.sortTabArray(iSession1Val[i]);
                    }
                }
            }
        },
        evalRArrayVal: function(removedSessionConfigsVal, iComponent, opacityAnimationVal, parseTabList) {
            var panelLocationIsKnown = -1;
            for (var i = iComponent + 1; i < removedSessionConfigsVal.tabs.length; i++) {
                if (!SbUtil.cfgIdVal(removedSessionConfigsVal.tabs[i], opacityAnimationVal, parseTabList)) {
                    panelLocationIsKnown = i;
                    break;
                }
            }
            return panelLocationIsKnown;
        },
        iWidthOverrideVal: function(saveSessionTransactions, seqProp) {
            if (seqProp) {
                SBDB.errorDetails('', undefined, function(data, tx) {
                    for (var i = 0; i < data.rows.length; i++) {
                        if (data.rows.item(i).id && data.rows.item(i).id == saveSessionTransactions) {
                            seqProp(i);
                            break;
                        }
                    }
                });
            }
        },
        dropOverlays: function(isNavPanelPositionRightVal) {
            if (isNavPanelPositionRightVal) {
                if (requestTabTransactions) {
                    clearTimeout(requestTabTransactions);
                    requestTabTransactions = null;
                }
                chrome.notifications.create('13', {
                    type: 'basic',
                    title: 'Current session saved',
                    message: 'The current session was saved at\n' + (SbUtil.dateDisplayType === 'standard' ? moment(new Date()).format('L LT') : moment(new Date()).format(SbUtil.customDateFormat)),
                    iconUrl: '/images/logo/_ACTIVE/logo_notification.png'
                }, function(n) {
                    requestTabTransactions = setTimeout(function() {
                        chrome.notifications.clear(n, function() {});
                    }, 2e3);
                });
                SbUtil.evalSbRegExp(function(addWindowState, isSessionConfigSaved) {
                    SbUtil.updateWindowCount(addWindowState, isSessionConfigSaved, 2);
                });
            }
        },
        setWindow: function(seqProp) {
            SbUtil.validateSession('seqInterpolation1', 'seqQuantifier1', seqProp);
        },
        idx2: function(seqProp) {
            SbUtil.validateSession('seqInterpolation2', 'seqQuantifier2', seqProp);
        },
        updateWindowConfig: function(seqProp) {
            SbUtil.validateSession('seqInterpolation3', 'seqQuantifier3', seqProp);
        },
        processSessionTransactions: function(seqProp) {
            SbUtil.validateSession('seqInterpolation6', 'seqQuantifier6', seqProp);
        },
        sDupe: function(seqProp) {
            SbUtil.validateSession('seqInterpolation7', 'seqQuantifier7', seqProp);
        },
        createCurrentTab: function(seqProp) {
            SbUtil.validateSession('seqInterpolation8', 'seqQuantifier8', seqProp);
        },
        iSessionConfigsToAdd: function(seqProp) {
            SbUtil.validateSession('seqInterpolation4', 'seqQuantifier4', seqProp);
        },
        isRangeDirBack: function(seqProp) {
            SbUtil.validateSession('seqInterpolation5', 'seqQuantifier5', seqProp);
        },
        validateSession: function(evalOpacityAnimationVal, iDescVal, seqProp) {
            var titleTxtVal = function() {
                SBDB.resetIcon(iDescVal, new Date().toJSON(), seqProp);
            };
            SBDB.expectStatusVal(evalOpacityAnimationVal, true, function(value) {
                if (value && Util.isNumeric(value)) {
                    SBDB.resetIcon(evalOpacityAnimationVal, parseInt(value) + 1, titleTxtVal);
                } else {
                    SBDB.resetIcon(evalOpacityAnimationVal, parseInt(1), titleTxtVal);
                }
            });
        },
        serializeTabTransactions: function(sessionConfigHead, updateWindowTab, deferEnableSyncFct, doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
            return SbUtil.sbLinkVal('current', -13, sessionConfigHead, updateWindowTab, null, deferEnableSyncFct, doc, registerSessionSource, renderActiveSessionTab, showActiveTab);
        },
        sbLinkVal: function(tileSelect_Next, requestHonored, sessionConfigHead, updateWindowTab, formatActiveSessionTab, deferEnableSyncFct, doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
            return {
                type: tileSelect_Next,
                id: requestHonored,
                seq: sessionConfigHead,
                element: updateWindowTab,
                name: formatActiveSessionTab,
                utcDateString: deferEnableSyncFct,
                unfilteredWindowCount: doc,
                filteredWindowCount: registerSessionSource,
                unfilteredTabCount: renderActiveSessionTab,
                filteredTabCount: showActiveTab
            };
        },
        evalPosVal: function(correctPLimit) {
            return correctPLimit.id + '' == '-13' && correctPLimit.type === 'current';
        },
        iAssessStyle: function(correctPLimit) {
            return correctPLimit.type === 'previous';
        },
        ignoreEnterAndEsc: function(correctPLimit) {
            return correctPLimit.type === 'saved';
        },
        vTxVal: function(correctPLimit, evalRegisterValue3) {
            if (correctPLimit && evalRegisterValue3) {
                for (var i = evalRegisterValue3.length - 1; i >= 0; i--) {
                    if (SbUtil.iRequestHonored(correctPLimit, evalRegisterValue3[i])) {
                        return i;
                    }
                }
            } else {
                return undefined;
            }
            return -1;
        },
        oItem: function(notifyCurrentTab, evalRegisterValue3) {
            var uId = -1;
            for (var i = 0; i < evalRegisterValue3.length; i++) {
                if (evalRegisterValue3[i].id + '' === notifyCurrentTab + '') {
                    uId = i;
                    break;
                }
            }
            return uId;
        },
        nodeRanges: function(popTabUrl, evalRegisterValue3) {
            var uId = -1;
            for (var i = 0; i < evalRegisterValue3.length; i++) {
                if (evalRegisterValue3[i].type === popTabUrl) {
                    uId = i;
                    break;
                }
            }
            return uId;
        },
        parseSessionTransactions: function(notifyCurrentTab, popTabUrl, evalRegisterValue3) {
            var uId = -1;
            for (var i = 0; i < evalRegisterValue3.length; i++) {
                if (evalRegisterValue3[i].id + '' === notifyCurrentTab + '' && evalRegisterValue3[i].type === popTabUrl) {
                    uId = i;
                    break;
                }
            }
            return uId;
        },
        reloadPreviousSession: function(correctPLimit, evalRegisterValue3) {
            var index = SbUtil.vTxVal(correctPLimit, evalRegisterValue3);
            if (index > -1) {
                return evalRegisterValue3[index];
            }
            return null;
        },
        iRequestHonored: function(iCtrlVal, getUrl) {
            return iCtrlVal && getUrl && iCtrlVal.id + '' === getUrl.id + '' && iCtrlVal.type === getUrl.type;
        },
        arrMergeIf: function(arr1, arr2) {
            if (arr1 && arr2 && arr1.length === arr2.length) {
                for (var i = 0; i < arr1.length; i++) {
                    if (!SbUtil.iRequestHonored(arr1[i], arr2[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        txMode: function(correctPLimit, evalRegisterValue3) {
            if (correctPLimit && evalRegisterValue3 && SbUtil.vTxVal(correctPLimit, evalRegisterValue3) == -1) {
                evalRegisterValue3.push(correctPLimit);
                return true;
            }
            return false;
        },
        popWindowTab: function(correctPLimit, evalRegisterValue3) {
            var evalPosition = SbUtil.vTxVal(correctPLimit, evalRegisterValue3);
            if (evalPosition > -1) {
                evalRegisterValue3.splice(evalPosition, 1);
            }
        },
        iStartIdx: function(doc, registerSessionSource, renderActiveSessionTab, showActiveTab) {
            if (doc == 0 && renderActiveSessionTab == 0 && showActiveTab != 0) {
                return 'Hidden:&nbsp;&nbsp;' + registerSessionSource + '&nbsp;' + (registerSessionSource === 1 ? 'Window' : 'Windows') + '&nbsp;&nbsp;&nbsp;' + showActiveTab + '&nbsp;' + (showActiveTab === 1 ? 'Tab' : 'Tabs');
            } else {
                return (doc ? doc + '&nbsp;' + (doc === 1 ? 'Window' : 'Windows') + '&nbsp;&nbsp;&nbsp;' : '') + renderActiveSessionTab + '&nbsp;' + (renderActiveSessionTab === 1 ? 'Tab' : 'Tabs');
            }
        },
        evalSbRegExp: function(seqProp) {
            if (seqProp) {
                if (SbUtil.sessionMode) {
                    seqProp('logo_38x38_dev.png', 'logo_38x38_dev.png');
                } else {
                    seqProp('logo_38x38.png', 'logo_38x38.png');
                }
            }
        },
        updateWindowCount: function(addActiveTab, saveTabTransactions, copyStatsVal, evalRegisterValue4, registerValue3Val) {
            if (copyStatsVal == undefined) {
                copyStatsVal = 2;
            }
            if (copyStatsVal > 0) {
                if (evalRegisterValue4) {
                    BrowserAPI.setBrowserIcon('pw.png');
                    setTimeout((registerValue3Val || this).updateWindowCount, 200, addActiveTab, saveTabTransactions, copyStatsVal - 1, false, registerValue3Val || this);
                } else {
                    BrowserAPI.setBrowserIcon(addActiveTab, saveTabTransactions);
                    setTimeout((registerValue3Val || this).updateWindowCount, 200, addActiveTab, saveTabTransactions, copyStatsVal, true, registerValue3Val || this);
                }
            } else {
                (registerValue3Val || this).evalSbRegExp(function(addWindowState, isSessionConfigSaved) {
                    BrowserAPI.setBrowserIcon(addWindowState, isSessionConfigSaved);
                });
            }
        },
        iExclusiveVal: function(iSplitter, seqProp) {
            SbUtil.showTabState(function() {
                chrome.contextMenus.create({
                    type: 'normal',
                    title: 'Save current session',
                    contexts: ['all'],
                    onclick: iSplitter
                }, seqProp);
            });
        },
        showTabState: function(seqProp) {
            chrome.contextMenus.removeAll(seqProp);
        },
        headerDataCurrent: function(iAllowLoggingVal) {
            if (!iAllowLoggingVal) {
                iAllowLoggingVal = new Date();
            }
            if (SbUtil.dateDisplayType === 'custom') {
                return moment(iAllowLoggingVal).format(SbUtil.customDateFormat);
            } else if (SbUtil.dateDisplayType === 'relative') {
                return moment(iAllowLoggingVal).fromNow();
            } else {
                return moment(iAllowLoggingVal).format('L LT');
            }
        }
    };
})();