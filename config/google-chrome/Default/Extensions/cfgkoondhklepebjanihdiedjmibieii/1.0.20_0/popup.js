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

//Current Drupal Versions
var drupal6_version = "6.34";
var drupal7_version = "7.34";

//Send version request to background page
chrome.extension.sendMessage({'get_version' : 'true'}, function(response) {});

//Update panel with version information
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.popup) {
		var version = request.popup;
		document.getElementById("label").appendChild(document.createTextNode(chrome.i18n.getMessage("drupal_version")));
		if (version == "Hidden")
			document.getElementById("version").appendChild(document.createTextNode(chrome.i18n.getMessage("hidden")));
		else
			document.getElementById("version").appendChild(document.createTextNode(version));
		if ( (( version != "Hidden") && ( !version.match(/-/))) && ( version.match(/Below/) || lowerVersion(version,drupal6_version) || ((parseInt(version) >= parseInt("7")) && lowerVersion(version,drupal7_version) ) ) ) 
			document.getElementById("outdated").appendChild(document.createTextNode(chrome.i18n.getMessage("outdated")));
		else if ( ( version.match(/\-/)) && ( lowerVersion(version.match(/\-([0-9.]+)/)[1],drupal6_version) || ((parseInt(version.match(/\-([0-9.]+)/)[1]) >= parseInt("7")) && lowerVersion(version.match(/\-([0-9.]+)/)[1],drupal7_version) ) ) )
			document.getElementById("outdated").appendChild(document.createTextNode(chrome.i18n.getMessage("outdated")));
	}
  });
  
//Checks if version in use is lower than the current version
function lowerVersion(in_use_version,current_version) {
	if ( (parseInt(in_use_version.match(/([0-9])\.[0-9]+/)[1]) < parseInt(current_version.match(/([0-9])\.[0-9]+/)[1])) )
		return true;
	else if ( (parseInt(in_use_version.match(/([0-9])\.[0-9]+/)[1]) == parseInt(current_version.match(/([0-9])\.[0-9]+/)[1])) && (parseInt(in_use_version.match(/[0-9]\.([0-9]+)/)[1]) < parseInt(current_version.match(/[0-9]\.([0-9]+)/)[1])) )
		return true;
	else
		return false; 
}