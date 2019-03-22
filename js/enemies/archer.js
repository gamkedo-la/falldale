var archerMoveSpeed = 0.5;
const ARCHER_TIME_BETWEEN_CHANGE_DIR = 20;
const ARCHER_PATROL_RADIUS = 200;
const ARCHER_TAKE_SHOT_RANGE = 50;

archerClass.prototype = new enemyClass();

function archerClass(archerName) {
    this.myArrow = new arrowClass(this.direction);
    this.speed = archerMoveSpeed;
    this.myArcherPic = archerPic; 
    this.myName = archerName;

    this.maxhealth = 6;
    this.alive = true;
    this.myBite = new biteClass(); 
    this.myBite.baseBiteLife = 30; //Archers bite, but they're not very good at it
    this.myBite.baseBiteCooldown = 10; //
    this.myRanged = new rangedWeaponClass(); //Archers can shoot arrows
	this.arrowList = [];
    this.displayHealth = false;
    this.archerHealthCountdownSeconds = 5;
    this.archerDisplayHealthCountdown = this.archerHealthCountdownSeconds * FRAMES_PER_SECOND;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 44;
    this.numberOfFrames = 4;
    this.height = 50;
    this.ticksPerFrame = 5;
    this.archerMove = true;

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.myArcherPic;
        this.health = 6;
		this.myArrow.reset();
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(ARCHER_TIME_BETWEEN_CHANGE_DIR);

        this.myBite.move();
        this.myBite.x = this.x;
        this.myBite.y = this.y;
		
		this.myArrow.move();

        this.checkToFireArrow();
    }

    this.distributeTreasure = function() {
        var chanceOnTreasure = Math.round(Math.random() * 10);
        if (chanceOnTreasure >= 7) {
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


    this.checkToFireArrow = function() {
        if (this.direction == "north") {
            if (this.y >= redWarrior.y) { //player above the Archer
                if ((this.x - ARCHER_TAKE_SHOT_RANGE <= redWarrior.x) &&
                    (this.x + ARCHER_TAKE_SHOT_RANGE >= redWarrior.x)) {
                    console.log("player is above & within range, take shot");
                    this.shotArrow();
                }
            }
        }
        if (this.direction == "south") { //player is below the Archer
            if (this.y <= redWarrior.y) {
                if ((this.x - ARCHER_TAKE_SHOT_RANGE <= redWarrior.x) &&
                    (this.x + ARCHER_TAKE_SHOT_RANGE >= redWarrior.x)) {
                    console.log("player is below & within range, take shot");
                    this.shotArrow();
                }
            }
        }
        if (this.direction == "west") { // player is West of the Archer
            if (this.x >= redWarrior.x) {
                if ((this.y - ARCHER_TAKE_SHOT_RANGE <= redWarrior.y) &&
                    (this.y + ARCHER_TAKE_SHOT_RANGE >= redWarrior.y)) {
                    console.log("player is west & within range.  Take shot");
                    this.shotArrow();
                }
            }
        }
        if (this.direction == "east") { // player is East of the Archer
            if (this.x <= redWarrior.x) {
                if ((this.y - ARCHER_TAKE_SHOT_RANGE <= redWarrior.y) &&
                    (this.y + ARCHER_TAKE_SHOT_RANGE >= redWarrior.y)) {
                    console.log("player is east & within range.  Take shot");
                    this.shotArrow();
                }
            }
        }
    }

	this.shotArrow = function() {
		if (this.myArrow.isReady()) {
			this.myArrow.shootFrom(this, direction);
			arrowShotSound.play();
		}
    }

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if (this.superClassIsOverlappingPoint()) {
            // need to add a function for chance to do damage
            dialogManager.setDialogWithCountdown("Ouch! I've been bite by an Archer! An Archer!", 5);
        }
    }

    this.rangedAttack = function() {

    }



    this.draw = function() {
		
		if (this.archerMove) {
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

            if (gamePaused == false) {
                this.sx = this.frameIndex * this.width;
            }

            canvasContext.drawImage(shadowPic, this.x - 8, this.y + 32);
            canvasContext.drawImage(this.myArcherPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);

            if (this.displayHealth) {
                if (this.archerDisplayHealthCountdown >= 0) {
                    colorRect(this.x, this.y - 16, 40, 12, "black");
                    colorRect(this.x + 2, this.y - 14, 35, 8, "red");
                    colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
                    this.archerDisplayHealthCountdown--;
                } else {
                    this.archerDisplayHealthCountdown = this.archerHealthCountdownSeconds * FRAMES_PER_SECOND;
                    this.displayHealth = false;
                }

            }
            if (debugMode) {
                colorText(this.myName, this.x, this.y - 20, "red");
                colorText("HP: " + this.health, this.x, this.y - 10, "red");

                colorRect(this.x, this.y, 5, 5, "red");
                colorRect(this.x, this.y + this.height, 5, 5, "red")
                colorRect(this.x + this.width, this.y, 5, 5, "red")
                colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
            }
        } else {
            canvasContext.drawImage(deadArcherPic, this.x, this.y);
        }
		
		this.myArrow.draw();

        if (this.health <= 0) {
            this.alive = false;
        }
    }
}