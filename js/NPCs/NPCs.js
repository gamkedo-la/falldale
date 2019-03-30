const NPC_SPEED = 0.5;

npcClass.prototype = new enemyClass();

function npcClass(npcName, npcPic) {
    this.speed = NPC_SPEED;
    this.myNPCPic = npcPic; // which picture to use
    this.myName = "Untitled character";
    this.myName = npcName;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 36;
    this.numberOfFrames = 6;
    this.height = 52;
    this.ticksPerFrame = 5;
    this.npcMove = true;
    this.npcTimeBetweenChangeDir = 100;

    this.superClassReset = this.reset;
    this.reset = function(resetX, resetY) {
        this.superClassReset(resetX, resetY);
        this.myNPCPic = npcPic;
        this.npcTimeBetweenChangeDir = Math.floor(Math.random() * 1000) + 1;
    }

    this.superClassMove = this.move;
    this.move = function() {
        this.superClassMove(this.npcTimeBetweenChangeDir);

        if (this.walkNorth) {
            this.sy = this.height;
        }

        if (this.walkSouth) {
            this.sy = 0;
        }
        if (this.walkWest) {
            this.sy = this.height * 3;
        }
        if (this.walkEast) {
            this.sy = this.height * 2;
        }
		if (this.npcMove == false) {
			this.sy = this.height * 4;
		}
    }

    var meows = ['meow', 'meOOOWW!', 'purr', 'me-roww', 'purrrrrrrr', 'mmmmyow', 'mowmow', 'mew', 'mew mew', 'HISS!', 'meow', 'meeeeeow', 'me. ow.', 'me? ow!', 'mew meow purr', 'purr meow!', 'meow?', 'MEOW?', 'MEOW?!?!', 'meow!', 'meROWE', 'purr purr', 'purr purr purr'];
    var meowframes = 90;
    var meowcount = 0;

    this.isOverlappingPoint = function(testX, testY) { // textX is redWarrior.x and testY is redWarrior.y
        var dialogcount = 0;
        //test if redWarrior is inside box of NPC
        let NPCDialog = "";

        if (this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY) {
            if (this.myName == "Addy") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Addy:  I'm Addy, there's no time to talk right now.  We are invaded by Goblins!";
					humanMaleHello.play();
                } else if (redWarrior.questOneComplete) {
                    NPCDialog = "Addy:  Thank you for saving Falldale!";		
					humanMaleHello.play();
                }
            } else if (this.myName == "Dodd") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Dodd:  I'm Dodd, we need to clear all the Goblins from the town!";
					humanMaleHi.play();
                } else if (redWarrior.questOneComplete) {
                    NPCDialog = "Dodd:  We are in debt to you for saving our town.";
					humanMaleHi.play();
				}
            } else if (this.myName == "Taran") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Taran:  I'm Taran.  Now is not the best time to talk.  These Goblins are destroying the town!";
					humanMaleGoodDay.play();
				} else if (redWarrior.questOneComplete) {
                    NPCDialog = "Taran:  You are such a brave individual!";
					humanMaleGoodDay.play();
                }
            } else if (this.myName == "Delkon") {
				console.log(redWarrior.questOneComplete, redWarrior.delkonRewardOffer);
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "The name is Delkon.  I have 50 gold pieces I can give you if you clear the town of the Goblins!";
                    redWarrior.delkonRewardOffer = true;
					humanMaleHi4.play();
                } else if (redWarrior.questOneComplete && redWarrior.delkonRewardOffer) {
                    redWarrior.goldpieces = redWarrior.goldpieces + 50;
                    NPCDialog = "Thank you for clearing the town of those horrible beasts!  Please take this reward of 50 gold pieces";
                    redWarrior.delkonRewardOffer = false;
					humanMaleHi4.play();
                } else if (redWarrior.questOneComplete) {
					 NPCDialog = "Thank you for clearing the town of those horrible beasts!";
					 humanMaleHi4.play();
				}
            } else if (this.myName == "Princess") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Princess:  My town is being destroyed by these horrible Goblins.  Please do something!";
                } else if (redWarrior.questOneComplete) {
					NPCDialog = "Princess:  I am incredible grateful for you saving our town of Falldale.  These Goblin attacks have been happening more often of late."
				}
			} else if (this.myName == "Gabriel") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Gabriel:  Please clear this town of all these Goblins!";
					humanMaleGoodAfternoon.play();
				} else if (redWarrior.questOneComplete) {
                    NPCDialog = "Gabriel:  Sorry we couldn't talk earlier.  My name is Gabriel, I am grateful you saved our town.  These Goblins have been attacking us a lot lately.";
					humanMaleGoodAfternoon.play();
				}
            } else if (this.myName == "Fenton") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Fenton:  I'm Fenton, our town is being overran by Goblins!  Please do something!";
					humanMaleWelcome.play();
                } else if (redWarrior.questOneComplete) {
                    NPCDialog = "Fenton:  Thank you for saving our town!";
					humanMaleWelcome.play();
                }
            } else if (this.myName == "Healer") {
                NPCDialog = "Healer:  Hi, I'm the Healer.  I could use a better name.";
                isAtHealer = true;
				humanMaleHi2.play();
            } else if (this.myName == "Shop Keeper") {
                NPCDialog = "Healer:  Hi, I'm the Shop Keeper.  I could use a better name.";
                isInShop = true;
				humanMaleHi3.play();
			} else if (this.myName == "Fenton") {
				if (redWarrior.questOneComplete == false) {
					NPCDialog = "Fenton:  I'm Fenton, our town is being overran by Goblins!  Please do something!";
					humanMaleHi4.play();
				} else if (redWarrior.questOneComplete) {
					NPCDialog = "Fenton:  Thank you for saving our town!";
					humanMaleHi4.play();
				}
			} else if (this.myName == "Arya") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Arya:  I'm Arya, our town is being overran by Goblins!  Please do something!";
					humanFemaleHello.play();
                } else if (redWarrior.questOneComplete) {
                    NPCDialog = "Arya:  Thank you for saving our town!";
					humanFemaleHello.play();
                }
			} else if (this.myName == "Lawrence") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Lawrence:  I'm Lawrence, our town is being overran by Goblins!  Please do something!  I'm to scared and going to stay here in the bar.";
					humanMaleHi2.play();
                } else if (redWarrior.questOneComplete) {
                    NPCDialog = "Lawrence:  Thank you for saving our town!";
					humanMaleHi2.play();
                }
			} else if (this.myName == "Rowan") {
                if (redWarrior.questOneComplete == false) {
                    NPCDialog = "Rowan:  I'm Rowan, our town is being overran by Goblins!  Please do something!";
					humanFemaleHi.play();
                } else if (redWarrior.questOneComplete) {
                    NPCDialog = "Rowan:  Thank you for saving our town!";
					humanFemaleHi.play();
                }
			} else if (this.myName == "Fido") {
                // alternately, we can choose a random one from the array
                // NPCDialog = meows[Math.floor(Math.random()*meows.length)];

                //every 30 frames, switch to the next one and loop around
                meowcount++;
                NPCDialog = meows[Math.floor(meowcount / meowframes) % meows.length];
                if (meowcount % meowframes == 1) meowPurrSound.play();
            }
        } 

        if(NPCDialog != "") {
            dialogManager.setDialogWithCountdown(NPCDialog, 5);
        }
	}

        this.draw = function() {

            if (this.npcMove) {
                if (this.myNPCPic.width >= (this.width * this.numberOfFrames)) {
                    this.tickCount++; // this makes spritesheet animation work
                } else {
                    // unfinished artwork, stay at frame 0 forever
                    // and just slide around for now
                }
            }

            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex < this.numberOfFrames - 1) {
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }

            this.sx = 0;

            if (gamePaused == false) {
                this.sx = this.frameIndex * this.width;
            }

            canvasContext.drawImage(shadowPic, this.x - 16, this.y + 32);
            
			// temp fix for "Fido"
			
			if(this.name == "Fido"){
				this.width = 50;
			}
			
            // draw a mirror image when walking other way? use row 2
            if (this.spriteSheetRows && (this.walkEast || this.walkNorth)) { 
                canvasContext.drawImage(this.myNPCPic, this.sx, this.sy+this.height, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);
            } else { 
                // normal drawing, never flipped, used by nearly all entities
                canvasContext.drawImage(this.myNPCPic, this.sx, this.sy, this.width, this.height, Math.round(this.x), Math.round(this.y), this.width, this.height);
            }
            
            if (debugMode) {
                colorText(this.myName, this.x, this.y - 20, "red");
                colorText("HP: " + this.health, this.x, this.y - 10, "red");

                colorRect(this.x, this.y, 5, 5, "red")
                colorRect(this.x, this.y + this.height, 5, 5, "red")
                colorRect(this.x + this.width, this.y, 5, 5, "red")
                colorRect(this.x + this.width, this.y + this.height, 5, 5, "red")
            }
        }
    }