var archerMoveSpeed = 0.5;
const ARCHER_TIME_BETWEEN_CHANGE_DIR = 20;
const ARCHER_PATROL_RADIUS = 200;
const ARCHER_TAKE_SHOT_RANGE = 50;

archerClass.prototype = new enemyClass();
function archerClass(archerName) {
    this.speed = archerMoveSpeed;
    this.maxhealth = 6;
    this.width = 44;
	this.height = 50;
    this.ticksPerFrame = 5;
	this.faceNorthMul = 1;
	this.faceSouthMul = 0;
	this.shadowXOffset = 8;
	this.shadowYOffset = 32;

	this.superClassInitialize = this.initialize;
	this.initialize = function(enemyName, enemyPic) {
		this.superClassInitialize(enemyName, enemyPic);
		this.myArrow = new arrowClass(this.direction);
		this.arrowList = [];
		this.myBite.baseBiteLife = 30; //Archers bite, but they're not very good at it
		this.myBite.baseBiteCooldown = 10; //
		this.myRanged = new rangedWeaponClass(); //Archers can shoot arrows
	}

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
		this.myArrow.reset();
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(ARCHER_TIME_BETWEEN_CHANGE_DIR);
		this.myArrow.move();
		if (this.alive) {
			this.checkToFireArrow();
		}
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
            return true;
        }
        return false;
    }

    this.rangedAttack = function() {

    }

	this.superClassDraw = this.draw;
    this.draw = function() {
		this.superClassDraw();
		this.myArrow.draw();
    }
}
