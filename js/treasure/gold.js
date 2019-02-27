var goldList = [];

function goldClass(gold, xPosition, yPosition) {
	this.goldValue = gold;
	this.x = xPosition;
	this.y = yPosition
	console.log(this.heartValue, this.x, this.y);

	this.draw = function() { 
		canvasContext.drawImage(goldPic, this.x, this.y);
	}
}
	
	