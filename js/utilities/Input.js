//Letter Keycodes
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_B = 66;
const KEY_C = 67;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;
const KEY_R = 82;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;
const KEY_ZERO = 48;

const NUM_0 = 48; // Debug Mode
const NUM_1 = 49;
const NUM_2 = 50;
const NUM_3 = 51;
const NUM_4 = 52;
const NUM_5 = 53;
const NUM_6 = 54;
const NUM_7 = 55;
const NUM_8 = 56;
const NUM_9 = 57;

//Arrow Keycodes
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

//Misc.
const TAB = 9;
const SHIFT = 16;
const KEY_SPACEBAR = 32;
const ALT = 18;
const ENTER = 13;

var mouseX = 0;
var mouseY = 0;


function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  redWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR, KEY_A, KEY_S, KEY_I, KEY_O, KEY_H);
}

function updateMousePos(evt) {

  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

}

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

function keySet(keyEvent, redWarrior, setTo) {
  if (keyEvent.keyCode == redWarrior.controlKeyLeft) {
    redWarrior.keyHeld_WalkWest = setTo;
  }
  if (keyEvent.keyCode == redWarrior.controlKeyRight) {
    redWarrior.keyHeld_WalkEast = setTo;
  }
  if (keyEvent.keyCode == redWarrior.controlKeyUp) {
    redWarrior.keyHeld_WalkNorth = setTo;
  }
  if (keyEvent.keyCode == redWarrior.controlKeyDown) {
    redWarrior.keyHeld_WalkSouth = setTo;
  }
}

function keyPressed(evt) {
  var debugModeKey = NUM_1;
  var tileEditorModeKey = NUM_2;
  var mapToggle = NUM_3;
  var paused = KEY_P;
  var mute = KEY_M;
  var nightModeToggle = KEY_N;

  // Start background music when the player press a key and music/SFX are not muted(muteInputCycle = 0 or muteInputCycle = 3)
  if (evt.keyCode !== mute && muteInputCycle !== 1 && muteInputCycle !== 2) {
    // If the music isn't already playing, start to play
    // Won't start to play every time a key is pressed
    if (!backgroundMusic.checkMusicState()) {
      backgroundMusic.loopSong("have-a-nice-beer");
    }
  }

  if (evt.keyCode == paused) {
    if (gamePaused) {
      gamePaused = false;
    } else {
      gamePaused = true;
      // Only stop the music when the player pauses the game
      // Changing it here so it doesn't interfere with the mute option
      if (backgroundMusic.checkMusicState()) {
        backgroundMusic.startOrStopMusic();
      }
    }
  }

  if (gamePaused) {
    return;
  }

  /*if (evt.keyCode == nightModeToggle) {
    OverlayFX.nightMode = !OverlayFX.nightMode;
  }
*/
  if (evt.keyCode == mute) {
    muteInputCycle++;
    CycleMute();
  }

  // save game testing keys
  // if (evt.keyCode == KEY_Y) {
  //     saveGame.saveData();
  // }
  // if (evt.keyCode == KEY_U) {
  //     saveGame.loadData();
  // }

  if (isInShop) {
    shopInput(evt.keyCode);
  } else if (isAtHealer) {
    healerInput(evt.keyCode);
  } else if (scrollBackgroundScreen) {
    scrollBackgroundScreenInput(evt.keyCode);
  } else if (tileEditor) {
    tileEditorInput(evt.keyCode);
  } else if (questOneCompletionScreenActive) {
    questOneCompletionScreenInput(evt.keyCode);
  } else if (questTwoCompletionScreenActive) {
    questTwoCompletionScreenInput(evt.keyCode);
  } else if (questThreeCompletionScreenActive) {
    questThreeCompletionScreenInput(evt.keyCode);
  } else if (questFourCompletionScreenActive) {
    questFourCompletionScreenInput(evt.keyCode);
  } else if (questFiveCompletionScreenActive) {
    questFiveCompletionScreenInput(evt.keyCode);
  } else if (questSixCompletionScreenActive) {
    questSixCompletionScreenInput(evt.keyCode);
  } else {
    keySet(evt, redWarrior, true);
    if (evt.keyCode == redWarrior.controlKeySword) {
      redWarrior.swordSwing();
    } else if (evt.keyCode == redWarrior.controlKeyArrow) {
      redWarrior.shotArrow();
    } else if (evt.keyCode == redWarrior.controlKeyRock) {
      redWarrior.shotRock();
    } else if (evt.keyCode == redWarrior.controlKeyInventory) {
      inventoryScreen = !inventoryScreen
    } else if (evt.keyCode == redWarrior.controlKeyStats) {
      statsScreen = !statsScreen
    } else if (evt.keyCode == debugModeKey || evt.keyCode === KEY_ZERO) {  ////////// remove this code for itch /////////////////
      debugMode = !debugMode
    } else if (evt.keyCode == tileEditorModeKey) {
      if (tileEditor) {
        tileEditor = false;
        levelNow = 0;//0=fallDale
        loadLevel(levelList[ levelNow ]);
        dialogManager.setDialogWithCountdown("Exited Tile Editor Mode", 5);
//                dialog = "Exited Tile Editor Mode";
      } else {
        tileEditor = true;
      }
    } else if (evt.keyCode == mapToggle) {
      if (redWarrior.haveMap) {
        mapShow = !mapShow;
      }
    } else if (evt.keyCode == redWarrior.controlKeyDisplayHealth) {
      displayHealth = !displayHealth
    } 																	////////////  ********************* /////////////////
  }
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  keySet(evt, redWarrior, false);
}

function handleMouseClick(evt) {


  if (debugMode) {
    var tileindex = rowColToArrayIndex(Math.floor((mouseX + camera.x) / TILE_W),
        Math.floor((mouseY + camera.y) / TILE_H));

    console.log(
        "clicked pixel x,y:" + (mouseX + camera.x) + "," + (mouseY + camera.y) +
        " tile col,row: " + Math.floor((mouseX + camera.x) / TILE_W) +
        "," + Math.floor((mouseY + camera.y) / TILE_H)
        + " tile index: " + tileindex
        + " tile #" + roomGrid[ tileindex ]);

    // remember a list of all clicks for use in filling
    // the world in decorations -
    OverlayFX.editorClicks += "[" + (mouseX + camera.x) + "," + (mouseY + camera.y) + "],";
    console.log("clicks=[" + OverlayFX.editorClicks + "];");
    // hack it in temporarily so we see it
    // (but we still need to copy n paste into Overlayfx.js deco[] arrays)
    OverlayFX.addDecoration(mouseX + camera.x, mouseY + camera.y);
  }

  if (menuScreen) {
    if(shownCreditsYet)
    {
      menuScreen = false;
      shownCreditsYet = false;
      characterCreationScreen = true;
    }
    else
    {
      menuScreen = true;
      shownCreditsYet = true;
      backgroundMusic.loopSong("mainMenu");
    }    
  } else if (characterCreationScreen) {
    characterCreationScreenClick(evt);
  } else if (characterSelectionScreen) {
    characterSelectorScreenClick(evt);
  } else if (scrollBackgroundScreen) {
    scrollBackgroundScreenClick(evt);
  } else if (tileEditor) {
    tileSelectedClicked = true;
  }
}

