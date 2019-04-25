var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

/*
 function sliderMove() {
 var nextX = redWarrior.x;
 var nextY = redWarrior.y;

 var speed = redWarrior.getWalkSpeed();
 nextX += speed.x;
 nextY += speed.y;

 if (isBrickAtPixelCoord(nextX, nextY) == false) {
 redWarrior.x = nextX;
 redWarrior.y = nextY;
 }
 }

 function sliderReset() {
 // center slider on screen
 redWarrior.x = canvas.width / 2;
 redWarrior.y = canvas.height / 2;
 }
 */

/*function instantCamFollow() {
 camPanX = redWarrior.x - canvas.width / 2;
 camPanY = redWarrior.y - canvas.height / 2;
 }*/

/*function cameraFollow() {
 var cameraFocusCenterX = camPanX + canvas.width / 2;
 var cameraFocusCenterY = camPanY + canvas.height / 2;

 var playerDistFromCameraFocusX = Math.abs(redWarrior.x - cameraFocusCenterX);
 var playerDistFromCameraFocusY = Math.abs(redWarrior.y - cameraFocusCenterY);

 if (playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
 if (cameraFocusCenterX < redWarrior.x) {
 camPanX += playerMoveSpeed;
 } else {
 camPanX -= playerMoveSpeed;
 }
 }
 if (playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
 if (cameraFocusCenterY < redWarrior.y) {
 camPanY += playerMoveSpeed;
 } else {
 camPanY -= playerMoveSpeed;
 }
 }

 // instantCamFollow();

 // this next code blocks the game from showing out of bounds
 // (this isn't required, if you don't mind seeing beyond edges)
 if (camPanX < 0) {
 camPanX = 0;
 }
 if (camPanY < 0) {
 camPanY = 0;
 }
 var maxPanRight = ROOM_COLS * TILE_W - canvas.width;
 var maxPanTop = ROOM_ROWS * TILE_H - canvas.height;
 if (camPanX > maxPanRight) {
 camPanX = maxPanRight;
 }
 if (camPanY > maxPanTop) {
 camPanY = maxPanTop;
 }
 }*/


/* function drawOnlyBricksOnScreen() {
 // what are the top-left most col and row visible on canvas?
 var cameraLeftMostCol = Math.floor(camPanX / TILE_W);
 var cameraTopMostRow = Math.floor(camPanY / TILE_H);

 // how many columns and rows of tiles fit on one screenful of area?
 var colsThatFitOnScreen = Math.floor(canvas.width / TILE_W);
 var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_H);

 // finding the rightmost and bottommost tiles to draw.
 // the +1 and + 2 on each pushes the new tile popping in off visible area
 // +2 for columns since TILE_W doesn't divide evenly into canvas.width
 var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
 var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

 } // end of drawBricks() */
