///// Building the Tile Editor (WIP)

var tileSelected = -1;

///// turn on tile editor - done ////////////////////
///// draw the entire map - done ////////////////////
function drawEditorMode() {
    dialog = "Now in Tile Editor Mode";
	//loadLevel(allGrass);
    drawRoom();
	var tileUnderMouseIndex = getTileIndexAtPixelCoord(mouseX, mouseY);
    var tileUnderMouseType = roomGrid[tileUnderMouseIndex];
	//roomGrid[tileUnderMouseIndex] = 18;
	console.log(tileUnderMouseType);
	drawDialog();
}

///// determine where mouse is and identify tile under the mouse - done /////////////////////

function calculateMousePos(evt) { //// this will move to Input.js
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function drawDialog() {
    colorRect(0, canvas.height - 50, canvas.width, 50, "red");
    colorRect(5, canvas.height - 45, canvas.width - 5, 40, "white");
    colorText(dialog, 20, canvas.height - 20, "Black");
}

function tileEditorInput(whichKeyCode){
	console.log("editorInput");
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
	}
}

///// make tile selectable
///// Use Up and Down to switch between tiles
///// Use Left and Right to switch within that section
///// Save tilemap for export