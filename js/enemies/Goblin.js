var goblinMoveSpeed = 0.5;
const GOBLIN_TIME_BETWEEN_CHANGE_DIR = 300;

goblinClass.prototype = new enemyClass();
function goblinClass(goblinName) {
    this.speed = 4;
    this.myGoblinPic = goblinPic; // which picture to use
    this.myName = "Untitled goblin";
    this.health = 12;
    this.maxhealth = 12;
    this.alive = true;
    this.biteReadyTicker = 30;
    this.biteReady = true;
    this.myName = goblinName;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 39;
    this.numberOfFrames = 4;
    this.height = 37;
    this.ticksPerFrame = 5;
    this.goblinMove = true;

	this.superClassReset = this.reset;
    this.reset = function(whichImage, goblinName) {
		this.superClassReset(TILE_GOBLIN);
        this.name = goblinName;
        this.myGoblinPic;

        this.health = 12;
    } 

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(GOBLIN_TIME_BETWEEN_CHANGE_DIR, goblinMoveSpeed);
    }

    this.goblinBite = function() {

        if (this.biteReady == true) {
            redWarrior.health = redWarrior.health - 1;
            dialog = "Ouch! I've been bite by a goblin.";
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
            this.goblinBite();
        }
        // add result if true
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
            this.sx = this.frameIndex * this.width;
            canvasContext.drawImage(this.myGoblinPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
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
            canvasContext.drawImage(deadGoblinPic, this.x, this.y);
        }

        if (this.health <= 0) {
            this.alive = false;
        }
    }
}