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
                    dialog = "I'm Addy, there's no time to talk right now.  We are invaded by Goblins!";
                } else {
                    dialog = "Hi, I'm Addy.  Eventually, I'll have more to say.";
                }
            } else if (this.myName == "Dodd") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "I'm Dodd, we need to clear all the Goblins from the town!";
                } else {
                    dialog = "Hi, I'm Dodd.  Eventually, I'll have more to say.";
                }
            } else if (this.myName == "Taran") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "I'm Taran.  Now is not the best time to talk.  These Goblins are destroying the town!";
                } else {
                    dialog = "Hi, I'm Taran.  Eventually, I'll have more to say.";
                }
            } else if (this.myName == "Delkon") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "The name is Delkon.  I have 50 gold pieces I can give you if you clear the town of the Goblins!";
                    redWarrior.delkonRewardOffer = true;
                } else if (redWarrior.questOneComplete && redWarrior.delkonRewardOffer) {
                    redWarrior.gold = redWarrior.gold + 50;
                    dialog = "Thank you for clearing the town of those horrible beasts!  Please take this reward of 50 gold pieces";
                    redWarrior.delkonRewardOffer = false;
                }
            } else if (this.myName == "Princess") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "My town is being destroyed by these horrible Goblins.  Please do something!";
                } else {
                dialog = "Hi, I'm the Princess.  Eventually, I'll have more to say."
				}
            } else if (this.myName == "Gabriel") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "Please clear this town of all these Goblins!";
                } else {
                    dialog = "Hi, I'm Gabriel.  Eventually, I'll have more to say.";
                }
            } else if (this.myName == "Fenton") {
                if (redWarrior.questOneComplete == false) {
                    dialog = "I'm Fenton, our town is being overran by Goblins!  Please do something!";
                } else {
                    dialog = "Hi, I'm Fenton.  Eventually, I'll have more to say.";
                }
            } else if (this.myName == "Healer") {
                dialog = "Hi, I'm the Healer.  I could use a better name.";
                isAtHealer = true;
            } else if (this.myName == "Shop Keeper") {
                dialog = "Hi, I'm the Shop Keeper.  I could use a better name.";
                isInShop = true;
            } else if (this.myName == "Fido") {
                // alternately, we can choose a random one from the array
                // dialog = meows[Math.floor(Math.random()*meows.length)];

                //every 30 frames, switch to the next one and loop around
                meowcount++;
                dialog = meows[Math.floor(meowcount / meowframes) % meows.length];
                if (meowcount % meowframes == 1) meowPurrSound.play();
            }
            console.log(dialog);
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