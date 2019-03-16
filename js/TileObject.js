//Tile Object
function TileObject(index) {
    var {x, y} = getPixelCoordForArrayIndex(index);
    this.x = x;
    this.y = y;
    this.width = TILE_W;
    this.height = TILE_H;
    this.index = index;
    this.type = roomGrid[index];
    if(this.type == TILE_PLAYERSTART) {
        this.type = TILE_ROAD;
    }
    this.image = worldPics[this.type];

    this.draw = function() {
        canvasContext.drawImage(this.image, this.x, this.y);
    }

    this.setNewType = function(newType) {
        this.type = newType;
        this.image = worldPics[this.type];
    }
}

function tileObjectForArrayIndex(index) {
    const indexFilter = function(anIndex) {
        return (function(tile) {
            return tile.index == anIndex;
        });
    }

    const thisTile = tileList.filter(
        indexFilter(index)
    )

    return thisTile[0];
}

function setNewTypeForTileObjectAtIndex(newType, index) {    
    const theTile = tileObjectForArrayIndex(index);
    theTile.setNewType(newType);
}