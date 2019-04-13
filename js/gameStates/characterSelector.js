var characters = ['theWarrior', 'Biggy', 'Smally', 'Teeny', 'Weeny'];
var characterSelected = characters[0];


function drawSelectorScreen(){
	
    canvasContext.save();
    canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
	canvasContext.drawImage(storeFrontPic, 0,0);  // replace with a Creation Screen background
	drawTextWithShadowCentered(gameKeeperFeedback , 0.60 * canvas.width, 50, "white", "45px sans-serif");
	colorText("Character Creation" , 25, 50, "white");
	colorText('Press "Up" and "Down" to Choose' , 25, 70, "white");
	colorText(characterSelected, 25, 90,"red");
	colorText('Press "Enter" to continue', 25, 230, "white");
	canvasContext.restore();
}


function characterSelectorScreenInput(whichKeyCode){
	var character = 0;
	switch(whichKeyCode){
		
		case KEY_SPACEBAR:
		
		break;

		case KEY_UP_ARROW:
			if(character < character.length){
				character++;
				characterSelected = characters[character];
				console.log(characterSelected);
			}
		break;
		
		case KEY_DOWN_ARROW:
			if(character >= 0){
				character--;
				characterSelected = characters[character];
				console.log(characterSelected);
			}
		break;

		case ENTER:
		if (ready)
		{
			characterSelectionScreen = false;
			scrollBackgroundScreen = true;

			gameKeeperFeedback = "Have you chosen wisely?";
		}

		default:
			gameKeeperFeedback = "";
			break;
	} 
	dialogManager.setDialogWithCountdown(gameKeeperFeedback, 40);
}