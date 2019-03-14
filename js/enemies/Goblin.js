var goblinMoveSpeed = 0.5;
const GOBLIN_TIME_BETWEEN_CHANGE_DIR = 100;
var goblinsKilled = 0;

goblinClass.prototype = new enemyClass();
function goblinClass(goblinName) {
    this.speed = goblinMoveSpeed;
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
    this.height = 43;
    this.ticksPerFrame = 5;
    this.goblinMove = true;
	this.treasureAvailable = true;

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
			case 2:
				this.myGoblinPic = goblinPic3;
				break;
			case 3:
				this.myGoblinPic = goblinPic4;
				break;
		}
	}
    
    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(GOBLIN_TIME_BETWEEN_CHANGE_DIR);
    
		if (this.walkNorth) {
            this.sy = this.height;
        }

        if (this.walkSouth) {
            this.sy = 0;
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

        this.myMelee.move();
        this.myMelee.x = this.x;
        this.myMelee.y = this.y;
    }
	
	this.distributeTreasure = function(){
		var chanceOnTreasure = Math.round(Math.random() * 10);
		if(chanceOnTreasure >= 1){	
			console.log("Treasure Provided")		
			var randomTreasure = 4; //Math.round(Math.random() * 4);
			switch (randomTreasure) {
				case 1:
					heartsList.push(new heartClass(1, this.x, this.y));
				break;
				case 2:
					goldList.push(new goldClass(5, this.x, this.y));
				break;
				case 3:
					healingPotionList.push(new healingPotionClass(1, this.x, this.y));
				break;
				case 4:
					console.log("Provide Map");
					if(redWarrior.haveMap == false){
						mapList.push(new mapClass(this.x, this.y));
					} else {
						goldList.push(new goldClass(5, this.x, this.y));
					}
				break;
				
				
			}
		}
	}
		
    this.takeDamage = function(howMuch) {
        this.health -= howMuch;
        goblinHurtSound.play();
        this.displayHealth = true;
		if(this.health <= 0){
			if(this.treasureAvailable){
				this.distributeTreasure();
				this.treasureAvailable = false;
				goblinsKilled++;
				countGoblinforQuestOne();
			}
		}
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
			
			this.sx = 0;
			
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