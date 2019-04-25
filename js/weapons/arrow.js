const ARROW_LIFE = 100;
const ARROW_SPEED = 1.0;
const ARROW_DAMAGE = 0.5;
//var arrowDead = false;

arrowClass.prototype = new rangedWeaponClass();

function arrowClass(arrowDirection) {
  this.name = "arrow";
  this.pluralName = "arrows";
  this.indefiniteArticle = "an";
  this.baseDamage = ARROW_DAMAGE;
  this.quantity = 5;
  this.direction = arrowDirection; //  arrow's direction is initialized to the direction global variable instead of blank
  this.color = "orange";
}
