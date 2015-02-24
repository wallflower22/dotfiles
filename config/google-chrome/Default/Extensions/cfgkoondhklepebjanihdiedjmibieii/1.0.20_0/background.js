/*
Copyright (c) 2013-2014 by White Fir Design

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, only version 2 of the License is applicable.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function onMessage(request, sender, sendResponse) {

//Set page action icon
if (request.tooltip) {
	chrome.pageAction.show(sender.tab.id);

	chrome.pageAction.setIcon({path:"drupal.ico", tabId: sender.tab.id});
	if ( request.tooltip == "7")
		chrome.pageAction.setTitle({title: chrome.i18n.getMessage("drupal_version_known_tooltip", [request.tooltip]), tabId: sender.tab.id});
	else
		chrome.pageAction.setTitle({title: chrome.i18n.getMessage("drupal_version_unknown_tooltip"), tabId: sender.tab.id});
	chrome.pageAction.setPopup({tabId: sender.tab.id, popup: "popup.html"});
	sendResponse({});
}

//Send version request to content script
if (request.get_version) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {check: "version"}, function(response) {
		return response.farewell;
	});  
});
}

};
chrome.extension.onMessage.addListener(onMessage);