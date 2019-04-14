var characters = ['theWarrior', 'Biggy', 'Smally', 'Teeny', 'Weeny'];
var characterSelectedIndex = 0;;
var characterSelected = characters[characterSelectedIndex];


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
    switch(whichKeyCode){
        case KEY_UP_ARROW:
			console.log(characterSelectedIndex)
            characterSelectedIndex++; // go to next item in array
            if (characterSelectedIndex>=characters.length){ 
                characterSelectedIndex = 0; // wrap around
				characterSelected = characters[characterSelectedIndex];
				console.log(characterSelected);
            }
        break;
		case KEY_DOWN_ARROW:
			console.log(characterSelectedIndex)
            characterSelectedIndex--; // go to next item in array
            if (characterSelectedIndex <= 0){ 
                characterSelectedIndex = characters.length; // wrap around
				characterSelected = characters[characterSelectedIndex];
				console.log(characterSelected);
            }
		break;
		case KEY_SPACEBAR:
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