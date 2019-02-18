npcClass.prototype = new enemyClass();

function npcClass(npcName, npcPic) {
    this.speed = 4;
    this.myNPCPic = npcPic; // which picture to use
    this.myName = "Untitled character";
    this.myName = npcName;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 50;
    this.numberOfFrames = 4;
    this.height = 50;
    this.ticksPerFrame = 5;
    this.npcMove = true;
	this.npcTimeBetweenChangeDir = 100;
	this.npcMoveSpeed = 0.5;

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.myNPCPic = npcPic;
		this.npcTimeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(this.npcTimeBetweenChangeDir, this.npcMoveSpeed);

        if (this.walkNorth) {
            this.sy = this.height;
        }

        if (this.walkSouth) {
            this.sy = 0;
        }
        if (this.walkWest) {
            this.sy = this.height * 3;
        }
        if (this.walkEast) {
            this.sy = this.height * 2;
        }
    }

    this.isOverlappingPoint = function(testX, testY) { // textX is redWarrior.x and testY is redWarrior.y

        //test if redWarrior is inside box of NPC

        if (this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY) {
			setDialogUICountdown(5);
			if(this.myName == "Addy"){  
				dialog = "Hi, I'm Addy.  Eventually, I'll have more to say."
			} 
			if(this.myName == "Dodd"){
				dialog = "Hi, I'm Dodd.  Eventually, I'll have more to say."
			}
			if(this.myName == "Taran"){
				dialog = "Hi, I'm Taran.  Eventually, I'll have more to say."
			}
			if(this.myName == "Delkon"){
				dialog = "Hi, I'm Delkon.  Eventually, I'll have more to say."
			}
			if(this.myName == "Princess"){
				dialog = "Hi, I'm the Princess.  Eventually, I'll have more to say."
			}
			if(this.myName == "Gabriel"){
				dialog = "Hi, I'm Gabriel.  Eventually, I'll have more to say."
			}
			if(this.myName == "Fenton"){
				dialog = "Hi, I'm Fenton.  Eventually, I'll have more to say."
			}
			if(this.myName == "Healer"){
				dialog = "Hi, I'm the Healer.  I could use a better name."
			}
			if(this.myName == "Shop Keeper"){
				dialog = "Hi, I'm the Shop Keeper.  I could use a better name."
			}
			
		}
    }

    this.draw = function() {

        if (this.npcMove) {
         //   this.tickCount++;

        }
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
		
		this.sx = 0;
		this.sy = 0;			
			
        if (gamePaused == false) {
            this.sx = this.frameIndex * this.width;
        }

        canvasContext.drawImage(shadowPic, this.x - 20, this.y + 32);
        canvasContext.drawImage(this.myNPCPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
        if (debugMode) {
            colorText(this.myName, this.x, this.y - 20, "red");
            colorText("HP: " + this.health, this.x, this.y - 10, "red");

            colorRect(this.x, this.y, 5, 5, "red")
            colorRect(this.x, this.y + this.height, 5, 5, "red")
            colorRect(this.x + this.width, this.y, 5, 5, "red")
            colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
        }
    }
}
