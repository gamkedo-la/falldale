var healingPotionList = [];

function healingPotionReadyToRemove() {
  for (var i = 0; i < healingPotionList.length; i++) {
    if (healingPotionList[ i ].x < redWarrior.centerX &&
        (healingPotionList[ i ].x + healingPotionList[ i ].width) > redWarrior.centerX &&
        healingPotionList[ i ].y < redWarrior.centerY &&
        (healingPotionList[ i ].y + healingPotionList[ i ].height) > redWarrior.centerY) {
      healingPotionList[ i ].readyToRemove = true;
    }
  }
}

function removeHealingPotion() {
  for (var i = healingPotionList.length - 1; i >= 0; i--) {
    if (healingPotionList[ i ].readyToRemove) {
      if (healingPotionList[ i ].available) {
        healingPotionList[ i ].available = false;
        redWarrior.healingPotion = redWarrior.healingPotion + healingPotionList[ i ].healingPotionValueValue;
      }
      healingPotionList.splice(i, 1);
    }
  }
}

function healingPotionClass(healingPotion, xPosition, yPosition) {
  this.healingPotionValue = healingPotion;
  this.x = xPosition;
  this.y = yPosition;
  this.width = 50;
  this.height = 50;
  this.available = true;

  this.isOverlappingPoint = function (redWarriorCenterX, redWarriorCenterY) {
    var playerCenterXPosition = redWarriorCenterX;
    var playerCenterYPosition = redWarriorCenterY;

    // check to ensure the player's center is inside the item's dimensions
    if (playerCenterXPosition > this.x && playerCenterXPosition < (this.x + this.width) && playerCenterYPosition > this.y && playerCenterYPosition < (this.y + this.height)) {
      healingPotionList.splice(i);
    }
  };

  this.draw = function () {
    canvasContext.drawImage(healingPotionPic, this.x, this.y);
  }
}

