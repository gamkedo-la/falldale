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

const NUM_0 = 48;  // Debug Mode
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
const KEY_LEFT_ARROW =  37;
const KEY_UP_ARROW =  38;
const KEY_RIGHT_ARROW =  39;
const KEY_DOWN_ARROW =  40;

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
	
	redWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_SPACEBAR, KEY_A, KEY_S, KEY_I, KEY_O);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
	
}

function keySet(keyEvent, redWarrior, setTo) {
	if(keyEvent.keyCode == redWarrior.controlKeyLeft) {
		redWarrior.keyHeld_WalkWest = setTo;
	}
	if(keyEvent.keyCode == redWarrior.controlKeyRight) {
		redWarrior.keyHeld_WalkEast = setTo;
	}
	if(keyEvent.keyCode == redWarrior.controlKeyUp) {
		redWarrior.keyHeld_WalkNorth = setTo;
	}
	if(keyEvent.keyCode == redWarrior.controlKeyDown) {
		redWarrior.keyHeld_WalkSouth = setTo;
	}	
}

function keyPressed(evt) {
	
	var debugModeKey = NUM_0;
	
	if(isInShop){
		console.log(evt.keyCode);
		shopInput(evt.keyCode);
		
	} else {
		
		keySet(evt, redWarrior, true);
		if(evt.keyCode == redWarrior.controlKeySword) {
			redWarrior.swordSwing(); 
		} else if(evt.keyCode == redWarrior.controlKeyArrow) {
			redWarrior.shotArrow(); 
		} else if(evt.keyCode == redWarrior.controlKeyRock) {
			redWarrior.shotRock(); 
		} else if(evt.keyCode == redWarrior.controlKeyInventory) {
			if(inventoryScreen){
				inventoryScreen = false;
			} else {
				inventoryScreen = true;
			}
		} else if(evt.keyCode == redWarrior.controlKeyStats) {
			if(statsScreen){
				statsScreen = false;
			} else {
				statsScreen = true;
			}	
		} else if(evt.keyCode == debugModeKey) {
				if(debugMode){
					debugMode = false;
			} else {
				debugMode = true;
			}	
		}
	}
    evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	keySet(evt, redWarrior, false);
}

function handleMouseClick(evt) {
	if(menuScreen) {
		menuScreen = false;
	}
}

