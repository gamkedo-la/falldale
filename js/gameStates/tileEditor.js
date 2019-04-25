///// Building the Tile Editor (WIP)

var tileSelected = -1;
var tileSelectedClicked = false;
var tiletypeSelected = -1;
var isDisplayRoomGridOn = false;

function drawEditorMode() {
  //loadLevel(allGrass);
  drawRoom(true, true);
  var tileUnderMouseIndex = getTileIndexAtPixelCoord(mouseX, mouseY);
  var tileUnderMouseType = roomGrid[ tileUnderMouseIndex ];
  //roomGrid[tileUnderMouseIndex] = 18;
  if (tileSelectedClicked) { // mouse click
    tileTypeSelected = roomGrid[ tileUnderMouseIndex ];
    tileSelected = tileUnderMouseIndex;
    //roomGrid[tileUnderMouseIndex] = roomGrid[tileTypeSelected];
    tileSelectedClicked = false;
    console.log("Tile Selected After clicking: " + tileTypeSelected);
    console.log("Room Grid Index Number: " + tileSelected);
    //roomGrid[tileUnderMouseIndex] = tileSelected;
  }
  drawDialog();
  if (isDisplayRoomGridOn) {
    displayRoomGrid();
  }
}

function drawDialog() {
  colorRect(0, canvas.height - 50, canvas.width, 50, "red");
  colorRect(5, canvas.height - 45, canvas.width - 5, 40, "white");
  if (dialog != null) {
    if (dialogUIVisibilityCountdown <= 0) {

    } else {
      colorText(dialog, 20, canvas.height - 20, "Black");
    }
  }
}

///// Use Up and Down to switch between tiles
function tileEditorInput(whichKeyCode) {
  switch (whichKeyCode) {
    case KEY_UP_ARROW:
      if (tileTypeSelected != -1) {
        do {
          roomGrid[ tileSelected ]++;
        } while (typeof (worldPics[ roomGrid[ tileSelected ] ]) == "undefined");
      }
      break;
    case KEY_DOWN_ARROW:
      if (tileTypeSelected != -1) {
        if (roomGrid[ tileSelected ] > 0) {
          do {
            roomGrid[ tileSelected ]--;
          } while (typeof (worldPics[ roomGrid[ tileSelected ] ]) == "undefined");
        }
      }
      break;

      roomGrid[ tileUnderMouseIndex ];

    case KEY_LEFT_ARROW:
      console.log(roomGrid[ tileSelected ]);
      if (tileTypeSelected != -1) {
        if (roomGrid[ tileSelected ] < 50) {
          roomGrid[ tileSelected ] = 389;	// NPCs and Monsters error out
        } else if (roomGrid[ tileSelected ] > 49 && roomGrid[ tileSelected ] < 100) {
          roomGrid[ tileSelected ] = 0;
        } else if (roomGrid[ tileSelected ] > 99 && roomGrid[ tileSelected ] < 150) {
          roomGrid[ tileSelected ] = 50;
        } else if (roomGrid[ tileSelected ] > 149 && roomGrid[ tileSelected ] < 200) {
          roomGrid[ tileSelected ] = 100;
        } else if (roomGrid[ tileSelected ] > 199 && roomGrid[ tileSelected ] < 250) {
          roomGrid[ tileSelected ] = 150;
        } else if (roomGrid[ tileSelected ] > 249 && roomGrid[ tileSelected ] < 300) {
          roomGrid[ tileSelected ] = 200;
        } else if (roomGrid[ tileSelected ] > 299 && roomGrid[ tileSelected ] < 350) {
          roomGrid[ tileSelected ] = 250;
        } else if (roomGrid[ tileSelected ] > 349 && roomGrid[ tileSelected ] < 400) {
          roomGrid[ tileSelected ] = 300;
        } else if (roomGrid[ tileSelected ] > 399 && roomGrid[ tileSelected ] < 450) {
          roomGrid[ tileSelected ] = 349;
        } else if (roomGrid[ tileSelected ] > 449 && roomGrid[ tileSelected ] < 500) {
          roomGrid[ tileSelected ] = 349;
        } else if (roomGrid[ tileSelected ] > 499 && roomGrid[ tileSelected ] < 550) {
          roomGrid[ tileSelected ] = 349;
        } else if (roomGrid[ tileSelected ] > 549 && roomGrid[ tileSelected ] < 600) {
          roomGrid[ tileSelected ] = 400;
        } else if (roomGrid[ tileSelected ] > 599 && roomGrid[ tileSelected ] < 650) {
          roomGrid[ tileSelected ] = 400;
        } else if (roomGrid[ tileSelected ] > 649 && roomGrid[ tileSelected ] < 700) {
          roomGrid[ tileSelected ] = 400;
        } else if (roomGrid[ tileSelected ] > 699 && roomGrid[ tileSelected ] < 750) {
          roomGrid[ tileSelected ] = 400;
        } else if (roomGrid[ tileSelected ] > 749 && roomGrid[ tileSelected ] < 800) {
          roomGrid[ tileSelected ] = 400;
        } else if (roomGrid[ tileSelected ] > 799 && roomGrid[ tileSelected ] < 850) {
          roomGrid[ tileSelected ] = 400;
        } else if (roomGrid[ tileSelected ] > 849 && roomGrid[ tileSelected ] < 900) {
          roomGrid[ tileSelected ] = 800;
        } else if (roomGrid[ tileSelected ] > 900) {
          roomGrid[ tileSelected ] = 850;
        }
        console.log(roomGrid[ tileSelected ]);
      }
      break;
    case KEY_RIGHT_ARROW:
      console.log(roomGrid[ tileSelected ]);
      if (tileTypeSelected != -1) {
        if (roomGrid[ tileSelected ] < 50) {
          roomGrid[ tileSelected ] = 50;	// NPCs and Monsters error out
        } else if (roomGrid[ tileSelected ] > 49 && roomGrid[ tileSelected ] < 100) {
          roomGrid[ tileSelected ] = 100;
        } else if (roomGrid[ tileSelected ] > 99 && roomGrid[ tileSelected ] < 150) {
          roomGrid[ tileSelected ] = 150;
        } else if (roomGrid[ tileSelected ] > 149 && roomGrid[ tileSelected ] < 200) {
          roomGrid[ tileSelected ] = 200;
        } else if (roomGrid[ tileSelected ] > 199 && roomGrid[ tileSelected ] < 250) {
          roomGrid[ tileSelected ] = 250;
        } else if (roomGrid[ tileSelected ] > 249 && roomGrid[ tileSelected ] < 300) {
          roomGrid[ tileSelected ] = 300;
        } else if (roomGrid[ tileSelected ] > 299 && roomGrid[ tileSelected ] < 350) {
          roomGrid[ tileSelected ] = 350;
        } else if (roomGrid[ tileSelected ] > 349 && roomGrid[ tileSelected ] < 400) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 399 && roomGrid[ tileSelected ] < 450) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 449 && roomGrid[ tileSelected ] < 500) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 499 && roomGrid[ tileSelected ] < 550) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 549 && roomGrid[ tileSelected ] < 600) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 599 && roomGrid[ tileSelected ] < 650) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 649 && roomGrid[ tileSelected ] < 700) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 699 && roomGrid[ tileSelected ] < 750) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 749 && roomGrid[ tileSelected ] < 800) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 799 && roomGrid[ tileSelected ] < 850) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 849 && roomGrid[ tileSelected ] < 900) {
          roomGrid[ tileSelected ] = 389;
        } else if (roomGrid[ tileSelected ] > 900) {
          roomGrid[ tileSelected ] = 0;
        }
        console.log(roomGrid[ tileSelected ]);
      }
      break;
      break;

    case KEY_SPACEBAR:
      // the 2nd parameter is a MIME type code, not the file extension,
      // which is set to text not .js to avoid browser warnings
      downloadString("var fallDale = [" + roomGrid + "];", "text/plain", "updatedRoomGrid.txt");

      break;
  }
  dialogManager.drawDialog();
}

function downloadString(text, fileType, fileName) {
  var blob = new Blob([ text ], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [ fileType, a.download, a.href ].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}


///// Use Left and Right to switch within that section
///// Save tilemap for export
