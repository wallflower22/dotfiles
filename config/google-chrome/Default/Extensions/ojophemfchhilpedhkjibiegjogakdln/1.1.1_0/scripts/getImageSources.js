(function(){
	var showPinCo;

	//regex for facebook
	var fbPattern = /(\/[^/]*).\.jpg$/;

	//helper to check if images source contains GIFs or PHPscripts
	String.prototype.contains = function(it) { 
		return this.indexOf(it) != -1; 
	}


	showPinCo = function() {
		var imgSrcs = [];

		// gets the image sources of the images in pins
		//var images = $("body").find('img')
		var images = document.getElementsByTagName('img');


		for(i in images) { //take care!! 

			// 	PARSE FOR JPG AND PNG... 
			// INSTEAD OF SEARCHING FOR IMG TAGNAME SOURCES... DOES NOT WORK MOSTLY
			// create new img elems (hidden) and then take their size

			if(images[i].height > 99 && images[i].width > 99) {
				var imgSrc = images[i].getAttribute('src');
				//remove GIFs and PHP scripts
				if(imgSrc.contains(".php")  || imgSrc.contains(".gif")) {
					// do nothing
				} else {
					if(imgSrc.substring(0,2) === '//') {
						imgSrc = imgSrc.replace('//','http://')
					}
					if(window.location.origin.contains("www.facebook.com")) {
						// get HQ for facebook images... does not work anymore
						// imgSrc = imgSrc.replace(/(\/[^/]*)s\.jpg$/, '/$1n.jpg');
						// if(fbPattern.test(imgSrc)) {
						// 	var fbId = fbPattern.exec(imgSrc)
						// 	console.log(fbId)
						// 	imgSrc = 'http://profile.ak.fbcdn.net'+fbId[1]+'n.jpg'
						// }

	// https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/p280x280/1794793_10205385546617434_2994290609865455166_n.jpg?oh=ebe4b191c3bec4b98e61d9cc9c6170df&oe=54DB5BBE&__gda__=1428025109_80357e156a5288abeccc3426af33b027
	// https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/1794793_10205385546617434_2994290609865455166_n.jpg?oh=97d9fd3e59302b90084f7ff4174bed9e&oe=551C2395&__gda__=1424592042_9bcbc036eb61149e7fb3558821044433

					}
					if(window.location.origin.contains("www.behance.net")) {
						// get HQ for behance images...
						imgSrc = imgSrc.replace('/202/','/404/');
					}										
					if(window.location.origin.contains("www.pinterest.com")) {
						imgSrcs = []
						// gets the image sources of the images in pins
						$('.pinHolder').each(function() {
							var imgSrc = $(this).find('a img.pinImg').attr('src');
							if (imgSrc.indexOf('whiteTransparent.png') === -1) {
								imgSrc = imgSrc.replace('/236x/', '/736x/');
								imgSrcs.push(imgSrc);
							}
						});
					}


					
					console.log(imgSrc)
					//console.log(imgSrc, images[i].height + images[i].width)
					//console.dir(images[i])

					// add to list
					imgSrcs.push(imgSrc);
				}
			}
		};

		imgSrcs = $.unique(imgSrcs)

		if (imgSrcs.length) {
			console.log('sending image sources to eventPage.js');
			console.log(imgSrcs);
			chrome.extension.sendMessage({
				sources: imgSrcs
			});
		} else {
			console.log('no images found...')
			chrome.extension.sendMessage({
				sources: []
			});
		}
	};
			
	showPinCo()

})();