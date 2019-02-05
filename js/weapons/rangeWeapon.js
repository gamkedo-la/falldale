
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
			thisEnemy.health = thisEnemy.health - 0.5;
			if(thisEnemy == goblin) {
				goblinHurtSound.play();
			} else if (thisEnemy == skeleton || thisEnemy == skeleton2) {
				skeletonHurtSound.play();
			} else if (thisEnemy == zombie || thisEnemy == zombie2) {
				zombieHurtSound.play();
			} else if (thisEnemy == bat1 || thisEnemy == bat2) {
				batHurtSound.play();
			}	
		}
	}
	
	this.setDamageUICountdown = function (seconds) {
		damageUIVisibilityCountdown = seconds * 30; // 30fps
	}
	
}
