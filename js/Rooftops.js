// Rooftops that go away when the player enters a house
// used by World.js drawRoom()

// TODO: add to level editor
var rooftops = [ // x1,y1,x2,y2
	//rooftops for the town area
	
	[1,0,6,3], // player's house
	[9,0,11,2], // farmer next door
	[7,12,10,14], // small house south
	[12,12,15,14], // their neighbor
	[8,19,11,22], // south w farmer
	[12,19,16,22], // south bar
	[23,0,30,4], // nw store
	[35,0,42,4], // nww store
	[29,14,38,28], // tavern
	[29,38,31,40], // se house
	[34,38,36,40], // se house 2
	[40,24,42,27], // se house 3



	/*[1,1,6,2],   
	[19,0,24,3],
	[26,0,31,3],
	[8,3,16,8], 
	[0,18,4,22],
	[11,16,17,22],
	[21,12,28,17] */
];

//TILE_ROOF_SIDERIGHT
//TILE_ROOF_BACKRIGHT
//TILE_ROOF_FRONTRIGHT
//TILE_ROOF_BACKSIDE
//TILE_ROOF_BACKLEFT
//TILE_ROOF_LEFTSIDE
//TILE_ROOF_FRONTLEFT
//TILE_ROOF_FRONT
//TILE_ROOF_CENTER
function drawRooftops() {
	var px = Math.round(redWarrior.x/TILE_W);
	var py = Math.round(redWarrior.y/TILE_H);
	
	for (var roofnum = 0; roofnum < rooftops.length; roofnum++) {

		var firstRow = rooftops[roofnum][1];
		var lastRow = rooftops[roofnum][3];
		var firstCol = rooftops[roofnum][0];
		var lastCol = rooftops[roofnum][2];
		var pic = TILE_ROOF_CENTER;
		var playerInsideBuilding = false;
		var mouseInsideBuilding = false;

		// only draw roof if player is not underneath it
		if (px>=firstCol && px<=lastCol && py>=firstRow && py<=lastRow) {
			playerInsideBuilding = true;
		}

		var mx = Math.round((mouseX+camera.x-TILE_W/2)/TILE_W);
		var my = Math.round((mouseY+camera.y-TILE_H/2)/TILE_H);
		if (mx>=firstCol && mx<=lastCol && my>=firstRow && my<=lastRow) {
			mouseInsideBuilding = true;
		}

		if (!playerInsideBuilding) {

			if (mouseInsideBuilding) canvasContext.globalAlpha = 0.5;

			for(var row = firstRow; row < lastRow+1; row++) {
				for(var col = firstCol; col < lastCol+1; col++) {
					
					pic = TILE_ROOF_CENTER;
					if (row==firstRow) {
						if (col==firstCol) pic = TILE_ROOF_BACKLEFT;
						else if (col==lastCol) pic = TILE_ROOF_BACKRIGHT;
						else pic = TILE_ROOF_BACKSIDE;
					}
					else if (row==lastRow) {
						if (col==firstCol) pic = TILE_ROOF_FRONTLEFT;
						else if (col==lastCol) pic = TILE_ROOF_FRONTRIGHT;
						else pic = TILE_ROOF_FRONT;
					}
					else { // not first or last row
						if (col==firstCol) pic = TILE_ROOF_LEFTSIDE;
						else if (col==lastCol) pic = TILE_ROOF_SIDERIGHT;
						else pic = TILE_ROOF_CENTER;
					}

					canvasContext.drawImage(worldPics[pic], col*TILE_H, row*TILE_W);
				}
			}
			
			canvasContext.globalAlpha = 1.0;

		}
	}
}

