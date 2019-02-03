///// Building the Tile Editor (WIP)

///// turn on tile editor - done ////////////////////
///// draw the entire map - done ////////////////////
function drawEditorMood() {
    dialog = "Now in Tile Editor Mode";
	loadLevel(allGrass);
    drawRoom();

    updateDialog();
}

///// determine where mouse is and identify tile under the mouse - done /////////////////////
function mouseMovement() { //// this should move to Input.js
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        var tileUnderMouse = getTileTypeAtPixelCoord(mouseX, mouseY);
        var tileUnderMouseType = roomGrid[tileUnderMouse];
        console.log(tileUnderMouseType);
		
    });
}

function calculateMousePos(evt) { //// this should move to Input.js
    var rect = canvas.getBoundingClientRect(),
        root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function updateDialog() {
    colorRect(0, canvas.height - 50, canvas.width, 50, "red");
    colorRect(5, canvas.height - 45, canvas.width - 5, 40, "white");
    colorText(dialog, 20, canvas.height - 20, "Black");
}



///// make tile selectable
///// Use Up and Down to switch between tiles
///// Use Left and Right to switch within that section
///// Save tilemap for export