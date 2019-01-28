function scrollBackgroundScreenInput(whichKeyCode){
	var gameKeeperFeedback = null;
	
	switch(whichKeyCode){
		
		case KEY_SPACEBAR: 
		{
			scrollBackgroundScreen = false;
		} 		break;
		
		default:
			gameKeeperFeedback = "";
			break;
	} 
	
	dialog = gameKeeperFeedback;				
}

function drawScrollNarrative(){
	colorText("Falldale", 350, 50, "white");
	colorText("To be written.... The story begins", 100, 300, "white");
	colorText("through our imaginations at Gamkedo", 100, 350, "white");
}