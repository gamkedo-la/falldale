var goblinMoveSpeed = 0.5;
const GOBLIN_TIME_BETWEEN_CHANGE_DIR = 100;

goblinClass.prototype = new enemyClass();
function goblinClass(goblinName) {
    this.speed = 4;
    this.myGoblinPic = goblinPic; // which picture to use
    this.health = 12;
    this.maxhealth = 12;
    this.alive = true;
    this.myName = goblinName;
    this.myBite = new biteClass();
    this.myMelee = new clubClass();
    this.displayHealth = false;
    this.goblinHealthCountdownSeconds = 5;
    this.goblinDisplayHealthCountdown = this.goblinHealthCountdownSeconds * 30;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 50;
    this.numberOfFrames = 6;
    this.height = 50;
    this.ticksPerFrame = 5;
    this.goblinMove = true;

	this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
		this.superClassReset(resetX, resetY);
        this.newRandomPic();
        this.health = 12;
    } 
	
	this.newRandomPic = function() {
		var whichPic = Math.round(Math.random() * 2);
		switch (whichPic) {
		case 0:
			this.myGoblinPic = goblinPic;
			break;
		case 1:
			this.myGoblinPic = goblinPic2;
			break;
		}
	}
    
    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(GOBLIN_TIME_BETWEEN_CHANGE_DIR, goblinMoveSpeed);
    
		if (this.walkNorth) {
            this.sy = this.height;
        }

        if (this.walkSouth) {
            this.sy = 0;
        }
        if (this.walkWest) {
            //this.sy = this.height*3;
			this.sy = this.height;
        }
        if (this.walkEast) {
            //this.sy = this.height*2;
			this.sy = this.health;
        }
        
        this.myBite.move();
        this.myBite.x = this.x;
        this.myBite.y = this.y;

        this.myMelee.move();
        this.myMelee.x = this.x;
        this.myMelee.y = this.y;
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
        goblinHurtSound.play();
        this.displayHealth = true;
    }
    
    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
			setDialogUICountdown(5);
            dialog = "Ouch! I've been bite by a goblin.";
        }
    }

    this.draw = function() {
        if (this.goblinMove) {
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
				
            canvasContext.drawImage(shadowPic, this.x-16, this.y+20);
            canvasContext.drawImage(this.myGoblinPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
            if (debugMode) {
                colorText(this.myName, this.x, this.y - 20, "red");
                colorText("HP: " + this.health, this.x, this.y - 10, "red");

                colorRect(this.x, this.y, 5, 5, "red")
                colorRect(this.x, this.y + this.height, 5, 5, "red")
                colorRect(this.x + this.width, this.y, 5, 5, "red")
                colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
            }

            if (this.displayHealth) {
                if (this.goblinDisplayHealthCountdown >=0) {
                    colorRect(this.x, this.y - 16, 40, 12, "black");
                    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
                    colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
                    this.goblinDisplayHealthCountdown--;
                } else {
                    this.goblinDisplayHealthCountdown = this.goblinHealthCountdownSeconds * 30;
                    this.displayHealth = false;
                }
            }
        } else {
            canvasContext.drawImage(deadGoblinPic, this.x, this.y);
        }

        if (this.health <= 0) {
            this.alive = false;
        }
    }
}