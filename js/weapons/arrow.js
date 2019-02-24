const ARROW_LIFE = 100;
const ARROW_SPEED = 1.0;
const ARROW_DAMAGE = 0.5;
//var arrowDead = false;

arrowClass.prototype = new weaponClass();
function arrowClass() {
	this.baseDamage = ARROW_DAMAGE;
	this.arrowQuantity = 5;
	this.direction = direction; //  arrow's direction is initialized to the direction global variable instead of blank
	
	this.superClassMove = this.move;
	this.move = function() {
		this.superClassMove();
		if(this.direction == "north") {
			this.xv = 0;
			this.yv = -this.speed;
			this.length = 20;
			this.width = 4;

			this.checkCollision();
		}
		else if(this.direction == "south") {
			this.xv = 0;
			this.yv = this.speed;
			this.length = 20;
			this.width = 4;

			this.checkCollision();
		}
		else if(this.direction == "west") {
			this.xv = -this.speed;
			this.yv = 0;
			this.length = 4;
			this.width = 20;

			this.checkCollision();
		}
		else if(this.direction == "east") {
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
		
		if(this.arrowQuantity > 0){
			this.arrowQuantity--;
			
			if(this.arrowQuantity > 1) { 
				dialog = "I used an arrow.  I now have "+ this.arrowQuantity + " arrows!";
			} else if(this.arrowQuantity == 1) { 
				dialog = "I used an arrow.  I now have only have 1 arrow left";
			} else {
				dialog = "That was my last arrow.  I need to find more!";
			}
						
			this.direction = dir;		

			if(dir == "north") {
				this.x = warriorAttack.x+25;
				this.y = warriorAttack.y+25;
			}
			else if(dir == "south") {
				this.x = warriorAttack.x+5;
				this.y = warriorAttack.y+25 ;
			}
			else if(dir == "west") {
				this.x = warriorAttack.x;
				this.y = warriorAttack.y+30;
			}
			else if(dir == "east") {
				this.x = warriorAttack.x+15;
				this.y = warriorAttack.y+30;
			}
			
			this.life = ARROW_LIFE;
		}
	}
	
	this.superClassHitTest = this.hitTest;
    this.hitTest = function(weilder, adversary) {
        if(this.superClassHitTest(weilder, adversary)) {
			dialog = "Successful archery hit on "+ adversary.myName+"!";
        }
	}
	
	this.draw = function() {
/*		if(direction == "north") {

		}
		else if(direction == "south") {
0;
		}
		else if(direction == "west") {
			
		}
		else if(direction == "east") {
			
		} */
		
		if(this.life > 0) {
			colorRect(this.x, this.y, this.width, this.length, "orange" );
		}
	}

	// Check to see if arrow is inside collide-able tile
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

