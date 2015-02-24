/* Copyright (c) 2015 Session Buddy */

function extractSessionTransactions(filename, version, name, size) {
    this.db = openDatabase(filename, version, name, size);
    this.suppressSel = function(positionActiveWindow, cacheImportedSession, iLeafLineitemTypeVal) {
        this.db.transaction(function(tx) {
            var evalRemovedSessionConfigs = function(reviseVal) {
                if (positionActiveWindow.length > 0) {
                    tx.executeSql(positionActiveWindow.shift(), [], function(tx, data) {
                        evalRemovedSessionConfigs((data ? data.rowsAffected : 0) + reviseVal);
                    }, iLeafLineitemTypeVal);
                } else {
                    cacheImportedSession(tx, reviseVal);
                }
            };
            evalRemovedSessionConfigs(0);
        });
    };
    this.rowsReturned = function(data) {
        if (data && data.rows && data.rows.length > 0 && data.rows.item(0)) {
            return data.rows.length;
        } else {
            return 0;
        }
    };
    this.evalOnlyCountDupes = function(data) {
        if (data && data.rows && data.rows.length > 0 && data.rows.item(0)) {
            return data.rows.item(0);
        } else {
            return undefined;
        }
    };
}

function popSession() {
    this.isNm = 120;
    this.nmVal = new extractSessionTransactions('SB', '1.0', 'Session Buddy', 5 * 1024 * 1024);
    this.cache = [];
    this.idx2Val = false;
    this.isValid = function() {
        return this.nmVal && this.nmVal.db;
    };
    this.isConfigured = function(cb) {
        if (this.isValid()) {
            var that = this;
            try {
                this.nmVal.db.readTransaction(function(tx) {
                    try {
                        tx.executeSql('SELECT * FROM sqlite_master WHERE type=\'table\' AND (name=\'Settings\' OR name=\'UserSettings\' OR name=\'SavedSessions\' OR name=\'PreviousSessions\')', [], function(tx, data) {
                            cb(that.nmVal.rowsReturned(data) === 4);
                        }, function(tx, err) {
                            SbUtil.windowStartIdx({
                                message: 'SQLError: ' + err.message,
                                type: 'SB'
                            }, 2, SbUtil.sessionMode, '70395123');
                        });
                    } catch (ex) {
                        SbUtil.windowStartIdx(ex, 2, that.idx2Val, '322532283');
                    }
                });
            } catch (ex) {
                SbUtil.windowStartIdx(ex, 2, that.idx2Val, '99038458');
            }
        } else {
            SbUtil.windowStartIdx({
                message: 'Invalid SBDB',
                type: 'SB'
            }, 2, SbUtil.sessionMode, '70395117');
        }
    };
    this.expectStatusVal = function(iClean, sbClr, seqProp) {
        if (Util.isFunction(sbClr)) {
            seqProp = sbClr;
            sbClr = true;
        }
        this.ignoreEnterAndEscVal('Settings', iClean, sbClr, seqProp);
    };
    this.resetIcon = function(iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal) {
        this.evalPosIdxVal('Settings', iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal);
    };
    this.idx8Val = function(iClean, sbClr, seqProp) {
        if (Util.isFunction(sbClr)) {
            seqProp = sbClr;
            sbClr = true;
        }
        this.ignoreEnterAndEscVal('UserSettings', iClean, sbClr, seqProp);
    };
    this.evalOutRemovedSessionConfigs = function(iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal) {
        this.evalPosIdxVal('UserSettings', iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal);
    };
    this.addTabIcon = function(extractCurrentTab, iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal) {
        if (extractCurrentTab) {
            this.evalPosIdxVal('UserSettings', iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal);
        } else {
            cacheImportedSession(extractCurrentTab);
        }
    };
    this.requestVal = function(iFormatVal, seqProp) {
        if (this.isValid()) {
            var that = this;
            this.nmVal.db.readTransaction(function(tx) {
                tx.executeSql('SELECT key, value FROM ' + iFormatVal, [], function(tx, data) {
                    if (that.nmVal.rowsReturned(data)) {
                        if (seqProp) {
                            seqProp(data.rows);
                        }
                    } else {
                        if (seqProp) {
                            seqProp(undefined);
                        }
                    }
                }, function(tx, err) {
                    console.error(err, iFormatVal);
                    if (seqProp) {
                        seqProp(undefined);
                    }
                });
            });
        }
    };
    this.ignoreEnterAndEscVal = function(iFormatVal, iClean, sbClr, seqProp) {
        if (this.isValid() && iClean) {
            var iAlsoSelect = this.isFilterAsyncVal(iFormatVal, iClean);
            if (iAlsoSelect) {
                if (seqProp) {
                    seqProp(iAlsoSelect.value);
                }
            } else {
                var that = this;
                this.nmVal.db.readTransaction(function(tx) {
                    tx.executeSql('SELECT value FROM ' + iFormatVal + ' WHERE key=?', [iClean], function(tx, data) {
                        if (that.nmVal.rowsReturned(data)) {
                            if (sbClr != true) {
                                that.rangeVal(iFormatVal, iClean, data.rows.item(0).value);
                            }
                            if (seqProp) {
                                seqProp(data.rows.item(0).value);
                            }
                        } else {
                            if (seqProp) {
                                seqProp(undefined);
                            }
                        }
                    }, function(tx, err) {
                        console.error(err, iFormatVal, iClean, sbClr);
                        if (seqProp) {
                            seqProp(undefined);
                        }
                    });
                });
            }
        }
    };
    this.evalPosIdxVal = function(iFormatVal, iClean, isFilterAsync, cacheImportedSession, iLeafLineitemTypeVal) {
        if (this.isValid() && iClean) {
            if (isFilterAsync === true) {
                isFilterAsync = 'true';
            }
            if (isFilterAsync === false) {
                isFilterAsync = 'false';
            }
            var that = this;
            this.nmVal.db.transaction(function(tx) {
                tx.executeSql('SELECT value FROM ' + iFormatVal + ' WHERE key=?', [iClean], function(tx, data) {
                    if (that.nmVal.rowsReturned(data)) {
                        if (data.rows.item(0).value != isFilterAsync) {
                            tx.executeSql('UPDATE ' + iFormatVal + ' SET value=? WHERE key=?', [isFilterAsync, iClean], function(tx, data) {
                                var iAlsoSelect = that.isFilterAsyncVal(iFormatVal, iClean);
                                if (iAlsoSelect) {
                                    iAlsoSelect.value = isFilterAsync;
                                }
                                if (cacheImportedSession) {
                                    cacheImportedSession(data, isFilterAsync);
                                }
                            }, function(tx, err) {
                                if (iLeafLineitemTypeVal) {
                                    iLeafLineitemTypeVal(err);
                                }
                            });
                        } else {
                            if (cacheImportedSession) {
                                cacheImportedSession(data, isFilterAsync);
                            }
                        }
                    } else {
                        tx.executeSql('INSERT INTO ' + iFormatVal + ' (key, value) VALUES (?,?)', [iClean, isFilterAsync], function(tx, data) {
                            var iAlsoSelect = that.isFilterAsyncVal(iFormatVal, iClean);
                            if (iAlsoSelect) {
                                iAlsoSelect.value = isFilterAsync;
                            }
                            if (cacheImportedSession) {
                                cacheImportedSession(data, isFilterAsync);
                            }
                        }, function(tx, err) {
                            if (iLeafLineitemTypeVal) {
                                iLeafLineitemTypeVal(err);
                            }
                        });
                    }
                });
            });
        }
    };
    this.isFilterAsyncVal = function(iFormatVal, extendedCacheDelay) {
        if (this.cache && iFormatVal) {
            var currentSettings = this.lnkClearSearchVal(iFormatVal);
            if (currentSettings) {
                for (var i = 0; i < currentSettings.area.length; i++) {
                    if (currentSettings.area[i].key == extendedCacheDelay) {
                        return currentSettings.area[i];
                    }
                }
            }
        }
        return undefined;
    };
    this.lnkClearSearchVal = function(iFormatVal) {
        if (this.cache && iFormatVal) {
            for (var i = 0; i < this.cache.length; i++) {
                if (this.cache[i].renderImportedSession == iFormatVal) {
                    return this.cache[i];
                }
            }
        }
        return undefined;
    };
    this.rangeVal = function(iFormatVal, extendedCacheDelay, iRestoreTypeVal) {
        if (this.cache && iFormatVal && extendedCacheDelay) {
            var iAlsoSelect = this.isFilterAsyncVal(iFormatVal, extendedCacheDelay);
            if (iAlsoSelect && iAlsoSelect.value != iRestoreTypeVal) {
                iAlsoSelect.value = iRestoreTypeVal;
            } else {
                var currentSettings = this.lnkClearSearchVal(iFormatVal);
                if (!currentSettings) {
                    currentSettings = this.cache[this.cache.push({
                        renderImportedSession: iFormatVal,
                        area: []
                    }) - 1];
                }
                currentSettings.area.push({
                    key: extendedCacheDelay,
                    value: iRestoreTypeVal
                });
            }
        }
    };
    this.idx7Val = function(iNewNmVal, iStringVal, seqProp, evalRevisionIdx) {
        var i;
        if (!iNewNmVal) {
            iNewNmVal = 'modificationDateTime desc, id desc';
        } else {
            iNewNmVal = iNewNmVal.trim().toLowerCase();
            if (iNewNmVal.selMode('order by')) {
                iNewNmVal = iNewNmVal.substring(8);
                iNewNmVal = iNewNmVal.trim();
            }
        }
        var augmentSavedSession = '';
        if (evalRevisionIdx) {
            for (i = 0; i < evalRevisionIdx.length; i++) {
                if (evalRevisionIdx[i].type === 'saved') {
                    if (augmentSavedSession.length > 0) {
                        augmentSavedSession += ',';
                    }
                    augmentSavedSession += evalRevisionIdx[i].id;
                }
            }
        }
        var sEnabledVal = '';
        if (iStringVal) {
            var popSessionTransactions = '';
            var lineitemsAddedCb = '';
            if (typeof iStringVal === 'string') {
                iStringVal = iStringVal.replace(/'/g, '\'\'');
                sEnabledVal = '(name like \'%' + iStringVal + '%\' OR windows like \'%' + iStringVal + '%\') ';
            } else if (typeof iStringVal === 'object') {
                lineitemsAddedCb = '';
                for (i = 0; i < iStringVal.length; i++) {
                    if (!iStringVal[i].type || iStringVal[i].type && iStringVal[i].type === 'saved') {
                        popSessionTransactions = '';
                        if (iStringVal[i].id) {
                            if (popSessionTransactions.length > 0) {
                                popSessionTransactions += ' AND ';
                            }
                            popSessionTransactions += 'id=' + iStringVal[i].id;
                        }
                        if (popSessionTransactions.length > 0) {
                            if (lineitemsAddedCb.length > 0) {
                                lineitemsAddedCb += ' OR ';
                            }
                            lineitemsAddedCb += '(' + popSessionTransactions + ')';
                        }
                    }
                }
                if (lineitemsAddedCb.length > 0) {
                    sEnabledVal = '(' + lineitemsAddedCb + ') ';
                }
            }
            if (sEnabledVal.length > 0) {
                if (augmentSavedSession.length > 0) {
                    sEnabledVal = 'AND ((id in (' + augmentSavedSession + ')) OR (' + sEnabledVal + '))';
                } else {
                    sEnabledVal = 'AND ' + sEnabledVal;
                }
            }
        }
        if (iStringVal && sEnabledVal.length == 0) {
            if (seqProp) {
                seqProp({
                    rows: []
                });
            }
        } else {
            var that = this;
            this.nmVal.db.readTransaction(function(tx) {
                tx.executeSql('SELECT id, name, generationDateTime, creationDateTime, modificationDateTime, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount FROM SavedSessions WHERE deleted != \'true\' ' + sEnabledVal + 'ORDER BY ' + iNewNmVal, [], function(tx, data) {
                    if (data && data.rows && seqProp) {
                        seqProp(data);
                    }
                }, function(tx, err) {
                    SbUtil.windowStartIdx(err, 2, that.idx2Val, '3224123123');
                });
            });
        }
    };
    this.evalSbSessionConfig = function(copySessionState, tx, seqProp) {
        if (seqProp) {
            var that = this;
            var syncWindowTitle = function(tx) {
                tx.executeSql('SELECT id FROM SavedSessions WHERE deleted != \'true\'', [], function(tx, data) {
                    if (data && data.rows && seqProp) {
                        seqProp(data, tx);
                    }
                }, function(tx, err) {
                    SbUtil.windowStartIdx(err, 2, that.idx2Val, '892804029');
                });
            };
            if (tx == undefined) {
                this.nmVal.db.transaction(syncWindowTitle);
            } else {
                syncWindowTitle(tx);
            }
        }
    };
    this.filterAdjascentTabs = function(cb, copySessionState, tx) {
        if (cb) {
            var that = this, ca = 's';
            var syncWindowTitle = function(tx) {
                tx.executeSql('SELECT count(*) AS ' + ca + ' FROM SavedSessions WHERE deleted != \'true\'', [], function(tx, data) {
                    if (data && data.rows && data.rows.length === 1) {
                        cb(data.rows.item(0)[ca]);
                    }
                }, function(tx, err) {
                    SbUtil.windowStartIdx(err, 2, that.idx2Val, '892804034');
                });
            };
            if (Util.isUndefined(tx)) {
                this.nmVal.db.transaction(syncWindowTitle);
            } else {
                syncWindowTitle(tx);
            }
        }
    };
    this.addCurrentSessionSource = function(iNewNmVal, iStringVal, seqProp, evalRevisionIdx) {
        var i;
        if (seqProp) {
            if (!iNewNmVal) {
                iNewNmVal = 'recordingDateTime desc, id desc';
            } else {
                iNewNmVal = iNewNmVal.trim().toLowerCase();
                if (iNewNmVal.selMode('order by')) {
                    iNewNmVal = iNewNmVal.substring(8);
                    iNewNmVal = iNewNmVal.trim();
                }
            }
            var augmentSavedSession = '';
            if (evalRevisionIdx) {
                for (i = 0; i < evalRevisionIdx.length; i++) {
                    if (evalRevisionIdx[i].type === 'previous') {
                        if (augmentSavedSession.length > 0) {
                            augmentSavedSession += ',';
                        }
                        augmentSavedSession += evalRevisionIdx[i].id;
                    }
                }
            }
            var sEnabledVal = '';
            if (iStringVal) {
                var popSessionTransactions = '';
                var lineitemsAddedCb = '';
                if (typeof iStringVal === 'string') {
                    iStringVal = iStringVal.replace(/'/g, '\'\'');
                    sEnabledVal = 'windows like \'%' + iStringVal + '%\' ';
                } else if (typeof iStringVal === 'object') {
                    lineitemsAddedCb = '';
                    for (i = 0; i < iStringVal.length; i++) {
                        if (!iStringVal[i].type || iStringVal[i].type && iStringVal[i].type === 'previous') {
                            popSessionTransactions = '';
                            if (iStringVal[i].id) {
                                if (popSessionTransactions.length > 0) {
                                    popSessionTransactions += ' AND ';
                                }
                                popSessionTransactions += 'id=' + iStringVal[i].id;
                            }
                            if (popSessionTransactions.length > 0) {
                                if (lineitemsAddedCb.length > 0) {
                                    lineitemsAddedCb += ' OR ';
                                }
                                lineitemsAddedCb += '(' + popSessionTransactions + ')';
                            }
                        }
                    }
                    if (lineitemsAddedCb.length > 0) {
                        sEnabledVal = '(' + lineitemsAddedCb + ') ';
                    }
                }
                if (sEnabledVal.length > 0) {
                    if (augmentSavedSession.length > 0) {
                        sEnabledVal = 'AND ((id in (' + augmentSavedSession + ')) OR (' + sEnabledVal + '))';
                    } else {
                        sEnabledVal = 'AND ' + sEnabledVal;
                    }
                }
            }
            if (iStringVal && sEnabledVal.length == 0) {
                seqProp({
                    rows: []
                });
            } else {
                var that = this;
                this.nmVal.db.readTransaction(function(tx) {
                    tx.executeSql('SELECT id, recordingDateTime, creationDateTime, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount FROM PreviousSessions WHERE deleted != \'true\' ' + sEnabledVal + 'ORDER BY ' + iNewNmVal, [], function(tx, data) {
                        if (data && data.rows) {
                            seqProp(data);
                        }
                    }, function(tx, err) {
                        SbUtil.windowStartIdx(err, 2, that.idx2Val, '677939203');
                    });
                });
            }
        }
    };
    this.errorDetails = function(copySessionState, tx, seqProp) {
        var that = this;
        if (seqProp) {
            var syncWindowTitle = function(tx) {
                tx.executeSql('SELECT id FROM PreviousSessions WHERE deleted != \'true\' ORDER BY id DESC', [], function(tx, data) {
                    if (data && data.rows && seqProp) {
                        seqProp(data, tx);
                    }
                }, function(tx, err) {
                    SbUtil.windowStartIdx(err, 2, that.idx2Val, '89930458');
                });
            };
            if (tx == undefined) {
                this.nmVal.db.transaction(syncWindowTitle);
            } else {
                syncWindowTitle(tx);
            }
        }
    };
    this.setWindowTab = function(seqProp) {
        this.idx8Val('sessionRender_RenderSessionURL', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.iSessionConfig2Val = function(seqProp) {
        this.idx8Val('sessionRender_ShowAdminTabsInItalic', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.rateActionQualifierVal = function(seqProp) {
        this.idx8Val('sessionRender_ShowFocusedItemsInBold', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.setTabStatus = function(seqProp) {
        this.idx8Val('isClickOriginDeleteVal', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.evalSessionConfig2 = function(seqProp) {
        this.idx8Val('sessionRender_ShowDateGroupHeadersInNavigationPane', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.iWindow2TabIdx = function(seqProp) {
        this.idx8Val('sessionRender_ShowSessionCountsInNavigationPane', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.initControlVal = function(seqProp) {
        this.idx8Val('sessionRender_ShowExtensionBadge', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.limitVal = function(seqProp) {
        this.idx8Val('sessionSave_AskForName', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.setTabTransaction = function(seqProp) {
        this.idx8Val('sessionMerge_WarnOnMerge', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.iSetNmVal = function(seqProp) {
        this.idx8Val('sessionEdit_HideDuplicateTabsInMerge', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.iContextFromVal = function(seqProp) {
        this.idx8Val('appMode', false, function(value) {
            if (seqProp) {
                seqProp(value || '');
            }
        });
    };
    this.iSessionStorageKeyVal = function(seqProp) {
        this.idx8Val('copyTabTitle', false, function(value) {
            if (seqProp) {
                seqProp(value === 'true');
            }
        });
    };
    this.addSession = function(seqProp) {
        this.idx8Val('sessionEdit_IgnoreUrlParamsInTabCompare', false, function(value) {
            if (seqProp) {
                seqProp(value === 'true');
            }
        });
    };
    this.iWindowIdVal = function(seqProp) {
        this.idx8Val('automaticallyRecordSessions', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.findSession = function(seqProp) {
        this.idx8Val('sessionSave_ShowSaveCurrentInRightClickMenus', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.detailTxt = function(seqProp) {
        this.idx8Val('enableKeyboardShortcuts', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.nm = function(cb) {
        this.idx8Val('customDateFormat', false, function(value) {
            if (cb) {
                cb(value || 'LLLL');
            }
        });
    };
    this.setSessionWindow = function(cb) {
        this.idx8Val('dateDisplayType', false, function(value) {
            if (cb) {
                if (value === 'custom' || value === 'relative') {
                    cb(value);
                } else {
                    cb('standard');
                }
            }
        });
    };
    this.fieldNmVal = function(seqProp) {
        this.idx8Val('sessionRestore_DefaultRestoreType', false, function(value) {
            if (value === 'RestoreSessionIntoASingleWindow' || value === 'RestoreSessionIntoThisWindow') {
                if (seqProp) {
                    seqProp(value);
                }
            } else {
                if (seqProp) {
                    seqProp('RestoreSessionIntoASetOfWindows');
                }
            }
        });
    };
    this.filterCurrentWindow = function(seqProp) {
        this.idx8Val('sessionExport_Format', true, function(value) {
            if (value === 'CSV' || value === 'JSON' || value === 'HTML' || value === 'Markdown') {
                if (seqProp) {
                    seqProp(value);
                }
            } else {
                if (seqProp) {
                    seqProp('Text');
                }
            }
        });
    };
    this.adjustCurrentTab = function(cb) {
        this.idx8Val('sessionExport_Scope', true, function(value) {
            if (value === 'all' || value === 'previous' || value === 'saved') {
                if (cb) {
                    cb(value);
                }
            } else {
                if (cb) {
                    cb('selected');
                }
            }
        });
    };
    this.neutralizeWindowFocus = function(seqProp) {
        this.idx8Val('sessionSummaryRender_ShowAnnotation', false, function(value) {
            seqProp(value !== 'false');
        });
    };
    this.tabRow = function(seqProp) {
        this.idx8Val('sessionSummaryRender_PanelPosition', true, function(value) {
            if (value === 'right') {
                if (seqProp) {
                    seqProp(value);
                }
            } else {
                if (seqProp) {
                    seqProp('left');
                }
            }
        });
    };
    this.evalSessionConfigsToAddVal = function(seqProp) {
        this.idx8Val('sessionSummaryRender_PanelWidth', true, function(value) {
            if (Util.isNumeric(value)) {
                if (seqProp) {
                    seqProp(parseInt(value));
                }
            } else {
                if (seqProp) {
                    seqProp(260);
                }
            }
        });
    };
    this.iShowWindowsVal = function(seqProp) {
        var that = this;
        this.idx8Val('sessionSummaryRender_PreviousSessionQueueSize', false, function(value) {
            if (Util.isNumeric(value) && parseInt(value) > -1 && parseInt(value) <= that.isNm) {
                if (seqProp) {
                    seqProp(parseInt(value));
                }
            } else {
                if (seqProp) {
                    seqProp(3);
                }
            }
        });
    };
    this.fieldNm = function(seqProp) {
        this.idx8Val('showWindowCounts', true, function(value) {
            seqProp(value === 'true');
        });
    };
    this.iPosString = function(seqProp) {
        this.idx8Val('sessionExport_ShowWindows', true, function(value) {
            seqProp(value === 'true');
        });
    };
    this.mergeTabs = function(seqProp) {
        this.idx8Val('sessionExport_ShowSessions', true, function(value) {
            seqProp(value === 'true');
        });
    };
    this.evalOffsetVal = function(seqProp) {
        this.idx8Val('sessionExport_ShowTitles', true, function(value) {
            seqProp(value === 'true');
        });
    };
    this.filterSessionSource = function(seqProp) {
        this.idx8Val('sessionExport_ShowURLs', true, function(value) {
            seqProp(value !== 'false');
        });
    };
    this.deferCurrentSessionNotifyVal = function(seqProp) {
        this.idx8Val('tabFiltering_FilterSessionBuddyTabs', false, function(value) {
            if (seqProp) {
                seqProp(value !== 'false');
            }
        });
    };
    this.evalSbSelLineitem = function(seqProp) {
        this.expectStatusVal('tabCountsFilterSetting_SessionBuddyTabs', false, function(value) {
            if (seqProp) {
                seqProp(value);
            }
        });
    };
    this.normalizeTabList = function(seqProp) {
        this.idx8Val('tabFiltering_FilterChromeAdministrativeTabs', false, function(value) {
            seqProp(value === 'true');
        });
    };
    this.removeSessionConfigs = function(seqProp) {
        this.expectStatusVal('tabCountsFilterSetting_ChromeAdministrativeTabs', false, function(value) {
            seqProp(value);
        });
    };
    this.evalRespVal = function(iSession1Val, formatActiveSessionTab, bMergeVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, seqProp, iRegisterValue1Val, cacheSessionRoot, hoverLinksVal, reportOnly) {
        if (iSession1Val) {
            var that = this;
            this.nmVal.db.transaction(function(tx) {
                var headerDataSavedVal = new Date().toJSON();
                if (!iRegisterValue1Val) {
                    iRegisterValue1Val = headerDataSavedVal;
                }
                if (!cacheSessionRoot) {
                    cacheSessionRoot = headerDataSavedVal;
                }
                tx.executeSql('INSERT INTO SavedSessions (name, generationDateTime, creationDateTime, modificationDateTime, tags, users, deleted, thumbnail, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, windows) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [formatActiveSessionTab ? formatActiveSessionTab.trim() || null : null, bMergeVal ? bMergeVal : null, iRegisterValue1Val, cacheSessionRoot, [], [], 'false', hoverLinksVal || null, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, JSON.stringify(iSession1Val)], function(tx, data) {
                    tx.executeSql('SELECT last_insert_rowid();', [], function(tx, data) {
                        if (that.nmVal.rowsReturned(data)) {
                            tx.executeSql('UPDATE SavedSessions SET thumbnail=\'' + sessionConfigsVal(that.nmVal.evalOnlyCountDupes(data)['last_insert_rowid()']) + '\' WHERE id=?', [that.nmVal.evalOnlyCountDupes(data)['last_insert_rowid()']], function() {
                                if (seqProp) {
                                    seqProp(that.nmVal.evalOnlyCountDupes(data)['last_insert_rowid()'], cacheSessionRoot);
                                }
                                if (!reportOnly) {
                                    ga('send', 'event', 'tx', 'add', 'lx', renderActiveSessionTab + showActiveTab);
                                    querySessionAction('added_lx_tab_count', renderActiveSessionTab + showActiveTab);
                                }
                            });
                        }
                    }, function(tx, sqlErr) {
                        SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '903948203');
                        if (seqProp) {
                            seqProp(null, null);
                        }
                        return true;
                    });
                }, function(tx, sqlErr) {
                    SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '3224123123');
                    if (seqProp) {
                        seqProp(null, null);
                    }
                });
            });
        } else {
            if (seqProp) {
                seqProp(null, null);
            }
        }
    };
    this.trackTabPlacement = function(notifyCurrentTab, formatActiveSessionTab, cb) {
        this.iKeepActionOpenVal(notifyCurrentTab, undefined, formatActiveSessionTab, undefined, undefined, undefined, undefined, undefined, function(notifyCurrentTab, putTabPlaceholder) {
            cb(notifyCurrentTab && putTabPlaceholder);
        });
    };
    this.iKeepActionOpenVal = function(notifyCurrentTab, iSession1Val, formatActiveSessionTab, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, sessionConfig2, seqProp) {
        if (notifyCurrentTab) {
            this.nmVal.db.transaction(function(tx) {
                var horizontalOrientationArray = [], verticalOrientation = [];
                if (iSession1Val) {
                    horizontalOrientationArray.push('windows');
                    verticalOrientation.push(JSON.stringify(iSession1Val));
                }
                if (!Util.isUndefined(doc)) {
                    horizontalOrientationArray.push('unfilteredWindowCount');
                    verticalOrientation.push(doc);
                }
                if (!Util.isUndefined(registerSessionSource)) {
                    horizontalOrientationArray.push('filteredWindowCount');
                    verticalOrientation.push(registerSessionSource);
                }
                if (!Util.isUndefined(renderActiveSessionTab)) {
                    horizontalOrientationArray.push('unfilteredTabCount');
                    verticalOrientation.push(renderActiveSessionTab);
                }
                if (!Util.isUndefined(showActiveTab)) {
                    horizontalOrientationArray.push('filteredTabCount');
                    verticalOrientation.push(showActiveTab);
                }
                if (sessionConfig2 || horizontalOrientationArray.length) {
                    horizontalOrientationArray.push('modificationDateTime');
                    verticalOrientation.push(sessionConfig2 || (sessionConfig2 = new Date().toJSON()));
                }
                if (!Util.isUndefined(formatActiveSessionTab)) {
                    horizontalOrientationArray.push('name');
                    verticalOrientation.push(formatActiveSessionTab);
                }
                if (horizontalOrientationArray.length) {
                    verticalOrientation.push(notifyCurrentTab);
                    tx.executeSql('UPDATE SavedSessions SET ' + horizontalOrientationArray.join('=?, ') + '=? WHERE id=?', verticalOrientation, function(tx, data) {
                        if (seqProp) {
                            seqProp(notifyCurrentTab, data.rowsAffected, sessionConfig2 || null);
                        }
                    }, function(tx, sqlErr) {
                        console.error('8534682039: ' + sqlErr);
                        if (seqProp) {
                            seqProp(null, 0);
                        }
                    });
                } else if (seqProp) {
                    seqProp(notifyCurrentTab, 0);
                }
            });
        }
    };
    this.iBrchNodePropId = function(notifyCurrentTab, iSession1Val, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, seqProp) {
        if (notifyCurrentTab) {
            this.nmVal.db.transaction(function(tx) {
                var horizontalOrientationArray = [], verticalOrientation = [];
                if (iSession1Val) {
                    horizontalOrientationArray.push('windows');
                    verticalOrientation.push(JSON.stringify(iSession1Val));
                }
                if (!Util.isUndefined(doc)) {
                    horizontalOrientationArray.push('unfilteredWindowCount');
                    verticalOrientation.push(doc);
                }
                if (!Util.isUndefined(registerSessionSource)) {
                    horizontalOrientationArray.push('filteredWindowCount');
                    verticalOrientation.push(registerSessionSource);
                }
                if (!Util.isUndefined(renderActiveSessionTab)) {
                    horizontalOrientationArray.push('unfilteredTabCount');
                    verticalOrientation.push(renderActiveSessionTab);
                }
                if (!Util.isUndefined(showActiveTab)) {
                    horizontalOrientationArray.push('filteredTabCount');
                    verticalOrientation.push(showActiveTab);
                }
                if (horizontalOrientationArray.length) {
                    verticalOrientation.push(notifyCurrentTab);
                    tx.executeSql('UPDATE PreviousSessions SET ' + horizontalOrientationArray.join('=?, ') + '=? WHERE id=?', verticalOrientation, function(tx, data) {
                        if (seqProp) {
                            seqProp(notifyCurrentTab, data.rowsAffected);
                        }
                    }, function(tx, sqlErr) {
                        console.error('8534692994: ' + sqlErr);
                        if (seqProp) {
                            seqProp(null, 0);
                        }
                    });
                } else if (seqProp) {
                    seqProp(notifyCurrentTab, 0);
                }
            });
        }
    };
    this.selActionTypeVal = function(iSession1Val, iSelActionTypeVal, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, seqProp, iRegisterValue1Val, hoverLinksVal, reportOnly) {
        if (iSession1Val) {
            var that = this;
            this.nmVal.db.transaction(function(tx) {
                tx.executeSql('SELECT id FROM PreviousSessions ORDER BY id DESC', [], function(tx, data) {
                    if (that.nmVal.rowsReturned(data) >= that.isNm) {
                        tx.executeSql('DELETE FROM PreviousSessions WHERE id<?', [data.rows.item(that.isNm - 2).id]);
                    }
                });
            });
            this.nmVal.db.transaction(function(tx) {
                if (!iRegisterValue1Val) {
                    iRegisterValue1Val = new Date().toJSON();
                }
                tx.executeSql('INSERT into PreviousSessions (recordingDateTime, creationDateTime, users, deleted, thumbnail, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, windows) VALUES (?,?,?,?,?,?,?,?,?,?)', [iSelActionTypeVal ? iSelActionTypeVal : null, iRegisterValue1Val, [], 'false', hoverLinksVal || null, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, JSON.stringify(iSession1Val)], function(tx, data) {
                    tx.executeSql('SELECT last_insert_rowid();', [], function(tx, data) {
                        if (that.nmVal.rowsReturned(data)) {
                            tx.executeSql('UPDATE PreviousSessions SET thumbnail=\'' + sessionConfigsVal(that.nmVal.evalOnlyCountDupes(data)['last_insert_rowid()']) + '\' WHERE id=?', [that.nmVal.evalOnlyCountDupes(data)['last_insert_rowid()']], function() {
                                if (seqProp) {
                                    seqProp(that.nmVal.evalOnlyCountDupes(data)['last_insert_rowid()'], iSelActionTypeVal);
                                }
                                if (!reportOnly) {}
                            });
                        }
                    });
                }, function(tx, sqlErr) {
                    SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '72322015293');
                    if (seqProp) {
                        seqProp(null, null);
                    }
                });
            });
        }
    };
    this.evalSeparatorIdx = function(seqProp) {
        this.expectStatusVal('mergedSessionNameIncrement', true, function(value) {
            if (!value) {
                value = 1;
            }
            if (seqProp) {
                seqProp(Util.serializeWindowTab(value, 4));
            }
        });
    };
    this.bRender = function(seqProp) {
        var that = this;
        this.expectStatusVal('mergedSessionNameIncrement', true, function(value) {
            if (value) {
                value++;
            } else {
                value = 2;
            }
            that.resetIcon('mergedSessionNameIncrement', value, function() {
                if (seqProp) {
                    seqProp(Util.serializeWindowTab(value, 4));
                }
            });
        });
    };
    this.appMsgVal = function(searchCurrentWindow, trackTabTransactions, seqProp) {
        if (searchCurrentWindow) {
            var currentSettingsVal = [];
            var allowUndoTrigger = [];
            var i;
            for (i = 0; i < searchCurrentWindow.length; i++) {
                if (searchCurrentWindow[i].type === 'previous') {
                    currentSettingsVal.push(searchCurrentWindow[i].id);
                } else if (searchCurrentWindow[i].type === 'saved') {
                    allowUndoTrigger.push(searchCurrentWindow[i].id);
                }
            }
            var that = this;
            this.nmVal.db.transaction(function(tx) {
                tx.executeSql('UPDATE SavedSessions SET deleted=\'' + (trackTabTransactions ? 'true' : 'false') + '\' WHERE id IN (' + allowUndoTrigger.join(',') + ')', [], function(tx, setMatchText) {
                    tx.executeSql('UPDATE PreviousSessions SET deleted=\'' + (trackTabTransactions ? 'true' : 'false') + '\' WHERE id IN (' + currentSettingsVal.join(',') + ')', [], function(tx, initSessionConfig) {
                        if (seqProp) {
                            seqProp(setMatchText.rowsAffected + initSessionConfig.rowsAffected);
                        }
                        var dga = 0;
                        for (i = setMatchText.rowsAffected; i--; ) {
                            setTimeout(function(trackTabTransactions) {
                                ga('send', 'event', 'tx', trackTabTransactions ? 'delete' : 'undelete', 'lx');
                            }, dga * 1100, trackTabTransactions);
                            dga++;
                        }
                        for (i = initSessionConfig.rowsAffected; i--; ) {
                            setTimeout(function(trackTabTransactions) {
                                ga('send', 'event', 'tx', trackTabTransactions ? 'delete' : 'undelete', 'lx_previous');
                            }, dga * 1100, trackTabTransactions);
                            dga++;
                        }
                    }, function(tx, err) {
                        SbUtil.windowStartIdx(err, 2, that.idx2Val, '7213487');
                    });
                }, function(tx, err) {
                    SbUtil.windowStartIdx(err, 2, that.idx2Val, '94472347');
                });
            });
        }
    };
    this.sessionConfigsAllVal = function(seqProp) {
        var that = this;
        this.nmVal.db.transaction(function(tx) {
            tx.executeSql('DELETE FROM SavedSessions WHERE deleted=\'true\'', [], function(tx, setMatchText) {
                tx.executeSql('DELETE FROM PreviousSessions WHERE deleted=\'true\'', [], function(tx, initSessionConfig) {
                    if (seqProp) {
                        seqProp(setMatchText.rowsAffected + initSessionConfig.rowsAffected);
                    }
                }, function(tx, sqlErr) {
                    SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '489314871092');
                });
            }, function(tx, sqlErr) {
                SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '52897234972');
            });
        });
    };
    this.elMetricsVal = function(seqProp) {
        var that = this;
        this.nmVal.db.transaction(function(tx) {
            tx.executeSql('DELETE FROM PreviousSessions', [], function(tx, initSessionConfig) {
                if (seqProp) {
                    seqProp(initSessionConfig.rowsAffected);
                }
            }, function(tx, err) {
                SbUtil.windowStartIdx(err, 2, that.idx2Val, '2423954');
            });
        });
    };
    this.contextToVal = function(notifyCurrentTab, seqProp) {
        var that = this;
        this.nmVal.db.readTransaction(function(tx) {
            tx.executeSql('SELECT id, name, generationDateTime, creationDateTime, modificationDateTime, deleted, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, thumbnail AS gid FROM SavedSessions WHERE id=?', [notifyCurrentTab], function(tx, data) {
                if (that.nmVal.rowsReturned(data)) {
                    seqProp(data.rows.item(0));
                } else {
                    seqProp(undefined);
                }
            });
        });
    };
    this.primaryKeySelect = function(keyFilterParms, seqProp) {
        var that = this;
        this.nmVal.db.readTransaction(function(tx) {
            tx.executeSql('SELECT id, \'saved\' AS type, name, generationDateTime, creationDateTime, modificationDateTime, deleted, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount FROM SavedSessions WHERE thumbnail=?', [keyFilterParms], function(tx, data) {
                if (that.nmVal.rowsReturned(data)) {
                    seqProp(data.rows.item(0));
                } else {
                    tx.executeSql('SELECT id, \'previous\' AS type, recordingDateTime, creationDateTime, deleted, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount FROM PreviousSessions WHERE thumbnail=?', [keyFilterParms], function(tx, data) {
                        if (that.nmVal.rowsReturned(data)) {
                            seqProp(data.rows.item(0));
                        } else {
                            seqProp(undefined);
                        }
                    });
                }
            });
        });
    };
    this.evalRegisterValue1 = function(notifyCurrentTab, seqProp) {
        var that = this;
        this.nmVal.db.readTransaction(function(tx) {
            tx.executeSql('SELECT id, recordingDateTime, creationDateTime, deleted, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, thumbnail AS gid FROM PreviousSessions WHERE id=?', [notifyCurrentTab], function(tx, data) {
                if (that.nmVal.rowsReturned(data)) {
                    seqProp(data.rows.item(0));
                } else {
                    seqProp(undefined);
                }
            });
        });
    };
    this.serializeActiveSessionTab = function(val3, tx, seqProp) {
        if (seqProp) {
            var qualifierInjectionStr, that = this;
            if (val3 === void 0) {
                qualifierInjectionStr = 'deleted != \'true\'';
            } else if (toString.call(val3) === '[object Array]') {
                qualifierInjectionStr = 'id in (' + val3.join(',') + ')';
            } else {
                qualifierInjectionStr = 'id=' + val3;
            }
            var syncWindowTitle = function(tx) {
                tx.executeSql('SELECT id, thumbnail, recordingDateTime, creationDateTime, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, windows FROM PreviousSessions WHERE ' + qualifierInjectionStr + ' ORDER BY id DESC', [], function(tx, data) {
                    if (that.nmVal.rowsReturned(data)) {
                        if (val3 === void 0 || toString.call(val3) === '[object Array]') {
                            seqProp(data.rows, tx);
                        } else {
                            seqProp(data.rows.item(0), tx);
                        }
                    } else {
                        seqProp(undefined);
                    }
                });
            };
            if (tx) {
                syncWindowTitle(tx);
            } else {
                this.nmVal.db.transaction(syncWindowTitle);
            }
        }
    };
    this.renderWindowTab = function(val3, tx, seqProp) {
        if (seqProp) {
            var qualifierInjectionStr, that = this;
            if (val3 === void 0) {
                qualifierInjectionStr = 'deleted != \'true\'';
            } else if (toString.call(val3) === '[object Array]') {
                qualifierInjectionStr = 'id in (' + val3.join(',') + ')';
            } else {
                qualifierInjectionStr = 'id=' + val3;
            }
            var syncWindowTitle = function(tx) {
                tx.executeSql('SELECT id, thumbnail, name, generationDateTime, creationDateTime, modificationDateTime, unfilteredWindowCount, filteredWindowCount, unfilteredTabCount, filteredTabCount, windows FROM SavedSessions WHERE ' + qualifierInjectionStr + ' ORDER BY id DESC', [], function(tx, data) {
                    if (that.nmVal.rowsReturned(data)) {
                        if (val3 === void 0 || toString.call(val3) === '[object Array]') {
                            seqProp(data.rows, tx);
                        } else {
                            seqProp(data.rows.item(0), tx);
                        }
                    } else {
                        seqProp(undefined);
                    }
                });
            };
            if (tx) {
                syncWindowTitle(tx);
            } else {
                this.nmVal.db.transaction(syncWindowTitle);
            }
        }
    };
    this.includeSeqProp = function(notifyCurrentTab, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, tx, seqProp) {
        var that = this;
        var syncWindowTitle = function(tx) {
            tx.executeSql('UPDATE PreviousSessions SET unfilteredWindowCount=?, filteredWindowCount=?, unfilteredTabCount=?, filteredTabCount=? WHERE id=?', [doc, registerSessionSource, renderActiveSessionTab, showActiveTab, notifyCurrentTab], function(tx, data) {
                if (seqProp) {
                    seqProp(tx);
                }
            }, function(tx, err) {
                SbUtil.windowStartIdx(err, 2, that.idx2Val, '4290842');
            });
        };
        if (tx == undefined) {
            this.nmVal.db.transaction(syncWindowTitle);
        } else {
            syncWindowTitle(tx);
        }
    };
    this.saveWindow = function(notifyCurrentTab, doc, registerSessionSource, renderActiveSessionTab, showActiveTab, tx, seqProp) {
        var that = this;
        var syncWindowTitle = function(tx) {
            tx.executeSql('UPDATE SavedSessions SET unfilteredWindowCount=?, filteredWindowCount=?, unfilteredTabCount=?, filteredTabCount=? WHERE id=?', [doc, registerSessionSource, renderActiveSessionTab, showActiveTab, notifyCurrentTab], function(tx, data) {
                if (seqProp) {
                    seqProp(tx);
                }
            }, function(tx, err) {
                SbUtil.windowStartIdx(err, 2, that.idx2Val, '94776492');
            });
        };
        if (tx == undefined) {
            this.nmVal.db.transaction(syncWindowTitle);
        } else {
            syncWindowTitle(tx);
        }
    };
    this.iSiblingSequence = function(opacityAnimationVal, parseTabList, seqProp) {
        var that = this;
        this.resetIcon('tabCountsFilterSetting_SessionBuddyTabs', opacityAnimationVal, function() {
            that.resetIcon('tabCountsFilterSetting_ChromeAdministrativeTabs', parseTabList, seqProp);
        });
    };
    this.lastFrameVal = function(evalOptDefaultRTypeVal, registerTab, recoverySessionVal, seqProp, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache) {
        if (registerTab && evalOptDefaultRTypeVal) {
            if (!iSearchRequest) {
                iSearchRequest = null;
            }
            if (!extractCurrentSession) {
                extractCurrentSession = null;
            }
            if (!optDefaultRTypeVal) {
                optDefaultRTypeVal = null;
            }
            if (!countWindowTabs) {
                countWindowTabs = null;
            }
            if (!updateSessionCache) {
                updateSessionCache = null;
            }
            var that = this;
            this.nmVal.db.transaction(function(tx) {
                tx.executeSql('INSERT INTO Undo (creationDateTime, tabIdentifier, action, description, register1, register2, register3, register4, register5) VALUES (?,?,?,?,?,?,?,?,?)', [new Date().toJSON(), evalOptDefaultRTypeVal, registerTab, recoverySessionVal, iSearchRequest, extractCurrentSession, optDefaultRTypeVal, countWindowTabs, updateSessionCache], function(tx, data) {
                    if (seqProp) {
                        seqProp();
                    }
                }, function(tx, sqlErr) {
                    SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '0398373');
                });
            });
        }
    };
    this.cachePtPairVal = function(evalOptDefaultRTypeVal, seqProp) {
        var bMerge = '';
        var iRangeVal = [];
        var that = this;
        if (evalOptDefaultRTypeVal) {
            bMerge = 'SELECT id, action FROM Undo WHERE tabIdentifier=? ORDER BY creationDateTime DESC, id DESC';
            iRangeVal = [evalOptDefaultRTypeVal];
        } else {
            bMerge = 'SELECT id, action FROM Undo ORDER BY creationDateTime DESC, id DESC';
            iRangeVal = [];
        }
        this.nmVal.db.transaction(function(tx) {
            tx.executeSql(bMerge, iRangeVal, function(tx, data) {
                if (that.nmVal.rowsReturned(data)) {
                    if (seqProp) {
                        seqProp(data.rows.item(0));
                    }
                } else {
                    if (seqProp) {
                        seqProp(null);
                    }
                }
            }, function(tx, sqlErr) {
                SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '7298372');
            });
        });
    };
    this.iApplicationEx = function(evalOptDefaultRTypeVal, seqProp) {
        var bMerge = '';
        var iRangeVal = [];
        var that = this;
        if (evalOptDefaultRTypeVal) {
            bMerge = 'SELECT id FROM Undo WHERE tabIdentifier=? ORDER BY creationDateTime DESC, id DESC';
            iRangeVal = [evalOptDefaultRTypeVal];
        } else {
            bMerge = 'SELECT id FROM Undo ORDER BY creationDateTime DESC, id DESC';
            iRangeVal = [];
        }
        this.nmVal.db.transaction(function(tx) {
            tx.executeSql(bMerge, iRangeVal, function(tx, data) {
                if (that.nmVal.rowsReturned(data)) {
                    tx.executeSql('SELECT * FROM Undo WHERE id=?', [data.rows.item(0).id], function(tx, initSessionConfig) {
                        if (that.nmVal.rowsReturned(initSessionConfig)) {
                            tx.executeSql('DELETE FROM Undo WHERE id=?', [data.rows.item(0).id], function(tx, d5) {
                                if (seqProp) {
                                    seqProp(initSessionConfig.rows.item(0));
                                }
                            }, function(tx, sqlErr) {
                                SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '83409345');
                            });
                        } else {
                            if (seqProp) {
                                seqProp(null);
                            }
                        }
                    }, function(tx, sqlErr) {
                        SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '8923483');
                    });
                } else {
                    if (seqProp) {
                        seqProp(null);
                    }
                }
            }, function(tx, sqlErr) {
                SbUtil.windowStartIdx(sqlErr, 2, that.idx2Val, '0398373');
            });
        });
    };
}