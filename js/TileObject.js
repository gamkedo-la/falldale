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
        if(this.underImage != null) {
            canvasContext.drawImage(this.underImage, this.x, this.y);
        }

        canvasContext.drawImage(this.image, this.x, this.y);
    }

    const getUnderImage = function(aType) {
        if(tileTypeHasTransparency(aType)) {
            return worldPics[TILE_ROAD];
        } else if(tileTypeHasGrassTransparency(aType)) {
            return worldPics[TILE_GRASS]
        } else {
            return null;
        }
    }

    this.underImage = getUnderImage(this.type);

    this.setNewType = function(newType) {
        this.type = newType;
        this.image = worldPics[this.type];
        this.underImage = getUnderImage(this.type)
    }

    this.isMe = function(anIndex) {
        return (this.index == anIndex);
    }
}