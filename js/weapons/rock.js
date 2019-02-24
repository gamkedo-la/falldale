const ROCK_LIFE = 30;
const ROCK_SPEED = 2.0;
const ROCK_DAMAGE = 0.25;

rockClass.prototype = new weaponClass();
function rockClass() {
    this.rockQuantity = 5;
    this.direction = direction;
    this.baseDamage = ROCK_DAMAGE;
    this.damageDice = 4;//4 sided die, overrides default 6
    this.damagePoints = 4;//overrides default 6

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove();

        if (this.direction == "north") {
            this.xv = 0;
            this.yv = -this.speed;
            this.length = 20;
            this.width = 4;

            this.checkCollision();
        } else if (this.direction == "south") {
            this.xv = 0;
            this.yv = this.speed;
            this.length = 20;
            this.width = 4;

            this.checkCollision();
        } else if (this.direction == "west") {
            this.xv = -this.speed;
            this.yv = 0;
            this.length = 4;
            this.width = 20;

            this.checkCollision();
        } else if (this.direction == "east") {
            this.xv = this.speed;
            this.yv = 0;
            this.length = 4;
            this.width = 20;

            this.checkCollision();
        }

        this.x += this.xv;
        this.y += this.yv;
    }

    this.shootFrom = function(warriorAttack, dir = direction) {

        if (this.rockQuantity > 0) {
            this.rockQuantity--;

            if (this.rockQuantity > 1) {
                dialog = "I have thrown a rock.  I now have " + this.rockQuantity + " rocks!";
            } else if (this.rockQuantity == 1) {
                dialog = "I have thrown a rock.  I now have only have 1 rock left";
            } else {
                dialog = "That was my last rock.  I need to find more!";
            }

            this.direction = dir;

            if (dir == "north") {
                this.x = warriorAttack.x + 25;
                this.y = warriorAttack.y + 25;
            } else if (dir == "south") {
                this.x = warriorAttack.x + 5;
                this.y = warriorAttack.y + 25;
            } else if (dir == "west") {
                this.x = warriorAttack.x;
                this.y = warriorAttack.y + 30;
            } else if (dir == "east") {
                this.x = warriorAttack.x + 15;
                this.y = warriorAttack.y + 30;
            }

            this.life = ROCK_LIFE;
        }
    }

    this.superClassHitTest = this.hitTest;
    this.hitTest = function(weilder, adversary) {
        if(this.superClassHitTest(weilder, adversary)) {
			dialog = "Successful rock hit on "+ adversary.myName+"!";
        }
	}

    this.draw = function() {
        if (this.life > 0) {
            colorCircle(this.x, this.y, 5, "grey");
        }
    }

    // Check to see if rock is inside collide-able tile
    this.checkCollision = function()
    {
        // Get the tile number in world
        let worldTileCheck = getTileIndexAtPixelCoord(this.x, this.y);

        // If not out of bounds
        if (worldTileCheck != undefined)
        {
            // Get the tile number in the index
            let tileIndexNum = roomGrid[worldTileCheck];
            // If the tile detected is NOT inside of the NO_COLLIDE list, reset
            if (!RANGED_NO_COLLIDE.includes(tileIndexNum))
            {
                this.reset();
            }
        }
        else // reset if out of bounds
        {
            this.reset();
        }
    }
}