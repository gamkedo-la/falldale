const ROCK_LIFE = 30;
const ROCK_SPEED = 2.0;
var rockDead = false;


function rockClass() {
    this.sx = 0;
    this.sy = 0;
    this.speed = 5;
    this.ang = 01;
    this.xv = 1;
    this.yv = 1;
    this.length = 10;
    this.width = 5;
    this.damage = 0.25;
    this.rockLife = ROCK_LIFE;
    this.rockQuantity = 5;
    this.direction;
    //this.myRockPic = rockPic;

    this.reset = function() {
        this.rockLife = 0;
        this.damage = 0.25
        rockDead = true;
    }

    this.move = function() {
        if (this.rockLife > 0) {
            this.rockLife--;
        }

        if (this.rockLife == 1) {
            if (direction == "north") {
                this.direction = "north";
            } else if (direction == "south") {
                this.direction = "south";
            } else if (direction == "west") {
                this.direction = "west";
            } else if (direction == "east") {
                this.direction = "east";
            }
        }

        if (this.direction == "north") {
            this.xv = 0;
            this.yv = -this.speed;
            this.length = 20;
            this.width = 4;
        } else if (this.direction == "south") {
            this.xv = 0;
            this.yv = this.speed;
            this.length = 20;
            this.width = 4;
        } else if (this.direction == "west") {
            this.xv = -this.speed;
            this.yv = 0;
            this.length = 4;
            this.width = 20;
        } else if (this.direction == "east") {
            this.xv = this.speed;
            this.yv = 0;
            this.length = 4;
            this.width = 20;
        }

        this.x += this.xv;
        this.y += this.yv;

    }

    this.isRockReadyToShot = function() {
        this.damage = 0.25;
        return (this.rockLife <= 0);
    }

    this.shootFrom = function(warriorAttack) {

        if (this.rockQuantity > 0) {
            this.rockQuantity--;

            if (this.rockQuantity > 1) {
                dialog = "I have thrown a rock.  I now have " + this.rockQuantity + " rocks!";
            } else if (this.rockQuantity == 1) {
                dialog = "I have thrown a rock.  I now have only have 1 rock left";
            } else {
                dialog = "That was my last rock.  I need to find more!";
            }


            if (direction == "north") {
                this.x = warriorAttack.x + 25;
                this.y = warriorAttack.y + 25;
            } else if (direction == "south") {
                this.x = warriorAttack.x + 5;
                this.y = warriorAttack.y + 25;
            } else if (direction == "west") {
                this.x = warriorAttack.x;
                this.y = warriorAttack.y + 30;
            } else if (direction == "east") {
                this.x = warriorAttack.x + 15;
                this.y = warriorAttack.y + 30;
            }


            this.rockLife = ROCK_LIFE;
        }
    }

    this.hitTest = function(thisEnemy) {

        if (this.rockLife <= 0) {
            return false;
        }

        if (this.x > thisEnemy.x && // within left side
            this.x < (thisEnemy.x + thisEnemy.width) && //within right side
            this.y > thisEnemy.y && // within top side
            this.y < (thisEnemy.y + thisEnemy.height)) { // within bottom 
            dialog = "Successful rock throw hit on " + thisEnemy.myName + " for .25 points of damage!";
            if (this.damage == 0.25) {
                if (thisEnemy.takeDamage) { // can be undefined
                    thisEnemy.takeDamage(this.damage);
                }
                this.damage = this.damage - 0.25;
            }
        } else {
            return false;
        }
    }

    this.draw = function() {

        var rockXLocation = redWarrior.x;
        var rockYLocation = redWarrior.y;

        if (this.rockLife > 0) {
            rockDead = false;
            colorCircle(this.x, this.y, 5, "grey");
        }
    }

}