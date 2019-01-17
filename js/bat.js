const BAT_SPEED = 1.9;
const BAT_TIME_BETWEEN_CHANGE_DIR = 85;
const BAT_COLLISION_RADIUS = 5;
const BAT_RESTING_TIME = 850;

batClass.prototype = new movingWrapPositionClass();


function batClass() {
	this.x = Math.random()*600;
	this.y = Math.random()*800;
	this.xv = 0;
	this.yv = 0;
	this.sx = 0;
	this.sy = 0;
	this.health = 2;
	this.maxhealth = 2;
	this.myBatPic; // which picture to use
	this.cyclesTilDirectionChange = 0;
	this.cyclesOfBatActive = 0;
	this.cyclesofBatResting = 200;
	this.batResting = false;
	
	this.frameIndex = 0;
	this.tickCount = 0;
	this.ticksPerFrame = 10;
	this.numberOfFrames = 5 || 1;
	
	this.reset = function() {
		this.myBatPic = batPic;
		this.cyclesOfBatResting = 0;
		this.cyclesTilDirectionChange = 0;
		this.health = 2;
	} // end of batReset func

	this.superclassMove = this.move;
	this.move = function() {
		this.superclassMove();
		if(this.batResting == false) {
			this.cyclesOfBatActive++;
			// this.myBatPic = batPic;			
			this.cyclesOfBatResting = 0;
			this.sx = 0;
			this.sy = 0;	
			this.width = 200;
			this.height = 21;			
			this.cyclesTilDirectionChange--;
			this.numberOfFrames = 4;
			if(this.cyclesTilDirectionChange <= 0) {
				var randAng = Math.random() * Math.PI*2.0;
				this.xv = Math.cos(randAng) * BAT_SPEED;
				this.yv = Math.sin(randAng) * BAT_SPEED;
				this.cyclesTilDirectionChange = BAT_TIME_BETWEEN_CHANGE_DIR;
				if(this.cyclesOfBatActive >= 300) {
					this.batResting = true;
				}
			}		
		} else if(this.batResting == true) {
			this.cyclesOfBatActive = 0;
			this.cyclesOfBatResting++;
			// this.myBatPic = batPic;			
			this.xv = 0;
			this.yv = 0;
			this.sx = 0;
			this.sy = 0;
			this.width = 200;
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
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt( (deltaX*deltaY) + (deltaX*deltaY) );
		return (dist <= BAT_COLLISION_RADIUS);
	}

	this.draw = function() { 
		
			if(displayHealth){
				colorRect(this.x,this.y-16, 40,12, "black"); 
				colorRect(this.x+2,this.y-14, 35, 8, "red");
				colorRect(this.x+2,this.y-14, (this.health/this.maxhealth)*35, 8, "green");
			}
			if(debugMode){
				colorText(this.myName, this.x, this.y-20, "red");
				colorText("HP: "+this.health, this.x, this.y-10, "red");
				
				colorRect(this.x,this.y, 5,5, "red"); 
				colorRect(this.x,this.y+this.height, 5,5, "red")
				colorRect(this.x+this.width,this.y, 5,5, "red")
				colorRect(this.x+this.width,this.y+this.height, 5,5, "red")
			}
		
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
		
		this.sx = this.frameIndex * this.width / this.numberOfFrames;
		canvasContext.drawImage(this.myBatPic, this.sx, this.sy, 50, this.height, this.x, this.y, 50, this.height);
		//canvasContext.drawImage(this.myBatPic, 200, 0, 50, this.height, this.x, this.y, 50, this.height);

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
	}
}

