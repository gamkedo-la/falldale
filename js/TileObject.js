//Tile Object
function TileObject(index) {
  var { x, y } = getPixelCoordForArrayIndex(index);
  this.x = x;
  this.y = y;
  this.width = TILE_W;
  this.height = TILE_H;
  this.index = index;
  this.type = roomGrid[ index ];
  if (this.type == TILE_PLAYERSTART) {
    this.type = TILE_ROAD;
  }
  this.image = worldPics[ this.type ];

  // add special fx for tiles that need it (glows, water, etc)
  this.drawTileFX = function () {

    if (this.type == TILE_RED_KEY ||
        this.type == TILE_GREEN_KEY ||
        this.type == TILE_YELLOW_KEY ||
        this.type == TILE_BLUE_KEY ||
        this.type == TILE_TREASURE ||
        this.type == TILE_MAP ||
        this.type == TILE_GRAVE_YARD_PORTAL ||
        this.type == TILE_HOME_VILLAGE_PORTAL ||
        this.type == TILE_FOREST_PORTAL
    ) {
      drawBitmapCenteredWithRotation(shinyPic,
          this.x + 24, this.y + 16, // centered - FIXME: hardcoded nums
          frameCounter * 0.01); // radians per frame
    }

    // scrolling water effect
    if (this.type == TILE_WATER ||
        this.type == TILE_BRIDGE_UPPER ||
        this.type == TILE_BRIDGE_LOWER) {
      //console.log("we have scrolling water!");

      var offset = TILE_H - ((frameCounter * 0.5) % (TILE_H));

      // the water-scroll image is large enough to have two tiles worth

      canvasContext.drawImage(waterScrollImg,
          0, offset, 					// src x,y
          TILE_W, TILE_H,	            // src w,h
          this.x, this.y,		        // dst x,y
          TILE_W, TILE_H);        	// dst w,h
    }

  };

  this.draw = function () {

    // draw the tile
    canvasContext.drawImage(this.image, this.x, this.y);

    // optional sparkles, splashes, glows are drawn on top
    this.drawTileFX();

    // bridge needs to be drawn over top of flowing water
    if (this.type == TILE_BRIDGE_UPPER ||
        this.type == TILE_BRIDGE_LOWER) {
      canvasContext.drawImage(this.image, this.x, this.y);
    }

  };

  this.setNewType = function (newType) {
    this.type = newType;
    this.image = worldPics[ this.type ];
  }
}

function tileObjectForArrayIndex(index) {
  const indexFilter = function (anIndex) {
    return (function (tile) {
      return tile.index == anIndex;
    });
  };

  const thisTile = tileList.filter(
      indexFilter(index)
  );

  return thisTile[ 0 ];
}

function setNewTypeForTileObjectAtIndex(newType, index) {
  const theTile = tileObjectForArrayIndex(index);
  theTile.setNewType(newType);
}
