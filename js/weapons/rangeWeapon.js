
function rangedWeaponClass(){
	this.rangedWeaponLife = 0;
	
	this.reset = function(weaponLifeTime) {
		this.rangedWeaponLife = weaponLifeTime;
	} 
	
	this.rollToDetermineIfHit = function() {
		this.setDamageUICountdown(3);
		this.toHitPoints = Math.floor(Math.random() * this.attackDice) + 1
	}
	
	this.rollForDamage = function(damageDice) {
		if(this.toHitPoints >= 10){
			this.toHitPoints = 0;
			this.damagePoints = Math.floor(Math.random() * damageDice) + 1
			displayDamagePoints = this.damagePoints;
			dialog = "Successful hit on "+ thisEnemy.myName+"!";
			thisEnemy.takeDamage(damagePoints);
		}
	}
	
	this.setDamageUICountdown = function (seconds) {
		damageUIVisibilityCountdown = seconds * 30; // 30fps
	}
	
}
