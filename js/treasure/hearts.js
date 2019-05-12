var heartsList = [];

function heartsReadyToRemove() {
  for (var i = 0; i < heartsList.length; i++) {
    if (heartsList[ i ].x < redWarrior.centerX && (heartsList[ i ].x + heartsList[ i ].width) > redWarrior.centerX &&
        heartsList[ i ].y < redWarrior.centerY && (heartsList[ i ].y + heartsList[ i ].height) > redWarrior.centerY) {
      heartsList[ i ].readyToRemove = true;
    }
    //console.log(heartsList[ i ].readyToRemove);
  }
}

function removeHearts() {
  for (var i = heartsList.length - 1; i >= 0; i--) {
    if (heartsList[ i ].readyToRemove) {
      redWarrior.health = redWarrior.health + heartsList[ i ].heartValue;
      if (redWarrior.health > redWarrior.maxHealth) {
        redWarrior.health = redWarrior.maxHealth;
      }
      redWarrior.displayHealth = true;
      redWarrior.isTakingDamage = false;
      heartsList.splice(i, 1);
    }
  }
}

function heartClass(hearts, xPosition, yPosition) {
  this.heartValue = hearts;
  this.x = xPosition;
  this.y = yPosition;
  this.height = 50;
  this.width = 50;
  this.available = true;

  this.draw = function () {
    canvasContext.drawImage(heartPic, this.x, this.y);
  }
}