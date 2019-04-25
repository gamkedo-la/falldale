var goldList = [];

function goldReadyToRemove() {
  for (var i = 0; i < goldList.length; i++) {
    if (goldList[ i ].x < redWarrior.centerX &&
        (goldList[ i ].x + goldList[ i ].width) > redWarrior.centerX &&
        goldList[ i ].y < redWarrior.centerY &&
        (goldList[ i ].y + goldList[ i ].height) > redWarrior.centerY) {
      goldList[ i ].readyToRemove = true;
    }
  }
}

function removegold() {
  for (var i = goldList.length - 1; i >= 0; i--) {
    if (goldList[ i ].readyToRemove) {
      if (goldList[ i ].available) {
        var distributedGold = redWarrior.goldpieces + goldList[ i ].goldValue;
        redWarrior.goldpieces = distributedGold;
        console.log(distributedGold);
        console.log(redWarrior.goldpieces);
        console.log(goldList[ i ].goldValue);
        goldList[ i ].available = false;
      }
      goldList.splice(i, 1);
    }
  }
}

function goldClass(gold, xPosition, yPosition) {
  this.goldValue = gold;
  this.x = xPosition;
  this.y = yPosition;
  this.height = 50;
  this.width = 50;
  this.available = true;

  this.draw = function () {
    canvasContext.drawImage(goldPic, this.x, this.y);
  }
}
	
	