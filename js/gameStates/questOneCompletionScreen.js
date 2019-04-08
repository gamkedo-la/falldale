function questOneCompletionScreenInput(whichKeyCode){
	var gameKeeperFeedback = null;
	
	switch(whichKeyCode){
		
		case KEY_SPACEBAR:
		case ENTER:
		{
			console.log("enter");
			questOneCompletionScreen = false;
			gamePaused = false;
		} 		break;
		
		default:
			gameKeeperFeedback = "";
			break;
	} 
	
//	dialog = gameKeeperFeedback;
	dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);		
}

function drawQuestOneCompletionScreen(){
	canvasContext.save();
	canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
	canvasContext.drawImage(scrollBackgroundPic, 0, 0);
	colorText("Quest One is Complete", 350, 50, "white");
	colorText("To be written....", 100, 300, "white");
	colorText("Press ENTER", 100, 400, "white");
	canvasContext.restore();
}