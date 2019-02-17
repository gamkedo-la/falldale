const ARROW_LIFE = 100;
const ARROW_SPEED = 1.0;
var arrowDead = false;


function arrowClass() {
	this.sx = 0;
	this.sy = 0;
	this.speed = 5;
	this.ang = 01;
	this.xv = 1;
	this.yv = 1;
	this.length = 10;
	this.width = 5;
	this.damage = 0.5;
	this.arrowLife = ARROW_LIFE;
	this.arrowQuantity = 5;
	this.direction = direction; //  arrow's direction is initialized to the direction global variable instead of blank
	//this.myArrowPic = arrowPic;

	this.reset = function() {
		this.arrowLife = 0;
		this.damage = 0.5
		arrowDead = true;
	} 
	
	this.rollForDamage = function() {
		this.damagePoints = Math.floor(Math.random() * this.damageDice) + 1
	}
	
	this.move = function() {
		if(this.arrowLife > 0) {
			this.arrowLife--;
		}			
			
		if(this.direction == "north") {
			this.xv = 0;
			this.yv = -this.speed;
			this.length = 20;
			this.width = 4;
		}
		else if(this.direction == "south") {
			this.xv = 0;
			this.yv = this.speed;
			this.length = 20;
			this.width = 4;
		}
		else if(this.direction == "west") {
			this.xv = -this.speed;
			this.yv = 0;
			this.length = 4;
			this.width = 20;
		}
		else if(this.direction == "east") {
			this.xv = this.speed;
			this.yv = 0;
			this.length = 4;
			this.width = 20;
		}

		this.x += this.xv;
		this.y += this.yv;
	}

	this.isArrowReadyToShoot = function() {
		this.damage = 0.5
        return(this.arrowLife <= 0);
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
			
			
			this.arrowLife = ARROW_LIFE;
		}
	}
	
	this.hitTest = function(thisEnemy) {
		
		if(this.arrowLife <= 0) {
			return false;
		} 
		
		if(	this.x > thisEnemy.x &&    // within left side
			this.x < (thisEnemy.x + thisEnemy.width) && //within right side
			this.y > thisEnemy.y && // within top side
			this.y < (thisEnemy.y + thisEnemy.height)) 
			{ // within bottom 
				dialog = "Successful archery hit on "+ thisEnemy.myName+"!";
				if (this.damage == 0.5) {
					if (thisEnemy.takeDamage) { // can be undefined
						thisEnemy.takeDamage(this.damage)
					}
					this.damage -= 0.5;
				} else {
					return false;
			}
		}
	}
	
	this.checkhit = function() {
		if(this.damage == 1.0) {
			dialog = "Successful hit "+ thisEnemy.myName+" for 1 damage point!";
			this.damage = this.damage - 1;
			thisEnemy.takeDamage(this.damage);
		}
	}	
	
	this.draw = function() {

		var arrowXLocation = redWarrior.x;
		var arrowYLocation = redWarrior.y;
		
		if(direction == "north") {

		}
		else if(direction == "south") {
0;
		}
		else if(direction == "west") {
			
		}
		else if(direction == "east") {
			
		} 
		
		if(this.arrowLife > 0) {
			arrowDead = false;
			colorRect(this.x, this.y, this.width, this.length, "orange" );
		}
	}
	
}

