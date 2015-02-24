(function(){
	var createPinControl, showPinCo;

	createPinControl = function() {
		// insert Create Collage button
		$('<button id="createCollage" class="rounded Button primary Module primaryOnHover btn rightHeaderContent">'
			+'PinCo</button>')
			.width(80)
			.insertBefore('.headerContainer > .leftHeaderContent')
			.click(showPinCo);

		$('.headerContainer > .leftHeaderContent').css('margin-right', '325px')
	
	};

	showPinCo = function() {
		var imgSrcs = [];

		// gets the image sources of the images in pins
		$('.pinHolder').each(function() {
			var imgSrc = $(this).find('a img.pinImg').attr('src');
			if (imgSrc.indexOf('whiteTransparent.png') === -1) {
				imgSrc = imgSrc.replace('/236x/', '/736x/');
				imgSrcs.push(imgSrc);
			}
		});

		if (imgSrcs.length) {
			console.log('sending image sources to eventPage.js');
			console.log(imgSrcs);
			chrome.extension.sendMessage({
				sources: imgSrcs
			});
		}
	};

	createPinControl();

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		if (request === 'create') {
			showPinCo();
		}
	});
})();