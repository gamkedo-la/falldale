const ORCBOSS_SPEED = 0.6;

orcBossClass.prototype = new enemyClass();
function orcBossClass(orcBossName, whichPicture) {
    this.speed = ORC_SPEED;
    this.myOrcBossPic = whichPicture; // which picture to use
    this.health = 100;
    this.maxhealth = 100;
    this.alive = true;
    this.myBite = new biteClass();
    this.myName = orcBossName;
    this.displayHealth = false;
    this.druidHealthCountdownSeconds = 5;
    this.druidDisplayHealthCountdown = this.druidHealthCountdownSeconds * FRAMES_PER_SECOND;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 50;
    this.numberOfFrames = 6;
    this.height = 100;
    this.ticksPerFrame = 5;
    this.druidMove = true;

	this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.newRandomPic();
        this.health = 100;
        this.orcBossTimeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
        
        //this.mySword.reset();
        this.myBite.reset();
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(this.orcBossTimeBetweenChangeDir);
    
        if (this.walkWest) {
            this.sy = this.height*0;
        }
        if (this.walkEast) {
            this.sy = this.height*0;
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
            dialogManager.setDialogWithCountdown("Ouch! I've been bite by a OrcBoss! That really hurts.", 5);
//            dialog = "Ouch! I've been bite by a OrcBoss! That really hurts.";
        }
    }

    this.newRandomPic = function() {
        this.myOrcBossPic = orcBossPic;
    }

    this.draw = function() {

        if (this.druidMove) {
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
            canvasContext.drawImage(this.myOrcBossPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
            if (debugMode) {
                colorText(this.myName, this.x, this.y - 20, "red");
                colorText("HP: " + this.health, this.x, this.y - 10, "red");

                colorRect(this.x, this.y, 5, 5, "red")
                colorRect(this.x, this.y + this.height, 5, 5, "red")
                colorRect(this.x + this.width, this.y, 5, 5, "red")
                colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
            }

            if (this.displayHealth) {
                if (this.druidDisplayHealthCountdown >=0) {
                    colorRect(this.x, this.y - 16, 40, 12, "black");
                    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
                    colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
                    this.druidDisplayHealthCountdown--;
                } else {
                    this.druidDisplayHealthCountdown = druidHealthCountdownSeconds * FRAMES_PER_SECOND;
                    this.displayHealth = false;
                }
            }
        } else {
           canvasContext.drawImage(deadGoblinPic, this.x, this.y); // temporarily assigning dead goblin.  Need a pic for the Dead Orc Boss
        }

        if (this.health <= 0) {
            this.alive = false;
        }
    }
}