var orcMoveSpeed = 0.5;
const ORC_TIME_BETWEEN_CHANGE_DIR = 100;

orcClass.prototype = new enemyClass();
function orcClass(orcName, whichPicture) {
    this.speed = 4;
    this.myOrcPic = whichPicture; // which picture to use
    this.myName = "Untitled orc";
    this.health = 12;
    this.maxhealth = 12;
    this.alive = true;
    this.biteReadyTicker = 30;
    this.biteReady = true;
    this.myName = orcName;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 51;
    this.numberOfFrames = 4;
    this.height = 69;
    this.ticksPerFrame = 5;
    this.orcMove = true;

	this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
        //this.myOrcPic = orcPic3;
        this.health = 12;
    } 

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(ORC_TIME_BETWEEN_CHANGE_DIR, orcMoveSpeed);
    
		if (this.walkNorth) {
            this.sy = 0;
        }

        if (this.walkSouth) {
            this.sy = this.height * 1;
        }
        if (this.walkWest) {
            this.sy = this.height*2;
        }
        if (this.walkEast) {
            this.sy = this.height*3;
        }
	
    }
    
    this.takeDamage = function(howMuch) {
		this.health -= howMuch;
	}

    this.orcBite = function() {

        if (this.biteReady == true) {
            redWarrior.health = redWarrior.health - 1;
            dialog = "Ouch! I've been bite by an Orc.";
            this.biteReady = false;
        } else if (this.biteReady == false) {
            this.biteReadyCounter();
        }
    }

    this.biteReadyCounter = function() {
        if (this.biteReadyTicker > 0) {
            this.biteReadyTicker--;
        } else if (this.biteReadyTicker <= 0) {
            this.biteReadyTicker = 30;
            this.biteReady = true;
        }
    }

    this.isOverlappingPoint = function(testX, testY) { // textX is redWarrior.x and testY is redWarrior.y

        //test if redWarrior is inside box of Monster

        if (this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY) {
            this.orcBite();
        }
        // add result if true
    }

    this.draw = function() {

        if (this.orcMove) {
            this.tickCount++;
			
        }
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
        if (this.health > 0) {
            			
			if(gamePaused == false){
				this.sx = this.frameIndex * this.width;
			}
				
			this.sx = 0;
				
			canvasContext.drawImage(shadowPic, this.x-4, this.y+54);
            canvasContext.drawImage(this.myOrcPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
            if (debugMode) {
                colorText(this.myName, this.x, this.y - 20, "red");
                colorText("HP: " + this.health, this.x, this.y - 10, "red");

                colorRect(this.x, this.y, 5, 5, "red")
                colorRect(this.x, this.y + this.height, 5, 5, "red")
                colorRect(this.x + this.width, this.y, 5, 5, "red")
                colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
            }

            if (displayHealth) {
                colorRect(this.x, this.y - 16, 40, 12, "black");
                colorRect(this.x + 2, this.y - 14, 35, 8, "red");
                colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
            }
        } else {
            canvasContext.drawImage(deadOrcPic, this.x, this.y);
        }

        if (this.health <= 0) {
            this.alive = false;
        }
    }
}