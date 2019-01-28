///// Building the Tile Editor (WIP)

///// turn on tile editor
///// draw the entire map
function drawEditorMood(){
	dialog = "Now in Text Mode";
	
	colorRect(0,0, canvas.width, canvas.height, "black");
	colorRect(0,canvas.height-50, canvas.width, 50, "red");
	colorRect(5,canvas.height-45, canvas.width-5, 40, "white");
	colorText( dialog, 20, canvas.height-20, "Black");
}



///// determine where mouse is
///// make tile selectable
///// Use Up and Down to switch between tiles
///// Use Left and Right to switch within that section
///// Save tilemap for export



