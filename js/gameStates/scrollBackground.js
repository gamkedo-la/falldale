function scrollBackgroundScreenInput(whichKeyCode){
	var gameKeeperFeedback = null;
	
	switch(whichKeyCode){
		
		case KEY_SPACEBAR:
		case ENTER:
		{
			scrollBackgroundScreen = false;
		} 		break;
		
		default:
			gameKeeperFeedback = "";
			break;
	} 
	
//	dialog = gameKeeperFeedback;
	dialogManager.setDialogWithCountdown(gameKeeperFeedback, 5);		
}

function drawScrollNarrative(){
	canvasContext.save();
	canvasContext.translate(stateScreenOffsetX, stateScreenOffsetY);
	canvasContext.drawImage(scrollBackgroundPic, 0, 0);
	colorText("Falldale", 350, 50, "white");
	colorText("To be written.... The story begins", 100, 300, "white");
	colorText("through our imaginations at Gamkedo", 100, 350, "white");
	canvasContext.restore();
}