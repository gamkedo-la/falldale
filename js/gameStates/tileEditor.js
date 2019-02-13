///// Building the Tile Editor (WIP)

var tileSelected = -1;
var tileSelectedClicked = false;

function drawEditorMode() {
	dialog = "Now in Tile Editor Mode";
	//loadLevel(allGrass);
    drawRoom();
	var tileUnderMouseIndex = getTileIndexAtPixelCoord(mouseX, mouseY);
    var tileUnderMouseType = roomGrid[tileUnderMouseIndex];
	//roomGrid[tileUnderMouseIndex] = 18;
	if(tileSelectedClicked){ // mouse click
		tileSelected = roomGrid[tileUnderMouseIndex];
		console.log("Tile Selected: "+tileSelected);
		roomGrid[tileUnderMouseIndex] = roomGrid[tileSelected];
		tileSelectedClicked = false;
	}
	drawDialog()
}

function drawDialog() {
    colorRect(0, canvas.height - 50, canvas.width, 50, "red");
    colorRect(5, canvas.height - 45, canvas.width - 5, 40, "white");
	if (dialogUIVisibilityCountdown <= 0) {
		return;
	} else {	
		colorText(dialog, 20, canvas.height - 20, "Black");
	}
}

///// Use Up and Down to switch between tiles
function tileEditorInput(whichKeyCode){
	
	console.log(tileSelected);
	switch(whichKeyCode){
		case KEY_UP_ARROW:
		if(tileSelected != -1){
			roomGrid[tileSelected]++;
		}		
		break;
		case KEY_DOWN_ARROW:
		if(tileSelected != -1){
			roomGrid[tileSelected]--;
		}		
		break;
		case KEY_DOWN_ARROW:
		if(tileSelected != -1){
			roomGrid[tileSelected]--;
		}
		break;
		case KEY_LEFT_ARROW:
			console.log("Down Arrow");
		break;
		case KEY_RIGHT_ARROW:
			console.log("Up Arrow");
		break;
	}
	dialog = "Room Grid tile number: "+roomGrid[tileSelected];
	setDialogUICountdown(5);
	drawDialog();
}





///// Use Left and Right to switch within that section
///// Save tilemap for export