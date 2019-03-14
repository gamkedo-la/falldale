const NPC_SPEED = 0.5;

npcClass.prototype = new enemyClass();

function npcClass(npcName, npcPic) {
    this.speed = NPC_SPEED;
    this.myNPCPic = npcPic; // which picture to use
    this.myName = "Untitled character";
    this.myName = npcName;

    this.tickCount = 0;
    this.frameIndex = 0;
    this.width = 50;
    this.numberOfFrames = 4;
    this.height = 50;
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
    }

    var meows = ['meow', 'meOOOWW!', 'purr', 'me-roww', 'purrrrrrrr', 'mmmmyow', 'mowmow', 'mew', 'mew mew', 'HISS!', 'meow', 'meeeeeow', 'me. ow.', 'me? ow!', 'mew meow purr', 'purr meow!', 'meow?', 'MEOW?', 'MEOW?!?!', 'meow!', 'meROWE', 'purr purr', 'purr purr purr'];
    var meowframes = 90;
    var meowcount = 0;

    this.isOverlappingPoint = function(testX, testY) { // textX is redWarrior.x and testY is redWarrior.y
        var dialogcount = 0;
        //test if redWarrior is inside box of NPC

        if (this.x < testX && (this.x + this.width) > testX && this.y < testY && (this.y + this.height) > testY) {
            setDialogUICountdown(5);
            if (this.myName == "Addy") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Addy:  I'm Addy, there's no time to talk right now.  We are invaded by Goblins!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Addy:  Thank you for saving Falldale!";
                }
            } else if (this.myName == "Dodd") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Dodd:  I'm Dodd, we need to clear all the Goblins from the town!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Dodd:  We are in debt to you for saving our town.";
                }
            } else if (this.myName == "Taran") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Taran:  I'm Taran.  Now is not the best time to talk.  These Goblins are destroying the town!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Taran:  You are such a brave individual!";
                }
            } else if (this.myName == "Delkon") {
				console.log(redWarrior.questOneComplete, redWarrior.delkonRewardOffer);
                if (redWarrior.questOneComplete == false) {
                    dialog = "The name is Delkon.  I have 50 gold pieces I can give you if you clear the town of the Goblins!";
                    redWarrior.delkonRewardOffer = true;
                } else if (redWarrior.questOneComplete && redWarrior.delkonRewardOffer) {
                    redWarrior.goldpieces = redWarrior.goldpieces + 50;
                    dialog = "Thank you for clearing the town of those horrible beasts!  Please take this reward of 50 gold pieces";
                    redWarrior.delkonRewardOffer = false;
                } else if (redWarrior.questOneComplete) {
					 dialog = "Thank you for clearing the town of those horrible beasts!";
				}
            } else if (this.myName == "Princess") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Princess:  My town is being destroyed by these horrible Goblins.  Please do something!";
                } else if (redWarrior.questOneComplete) {
					dialog = "Princess:  I am incredible grateful for you saving our town of Falldale.  These Goblin attacks have been happening more often of late."
				}
			} else if (this.myName == "Gabriel") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Gabriel:  Please clear this town of all these Goblins!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Gabriel:  Sorry we couldn't talk earlier.  My name is Gabriel, I am grateful you saved our town.  These Goblins have been attacking us a lot lately.";
                }
            } else if (this.myName == "Fenton") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Fenton:  I'm Fenton, our town is being overran by Goblins!  Please do something!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Fenton:  Thank you for saving our town!";
                }
            } else if (this.myName == "Healer") {
                dialog = "Healer:  Hi, I'm the Healer.  I could use a better name.";
                isAtHealer = true;
            } else if (this.myName == "Shop Keeper") {
                dialog = "Healer:  Hi, I'm the Shop Keeper.  I could use a better name.";
                isInShop = true;
			} else if (this.myName == "Fenton") {
				if (redWarrior.questOneComplete == false) {
					dialog = "Fenton:  I'm Fenton, our town is being overran by Goblins!  Please do something!";
				} else if (redWarrior.questOneComplete) {
					dialog = "Fenton:  Thank you for saving our town!";
				}
			} else if (this.myName == "Arya") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Arya:  I'm Arya, our town is being overran by Goblins!  Please do something!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Arya:  Thank you for saving our town!";
                }
			} else if (this.myName == "Lawrence") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Lawrence:  I'm Lawrence, our town is being overran by Goblins!  Please do something!  I'm to scared and going to stay here in the bar.";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Lawrence:  Thank you for saving our town!";
                }
			} else if (this.myName == "Rowan") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Rowan:  I'm Rowan, our town is being overran by Goblins!  Please do something!";
                } else if (redWarrior.questOneComplete) {
                    dialog = "Rowan:  Thank you for saving our town!";
                }
			} else if (this.myName == "Fido") {
                // alternately, we can choose a random one from the array
                // dialog = meows[Math.floor(Math.random()*meows.length)];

                //every 30 frames, switch to the next one and loop around
                meowcount++;
                dialog = meows[Math.floor(meowcount / meowframes) % meows.length];
                if (meowcount % meowframes == 1) meowPurrSound.play();
            }
        } 
	}

        this.draw = function() {

            if (this.npcMove) {
                if (this.myNPCPic.width >= (this.width * this.numberOfFrames)) {
                    this.tickCount++; // this makes spritesheet animation work
                } else {
                    // unfinished artwork, stay at frame 0 forever
                    // and just slide aroun for now
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
            this.sy = 0;

            if (gamePaused == false) {
                this.sx = this.frameIndex * this.width;
            }

            canvasContext.drawImage(shadowPic, this.x - 20, this.y + 32);
            canvasContext.drawImage(this.myNPCPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
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