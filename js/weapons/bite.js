const BITE_LIFE = 10;
const BITE_COOLDOWN = 5;
//All enemies can bite, it's a natural weapon
biteClass.prototype = new weaponClass();
function biteClass() {
    this.damageDice = 4; // 6 Sided Dice
	this.damagePoints = 4;
    
    this.life = 0;
    this.baseBiteLife = BITE_LIFE;
    this.coolDownTime = 0;
    this.baseBiteCooldown = BITE_COOLDOWN;

    this.shootFrom = function(weilder) {
		this.x = weilder.x;
		this.y = weilder.y;
        
		this.life = this.baseBiteLife;
        this.coolDownTime = this.baseBiteCooldown;
	}
}