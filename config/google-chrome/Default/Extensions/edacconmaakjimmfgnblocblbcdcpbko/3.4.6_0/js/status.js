/* Copyright (c) 2015 Session Buddy */

var SbUtil, Util, q, iPredicateVal = BrowserAPI.getBackgroundPage();

function evalSessionNm(outAddedSessionConfigs, iTab2Val, updateTabAction) {
    if (iTab2Val) {
        return (updateTabAction ? '; \n' : '') + outAddedSessionConfigs + ': ' + iTab2Val;
    } else {
        return '';
    }
}

function getSQLErrorLabelByCode(code) {
    switch (code) {
      case 0:
        return 'UNKNOWN_ERR';

      case 1:
        return 'DATABASE_ERR';

      case 2:
        return 'VERSION_ERR';

      case 3:
        return 'TOO_LARGE_ERR';

      case 4:
        return 'QUOTA_ERR';

      case 5:
        return 'SYNTAX_ERR';

      case 6:
        return 'CONSTRAINT_ERR';

      case 7:
        return 'TIMEOUT_ERR';

      default:
        return '(unknown)';
    }
}

if (iPredicateVal && iPredicateVal.SbUtil && iPredicateVal.Util) {
    SbUtil = iPredicateVal.SbUtil;
    Util = iPredicateVal.Util;
    q = iPredicateVal.q.bind(window);
    (function() {
        var dedupeSessionsVal, t11, faveName = '';
        if (Util.addTitle() > 1) {
            if (SbUtil.iExpectStatusVal) {
                faveName = 'logo_32x32_err.png';
            } else {
                faveName = 'logo_32x32.png';
            }
        } else {
            if (SbUtil.iExpectStatusVal) {
                faveName = 'logo_16x16_err.png';
            } else {
                faveName = 'logo_16x16.png';
            }
        }
        document.write('<link id="favIcon" rel="icon" href="images/logo/_ACTIVE/' + faveName + '" />');
        document.addEventListener('DOMContentLoaded', function() {
            q('refresh').style.display = 'none';
            q('iOrderStringVal').addEventListener('click', function() {
                if (iPredicateVal.matchTextVal(dedupeSessionsVal)) {
                    q('tabDataInject').classList.add('transposeTab');
                    clearTimeout(t11);
                    t11 = setTimeout(function() {
                        q('tabDataInject').classList.remove('transposeTab');
                    }, 300);
                }
            });
            if (SbUtil.iExpectStatusVal) {
                dedupeSessionsVal = sbRegExpVal(SbUtil.iExpectStatusVal);
                q('body').classList.add('error');
                q('header').classList.add('handleExceptions');
                q('iRegisterValue2Val').src = 'images/logo/_ACTIVE/logo_38x38_err.png';
                q('evalRequestHonored').textContent = 'Session Buddy seems to have encountered an error' + (iPredicateVal.updateTabUrl ? '' : ' preventing it from starting') + '.';
                q('augmentActiveSessionTab').textContent = 'To get help with this error, try the following:';
                q('bd').style.display = 'none';
                q('rDetail').style.display = 'none';
                q('bnd').style.display = 'inline';
                q('tatePanel').style.display = 'block';
                q('l1').href = q('l2').href = 'mailto:support@sessionbuddy.com?subject=Session Buddy Error&body=' + escape('Please include a description of the problem to help us troubleshoot it.\n\n\n------------ Diagnostic Details Follow ------------\n') + escape(dedupeSessionsVal);
            } else {
                q('evalRequestHonored').textContent = 'Good news. Session Buddy seems to be running fine.';
                q('augmentActiveSessionTab').textContent = 'If you experience a technical problem with Session Buddy in the future, try the following:';
                q('bd').style.display = 'inline';
                q('rDetail').style.display = 'inline';
                q('bnd').style.display = 'none';
            }
            if (iPredicateVal.updateTabUrl) {
                SbUtil.iExpectStatusVal = null;
                iPredicateVal.showTab();
            }
        }, false);
        function sbRegExpVal(initCurrentSession) {
            var r = '';
            r += evalSessionNm('Date', initCurrentSession ? initCurrentSession.dateTime : new Date(), r);
            r += evalSessionNm('Platform', navigator.platform, r);
            r += evalSessionNm('OS', Util.nArray(), r);
            r += evalSessionNm('User Agent', navigator.userAgent, r);
            r += evalSessionNm('Pixel Ratio', Util.addTitle(), r);
            r += evalSessionNm('Language', navigator.language, r);
            r += evalSessionNm('SB ID', chrome.app.getDetails().id, r);
            r += evalSessionNm('SB Version', chrome.app.getDetails().version, r);
            if (initCurrentSession) {
                r += evalSessionNm('Source', initCurrentSession.source, r);
                if (initCurrentSession.exception) {
                    var cl;
                    if (initCurrentSession.exception.DATABASE_ERR) {
                        r += evalSessionNm('Type', 'SQLError', r);
                        if (initCurrentSession.exception.code) {
                            cl = ' [' + getSQLErrorLabelByCode(initCurrentSession.exception.code) + ']';
                        }
                    } else if (initCurrentSession.exception.type) {
                        r += evalSessionNm('Type', initCurrentSession.exception.type, r);
                    }
                    r += evalSessionNm('Code', (initCurrentSession.exception.code || '') + (cl || ''), r);
                    r += evalSessionNm('Message', initCurrentSession.exception.message, r);
                    r += evalSessionNm('Name', initCurrentSession.exception.name, r);
                    r += evalSessionNm('Stack', initCurrentSession.exception.stack, r);
                }
                if (!(initCurrentSession.exception && initCurrentSession.exception.stack)) {
                    r += evalSessionNm('Stack', initCurrentSession.trace, r);
                }
                console.log('Application Exception', initCurrentSession);
            }
            return r;
        }
    })();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('bAppImport').addEventListener('click', function() {
            window.location.reload();
        });
    }, false);
}