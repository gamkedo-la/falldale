// ranged weapon superclass

rangedWeaponClass.prototype = new weaponClass();

function rangedWeaponClass() {
  this.name = "projectile";
  this.indefiniteArticle = "a";
  this.pluralName = this.name + "s";
  this.baseDamage = 0.5;
  this.baseLife = 100;
  this.quantity = 5;
  this.direction = direction; // take initial direction from global direction var
  this.superClassMove = this.move;
  this.move = function () {
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
  };

  this.shootFrom = function (warriorAttack, dir = direction) {
  	if (this.quantity <= 0) {
  		dialogManager.setDialogWithCountdown("I need to find more " + this.pluralName + "!");
  		return;
  	}
    if (this.quantity > 0) {
      this.quantity--;
      this.setDialogForQuanitity();
    }
    this.direction = dir;

    this.setPositionForDirection(dir, warriorAttack);

    this.life = this.baseLife;
  };

  this.superClassHitTest = this.hitTest;
  this.hitTest = function (wielder, adversary) {
    if (this.superClassHitTest(wielder, adversary)) {
      dialogManager.setDialogWithCountdown("Successful " + this.name + " hit on " + adversary.myName + "!");
    }
  };

  this.draw = function () {
    if (this.life > 0) {
      colorRect(this.x, this.y, this.width, this.length, this.color);
    }
  };

  // Check to see if projectile is inside collide-able tile
  this.checkCollision = function () {
    // Get the tile number in world
    let worldTileCheck = getTileIndexAtPixelCoord(this.x, this.y);

    // If not out of bounds
    if (worldTileCheck != undefined) {
      // Get the tile number in the index
      let tileIndexNum = roomGrid[ worldTileCheck ];
      // If the tile detected is NOT inside of the NO_COLLIDE list, reset
      if (!RANGED_NO_COLLIDE.includes(tileIndexNum)) {
        this.reset();
      }
    } else // reset if out of bounds
    {
      this.reset();
    }
  };

  this.setPositionForDirection = function (dir, warriorAttack) {
    if (dir == "north") {
      this.x = warriorAttack.x + 25;
      this.y = warriorAttack.y + 25;
    } else if (dir == "south") {
      this.x = warriorAttack.x + 5;
      this.y = warriorAttack.y + 25;
    } else if (dir == "west") {
      this.x = warriorAttack.x;
      this.y = warriorAttack.y + 30;
      console.log(this.x, this.y);
    } else if (dir == "east") {
      this.x = warriorAttack.x + 15;
      this.y = warriorAttack.y + 30;
    }
  };

  this.setDialogForQuanitity = function () {
    if (this.quantity > 1) {
      dialogManager.setDialogWithCountdown("I used " + this.indefiniteArticle + " " + this.name + ". I now have " + this.quantity + " " + this.pluralName + "!");
    } else if (this.quantity == 1) {
      dialogManager.setDialogWithCountdown("I used " + this.indefiniteArticle + " " + this.name + ". I now have only 1 " + this.name + " left.");
    } else if (this.quantity == 0) {
      dialogManager.setDialogWithCountdown("That was my last " + this.name + ". I need to find more!");
    }
  }
}
