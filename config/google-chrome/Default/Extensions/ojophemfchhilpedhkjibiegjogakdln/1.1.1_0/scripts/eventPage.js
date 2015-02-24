(function(){

	var sources = null;

	/* listens for any message sent from contentScript.js containing the image sources
	   that will also be relayed to the popup.html, which will be opened in a new tab.	*/
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.sources) {
			sources = request.sources;

			chrome.tabs.create({
				url: chrome.extension.getURL('app.html')
			});
		}
		else if (request.isAppReady && sendResponse) {
			sendResponse(sources);
		}
	});

	// Listen for a click on the Pinco icon in the toolbar.
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.executeScript(tab.id, {file: "scripts/vendor/jquery.min.js"}, function() {
			chrome.tabs.executeScript(tab.id, {file: "scripts/getImageSources.js"});
		});

		// TODO notify if not enough images found < 4

	  // if (tab.url.match(/pinterest.com/)) {
	  //   chrome.tabs.sendMessage(tab.id, "create");
	  // } else {
	  //   chrome.tabs.query({ url: "http://*.pinterest.com/*" }, function(tabs){
	  //   	if (tabs.length === 0) {
	  //   		chrome.tabs.create({ url: "http://pinterest.com" });
	  //   	}
	  //   	else {
	  //   		chrome.tabs.update(tabs[0].id, { active: true });
	  //   	}
	  //   });
	  // }
	});
})();