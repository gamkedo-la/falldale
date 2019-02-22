///// Building the Tile Editor (WIP)

var tileSelected = -1;
var tileSelectedClicked = false;
var tiletypeSelected = -1;
var isDisplayRoomGridOn = false;

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
		//roomGrid[tileUnderMouseIndex] = tileSelected;
	}
	drawDialog();
	if(isDisplayRoomGridOn){
		displayRoomGrid();
	}
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
	switch(whichKeyCode){
		case KEY_UP_ARROW:
			if(tileTypeSelected != -1){
				if(roomGrid[tileSelected] < 128){  // need to write code not to have a hard number of 74 for roomGrid's length
					do {
						roomGrid[tileSelected]++;						
					} while(typeof(worldPics[roomGrid[tileSelected]]) == "undefined");
				}
			}		
		break;
		case KEY_DOWN_ARROW:
			if(tileTypeSelected != -1){
				if(roomGrid[tileSelected] > 0){
					do {
						roomGrid[tileSelected]--;
					} while(typeof(worldPics[roomGrid[tileSelected]]) == "undefined");
				}
			}		
		break;
		case KEY_LEFT_ARROW:
			console.log("Left Arrow");
		break;
		case KEY_RIGHT_ARROW:
			console.log("Right Arrow");
		break;
		
		case KEY_SPACEBAR:
		// the 2nd parameter is a MIME type code, not the file extension,
		// which is set to text not .js to avoid browser warnings	
		downloadString("var levelOne = ["+roomGrid+"];", "text/plain", "updatedRoomGrid.txt"); 
			
		break;
	}
	setDialogUICountdown(5);
	drawDialog();
}

function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}





///// Use Left and Right to switch within that section
///// Save tilemap for export
