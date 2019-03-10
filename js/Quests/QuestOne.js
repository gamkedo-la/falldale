var goblinsKilledInFallDale = 0;

function countGoblinforQuestOne(){
	if(redWarrior.questOneComplete == false){ 
		if (levelNow == 0) { // located in Falldale
			goblinsKilledInFallDale++;
			console.log(goblinsKilledInFallDale);
			checkForQuestOneComplete();
		}
	}
}

function checkForQuestOneComplete(){
	if(goblinsKilledInFallDale >= 2){
		redWarrior.questOneComplete = true;
		dialog = "I have vanquest all the Goblins from Falldale!";
	}
	
}