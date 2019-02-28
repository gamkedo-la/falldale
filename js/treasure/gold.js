var goldList = [];

function goldClass(gold, xPosition, yPosition) {
	this.goldValue = gold;
	this.x = xPosition;
	this.y = yPosition
	this.height = 50; 
	this.width = 50;
	
	this.isOverlappingPoint = function(redWarriorCenterX,redWarriorCenterY) { 
		var playerCenterXPosition = redWarriorCenterX;
		var playerCenterYPosition = redWarriorCenterY;
    
		// check to ensure the player's center is inside the item's dimensions 
		if(playerCenterXPosition > this.x &&  playerCenterXPosition < (this.x + this.width) && playerCenterYPosition > this.y && playerCenterYPosition < (this.y + this.height)) {
			goldList.splice(i);		
		}
	}
	
	this.draw = function() { 
		canvasContext.drawImage(goldPic, this.x, this.y);
	}
}
	
	