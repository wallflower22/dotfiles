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

//Check for indicators of Drupal use
if (/<meta name="generator" content="Drupal 7 \(http:\/\/drupal.org\)"/i.test(document.getElementsByTagName('head')[0].innerHTML))
	chrome.extension.sendMessage({'tooltip' : '7'}, function(response) {});
else if ( (/jQuery.extend\(Drupal.settings/.test(document.getElementsByTagName('head')[0].innerHTML)) || (/<link [type="text\/css" ]*rel="stylesheet" [media="all" ]*href="[a-z0-9\:\\\\\/\-_.~]*\/sites\/(default\/files|all\/modules|all\/themes)\//i.test(document.getElementsByTagName('head')[0].innerHTML)) || (/@import url\("[a-z0-9\:\\\\\/\-_.~]*\/sites\/(default\/files|all\/modules|all\/themes)\//i.test(document.getElementsByTagName('head')[0].innerHTML)) || (/<style type="text\/css" media="all">@import "[a-z0-9\:\\\\\/\-_.~]*\/sites\/(default\/files|all\/modules|all\/themes)\//i.test(document.getElementsByTagName('head')[0].innerHTML)) )
	chrome.extension.sendMessage({'tooltip' : 'Unknown'}, function(response) {});

//Returns Drupal version in use
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.check == "version") {

		if (/jQuery.extend\(Drupal.settings/.test(document.getElementsByTagName('head')[0].innerHTML)) {
			var directory = document.getElementsByTagName('head')[0].innerHTML.match(/jQuery.extend\(Drupal.settings, *{ *"*basePath"*: *"([a-z0-9\\\\\/\-_.~]*)"/i)[1];
			directory = directory.replace(/\\u002F/g,"/");
			directory = directory.replace(/\\/g,"");
		}
		else if (/<link type="text\/css" rel="stylesheet" [media="all" ]*href="(https?:\/\/[a-z0-9\-_.~]+\/|\/)[a-z0-9\-_.~\/]+sites\/(default\/files|all\/modules|all\/themes)\//i.test(document.getElementsByTagName('head')[0].innerHTML))
			var directory = "/"+document.getElementsByTagName('head')[0].innerHTML.match(/<link [type="text\/css" ]*rel="stylesheet" [media="all" ]*href="(https?:\/\/[a-z0-9\-_.~]+\/|\/)([a-z0-9\-_.~\/]+)sites\/(default\/files|all\/modules|all\/themes)\//i)[2];
		else if (/@import url\("(https?:\/\/[a-z0-9\-_.~]+\/|\/)[a-z0-9\-_.~\/]+sites\/(default\/files|all\/modules|all\/themes)\//i.test(document.getElementsByTagName('head')[0].innerHTML))
			var directory = "/"+document.getElementsByTagName('head')[0].innerHTML.match(/@import url\("(https?:\/\/[a-z0-9\-_.~]+\/|\/)([a-z0-9\-_.~\/]+)sites\/(default\/files|all\/modules|all\/themes)\//i)[2];
		else if (/<style type="text\/css" media="all">@import "(https?:\/\/[a-z0-9\-_.~]+\/|\/)[a-z0-9\-_.~\/]+sites\/(default\/files|all\/modules|all\/themes)\//i.test(document.getElementsByTagName('head')[0].innerHTML))
			var directory = "/"+document.getElementsByTagName('head')[0].innerHTML.match(/<style type="text\/css" media="all">@import "(https?:\/\/[a-z0-9\-_.~]+\/|\/)([a-z0-9\-_.~\/]+)sites\/(default\/files|all\/modules|all\/themes)\//i)[2];
		else
			var directory = "/";
		
		//Check for version number in Drupal changelog on website
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET",directory+"CHANGELOG.txt",true);
		xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
		xmlhttp.onreadystatechange = function (oEvent) {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					if (/Drupal [0-9.]+,/.test(xmlhttp.responseText)) {
						var version = xmlhttp.responseText.match(/Drupal ([0-9.]+),/)[1];
						chrome.extension.sendMessage({'popup' : version}, function(response) {});
					}
					else 
						drupaljsCheck(directory);
				}
				else 
					drupaljsCheck(directory);
			}
		};
		xmlhttp.send();
	}
});

//Get version from .js files
function drupaljsCheck(directory) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",directory+"misc/ajax.js",true);
	xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
	xmlhttp.onreadystatechange = function (oEvent) {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				if (/Drupal.ajax/.test(xmlhttp.responseText)) {
					if (/importMatch/.test(xmlhttp.responseText))
						chrome.extension.sendMessage({'popup' : '7.33-7.34'}, function(response) {});
					else
						chrome.extension.sendMessage({'popup' : '7.0-7.32'}, function(response) {});
				}
				else 
					drupal6jsCheck(directory);
			}
			else 
				drupal6jsCheck(directory);
		}
	};
	xmlhttp.send();
}

//Check for Drupal 6 .js file
function drupal6jsCheck(directory) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",directory+"misc/ahah.js",true);
	xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
	xmlhttp.onreadystatechange = function (oEvent) {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				
				if (/Drupal.behaviors.ahah/.test(xmlhttp.responseText)) {
					if (/this.immutable/.test(xmlhttp.responseText))
						chrome.extension.sendMessage({'popup' : '6.31-6.34'}, function(response) {});
					else
						chrome.extension.sendMessage({'popup' : '6.0-6.30'}, function(response) {});
				}
				else
					drupal5jsCheck(directory);
			}
			else 
				drupal5jsCheck(directory);
		}
	};
	xmlhttp.send();
}


//Check for Drupal 5 .js file
function drupal5jsCheck(directory) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",directory+"misc/drupal.js",true);
	xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
	xmlhttp.onreadystatechange = function (oEvent) {
		if (xmlhttp.readyState === 4) {
			if (xmlhttp.status === 200) {
				
				if (/Extends the current object with the parameter/.test(xmlhttp.responseText))
					chrome.extension.sendMessage({'popup' : '5.23 or Below'}, function(response) {});
				else
					chrome.extension.sendMessage({'popup' : 'Hidden'}, function(response) {});
			}
			else 
				chrome.extension.sendMessage({'popup' : 'Hidden'}, function(response) {});
		}
	};
	xmlhttp.send();
}