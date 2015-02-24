/** @expose */
window.board = (function() {
	// members
	var mWidth = 6,
		mHeight = 6,
		mTileSize = 128,
		mMap = [], // represents the board, size is specified by _width and _height.
		mMapNextIndex = { x : 0, y : 0 }, // holds the next index in the map where the new tile will be added.
		mTiles = [], // holds the formed tiles in the board.
		mOffset = 0;

	// constants
	var cTileTypes = [
			{ index : 0, w_factor : 2, h_factor : 2 },
			{ index : 1, w_factor : 2, h_factor : 1 },
			{ index : 2, w_factor : 1, h_factor : 1 },
			{ index : 3, w_factor : 1, h_factor : 2 },
			{ index : 4, w_factor : 2, h_factor : 3 },
			{ index : 5, w_factor : 3, h_factor : 2}
		];

	function traverseMap(callback, start, limit) {
		if (callback) {
			start = start || { x : 0, y : 0 };
			limit = limit || { x : mWidth, y : mHeight };
			for (var x = start.x; x < limit.x; ++x) {
				for (var y = start.y; y < limit.y; ++y) {
					if (callback(x, y) === false) {
						return false;
					}
				}
			}
		}
		return true;
	}

	// clears the map and tiles.
	function clear() {
		// set map to 0
		for (var x = 0; x < mWidth; x++) {
			mMap[x] = mMap[x] || [];
			for (var y = 0; y < mHeight; y++) {
				mMap[x][y] = 0;
			}
		}
		mMapNextIndex.x = 0;
		mMapNextIndex.y = 0;
		// reset tiles
		mTiles.length = 0;
	}

	// returns a random whole number from 0 to n-1.
	function getRandom(n) {
		n = n || 0;
		return Math.floor(Math.random()*n);
	}

	// returns a random cTileIndex constant.
	function getRandomTileIndex() {
		var x = mMapNextIndex.x,
			y = mMapNextIndex.y,
			x_tiles_rem = mWidth - x,
			y_tiles_rem = mHeight - y;
			tiles = _.filter(cTileTypes, function(tile){
				var result = false;
				if (tile.w_factor <= x_tiles_rem && tile.h_factor <= y_tiles_rem) {
					result =  traverseMap(
						function(x, y) { return mMap[x][y] === 0; },
						{ x : x, y : y },
						{ x : x + tile.w_factor, y : y + tile.h_factor }
					);
				}
				return result;
			});

		return tiles.length === 0 ? 0 :
			   tiles.length === 1 ? tiles[0].index :
			   tiles[getRandom(tiles.length)].index;
	}

	// adds a tile with its computed coords and size given the tileIndex to _tiles.
	function addTile(tileIndex) {
		mTiles.push({
			x : mTileSize * mMapNextIndex.x + mOffset,
			y : mTileSize * mMapNextIndex.y + mOffset,
			w : mTileSize * cTileTypes[tileIndex].w_factor - mOffset,
			h : mTileSize * cTileTypes[tileIndex].h_factor - mOffset,
			t : tileIndex,
			x_: mMapNextIndex.x,
			y_: mMapNextIndex.y
		});
	}

	// sets next index in the map given the tile that has just been added.
	function setMapNextIndex(tileIndex) {
		var x = mMapNextIndex.x,
			y = mMapNextIndex.y,
			tile = cTileTypes[tileIndex];

		traverseMap(
			function(x, y){ mMap[x][y] = 1; },
			{ x : x, y : y },
			{ x : x + tile.w_factor, y : y + tile.h_factor }
		);

		x += tile.w_factor;

		if (x >= mWidth)
			x = mWidth - 1;

		while (y < mHeight && mMap[x][y] === 1) {
			x++;
			if (x === mWidth) {
				x = 0;
				y++;
			}
		}

		mMapNextIndex.x = x;
		mMapNextIndex.y = y;
	}

	return {
		/** @expose */
		// main interface of this module. this will fill up the board with randomly created tiles.
		formTiles: function() {
			clear();
			while (mMapNextIndex.y < mHeight) {
				var tileIndex = getRandomTileIndex();
				addTile(tileIndex);
				setMapNextIndex(tileIndex);
			}
		},
		/** @expose */
		setSize: function(width,height,tileSize) {
			mWidth = width || mWidth;
			mHeight = height || mHeight;
			mTileSize = tileSize || mTileSize;
		},
		/** @expose */
		getTile: function(index) {
			return mTiles[index];
		},
		/** @expose */
		getTileCount: function() {
			return mTiles.length;
		},
		updateTilePos: function(pos) {
			mOffset = pos;
			for (var i = 0; i < mTiles.length; i++) {
				mTiles[i].x = mTileSize * mTiles[i].x_ + pos,
				mTiles[i].y = mTileSize * mTiles[i].y_ + pos,
				mTiles[i].w = mTileSize * cTileTypes[mTiles[i].t].w_factor - pos,
				mTiles[i].h = mTileSize * cTileTypes[mTiles[i].t].h_factor - pos
			}
		}
	};
})();
