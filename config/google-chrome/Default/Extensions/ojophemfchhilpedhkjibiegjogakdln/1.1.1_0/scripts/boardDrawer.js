/** @expose */
window.boarddrawer = (function(mBoard){
	var mImages = [],
		mCnv = null,
		mCtx = null,
		mBgColor = '#fff';
		
	function init(cnv) {
		mCnv = cnv;
		mCtx = mCnv.getContext('2d');
	}
	
	function clearBoard() {
		mCnv.width = mCnv.width;
		mCnv.height = mCnv.height;
	}

	function drawWatermark(tileIndex) {
		if (tileIndex > 1) return;

		mCtx.fillStyle = '#E04751';
		mCtx.font = '30pt Lobster';
		mCtx.textBaseline = 'top';
		mCtx.fillText('PinCo.', 22.0, 22.0);
	}

	function setBackground(bgColor) {
		mBgColor = bgColor;
	}

	function fillBackground() {
		mCtx.fillStyle = mBgColor;
		mCtx.fillRect(
			0,
			0,
			mCnv.width,
			mCnv.height
		);
	}
	
	function redrawBoard() {
		//clearBoard();
		//drawTiles();
		fillBackground();
		drawImages();
	}
	
	function normalize(val, min, max) {
		if (val < min)
			val = min;
		else if (val > max)
			val = max;
		return val;
	}
	
	function muldiv(val, mul, div) {
		return Math.floor(val * mul / div);
	}

	function clearAll() {
		removeAllSlices();
		clearImages();
		//clearBoard();
		fillBackground();
	}
	
	// Scrolling and scaling *********************
	var mAnchorPoint = null;
	
	// saves the position of the mouse relative to the clicked image. used in scrolling.
	function saveAnchorPoint(image, mousePos) {
		if (image && image.slice) {
			mAnchorPoint = {
				x : image.slice.x + mousePos.x,
				y : image.slice.y + mousePos.y
			};
		}
	}
	
	// scrolls the given image.
	function scrollImage(image, mousePos) {
		if (!mAnchorPoint || !image || !image.slice)
			return;
		
		var newX = mAnchorPoint.x - mousePos.x,
			newY = mAnchorPoint.y - mousePos.y;
			
		newX = normalize(newX, 0, Math.abs(image.el.width-image.slice.w));
		newY = normalize(newY, 0, Math.abs(image.el.height-image.slice.h));
		
		image.slice.x = newX;
		image.slice.y = newY;
		
		mCtx.drawImage(
			image.el,
			image.slice.x, image.slice.y,
			image.slice.w, image.slice.h,
			image.slice.dx, image.slice.dy,
			image.slice.dw, image.slice.dh
		);

		drawWatermark(getTileAt(mousePos));
	}
	
	// scales the image at where the mouse is.
	function scaleImageAt(mousePos, isScaleUp) {
		var image = getImageAt(mousePos);
		if (image && image.slice) {
			// dont process when image is already scaled out to its limit
			if ((isScaleUp && (image.slice.w >= image.el.width || image.slice.h >= image.el.height)) ||
				(!isScaleUp && (image.slice.w <= image.slice.dw || image.slice.h <= image.slice.dw)))
				return;

			var newW, newH;
			if (image.slice.dw > image.slice.dh) {
				newW = isScaleUp ? image.slice.w + 10 : image.slice.w - 10;
				newW = normalize(newW, image.slice.dw, image.el.width);
				newH = muldiv(newW, image.slice.dh, image.slice.dw);
				
				if (newH > image.el.height) {
					newH = image.el.height;
					newW = muldiv(newH, image.slice.dw, image.slice.dh);
				}
			}
			else {
				newH = isScaleUp ? image.slice.h + 10 : image.slice.h - 10;
				newH = normalize(newH, image.slice.dh, image.el.height);
				newW = muldiv(newH, image.slice.dw, image.slice.dh);
				
				if (newW > image.el.width) {
					newW = image.el.width;
					newH = muldiv(newW, image.slice.dh, image.slice.dw);
				}
			}
			
			image.slice.w = newW;
			image.slice.h = newH;
			// update x and y
			image.slice.x = Math.min(image.slice.x, Math.abs(image.el.width - image.slice.w));
			image.slice.y = Math.min(image.slice.y, Math.abs(image.el.height - image.slice.h));
			
			mCtx.drawImage(
				image.el,
				image.slice.x, image.slice.y,
				image.slice.w, image.slice.h,
				image.slice.dx, image.slice.dy,
				image.slice.dw, image.slice.dh
			);

			drawWatermark(getTileAt(mousePos));
		}
	}
	
	// removes the slice of the given image. A slice contains the coords and dimension of the image for slicing.
	function removeSlice(image) {
		if (image)
			image.slice = null;
		if (mAnchorPoint)
			mAnchorPoint = null;
	}
	
	// removes the slices of all the images.
	function removeAllSlices() {
		var tileCount = mBoard.getTileCount();
		for (var i = 0; i < tileCount; i++)
			removeSlice(mImages[i]);
	}

	function updateImageSlices() {
		var tileCount = mBoard.getTileCount();
		for (var i = 0; i < tileCount; i++) {
			if (mImages[i] && mImages[i].slice) {
				var tile = mBoard.getTile(i);
				mImages[i].slice.dx = tile.x;
				mImages[i].slice.dy = tile.y;
				mImages[i].slice.dw = tile.w;
				mImages[i].slice.dh = tile.h;
			}
		}
	}
	
	// Tiles and highlighting *********************
	var mHighlightedTile = -1;
	
	// returns true if tileIndex is a valid index of _board.tiles
	function validateTile(tileIndex) {
		return (tileIndex > -1 && tileIndex < mBoard.getTileCount());
	}
	
	// returns the index of the tile where the mousePos is.
	function getTileAt(mousePos) {
		var i = 0,
			tileCount = mBoard.getTileCount();
		
		while (i < tileCount) {
			var tile = mBoard.getTile(i);
			if (mousePos.x >= tile.x && mousePos.x <= tile.x + tile.w &&
				mousePos.y >= tile.y && mousePos.y <= tile.y + tile.h)
				break;
			i++
		}
		return i;
	}
	
	// draws the tiles.
	function drawTiles() {
		mCtx.strokeStyle = "#fff";
		
		var tileCount = mBoard.getTileCount();
		for (var i = 0; i < tileCount; i++) {
			var tile = mBoard.getTile(i);
			mCtx.strokeRect(tile.x, tile.y, tile.w, tile.h);
		}
	}
	
	// draws a highlighted tile.
	function drawHighlightedTile() {
		if (validateTile(mHighlightedTile)) {
			mCtx.fillStyle = "rgba(0,0,0,0.5)"
			var tile = mBoard.getTile(mHighlightedTile);
			mCtx.fillRect(tile.x, tile.y, tile.w, tile.h);
		}
	}
	
	// highlights the tile at mousePos. highlighting of tiles occurs only when the mouse is over the canvas while dragging a picture onto it.
	function highlightTileAt(mousePos) {
		var i = getTileAt(mousePos);
		
		if (validateTile(i) && i !== mHighlightedTile) {
			mHighlightedTile = i;
			
			redrawBoard();
			drawHighlightedTile();
		}
	}
	
	function removeHighlight() {
		mHighlightedTile = -1;
		redrawBoard();
	}
	
	// Images ops *********************
	
	function getImageAt(mousePos) {
		var i = getTileAt(mousePos);
		if (mImages[i])
			return mImages[i];
		return null;
	}
	
	function addImageAt(tileIndex, image) {
		if (image && validateTile(tileIndex)) {
			mImages[tileIndex] = image;
		}
	}
	
	function removeImageAt(tileIndex) {
		if (validateTile(tileIndex)) {
			mImages[tileIndex] = null;
		}
	}
	
	function drawImage(tileIndex, image) {
		if (!validateTile(tileIndex))
			return false;
			
		image = image || mImages[tileIndex];
		if (!image)
			return true;
		
		var tile = mBoard.getTile(tileIndex);
		var sw, sh, sx, sy;
		
		if (image.slice) {
			sx = image.slice.x;
			sy = image.slice.y;
			sw = image.slice.w;
			sh = image.slice.h;
		}
		else {
			var compute_sw_then_sh = function() {
				var mult = Math.floor(image.el.width/tile.w);
				sw = mult === 0 ? image.el.width : tile.w * mult;
				sh = muldiv(sw, tile.h, tile.w);
			};
			
			var compute_sh_then_sw = function() {
				var mult = Math.floor(image.el.height/tile.h);
				sh = mult === 0 ? image.el.height : tile.h * mult;
				sw = muldiv(sh, tile.w, tile.h);
			};
			
			if (tile.w > tile.h) {
				compute_sw_then_sh();
				if (sh > image.el.height)
					compute_sh_then_sw();
			}
			else {
				compute_sh_then_sw();
				if (sw > image.el.width)
					compute_sw_then_sh();
			}
			
			sx = Math.floor((image.el.width-sw)/2);
			sy = Math.floor((image.el.height-sh)/2);
		}
			
		// save coords for scrolling
		image.slice = {
			x : sx,
			y : sy,
			w : sw,
			h : sh,
			dx : tile.x,
			dy : tile.y,
			dw : tile.w,
			dh : tile.h
		};

		mCtx.drawImage(image.el,sx,sy,sw,sh,tile.x,tile.y,tile.w,tile.h);

		drawWatermark(tileIndex);

		return true;
	}
		
	function addAndDrawImage(imageEl) {
		if (validateTile(mHighlightedTile)) {
			mImages[mHighlightedTile] = { el: imageEl };
			drawImage(mHighlightedTile);
			mHighlightedTile = -1;
		}
		else {
			var tileCount = mBoard.getTileCount();
			for (var i = 0; i < tileCount; i++) {
				if (!mImages[i]) {
					mImages[i] = { el: imageEl };
					drawImage(i,null);
					break;
				}
			}
		}
	}

	function addAndDrawImageEx(imageEl) {
		var tileCount = mBoard.getTileCount(),
			imageCount = mImages.length;
		if (imageCount < tileCount) {
			mImages.push({ el: imageEl });
			drawImage(imageCount, null);
			return true;
		}
		return false;
	}
	
	function drawImages() {
		var tileCount = mBoard.getTileCount();
		for (var i = 0; i < tileCount && drawImage(i,null); i++){}
	}
	
	function clearImages() {
		mImages.length = 0;
	}
	
	return {
		/** @expose */
		init : init,
		/** @expose */
		clearBoard : clearBoard,
		/** @expose */
		clearAll: clearAll,
		/** @expose */
		setBackground : setBackground,
		/** @expose */
		redrawBoard : redrawBoard,
		/** @expose */
		saveAnchorPoint : saveAnchorPoint,
		/** @expose */
		scrollImage : scrollImage,
		/** @expose */
		scaleImageAt : scaleImageAt,
		/** @expose */
		removeSlice : removeSlice,
		/** @expose */
		removeAllSlices : removeAllSlices,
		/** @expose */
		updateImageSlices : updateImageSlices,
		/** @expose */
		validateTile : validateTile,
		/** @expose */
		getTileAt : getTileAt,
		/** @expose */
		drawTiles : drawTiles,
		/** @expose */
		drawHighlightedTile : drawHighlightedTile,
		/** @expose */
		highlightTileAt : highlightTileAt,
		/** @expose */
		removeHighlight : removeHighlight,
		/** @expose */
		getImageAt : getImageAt,
		/** @expose */
		addImageAt : addImageAt,
		/** @expose */
		removeImageAt : removeImageAt,
		/** @expose */
		drawImage : drawImage,
		/** @expose */
		addAndDrawImage : addAndDrawImage,
		/** @expose */
		addAndDrawImageEx : addAndDrawImageEx,
		/** @expose */
		drawImages : drawImages,
		/** @expose */
		clearImages : clearImages
	};
})(window.board);