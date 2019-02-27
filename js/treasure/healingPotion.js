var healingPotionList = [];

function healingPotionClass(healingPotion, xPosition, yPosition) {
	this.healingPotionValue = healingPotion;
	this.x = xPosition;
	this.y = yPosition;
	
	this.draw = function() { 
		canvasContext.drawImage(healingPotionPic, this.x, this.y);
	}
}

