const ORCBOSS_SPEED = 0.6;

orcBossClass.prototype = new enemyClass();
function orcBossClass() {
    this.speed = ORC_SPEED;
    this.maxhealth = 100;
    this.width = 50;
    this.height = 100;
    this.ticksPerFrame = 5;
	this.faceNorthMul = 1;
	this.faceSouthMul = 0;
	this.shadowOffsetX = 4;
	this.shadowOffsetY = 54;
	this.deadPic = deadGoblinPic;
	
	this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    }

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
            dialogManager.setDialogWithCountdown("Ouch! I've been bite by a OrcBoss! That really hurts.", 5);
//            dialog = "Ouch! I've been bite by a OrcBoss! That really hurts.";
        }
    }
}
