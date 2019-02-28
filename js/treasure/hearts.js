var heartsList = [];

function heartsReadyToRemove() {
    for(var i=0;i<heartsList.length;i++) {
        if(heartsList[i].x > redWarrior.centerX &&
            heartsList[i].x < redWarrior.centerY &&
            heartsList[i].y > redWarrior.centerY &&
            heartsList[i].y < redWarrior.centerY) {
				heartsList[i].readyToRemove = true;
        }
    }
}

function removeHearts(){
    for(var i=heartsList.length-1;i>=0;i--) {
        if(heartsList[i].readyToRemove) {
            heartsList.splice(i,1);
        }
    }
}

function heartClass(hearts, xPosition, yPosition) {
	this.heartValue = hearts;
	this.x = xPosition;
	this.y = yPosition;
	this.height = 50; 
	this.width = 50;

	this.draw = function() { 
		canvasContext.drawImage(heartPic, this.x, this.y);
		
	}
}