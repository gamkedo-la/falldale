///// Building the Tile Editor (WIP)

var tileSelected = -1;
var tileSelectedClicked = false;
var tiletypeSelected = -1;

function drawEditorMode() {
	//loadLevel(allGrass);
    drawRoom();
	var tileUnderMouseIndex = getTileIndexAtPixelCoord(mouseX, mouseY);
    var tileUnderMouseType = roomGrid[tileUnderMouseIndex];
	//roomGrid[tileUnderMouseIndex] = 18;
	if(tileSelectedClicked){ // mouse click
		tileTypeSelected = roomGrid[tileUnderMouseIndex];
		tileSelected = tileUnderMouseIndex; 
		//roomGrid[tileUnderMouseIndex] = roomGrid[tileTypeSelected];
		tileSelectedClicked = false;
		console.log("Tile Selected After clicking: "+tileTypeSelected);
		console.log("Room Grid Index Number: "+tileSelected);
		roomGrid[tileUnderMouseIndex] = tileSelected;
	}
	drawDialog()
}

function drawDialog() {
    colorRect(0, canvas.height - 50, canvas.width, 50, "red");
    colorRect(5, canvas.height - 45, canvas.width - 5, 40, "white");
	if(dialog != null){
		if (dialogUIVisibilityCountdown <= 0) {
			return;
		} else {	
			colorText(dialog, 20, canvas.height - 20, "Black");
		}
	}
		}

///// Use Up and Down to switch between tiles
function tileEditorInput(whichKeyCode){
	
	console.log("Prior to input: "+roomGrid[tileTypeSelected]);
	switch(whichKeyCode){
		case KEY_UP_ARROW:
		if(tileTypeSelected != -1){
			console.log(roomGrid[tileTypeSelected]);
			if(roomGrid[tileTypeSelected] < 74){  // need to write code not to have a hard number of 74 for roomGrid's length
				roomGrid[tileTypeSelected]++;
			}
		}		
		break;
		case KEY_DOWN_ARROW:
		if(tileTypeSelected != -1){
			if(roomGrid[tileTypeSelected] > 0){
				roomGrid[tileTypeSelected]--;
			}
		}		
		break;
		case KEY_LEFT_ARROW:
			console.log("Left Arrow");
		break;
		case KEY_RIGHT_ARROW:
			console.log("Right Arrow");
		break;
	}
	console.log("After input: " +roomGrid[tileTypeSelected]);
	dialog = "Room Grid tile number: "+roomGrid[tileTypeSelected];
	
	setDialogUICountdown(5);
	drawDialog();
}





///// Use Left and Right to switch within that section
///// Save tilemap for export