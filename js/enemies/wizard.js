const WIZARD_SPEED = 0.6;
const WIZARD_TIME_BETWEEN_CHANGE_DIR = 20;
const WIZARD_PATROL_RADIUS = 200;
const WIZARD_SHOTLANE_THICKNESS = 50;

wizardClass.prototype = new enemyClass();

function wizardClass() {
    this.speed = WIZARD_SPEED;
    this.maxhealth = 500;
    this.width = 50;
    this.height = 90;
    this.ticksPerFrame = 5;
    this.shadowXOffset = 4;
    this.shadowYOffset = 54;
    this.deadPic = deadGoblinPic;
    this.treasureAvailable = true;
    this.myArrow = new arrowClass(this.direction);
    this.arrowList = [];
    this.myRanged = new rangedWeaponClass();


    this.superClassInitialize = this.initialize;
    this.initialize = function(enemyName, enemyPic, numberOfFrames) {
        this.superClassInitialize(enemyName, enemyPic, numberOfFrames);
        this.originalNumberOfFrames = this.numberOfFrames;
        this.myArrow = new arrowClass(this.direction);
        this.arrowList = [];
        this.myRanged = new rangedWeaponClass();
    };

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
        this.myArrow.reset();
    };

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if (this.superClassIsOverlappingPoint()) {
            dialogManager.setDialogWithCountdown("Ouch! I've been bitten by a Wizard! That really hurts.", 5);
            //            dialog = "Ouch! I've been bitten by a Wizard! That really hurts.";
            return true;
        }
        return false;
    }

    this.distributeTreasure = function() {
        // TODO: port back to enemyClass
        console.log("Crystal to be Provide");
        this.treasureAvailable = false;
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(WIZARD_TIME_BETWEEN_CHANGE_DIR);
        this.myArrow.move();
        if (this.alive) {
            this.checkToFireArrow();
        }
    };

    this.checkToFireArrow = function() {
        console.log('Wizards X:', this.x, 'Player X:', redWarrior.x)
        console.log('Wizards Y:', this.y, 'player Y:', redWarrior.y)
        if (this.direction == "south") {
            console.log("I'm facing South and above the player");
            if (this.y <= redWarrior.y) { //Wizard above the player
                if ((this.x <= redWarrior.x + WIZARD_SHOTLANE_THICKNESS) &&
                    (this.x >= redWarrior.x - WIZARD_SHOTLANE_THICKNESS)) {
                    this.shotArrow();
                }
            }
        }
        if (this.direction == "north") { //Wizard is below the Wizard
            if (this.y >= redWarrior.y) {
                console.log("I'm facing North and below the player");
                if ((this.x <= redWarrior.x + WIZARD_SHOTLANE_THICKNESS) &&
                    (this.x >= redWarrior.x - WIZARD_SHOTLANE_THICKNESS)) {
                    this.shotArrow();

                }
            }
        }
        if (this.direction == "east") { // Wizard is West of the Wizard
            if (this.x <= redWarrior.x) {
                if ((this.y <= redWarrior.y + WIZARD_SHOTLANE_THICKNESS) &&
                    (this.y >= redWarrior.y - WIZARD_SHOTLANE_THICKNESS)) {
                    console.log("I'm facing East and West of the player");
                    console.log('fire')
                    this.shotArrow();
                }
            }
        }
        if (this.direction == "west") { // Wizard is East of the Wizard
            if (this.x >= redWarrior.x) {
                if ((this.y <= redWarrior.y + WIZARD_SHOTLANE_THICKNESS) &&
                    (this.y >= redWarrior.y - WIZARD_SHOTLANE_THICKNESS)) {
                    console.log("I'm facing West and East of the player");

                    this.shotArrow();
                }
            }
        }
    };

    this.shotArrow = function() {
        if (this.myArrow.isReady()) {
            this.myArrow.shootFrom(this, this.direction);
            arrowShotSound.play();
        }
    };

    this.rangedAttack = function() {

    };

    this.superClassTakeDamage = this.takeDamage;
    this.takeDamage = function(howMuch, fromX, fromY) {
        this.superClassTakeDamage(howMuch, fromX, fromY);
        if (!this.alive && this.treasureAvailable) {
            this.distributeTreasure();
            this.treasureAvailable = false;
            questFiveComplete()
        }
    }

    this.superClassDraw = this.draw;
    this.draw = function() {
        this.superClassDraw();
        this.myArrow.draw();
    }
}