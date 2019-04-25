shoeClass.prototype = new rangedWeaponClass();

function shoeClass() {
  this.name = "shoe";
  this.pluralName = "shoes";
  this.baseDamage = 0.3;
  this.quantity = 2;
  this.color = "black";
}
