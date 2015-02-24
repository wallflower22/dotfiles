window.filters = (function($){
	var mCnv = null,
		mCtx = null,
		mCleanCnv = $('<canvas id="clean_cnv"></canvas>').appendTo('body').hide()[0],
		mCleanCtx = mCleanCnv.getContext('2d');

	function getPixels() {
		return mCtx.getImageData(0, 0, mCnv.width, mCnv.height);
	}

	function writePixels(pixels) {
		mCtx.putImageData(pixels, 0, 0);
	}

	var filters= {
		grayscale: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];
				// CIE luminance for the RGB
				// The human eye is bad at seeing red and blue, so we de-emphasize them.
				var v = 0.2126*r + 0.7152*g + 0.0722*b;
				d[i] = d[i+1] = d[i+2] = v;
			}
			return pixels;
		},
		invert: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] = 255 - d[i];
				d[i+1] = 255 - d[i+1];
				d[i+2] = 255 - d[i+2];
			}
			return pixels;
		},
		threshold: function(pixels, args) {
			var d = pixels.data, threshold = 128;
			for (var i=0; i<d.length; i+=4) {
				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];
				var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
				d[i] = d[i+1] = d[i+2] = v
			}
			return pixels;
		},
		cool: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] -= 25;
				d[i+1] -= 25;
				d[i+2] += 25;
			}
			return pixels;
		},
		warm: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] += 25;
				d[i+1] -= 25;
				d[i+2] -= 25;
			}
			return pixels;
		},
		mint: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] -= 25;
				d[i+1] += 25;
				d[i+2] -= 25;
			}
			return pixels;
		},
		classic: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] += 50;
				d[i+1] += 25;
				d[i+2] -= 25;
			}
			return pixels;
		},
		gloom: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] -= 75;
				d[i+1] -= 50;
				d[i+2] -= 25;
			}
			return pixels;
		},
		sunny: function(pixels, args) {
			var d = pixels.data;
			for (var i=0; i<d.length; i+=4) {
				d[i] += 75;
				d[i+1] += 50;
				d[i+2] += 25;
			}
			return pixels;
		}
	};

	return {
		setCanvas: function(cnv) {
			mCnv = cnv;
			mCtx = mCnv.getContext('2d');
		},
		filter: function(filter, args) {
			if (filters[filter]) {
				writePixels(
					filters[filter](getPixels(), args)
				);
			}
		},
		save: function() {
			mCleanCnv.width = mCnv.width;
			mCleanCnv.height = mCnv.height;
			mCleanCtx.putImageData(
				mCtx.getImageData(0, 0, mCnv.width, mCnv.height),
				0,
				0
			);
		},
		restore: function() {
			mCtx.putImageData(
				mCleanCtx.getImageData(0, 0, mCleanCnv.width, mCleanCnv.height),
				0,
				0
			);
		}
	}
})(jQuery);