const BAT_SPEED = 1.9;
const BAT_TIME_BETWEEN_CHANGE_DIR = 85;
const BAT_COLLISION_RADIUS = 5;
var batRestingTime = 850;

batClass.prototype = new movingWrapPositionClass();


function batClass(batName) {
	this.x = Math.random()*600;
	this.y = Math.random()*800;
	this.xv = 0;
	this.yv = 0;
	this.sx = 0;
	this.sy = 0;
	this.width = 47.8;
	this.myBatPic; // which picture to use
	this.cyclesTilDirectionChange = 0;
	this.cyclesOfBatActive = 0;
	this.cyclesofBatResting = Math.random()*400;
	this.batResting = false;
	this.batRestingTime = Math.random()*400;
	
	this.frameIndex = 0;
	this.tickCount = 0;
	this.ticksPerFrame = 10;
	this.numberOfFrames = 5 || 1;
	this.health = 2;
	this.alive = true;
	this.myName = batName;
	
	this.reset = function() {
		this.myBatPic = batPic;
		this.cyclesOfBatResting = 0;
		this.cyclesTilDirectionChange = 0;	
	} // end of batReset func

	this.superclassMove = this.move;
	this.move = function() {
		this.superclassMove();
		if(this.batResting == false) {
			this.cyclesOfBatActive++;
			this.cyclesOfBatResting = 0;
			this.batActiveTime = Math.random()*1000;
			this.sx = 0;
			this.sy = 0;	
			this.width = 47.8;
			this.height = 21;			
			this.cyclesTilDirectionChange--;
			this.numberOfFrames = 4;
			if(this.cyclesTilDirectionChange <= 0) {
				var randAng = Math.random() * Math.PI*2.0;
				this.xv = Math.cos(randAng) * BAT_SPEED;
				this.yv = Math.sin(randAng) * BAT_SPEED;
				this.cyclesTilDirectionChange = BAT_TIME_BETWEEN_CHANGE_DIR;
				if(this.cyclesOfBatActive >= this.batActiveTime) {
					this.batResting = true;
				}
			}		
		} else if(this.batResting == true) {
			this.cyclesOfBatActive = 0;
			this.cyclesOfBatResting++;
			this.xv = 0;
			this.yv = 0;
			this.sx = 0;
			this.sy = 0;
			this.width = 48;
			this.height = 21;
			this.frameIndex = 0;
			this.numberOfFrames = 4;
			if(this.cyclesOfBatResting >= 100) {
				this.batResting = false;
			} 
		}
		// end of bat Resting function
	} // end of bat move function
	
	this.isOverlappingPoint = function(testX, testY) {
		var deltaX = Math.abs(testX-this.x);
		if (deltaX <= 1) {
			deltaX = deltaX +1;
		}
		var deltaY = Math.abs(testY-this.y);
		if (deltaY <= 1) {
			deltaY = deltaY +1;
		}

		
		var dist = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) );
		if (dist <= BAT_COLLISION_RADIUS) {
			dialog = "OUCH! I've been bit by a Bat!";
			redWarrior.health = (redWarrior.health)-(1/32); 
		}
		return (dist <= BAT_COLLISION_RADIUS);
	}

	this.draw = function() { 
		if (this.batResting == false) {
			this.tickCount++;
			if (this.tickCount > this.ticksPerFrame) {
				this.tickCount = 0;
				if(this.frameIndex < this.numberOfFrames-1) {
					this.frameIndex += 1;
				} else {
					this.frameIndex = 0;
				}
			}
		} // end of if Bat is Resting
		if (this.batResting == true) {
			this.frameIndex = 4;
			}
			
		if(this.health > 0){
		
			this.sx = this.frameIndex * this.width / this.numberOfFrames;
			canvasContext.drawImage(this.myBatPic, this.sx, this.sy, 50, this.height, this.x, this.y, this.width, this.height);
			if(debugMode){
				colorText(this.myName, this.x, this.y-20, "red");
				colorText("HP: "+this.health, this.x, this.y-10, "red");
				
				colorRect(this.x,this.y, 5,5, "red"); 
				colorRect(this.x,this.y+this.height, 5,5, "red");;;
				colorRect(this.x+this.width,this.y, 5,5, "red")
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red")
			}
		} else {
				canvasContext.drawImage(deadBatPic, this.x,this.y);
		}

		if (this.alive == true){
			if (this.health >= .5) {
				colorRect(this.x+10, this.y-this.height+5, 5 , 10, 'green'); // 0.5 HP
			} if (this.health < 1) {
				colorRect(this.x+15, this.y-this.height+5, 5 , 10, 'red');
			} if (this.health >= 1) {
				colorRect(this.x+15, this.y-this.height+5, 5 , 10, 'green'); // 1 HP **********
			} if (this.health < 1.5) {
				colorRect(this.x+30, this.y-this.height+5, 5 , 10, 'red'); 
			} if (this.health >= 1.5) {
				colorRect(this.x+30, this.y-this.height+5, 5 , 10, 'green'); // 1.5 HP	
			} if (this.health < 2 ) {
				colorRect(this.x+35, this.y-this.height+5, 5 , 10, 'red');
			} if (this.health >= 2) {
				colorRect(this.x+35, this.y-this.height+5, 5 , 10, 'green');
			}	
		}	
		
		
	}
}

function movingWrapPositionClass() {
	
	this.handleScreenWrap = function() {
		if((this.x < 0) || (this.x > canvas.width)) {
			this.x -= this.xv;
		} 
		if((this.y < 0) || (this.y > canvas.height)) {
			this.y -= this.yv;
		} 
	}
	
	this.move = function() {
		this.x += this.xv;
		this.y += this.yv;
		this.handleScreenWrap();
		if (this.health <= 0) {
			this.reset();
		}
	}
}


