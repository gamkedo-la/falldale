var healingPotionList = [];

function healingPotionClass(healingPotion, xPosition, yPosition) {
	this.healingPotionValue = healingPotion;
	this.x = xPosition;
	this.y = yPosition;
	
	this.isOverlappingPoint = function(redWarriorCenterX,redWarriorCenterY) { 
		var playerCenterXPosition = redWarriorCenterX;
		var playerCenterYPosition = redWarriorCenterY;
    
		// check to ensure the player's center is inside the item's dimensions 
		if(playerCenterXPosition > this.x &&  playerCenterXPosition < (this.x + this.width) && playerCenterYPosition > this.y && playerCenterYPosition < (this.y + this.height)) {
			healingPotionList.splice(i);		
		}
	}
	
	this.draw = function() { 
		canvasContext.drawImage(healingPotionPic, this.x, this.y);
	}
}

