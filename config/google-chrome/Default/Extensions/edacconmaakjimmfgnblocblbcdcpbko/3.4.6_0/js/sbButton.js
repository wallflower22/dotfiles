/* Copyright (c) 2015 Session Buddy */

function windowArray(unifySavedSession, errorDetailsVal) {
    if (Util.txAltVal(unifySavedSession) && !unifySavedSession.classList.contains('iFlashCount')) {
        if (errorDetailsVal) {
            $(errorDetailsVal).addClass('startsWithVal');
        }
        unifySavedSession.classList.add('iTitleTextVal');
        return true;
    }
    return false;
}

function resetActiveTab(unifySavedSession, errorDetailsVal) {
    if (Util.txAltVal(unifySavedSession) && !unifySavedSession.classList.contains('iFlashCount')) {
        if (errorDetailsVal) {
            $(errorDetailsVal).removeClass('startsWithVal');
        }
        unifySavedSession.classList.remove('iTitleTextVal');
        unifySavedSession.classList.remove('idx3Val');
        return true;
    }
    return false;
}

function propVal(unifySavedSession, errorDetailsVal) {
    $('body').addClass('resp');
    if (event.which === 1 && event.button === 0 && Util.txAltVal(unifySavedSession)) {
        if (errorDetailsVal) {
            errorDetailsVal.style.borderRightColor = 'hsl(0, 0%, 88%)';
        }
        unifySavedSession.classList.add('idx3Val');
        return true;
    }
    return false;
}

function renderSessionWindow(unifySavedSession, errorDetailsVal) {
    $('body').removeClass('resp');
    if (Util.txAltVal(unifySavedSession)) {
        if (errorDetailsVal) {
            errorDetailsVal.style.borderRightColor = '';
        }
        unifySavedSession.classList.remove('idx3Val');
        return true;
    }
    return false;
}

function getSessionRoot(unifySavedSession) {
    if (event.which === 1 && event.button === 0 && Util.txAltVal(unifySavedSession)) {
        return true;
    }
    return false;
}

function cachePtAreaVal(unifySavedSession, seqProp) {
    if (windowArray(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function refreshTabUrl(unifySavedSession, errorDetailsVal, seqProp) {
    if (windowArray(unifySavedSession, errorDetailsVal)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function session1(unifySavedSession, seqProp) {
    if (resetActiveTab(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function formatCurrentTab(unifySavedSession, errorDetailsVal, seqProp) {
    if (resetActiveTab(unifySavedSession, errorDetailsVal)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function popActiveTab(unifySavedSession, seqProp) {
    if (propVal(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function tokenComponentImgVal(unifySavedSession, seqProp) {
    if (renderSessionWindow(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function getPreviousSession(unifySavedSession, seqProp) {
    if (getSessionRoot(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function recoverySession(unifySavedSession, seqProp) {
    if (propVal(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function dirtyVal(unifySavedSession, seqProp) {
    if (renderSessionWindow(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function augmentActiveWindow(unifySavedSession, seqProp) {
    if (getSessionRoot(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function session1WindowIdx(unifySavedSession, seqProp, errorDetailsVal) {
    if (propVal(unifySavedSession, errorDetailsVal)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function cacheActiveSessionTab(unifySavedSession, seqProp) {
    if (renderSessionWindow(unifySavedSession)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function iIncludeSeqProp(unifySavedSession, evalQualifyingArrayVal, errorDetailsVal, seqProp) {
    if (getSessionRoot(unifySavedSession)) {
        iWindows(unifySavedSession, q(evalQualifyingArrayVal), errorDetailsVal);
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function limitedSetOfWindowsVal(unifySavedSession, evalQualifyingArrayVal, errorDetailsVal, seqProp) {
    if (getSessionRoot(unifySavedSession)) {
        iWindows(unifySavedSession, q(evalQualifyingArrayVal), errorDetailsVal);
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
        }
    }
}

function syncTabState(localeNm, seqProp) {
    if (event.which === 1 && Util.txAltVal(localeNm)) {
        if (seqProp) {
            var iSearchTermVal = [];
            for (var i = 2; i < arguments.length; i++) {
                iSearchTermVal.push(arguments[i]);
            }
            seqProp.apply(seqProp, iSearchTermVal);
            isRangeDirBackVal();
        }
    }
    event.stopPropagation();
    event.preventDefault();
}

function iWindows(unifySavedSession, iDirty, errorDetailsVal) {
    if (iDirty.classList.contains('invisible')) {
        iCaretVal(unifySavedSession, iDirty, errorDetailsVal);
        return true;
    } else {
        evalSessionStorageKey(unifySavedSession, iDirty, errorDetailsVal);
        isRangeDirBackVal();
        return false;
    }
}

function iCaretVal(unifySavedSession, iDirty, errorDetailsVal) {
    if (Util.txAltVal(unifySavedSession) && !iDirty.classList.contains('visible')) {
        isRangeDirBackVal();
        unifySavedSession.classList.add('iFlashCount');
        iDirty.classList.add('visible');
        iDirty.classList.remove('invisible');
        if (errorDetailsVal) {
            errorDetailsVal.style.borderRightColor = 'hsl(0, 0%, 88%)';
        }
    }
}

function evalSessionStorageKey(unifySavedSession, iDirty, errorDetailsVal) {
    var panelLocationIsKnown;
    if (Util.txAltVal(unifySavedSession) && !iDirty.classList.contains('invisible')) {
        if (errorDetailsVal) {
            errorDetailsVal.style.borderRightColor = '';
        }
        unifySavedSession.classList.remove('iFlashCount');
        unifySavedSession.classList.remove('idx3Val');
        unifySavedSession.classList.remove('iTitleTextVal');
        iDirty.classList.add('invisible');
        if (iDirty.classList.contains('visible')) {
            panelLocationIsKnown = true;
            iDirty.classList.remove('visible');
        } else {
            panelLocationIsKnown = false;
        }
    }
    return panelLocationIsKnown;
}