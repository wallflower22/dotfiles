/*
 This content script is used to add a toggle button to both Wikipedia and WikiWand pages
 This toggle button allows the user to switch the redirect configuration between those 2 sites
 with just a single mouse click from the DOM itself
 This is very important, so the user can easily and intuitively go back and forth between Wikipedia and WikiWand.
 */


var version='0';
var autoRedirectState;

chrome.runtime.sendMessage({command:'get-auto-redirect'},function(response){
	//console.log('response ',response.autoRedirect);
	autoRedirectState=response.autoRedirect;
	//console.log('window location host')
	if (window.location.hostname === 'www.localwiki.com' ||  window.location.host==='www.wikiwand.com'
		||  window.location.host==='www.ww-web-stage.wikiwand.com') {
		if (autoRedirectState==false){
			$(document).ready(function(){
				$('.toggle_wiki').hide(); //don't show button if it is not alighned with the current state
			});
		}
	}

	if (autoRedirectState==true){
		$(document).ready(function(){
			$('#switch_to_wikiwand').hide(); //don't show button if it is not alighned with the current state
		});
	}
});

//this cookie is set only for the wikiwand pages, so the client side can tell that the extension is installed
//This only works on Wikiwand pages (and localwiki for testing)
function setExtensionCookie(){
	if ((document.location.host === 'www.wikiwand.com') ||
		(document.location.host === 'www.localwiki.com:3000') ||
		(document.location.host.indexOf('wikiwand.com') >= 0)
		) {
		var date = new Date();
		date.setTime(date.getTime() + 30* 24 * 60 * 60 * 1000);
		document.cookie = "wikiwand.extension.installed=True; expires=" + date.toUTCString() + "; path=/";
		localStorage['wikiwand.extension.button.version']='2';
	}
}
setExtensionCookie();



//This is used to detect right to left languages
var RTL_LANGS = [
	"aeb",
	"ar",
	"arc",
	"arq",
	"ary",
	"arz",
	"az-ara",
	"bqi",
	"ckb",
	"fa",
	"glk",
	"ks-arab",
	"he",
	"lat-hebr",
	"ps",
	"sd",
	"ur",
	"ydd",
	"yi"
];

// =====================================================================================================================
// Helper Functions
// =====================================================================================================================

// Show the switch button on Wikipedia/WikiWand
// fromHost: the website the user is visiting right now and where we display the button.
function selectSwitchButtonImage(fromHost, appName) {
	var imgURL = '';
	if (fromHost === 'wikipedia') {
		// User is in Wikipedia
		imgURL = chrome.extension.getURL("images/switch-to-wikiwand.png");
	} else {
		// User is in WikiWand
		imgURL = chrome.extension.getURL("images/switch-to-wikipedia.png");
	}
	$("#wikiwand-ext-switch-button").attr('src', imgURL);
}



//prefetch a single file from S3 or image from wikimedia
function prefetchSingleFile(url){
	url=url.replace('https://','http://');
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	//we just get it and do nothing, we just want the file to be in browser cache
	//in order to speed up page loading
	xhr.send();
}

//the following function pre-caches and prefetches resources for a wikiwand article for a specific link
//in a page (typically first wikipedia link). This allows for faster loading
var cache_count=0;
var already_cached={};
function precacheLink(key){
	if (cache_count>5){return;}
	var url=key.split('#')[0].split('?')[0]; //remove any hashtags and get parameters
	if (already_cached[url]==true){return;}
	already_cached[url]=true;
	cache_count++;

	url=url+"?precache=1&prefetch=1&callback=JSON_CALLBACK&source=extension";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			//handle the xhr response here
			if (location.protocol=='https:'){return;}//no point in fetching if we are in https

			var resp =xhr.responseText.replace('JSON_CALLBACK(','').replace(');','');
			var data = JSON.parse(resp);

			if (data.fullUrl){
				prefetchSingleFile(data.fullUrl);
			}
			if (data.wikiwandUrl){
				prefetchSingleFile("http://www.wikiwand.com"+data.wikiwandUrl);
			}
			if (data.S3FileUrl){
				prefetchSingleFile(data.S3FileUrl);
			}
			if (data.CDNFileUrl){
				prefetchSingleFile(data.CDNFileUrl);
			}
		}
	};
	xhr.send();

}

// The following function acts to replace links to Wikipedia to the corresponding links on WikiWand.
function updateLinks() {
	if (document.location.host === 'www.wikiwand.com') {
		return;
	}
	if (document.location.host === 'www.quickiwiki.com') {
		return;
	}

	//console.log('redirect state ',autoRedirectState);
	if (autoRedirectState==false || !autoRedirectState){
		return;
	}
		// Find links that lead to Wikipedia, but not ones that we have already handled

	$('[data-mousedown]').not('[data-noreplace]').each(function () {
		$(this).attr('data-noreplace', '1');
		$(this).attr('href', $(this).attr('data-new-link'));
	});
	$('a[href*=".wikipedia."]').not('[data-noreplace]').each(function () {
		var href = $(this).attr('href');
		if (!href) return;
		// Does this link needs to be auto-redirected?
		var newURL = testAutoRedirect(href);
		// If it does...
		if (newURL.redirectURL) {
				//do this only for the first two links in a page
				var queryBox = $("input[name='q']");
				var label = '';
				if (queryBox.length === 1) {
					// if search engine, put a special label
					label ="search : "+ window.location.host + " : " + queryBox.val();
				} else {
					label = "website : "+ window.location.host + " : "+window.location.href;
				}
				chrome.extension.sendMessage({command:'google-analytics-event', category:'extension', action:'link-replace', label:label});
				precacheLink(newURL.redirectURL.replace('http://','//'));
			// Replace the link with the target link
			$(this).attr('href', newURL.redirectURL);
			// Disable any JS that may interfere
			$(this).attr('data-new-link',newURL.redirectURL);
			$(this).on('mousedown',function(){
				chrome.extension.sendMessage({command:'google-analytics-event', category:'extension', action:'link-click',label:newURL.redirectURL});
				$(this).attr('data-noreplace', null);
				$(this).attr('data-mousedown', '1');
				updateLinks();
			});
		}
		// Mark this link as handled
		$(this).attr('data-noreplace', '1');

	});
}



// =====================================================================================================================
// Core of the content script
// =====================================================================================================================

// Handle this page, after it is fully loaded + we know weather we're on WikiWand mode
// It does the following: (1) creates a toggle button; (2) updates links to Wikipedia
function handlePage() {
	//console.log('handle page');
	var url = window.location.href;
	var buttonState = getRedirectUrl(url);
	//console.log('button state ',buttonState);
	//console.log('autoRedirectState',autoRedirectState);
	// (1) creates a toggle button
	if (buttonState.redirectURL !== null) {



		//On right to left languages - place the button on the left side (by adding another CSS class which
		// aligns button to the left

		// Handle clicks on the switch button
		$(document).ready(function() {

			// Show the switch button on wikipedia
			var element;
			if (buttonState.domain === 'wikipedia') {
				var wikiwandLogo = chrome.extension.getURL("images/wikiwand_logo.png");
				var wikipediaLogo = chrome.extension.getURL("images/wikipedia_logo.png");
				var wandIcon = chrome.extension.getURL("images/wand.png");
				element = "<div class='toggle_wiki_wikiwand' id='switch_to_wikiwand'><i><img src='"+wandIcon+"' alt='wikwand icon'/></i>" +
				"<div class='switch_logo_wikiwand'>" +
				"<img src='"+wikipediaLogo+"' alt='wikipedia logo'/>" +
				"</div>" +
				"<a  href='javascript:void(0)' id='switch_btn_wikiwand' class='wikiwand_switch'></a>" +
				"<div class='switch_logo_wikiwand wikiwand_switch'>" +
				"<a href='javascript:void(0)' ><img src='"+wikiwandLogo+"' alt='wikipedia logo'/></a>" +
				"</div>" +
				"</div>";
				$('html').append($(element));
			}

			//bind click event to action.

			$(".wikiwand_switch , #switch_btn").click(function(event) {
				if (event.ctrlKey || event.shiftKey || event.altKey) {
					return true;
				}
				if (buttonState.domain === 'wikipedia') {
					chrome.extension.sendMessage({command: 'auto-redirect-on'});
					$('#switch_btn_wikiwand').addClass('wand_wikiwand');
					return false; // Ignore the href
				}
				else {  // From WikiWand to Wikipedia
					// We send a message to the background process to change the redirect setting.
					// This will trigger the redirect to Wikipedia immediately.
					chrome.extension.sendMessage({command: 'auto-redirect-off'});
					$('#switch_btn_wikiwand').addClass('wand_wikiwand');
					return false; // Ignore the href
				}
			});


		});
	}
	// (2) updates links to Wikipedia to lead to WikiWand
	updateLinks();
	setInterval(updateLinks, 500);
}


//once the DOM is fully loaded we can start handling the DOM with the content script
handlePage();


var extensionResourceFailCount=0;
function testActive(){
	if ((document.location.host === 'www.wikiwand.com') ||
		(document.location.host === 'www.localwiki.com:3000') ||
		(document.location.host=== 'www.ww-web-stage.wikiwand.com'))
	{
		if (version=='0'){
			chrome.runtime.sendMessage({command:'version'},function(response){
				version=response.ver;
			});
		}
		try{
			chrome.extension.sendMessage({command:'ping'});
		}catch(e){
			extensionResourceFailCount++;
		}
		if (extensionResourceFailCount>6){
			var allData={};
			try {
				var activation;
				activation = JSON.parse(localStorage['wikiwand_activation']);
				allData.viewedPages = activation.viewedPages;
				allData.vetek = activation.vetek;
				allData.userID=activation.userID;
			}catch(e){
				console.log('failed activation test');
			}
			try {
				var languages;
				languages = JSON.parse(localStorage['wikiwand_languages_rev2']);
				var favorites=[];
				for (var key in languages){
					if (languages[key].fav==true){
						favorites.push(languages[key].lang);
					}
				}
				allData.languages=favorites;
			}catch(e){
				console.log('failed languages test');
			}
			setTimeout(function(){
				allData.version=version;
				if (!localStorage['wikiwand_reported_uninstall']) {
					localStorage['wikiwand_reported_uninstall']='true';
					$.post('/extension/ajax-uninstall', allData, function() {
					}, 'json');
				}
			},Math.random()*100);
		}else {
			setTimeout(testActive, 500);
		}
	}
}
testActive();

