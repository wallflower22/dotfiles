(function($,_,board,boarddrawer,filters){

	// global variables
	var mCnv = $('#cnv'),
		mImage = $('#image'),
		mCanvasCtrl = $('#canvas-ctrl'),
		mImgDownload = $('#img-download')[0],
		mTileCtrl = $('#tile-ctrl'),
		mDropdownPanel = $('.dropdown-panel'),
		mImagesPanel = $('.images'),
		mImagesContainer = $('#images-container'),
		noImages = $('#noImages')
		mFilterNone = $('#filters-ctrl').find('[data-value=none]').parent(),
		mIsMouseDown = false,
		mSelectedImage = null,
		mSelectedTile = -1,
		mCurrentTile = -1,
		mBaseTileSize = 128,
		mImages = [],
		mIsFilterNone = true;

	function addImages() {
		$.each(mImages, function(){
			return boarddrawer.addAndDrawImageEx(this);
		});
	}

	function setCanvasSize(value, border) {
		var width = height = border;

		switch (value) {
			case "small":
				mBaseTileSize = 100;
				width += mBaseTileSize * 6;
				height += mBaseTileSize * 6;
				break;
			case "medium":
				mBaseTileSize = 128;
				width += mBaseTileSize * 6;
				height += mBaseTileSize * 6;
				break;
			case "wide":
				mBaseTileSize = 128;
				width += mBaseTileSize * 12;
				height += mBaseTileSize * 6;
				break;
			case "huge":
				mBaseTileSize = 128;
				width += mBaseTileSize * 12;
				height += mBaseTileSize * 8;
				break;
			case "giant":
				mBaseTileSize = 128;
				width += mBaseTileSize * 16;
				height += mBaseTileSize * 10;
				break;
			default:
				mBaseTileSize = 128;
				width += mBaseTileSize * 6;
				height += mBaseTileSize * 6;
				break;
		}

		mCnv.attr({
			width : width,
			height : height
		});
		mCnv.width(width);
		mCnv.height(height);
	}

	function resetFilter() {
		if (!mIsFilterNone) {
			mFilterNone.click();
		}
	}

	function generateImgTag(src, index) {
		return '<img data-index="'+ index +'" draggable="true" src="'+ src +'">';
	}

	function readSources(sources) {
		var completed = 0,
			//max = sources.length > 100 ? 100 : sources.length;
			max = sources.length 
			progressBar = $('#progress-bar').show();

		_gaq.push(['_trackEvent', 'collage', 'create', sources[0]+'__'+sources.length, sources.length])


		// TODO NOTIFY THAT NO IMAGES FOUND... 
		if(sources.length === 0) {
			noImages.show()
			$('.canvas-block').hide()
			$('.header-block > .images').height('300px')

		}

		$.each(sources, function(index) {

			// maximum number of images allowed
			if (index >= max)
				return false;

			var image = new Image();
			image.onload = function() {
				mImages.push(image);
				boarddrawer.addAndDrawImageEx(image);
				mImagesContainer.append(generateImgTag(image.src, mImages.length - 1)).width(
					mImagesContainer.width() +
					image.width / image.height * 100 + 10
				);
				$(document).trigger('scrollbar:update');

				completed++;
				progressBar.css('width', completed/max*100 + '%');
				if (completed === max - 1) {
					progressBar.hide();
					mImagesContainer.append(
						'<img data-index="'+ max +'" draggable="false" src="images/scrollDown.png">'
					)
				}
			};
			image.src = this;
		});
	}

	function getCnvMousePos(evt) {
		var offset = mCnv.offset();
		return {
			x : evt.pageX - offset.left,
			y : evt.pageY - offset.top
		};
	}

	function handleCnvMouseDown(evt) {
		evt.preventDefault();
		resetFilter();
		var mousePos = getCnvMousePos(evt);
		var image = boarddrawer.getImageAt(mousePos);
		if (image) {
			image = $.extend({}, image);
			mIsMouseDown = true;
			mSelectedImage = image;
			mSelectedTile = boarddrawer.getTileAt(mousePos);
			mCurrentTile = mSelectedTile;
			boarddrawer.removeImageAt(mSelectedTile);
			boarddrawer.saveAnchorPoint(image,mousePos);

			mCnv.addClass('move-cursor');
		}
		// for tracking
		_gaq.push(['_trackEvent', 'CnvMouseDown', 'clicked']);
	}

	function handleCnvMouseMove(evt) {
		evt.preventDefault();
		if (mIsMouseDown) {
			var mousePos = getCnvMousePos(evt);
			var newTile = boarddrawer.getTileAt(mousePos);
			if (boarddrawer.validateTile(newTile)) {
				if (mCurrentTile !== newTile) {
					// get swap image
					var swapImage = $.extend({}, boarddrawer.getImageAt(mousePos));
					if (!$.isEmptyObject(swapImage)) {
						boarddrawer.removeSlice(swapImage);
						boarddrawer.addImageAt(mSelectedTile,swapImage);
					}

					boarddrawer.removeSlice(mSelectedImage);
					boarddrawer.redrawBoard();
					boarddrawer.drawImage(newTile,mSelectedImage);

					mCurrentTile = newTile;
				}
				else {
					boarddrawer.scrollImage(mSelectedImage,mousePos);
				}
			}
		}
	}

	function handleCnvMouseOut(evt) {
		if (mIsMouseDown) {
			boarddrawer.removeSlice(mSelectedImage);
			boarddrawer.addImageAt(mSelectedTile,mSelectedImage);
			boarddrawer.redrawBoard();

			mSelectedImage = null;
			mSelectedTile = -1;
			mCurrentTile = -1;
			mIsMouseDown = false;

			mCnv.removeClass('move-cursor');
		}
	}

	function handleCnvMouseUp(evt) {
		if (mIsMouseDown) {
			var newTile = boarddrawer.getTileAt(getCnvMousePos(evt));
			if (boarddrawer.validateTile(newTile)) {
				boarddrawer.addImageAt(newTile,mSelectedImage);
			}
			else {
				boarddrawer.removeSlice(mSelectedImage);
				boarddrawer.addImageAt(mSelectedTile,mSelectedImage);
				boarddrawer.redrawBoard();
			}

			mSelectedImage = null;
			mSelectedTile = -1;
			mCurrentTile = -1;
			mIsMouseDown = false;

			mCnv.removeClass('move-cursor');
		}
	}

	function handleCnvMouseWheel(evt) {
		evt.preventDefault();
		resetFilter();

		var isScaleUp = false;

		if (evt.wheelDelta)
			isScaleUp = evt.wheelDelta < 0;

		boarddrawer.scaleImageAt(getCnvMousePos(evt),isScaleUp);
	}

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		boarddrawer.highlightTileAt(getCnvMousePos(evt.originalEvent));
	}

	function handleDragLeave(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		boarddrawer.removeHighlight();
	}

	function handleDrop(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		var img = mImages[evt.originalEvent.dataTransfer.getData('index')];
		if (img) {
			boarddrawer.addAndDrawImage(img);
		}
	}

	var handlers = {
		canvas: function(value) {
			resetFilter();
			setCanvasSize(value, parseInt($('#border-size').val()));

			this.tile(
				mTileCtrl.find('.checked').data('value')
			);
		},
		tile: function(value) {
			resetFilter();
			var mult = parseInt(value);
			if (!mult || mult === 0)
				mult = 1;

			var tileSize = mBaseTileSize * mult;
			var width = Math.floor(mCnv.attr('width')/tileSize);
			var height = Math.floor(mCnv.attr('height')/tileSize);

			board.setSize(width,height,tileSize);
			board.formTiles();
			boarddrawer.clearAll();
			addImages();
		},
		filters: function(value) {
			if (mIsFilterNone) {
				filters.save();
			}
			else {
				filters.restore();
			}
			filters.filter(value);
			mIsFilterNone = value === 'none';
		}
	};

	// bind events
	mCnv.on({
		mousedown : handleCnvMouseDown,
		mousemove : handleCnvMouseMove,
		mouseout : handleCnvMouseOut,
		mouseup : handleCnvMouseUp,
		mousewheel : handleCnvMouseWheel,
		dragover : handleDragOver,
		dragleave : handleDragLeave,
		drop : handleDrop
	});

	$('#download').on('click', function(evt){
		mImgDownload.href = mCnv[0].toDataURL('image/jpeg', 0.9);
		mImgDownload.click();
	});

	$('#reorder').on('click', function(evt){
		resetFilter();
		mImages = _.shuffle(mImages);

		board.formTiles();
		boarddrawer.clearAll();
		addImages();

		// also update the images in the images panel
		mImagesContainer.html('');
		$.each(mImages, function(index){
			mImagesContainer.append(generateImgTag(this.src, index));
		})
	});

	$('.options button').on('mouseenter', function(){
		mDropdownPanel.hide();
	});

	$('.dropdown').on('mouseenter', function(evt){
		var sourceEl = $(this),
			targetEl = $('#' + sourceEl.data('target')),
			margin = parseInt(sourceEl.css('margin'));

		targetEl.css({
			left: sourceEl.offset().left + margin + 'px',
			top: sourceEl.position().top + sourceEl.outerHeight() + margin + 3 + 'px'
		}).show();
	});

	mDropdownPanel.on('mouseenter', function(){
		$(this).stop(true, true).fadeIn(1);
	}).on('mouseleave', function(evt){
		$(this).delay(500).fadeOut('fast');
	}).on('click', 'ul li', function(evt){
		var thisEl = $(this),
			parentEl = thisEl.parent(),
			childEl = thisEl.children('.checkbox');

		parentEl.find('.checked').removeClass('checked');
		childEl.addClass('checked');

		if (handlers[parentEl.data('group')]) {
			handlers[parentEl.data('group')](childEl.data('value'));
		}
	});

	$('#border-size').on('change', function(evt){
		resetFilter();
		var size = parseInt(evt.target.value) || 0;
		size = Math.max(size, 0);
		size = Math.min(size, 100);
		$(this).val(size);

		setCanvasSize(
			mCanvasCtrl.find('.checked').data('value'),
			size
		);

		board.updateTilePos(size);
		boarddrawer.updateImageSlices();
		boarddrawer.redrawBoard();
	});

	$('#border-color').on('change', function(evt){
		resetFilter();
		boarddrawer.setBackground(evt.target.value);
		boarddrawer.redrawBoard();
	}).spectrum();

	$('.sp-container').on('mouseenter', function(evt){
		$('#borders-ctrl').show();
	}).on('mouseleave', function(evt){
		$('#borders-ctrl').hide();
		$('#border-color').spectrum('hide');
	});

	$('#browse').on('click', function(evt){
		var browseButton = $(this);
		if (mImagesPanel.data('shown')) {
			browseButton.text('Show Thumbs');
			mImagesPanel.hide().data('shown', false);
			$('.canvas-block').css('margin-top', '0px');
		}
		else {
			browseButton.text('Hide Thumbs');
			mImagesPanel.show().data('shown', true);
			$('.canvas-block').css('margin-top', mImagesPanel.height() + 'px');
		}
	});

	mImagesPanel.on('dragstart', 'img', function(evt){
		evt.originalEvent.dataTransfer.setData('index', $(this).data('index'));
	});

	$(document).ready(function(){
		boarddrawer.init(mCnv[0]);
		filters.setCanvas(mCnv[0]);
		$('#border-size').val(5).change();
		mImagesPanel.scrollable('#images-container');

		// set canvas size
		if (window.innerWidth < 1024 || window.innerHeight < 768)
			mCanvasCtrl.find('[data-value=small]').click();
		else if (window.innerWidth > 1580)
			mCanvasCtrl.find('[data-value=wide]').click();
		else
			mCanvasCtrl.find('[data-value=medium]').click();

		// send message that it's ready to receive the image sources
		chrome.extension.sendMessage({
			isAppReady: true
		}, function(sources) {
			console.log(sources);
			readSources(sources);
		});

		$('#browse').click()

	});

})(jQuery,_,window.board,window.boarddrawer,window.filters);
jQuery.event.props.push("wheelDelta");
