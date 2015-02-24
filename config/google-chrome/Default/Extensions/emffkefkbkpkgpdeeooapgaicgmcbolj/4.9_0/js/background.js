/*
 For review team:
 The "Better wikipedia" extension has been completely rewritten in this version.
 Originally it used the CrossRider platform, and now it is a complete stand alone extension.

 Most of the functionality in the new version originates from the older version, with a few additions/modifications:

 1. Added buttons in DOM to allow user to easily switch between wikipedia/wikiwand
 2. Not redirecting on non-article wikipedia pages.
 3. Added Google Analytics tracking
 */

//Our transition from Quickiwiki to Wikiwand is now complete
//This version now handles only one target domain - www.Wikiwand.com

var WIKIWAND_ANALYTICS_STATS_VIEW = 'UA-49207730-2';
var EXTENSION_ID = 'emffkefkbkpkgpdeeooapgaicgmcbolj';

// =====================================================================================================================
// Analytics
// =====================================================================================================================
function makeid()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for( var i=0; i < 8; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

try {
	// This is Google Analytics code, used to anonymously report to GA. This is used by us to count the number of active anonymous users
	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
			(i[r].q = i[r].q || []).push (arguments)
		}, i[r].l = 1 * new Date ();
		a = s.createElement (o),
			m = s.getElementsByTagName (o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore (a, m)
	}) (window, document, 'script', 'chrome-extension://' + EXTENSION_ID + '/lib/google-analytics.js', 'ga');
	/*
	 IMPORTANT NOTE:
	 We are using a modified version of the file google-analytics.js and not the one available through google cdn
	 The reason is a known issue with the google-analytics file which does not allow reporting from extensions (protocol
	 test allows http and https but not chrome-extension protocol), when in universal analytics mode.
	 This issue and workaround are describe in:
	 http://stackoverflow.com/questions/16135000/how-do-you-integrate-universal-analytics-in-to-chrome-extensions
	 */

	gaReport = function () {
		ga ('create', WIKIWAND_ANALYTICS_STATS_VIEW, 'auto');
		ga ('set', 'dimension1', 'wikiwand');
		ga ('set', 'dimension2', localStorage['autoRedirect']);
		ga ('set', 'dimension3', 'Chrome-' + chrome.app.getDetails ().version.toString ());
		ga ('send', 'pageview', 'extension-active');
		if (localStorage['hash']){
			ga('send','event','extension-alive','chrome-'+localStorage['autoRedirect'],localStorage['hash']);
		}
	};
	setTimeout (gaReport, 10 * 1000);
	setInterval (gaReport, 60 * 60 * 1000);
}
catch (err) {
	console.log ('Could not load analytics');
}


if (!localStorage['hash']){
	localStorage['hash'] =makeid();
}

// Reset autoRedirect to true on every browser start
localStorage['autoRedirect'] = 'true';


// =====================================================================================================================
// Handle navigation events
// =====================================================================================================================

//this function is mainly used to test whether a page needs to be redirected.
//During the transition period, it also tests some URLs related to transition.
function testNavigation(details) {
	// Test if page needs to be redirected. If so - redirect !!
	var requestedURL = details.url;
	var returnVal = testAutoRedirect (requestedURL);
	if (returnVal.redirectURL !== null) {
		if (localStorage['autoRedirect'] === 'true' && returnVal.domain === 'wikipedia') {//if we need to auto-redirect from wikipedia to wikiwand, do it
			chrome.tabs.update (details.tabId, {url: returnVal.redirectURL});
			console.log('redirecting from wikipedia to wikiwand');
		}
	}
}

// Perform the above function before any navigation
// This is used for links that we did not replace, for example: bookmarks, links from email, URLs
// entered in the omnibox, etc.
chrome.webNavigation.onBeforeNavigate.addListener (function (details) {
	testNavigation (details);
});
chrome.webNavigation.onCommitted.addListener (function (details) {
	testNavigation (details);
});

// =====================================================================================================================
// Helpers for content scripts
// =====================================================================================================================

function redirectCurrentTab() {
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs) {
		var tab = tabs[0];
		var returnVal = getRedirectUrl (tab.url);
		if (returnVal.redirectURL) {
			chrome.tabs.update (tab.id, {url: returnVal.redirectURL});
		}
	});
}
// This listener is used to communicate with the content_script which runs on both wikipedia pages and wikiwand pages
// This allows the button presented within the DOM to manipulate the redirect-state desired by the user.
chrome.extension.onMessage.addListener (function (message, sender,sendResponse) {
	if (message.command === 'auto-redirect-on') {
		localStorage['autoRedirect'] = 'true';
		ga ('send', 'event','extension','redirect','on');
		redirectCurrentTab ();
	}

	if (message.command === 'auto-redirect-off') {
		localStorage['autoRedirect'] = 'false';
		ga ('send', 'event','extension','redirect','off');
		redirectCurrentTab ();
	}

	if (message.command==='get-auto-redirect'){
		if (localStorage['autoRedirect']=='true'){
			sendResponse({'autoRedirect':true});
		}else {
			sendResponse({'autoRedirect': false});
		}
	}

	if (message.command === 'google-analytics-event') {
		ga ('send', 'event', message.category,message.action,message.label);
	}
	if (message.command === 'ping') {
		//do nothing
	}
	if (message.command === 'version') {
		sendResponse({'ver': chrome.app.getDetails().version.toString()});
	}
});


//the purpose of this listener, is to allow the extension to preload a resource for wikiwand from S3
//the origin is needed when requesting from S3, so when the file is saved in browser cache, it can be later
//used by the website wikiwand.com
//this listener is set to operate only on web request directed at the wikiwand bucket on S3
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		details.requestHeaders.push({name:"Origin",value:"http://www.wikiwand.com"});
		return {requestHeaders: details.requestHeaders};
	},
	{urls: ["*://s3.amazonaws.com/ww-article-cache-1/*/*","*://db0nus869y26v.cloudfront.net/*/*"]},
	["requestHeaders", "blocking"]
);










chrome.runtime.onInstalled.addListener(function(){ //this happens on install and on update
	localStorage['installed'] = true;
	chrome.tabs.query ({}, function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			var appRegExp = new RegExp ("^https?://([a-zA-Z0-9_\\-\\.]+)?\\.(wikiwand|localwiki)\\.com", "i");
			var match = tabs[i].url.match (appRegExp);
			if (!match) {
				var wikipediaRegExp = new RegExp ("^https?://([a-zA-Z0-9\\-_]+)\\.(?:m\\.)?wikipedia\\.org", "i");
				match = tabs[i].url.match (wikipediaRegExp);
			}
			if (match) {
				chrome.tabs.reload (tabs[i].id, {}, null);
			}
		}
	});

	if (localStorage['thank you']) { //this happens only on update
		try {
			setTimeout (function() {
				console.log('reported extension update');
				ga('send', 'event', 'extension-installed', 'update', "chrome-"+chrome.app.getDetails().version.toString());
			}, 10 * 1000);
		}catch(e){}
	}else{
		localStorage['thank you'] = 'already opened thank you page';
		try {
			setTimeout (function() {
				console.log('reported extension first install');
				ga('send', 'event', 'extension-installed', 'install', "chrome-"+chrome.app.getDetails().version.toString());
			}, 10 * 1000);
		}catch(e){}
		chrome.tabs.create ({url: "http://www.wikiwand.com/extension/thank-you"});
	}
});

