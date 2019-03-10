// OverlayFX system by McFunky
// night mode, light glows, detail decals, footsteps etc

var OverlayFX = new function() {

    var overlay = document.createElement("canvas");
    var overlayContext = overlay.getContext('2d'); 
    var needToInit = true;

    this.nightMode = false; // toggled in Input.js KEY_N
    
    const glowingTiles = [
        TILE_YELLOW_DOOR,
        TILE_GREEN_DOOR,
        TILE_BLUE_DOOR,
        TILE_RED_DOOR,
        TILE_GRAVE_YARD_PORTAL,
        TILE_HOME_VILLAGE_PORTAL,
        TILE_FOREST_PORTAL,
        TILE_KEY,
        TILE_YELLOW_KEY,
        TILE_GREEN_KEY,
        TILE_BLUE_KEY,
        TILE_RED_KEY,
        TILE_TREASURE,
        TILE_FRONTDOOR_YELLOW,
        TILE_HEALER_FRONTDOOR,
        TILE_HEALER_FW_WINDOW,
        TILE_HOUSE_FRONT_WINDOW,
        TILE_HOUSE_FRONT_WINDOW_BROKEN,
        TILE_HOUSE_BW_WINDOW,
        TILE_GRAVEYARD_FENCE_BR,
        TILE_GRAVEYARD_FENCE_TR,
        TILE_GRAVEYARD_FENCE_BL,
        TILE_GRAVEYARD_FENCE_TL,
        TILE_GRAVEYARD_FENCE_LEFT,
        TILE_GRAVEYARD_FENCE_RIGHT,
        
    ];

    this.draw = function() {

        if (!this.nightMode) return;

        if (needToInit) {
            console.log("Initializing OverlayFX...")
            needToInit = false;
            overlay.width = TILE_W*ROOM_ROWS;
            overlay.height = TILE_H*ROOM_COLS;
            overlayContext.fillStyle = "black";
            overlayContext.fillRect(0, 0, overlay.width, overlay.height);
            overlayContext.globalCompositeOperation="destination-out"; // cut out

            // look for things that glow
            var drawTileX = 0;
	        var drawTileY = 0;
            for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
                for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
                    var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
                    var tileKindHere = roomGrid[arrayIndex];   
                    if (glowingTiles.includes(tileKindHere)) {
                        overlayContext.drawImage(shinyPic,drawTileX-40,drawTileY-25);
                    }   
                    drawTileX += TILE_W;  
                }
                drawTileY += TILE_H;
		        drawTileX = 0;
            }
            //overlayContext.globalCompositeOperation="source-over"; // normal

        }
        
        // experimental night mode
        canvasContext.globalAlpha = 0.4;
        canvasContext.drawImage(overlay,0,0);
        canvasContext.globalAlpha = 1;

    }

}();