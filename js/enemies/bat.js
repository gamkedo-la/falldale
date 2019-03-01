const BAT_SPEED = 1.9;
const BAT_TIME_BETWEEN_CHANGE_DIR = 50;
const BAT_COLLISION_RADIUS = 5;
const BAT_RESTING_TIME = 850;

batClass.prototype = new enemyClass();


function batClass() {
    this.myName = "Bat";
    this.x = Math.random() * 600;
    this.y = Math.random() * 800;
    this.speed = BAT_SPEED;
    this.xv = 0;
    this.yv = 0;
    this.sx = 0;
    this.sy = 0;
    this.health = 2;
    this.maxhealth = 2;
    this.myBatPic; // which picture to use
    this.cyclesTilDirectionChange = 0;
    this.cyclesOfBatActive = 0;
    this.cyclesofBatResting = 200;
    this.batResting = false;
    this.alive = true;
    this.myBite = new biteClass();	    //
	this.myBite.baseBiteLife = 3;		//Bats bite, but only when they're not resting
	this.myBite.baseBiteCooldown = 3;	//
    this.displayHealth = false;
    this.batHealthCountdownSeconds = 5;
    this.batDisplayHealthCountdown = this.batHealthCountdownSeconds * 30;

    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 10;
    this.numberOfFrames = 5 || 1;

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.myBatPic = batPic;
        this.numberOfFrames = 4;
        this.width = 50;
        this.height = 21;
        this.cyclesOfBatResting = 0;
        this.cyclesTilDirectionChange = 0;
        this.health = 2;
    } // end of batReset func

    this.superclassMove = this.move;
    this.move = function() {
        if (this.alive) {
            if (this.batResting == false) {
                this.superclassMove(BAT_TIME_BETWEEN_CHANGE_DIR);
                this.cyclesOfBatActive++;		
                this.cyclesOfBatResting = 0;

                this.sx = 0;
                this.sy = 0;
                if (this.cyclesOfBatActive >= 300) {
                    this.batResting = true;
                }
            } else if (this.batResting == true) {
                this.cyclesOfBatActive = 0;
                this.cyclesOfBatResting++;		
                this.xv = 0;
                this.yv = 0;
                this.sx = 0;
                this.sy = 0;
                this.frameIndex = 0;
                if (this.cyclesOfBatResting >= 100) {
                    this.batResting = false;
                }
            }
        }
    }

	this.distributeTreasure = function(){
		var chanceOnTreasure = Math.round(Math.random() * 10);
		if(chanceOnTreasure >= 7){	
			console.log("Treasure Provided")		
			var randomTreasure = Math.round(Math.random() * 3);
			switch (randomTreasure) {
				case 0:
				// heart
				console.log("heart");
				break;
				case 1:
				// gold
				console.log("gold");
				break;
				case 2:
				// healing potion
				console.log("healing potion");
				break;
			}
		}
	}
	
	
    this.takeDamage = function(howMuch) {
        this.health -= howMuch;
        batHurtSound.play();
        this.displayHealth = true;
	}

    this.superClassIsOverlappingPoint = this.isOverlappingPoint;
    this.isOverlappingPoint = function() {
        if(!this.batResting) {//Bats don't bite when they're resting
            if(this.superClassIsOverlappingPoint()) {
				setDialogUICountdown(5);
                dialog = "Ouch! I've been bite by a bat.  Quick! I need some garlic.";
            }
        }
    }

    this.draw = function() {

        if (this.health > 0) {
            this.alive = true;
        } else {
            this.alive = false;
        }

        if (this.displayHealth && this.alive) {
            if (this.batDisplayHealthCountdown >=0) {
                colorRect(this.x, this.y - 16, 40, 12, "black");
                colorRect(this.x + 2, this.y - 14, 35, 8, "red");
                colorRect(this.x + 2, this.y - 14, (this.health / this.maxhealth) * 35, 8, "green");
                this.batDisplayHealthCountdown--;
            } else {
                this.batDisplayHealthCountdown = this.batHealthCountdownSeconds * 30;
                this.displayHealth = false;
            }
        }
        if (debugMode && this.alive) {
            colorText(this.myName, this.x, this.y - 20, "red");
            colorText("HP: " + this.health, this.x, this.y - 10, "red");

            colorRect(this.x, this.y, 5, 5, "red");
            colorRect(this.x, this.y + this.height, 5, 5, "red")
            colorRect(this.x + this.width, this.y, 5, 5, "red")
            colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
        }

        if (this.batResting == false) {
            this.tickCount++;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.numberOfFrames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        } // end of if Bat is Resting
        if (this.batResting == true) {
            this.frameIndex = 4;
        }
		
		if(gamePaused){
			this.frameIndex = 1;
		}
			
        if (this.alive) {
            this.sx = this.frameIndex * this.width;
            canvasContext.drawImage(shadowPic, this.x-this.width/2, this.y+this.height/2+8+16); // shadow a bit lower so it looks in midair
            canvasContext.drawImage(this.myBatPic, this.sx, this.sy, 50, this.height, this.x, this.y, 50, this.height);
        }
    }

    this.speedMultForTileType = function(tileType) {
        switch(tileType) {
            case TILE_YELLOW_DOOR:
            case TILE_GREEN_DOOR:
            case TILE_RED_DOOR:
            case TILE_BLUE_DOOR:
            case TILE_WALL:
                return 0;
            case TILE_TREE:
            case TILE_TREE2TOPHALF:
            case TILE_TREE2BOTTOMHALF:
            case TILE_TREE3TOPHALF:
            case TILE_TREE3BOTTOMHALF:
                return 0.5
            case TILE_WATER:
            case TILE_BRIDGE_LOWER:
            case TILE_ROAD:
            case TILE_GRASS:
                return 1;
            default:
                return this.speedMult;
        }
    }

    this.isPassableTile = function(aTile) {
        switch(aTile) {
            case TILE_WALL:
            case TILE_DOOR:
            case TILE_YELLOW_DOOR:
            case TILE_GREEN_DOOR:
            case TILE_BLUE_DOOR:
            case TILE_RED_DOOR:
            case TILE_CABINET:
            case TILE_BED:
            case TILE_SHOP_1:
            case TILE_SHOP_2:
            case TILE_SHOP_3:
            case TILE_SHOP_4:
            case TILE_SHOP_6:
            case TILE_SHOP_7:
            case TILE_SHOP_8:
            case TILE_SHOP_9:
            case TILE_SHOP_A:
            case TILE_ROOF_FRONTRIGHT:
            case TILE_ROOF_SIDERIGHT:
            case TILE_ROOF_BACKRIGHT:
            case TILE_FRONTWALL_WINDOW:
            case TILE_FRONTWALL_SOLID:
            case TILE_FRONTDOOR_YELLOW:
            case TILE_ROOF_BACKSIDE:
            case TILE_ROOF_BACKLEFT:
            case TILE_ROOF_LEFTSIDE:
            case TILE_ROOF_FRONTLEFT:
            case TILE_ROOF_FRONT:
            case TILE_ROOF_CENTER:
            case TILE_HEALER_BW:
            case TILE_HEALER_BW_CABINET_POTIONS:
            case TILE_HEALER_BW_CABINET_LH:
            case TILE_HEALER_BW_CABINET_EMPTY:
            case TILE_HEALER_BW_LS:
            case TILE_HEALER_BW_RS:
            case TILE_HEALER_DESK:
            case TILE_HEALER_FRONTDOOR:
            case TILE_HEALER_FW_LS:
            case TILE_HEALER_FW_WINDOW:
            case TILE_HEALER_LW:
            case TILE_HEALER_RW:
            case TILE_HEALER_FW_RS:
            case TILE_BS_BW:
            case TILE_BS_BW_CABINET_POTIONS:
            case TILE_BS_BW_CABINET_EMPTY:
            case TILE_BS_BW_LS:
            case TILE_BS_BW_RS:
            case TILE_BS_DESK:
            case TILE_BS_BW_WEAPONSRACK:
            case TILE_BS_BW_WEAPONSRACKBOTTOM:
            case TILE_BS_FW_LS:
            case TILE_BS_LW:	
            case TILE_BS_FW_RS:
            case TILE_HOUSE_FRONT_WALL:
            case TILE_HOUSE_FRONT_WALL_DAMAGED:
            case TILE_HOUSE_FRONT_WALL_BROKEN:
            case TILE_HOUSE_FRONT_WINDOW:
            case TILE_HOUSE_FRONT_WINDOW_BROKEN:
            case TILE_HOUSE_FW_RS:
            case TILE_HOUSE_FW_LS:
            case TILE_HOUSE_BW:
            case TILE_HOUSE_BW_LS:
            case TILE_HOUSE_BW_RS:
            case TILE_HOUSE_BW_WINDOW:
            case TILE_HOUSE_LS_BED_TOP:
            case TILE_HOUSE_LS_BED_BOTTOM:
            case TILE_HOUSE_DRESSER_TOP:
            case TILE_HOUSE_DRESSER_BOTTOM:
            case TILE_BAR_CABINET:
            case TILE_BAR:
            case TILE_BAR_TOP:
            case TILE_CHAIR:
            case TILE_MAUSOLEUM_TL:
            case TILE_MAUSOLEUM_TM:
            case TILE_MAUSOLEUM_TR:
            case TILE_MAUSOLEUM_ML:
            case TILE_MAUSOLEUM_MM:
            case TILE_MAUSOLEUM_MR:
            case TILE_MAUSOLEUM_BL:
            case TILE_MAUSOLEUM_BM:
            case TILE_MAUSOLEUM_BR:
                return false;
            case TILE_PLAYERSTART:
            case TILE_ROAD:
            case TILE_FINISH:
            case TILE_GRASS:
            case TILE_WATER:
            case TILE_GRAVE:
            case TILE_FRESH_GRAVE:
            case TILE_ALTER:
            case TILE_FOUNTAIN:
            case TILE_GRAVE_YARD_PORTAL:
            case TILE_HOME_VILLAGE_PORTAL:
            case TILE_SPIKES:
            case TILE_SPIKES_BLOODY:
            case TILE_ARROWS:
            case TILE_THROWINGROCKS:
            case TILE_KEY:
            case TILE_YELLOW_KEY:
            case TILE_GREEN_KEY:
            case TILE_BLUE_KEY:
            case TILE_RED_KEY:
            case TILE_TREASURE:
            case TILE_MAP:
            case TILE_SKELETON:
            case TILE_GOBLIN:
            case TILE_BAT:
            case TILE_ZOMBIE:
            case TILE_ZOMBIE2:
            case TILE_ZOMBIE3:
            case TILE_GREEN_ORC_SWORD:
            case TILE_GREEN_ORC_CLUB:
            case TILE_GREEN_ORC_AX:
            case TILE_ARCHER:
            case TILE_SHOPKEEPER:
            case TILE_HEALER:
            case TILE_PRINCESS:
            case TILE_DODD:
            case TILE_TARAN:
            case TILE_DELKON:
            case TILE_ADDY:
            case TILE_GABRIEL:
            case TILE_FENTON:
            case TILE_TREE:
            case TILE_TREE2TOPHALF:
            case TILE_TREE2BOTTOMHALF:
            case TILE_TREE3TOPHALF:
            case TILE_TREE3BOTTOMHALF:
            case TILE_BRIDGE_UPPER:
            case TILE_BRIDGE_LOWER:
            case TILE_GRAVEYARD_FENCE_LEFT:
            case TILE_GRAVEYARD_FENCE_RIGHT:
            case TILE_GRAVEYARD_FENCE:
            case TILE_GRAVE_1:
            case TILE_GRAVE_2:
            case TILE_GRAVE_3:
            case TILE_GRAVE_4:
                return true;
            default:
                return true;
        }
    }
}

function movingWrapPositionClass() {

    this.handleScreenWrap = function() {
        if ((this.x < 0) || (this.x > canvas.width)) {
            this.x -= this.xv;
        }
        if ((this.y < 0) || (this.y > canvas.height)) {
            this.y -= this.yv;
        }
    }

    this.move = function() {
        this.x += this.xv;
        this.y += this.yv;
        this.handleScreenWrap();
    }
}