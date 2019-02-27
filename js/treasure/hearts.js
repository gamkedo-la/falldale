var heartsList = [];

function heartClass(hearts, xPosition, yPosition) {
	this.heartValue = hearts;
	this.x = xPosition;
	this.y = yPosition


	this.draw = function() { 
		canvasContext.drawImage(heartPic, this.x, this.y);
	}
}