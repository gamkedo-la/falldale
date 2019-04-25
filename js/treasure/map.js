var mapList = [];

function mapReadyToRemove() {
  for (var i = 0; i < mapList.length; i++) {
    if (mapList[ i ].x < redWarrior.centerX &&
        (mapList[ i ].x + mapList[ i ].width) > redWarrior.centerX &&
        mapList[ i ].y < redWarrior.centerY &&
        (mapList[ i ].y + mapList[ i ].height) > redWarrior.centerY) {
      mapList[ i ].readyToRemove = true;
    }
  }
}

function removemap() {
  for (var i = mapList.length - 1; i >= 0; i--) {
    if (mapList[ i ].readyToRemove) {
      if (mapList[ i ].available) {
        redWarrior.haveMap = true;
        mapList[ i ].available = false;
      }
      mapList.splice(i, 1);
    }
  }
}

function mapClass(xPosition, yPosition) {
  this.x = xPosition;
  this.y = yPosition;
  this.height = 50;
  this.width = 50;
  this.available = true;

  this.draw = function () {
    canvasContext.drawImage(mapPic, this.x, this.y);
  }
}
	
	