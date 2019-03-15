const ORC_SPEED = 0.6;

orcClass.prototype = new enemyClass();
function orcClass(orcName, whichPicture) {
    this.speed = ORC_SPEED;
    this.myOrcPic = whichPicture; // which picture to use
    this.health = 12;
    this.maxhealth = 12;
    this.alive = true;
    this.myBite = new biteClass();
    this.myName = orcName;
    this.displayHealth = false;
    this.orcHealthCountdownSeconds = 5;
    this.orcDisplayHealthCountdown = this.orcHealthCountdownSeconds * FRAMES_PER_SECOND;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 51;
    this.numberOfFrames = 6;
    this.height = 69;
    this.ticksPerFrame = 5;
    this.orcMove = true;

	this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.newRandomPic();
        this.health = 12;
        this.orcTimeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
        
        this.mySword.reset();
        this.myBite.reset();
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(this.orcTimeBetweenChangeDir);
    
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
    
        this.myBite.move();
        this.myBite.x = this.x;
        this.myBite.y = this.y;
    }
    
	this.distributeTreasure = function(){
		var chanceOnTreasure = Math.round(Math.random() * 10);
		if(chanceOnTreasure >= 7){	
			console.log("Treasure Provided")		
			var randomTreasure = Math.round(Math.random() * 3);
			switch (randomTreasure) {
				case 0:
				// heart
				console.log("heart");
				break;
				case 1:
				// gold
				console.log("gold");
				break;
				case 2:
				// healing potion
				console.log("healing potion");
				break;
			}
		}
	}
	
    this.takeDamage = function(howMuch) {
		this.health -= howMuch;
        this.displayHealth = true;
	}

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
            dialogManager.setDialogWithCountdown("Ouch! I've been bite by a Orc! That really hurts.", 5);
//            dialog = "Ouch! I've been bite by a Orc! That really hurts.";
        }
    }

    this.newRandomPic = function() {
        var whichPic = Math.round(Math.random() * 3);
        switch (whichPic) {
            case 0:
                this.myOrcPic = orcPic;
                break;
            case 1:
                this.myOrcPic = orcPic2;
                break;
            case 2:
                this.myOrcPic = orcPic3;
                break;
        }
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

            if (this.displayHealth) {
                if (this.orcDisplayHealthCountdown >=0) {
                    colorRect(this.x, this.y - 16, 40, 12, "black");
                    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
                    colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
                    this.orcDisplayHealthCountdown--;
                } else {
                    this.orcDisplayHealthCountdown = orcHealthCountdownSeconds * FRAMES_PER_SECOND;
                    this.displayHealth = false;
                }
            }
        } else {
            canvasContext.drawImage(deadOrcPic, this.x, this.y);
        }

        if (this.health <= 0) {
            this.alive = false;
        }
    }
}