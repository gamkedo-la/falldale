const BAT_SPEED = 1.9;
const BAT_TIME_BETWEEN_CHANGE_DIR = 85;
const BAT_COLLISION_RADIUS = 5;
const BAT_RESTING_TIME = 850;

batClass.prototype = new enemyClass();


function batClass() {
    this.myName = "Bat";
    this.x = Math.random() * 600;
    this.y = Math.random() * 800;
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
    this.alive = true;
    this.myBite = new biteClass();	    //
	this.myBite.baseBiteLife = 3;		//Bats bite, but only when they're not resting
	this.myBite.baseBiteCooldown = 3;	//

    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.numberOfFrames = 5 || 1;

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.myBatPic = batPic;
        this.numberOfFrames = 4;
        this.width = 50;
        this.height = 21;
        this.cyclesOfBatResting = 0;
        this.cyclesTilDirectionChange = 0;
        this.health = 2;
    } // end of batReset func

    this.superclassMove = this.move;
    this.move = function() {
        if (this.alive) {
            if (this.batResting == false) {
                this.superclassMove(BAT_TIME_BETWEEN_CHANGE_DIR, BAT_SPEED);
                this.cyclesOfBatActive++;		
                this.cyclesOfBatResting = 0;

                this.sx = 0;
                this.sy = 0;
                if (this.cyclesOfBatActive >= 300) {
                    this.batResting = true;
                }
            } else if (this.batResting == true) {
                this.cyclesOfBatActive = 0;
                this.cyclesOfBatResting++;		
                this.xv = 0;
                this.yv = 0;
                this.sx = 0;
                this.sy = 0;
                this.frameIndex = 0;
                if (this.cyclesOfBatResting >= 100) {
                    this.batResting = false;
                }
            }
        }
    }

    this.takeDamage = function(howMuch) {
        this.health -= howMuch;
        batHurtSound.play();
	}

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(!this.batResting) {//Bats don't bite when they're resting
            if(this.superClassIsOverlappingPoint()) {
				setDialogUICountdown(5);
                dialog = "Ouch! I've been bite by a bat.  Quick! I need some garlic.";
            }
        }
    }

    this.draw = function() {

        if (this.health > 0) {
            this.alive = true;
        } else {
            this.alive = false;
        }

        if (displayHealth && this.alive) {
            colorRect(this.x, this.y - 16, 40, 12, "black");
            colorRect(this.x + 2, this.y - 14, 35, 8, "red");
            colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
        }
        if (debugMode && this.alive) {
            colorText(this.myName, this.x, this.y - 20, "red");
            colorText("HP: " + this.health, this.x, this.y - 10, "red");

            colorRect(this.x, this.y, 5, 5, "red");
            colorRect(this.x, this.y + this.height, 5, 5, "red")
            colorRect(this.x + this.width, this.y, 5, 5, "red")
            colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
        }

        if (this.batResting == false) {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.numberOfFrames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        } // end of if Bat is Resting
        if (this.batResting == true) {
            this.frameIndex = 4;
        }
		
		if(gamePaused){
			this.frameIndex = 1;
		}
			
        if (this.alive) {
            this.sx = this.frameIndex * this.width;
            canvasContext.drawImage(shadowPic, this.x-this.width/2, this.y+this.height/2+8+16); // shadow a bit lower so it looks in midair
            canvasContext.drawImage(this.myBatPic, this.sx, this.sy, 50, this.height, this.x, this.y, 50, this.height);
        }
    }
}

function movingWrapPositionClass() {

    this.handleScreenWrap = function() {
        if ((this.x < 0) || (this.x > canvas.width)) {
            this.x -= this.xv;
        }
        if ((this.y < 0) || (this.y > canvas.height)) {
            this.y -= this.yv;
        }
    }

    this.move = function() {
        this.x += this.xv;
        this.y += this.yv;
        this.handleScreenWrap();
    }
}