const DRUID_SPEED = 0.6;

druidClass.prototype = new enemyClass();
function druidClass() {
    this.speed = DRUID_SPEED;
    this.maxhealth = 12;
    this.width = 50;
    this.height = 100;
    this.ticksPerFrame = 5;
	this.shadowXOffset = 4;
	this.shadowYOffset = 54;
	this.deadPic = deadGoblinPic;

	this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.timeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    }
	
    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(this.superClassIsOverlappingPoint()) {
            dialogManager.setDialogWithCountdown("Ouch! I've been bite by a Druid! That really hurts.", 5);
//            dialog = "Ouch! I've been bite by a Druid! That really hurts.";
            return true;
        }
        return false;
    }
}
