// Rooftops that go away when the player enters a house
// used by World.js drawRoom()

// TODO: add to level editor
var fallDaleRooftops = [ // x1,y1,x2,y2
                         //rooftops for the town area

  [ 1, 1, 6, 3 ], // player's house
  [ 9, 1, 11, 3 ], // farmer next door
  [ 7, 12, 10, 14 ], // small house south
  [ 12, 12, 15, 14 ], // their neighbor
  [ 8, 19, 11, 22 ], // south w farmer
  [ 12, 19, 16, 22 ], // south bar
  [ 23, 1, 30, 5 ], // nw store
  [ 35, 1, 42, 5 ], // nww store
  [ 29, 14, 38, 28 ], // tavern
  [ 29, 38, 31, 40 ], // se house
  [ 34, 38, 36, 40 ], // se house 2
  [ 40, 24, 42, 27 ] // se house 3
];

var orcKingforestRoofTops = [
  [ 46, 25, 51, 28 ], // orc hut near entrance right side
  [ 29, 28, 33, 31 ], // orc hut near entrance left side
  [ 2, 5, 8, 15 ], // orc Boss house room 1
  [ 2, 16, 8, 24 ], // orc Boss house room 2
  [ 9, 16, 13, 24 ], // orc Boss house room 3 (right side room)
  [ 2, 25, 8, 31 ], // orc Boss house room 4 (just North of Boss fight room
  [ 2, 32, 13, 42 ], // orc Boss house room 5 (Orc Boss's room)
  [ 44, 10, 48, 13 ], // left orc hut near dirt road
  [ 51, 10, 55, 13 ] // right orc hut near dirt road
];

var forestRoofTops = [
  [ 23, 11, 27, 15 ], // orc hut near main road
  [ 2, 4, 5, 11 ], // orc hut top left corner
  [ 2, 38, 6, 43 ] // orc hut bottom left corner
];

var eastWoodsRoofTops = [
  [ 3, 2, 8, 5 ]
];

var eastMiddleWoodsRoofTops = [
  [ 4, 40, 7, 43 ]
];

var wizardsRoofTops = [
  [ 4, 4, 9, 11 ], // room 1
  [ 4, 12, 9, 21 ], // room 2
  [ 4, 22, 9, 27 ], // room 3
  [ 4, 28, 9, 36 ], // room 4
  [10, 4,20, 16 ], // room 5
  [10, 17,12, 20 ], // room 6
  [10, 21,12, 36 ], // room 7
  [13, 17,20, 20 ], // room 8
  [13, 21,20, 36 ], // room 9
  [21, 4, 37, 11 ], // room 10
  [21, 12,26, 16 ], // room 11
  [21, 17,26, 20 ], // room 12
  [21, 21,26, 28 ], // room 13
  [21, 29,26, 36 ], // room 14
  [27, 12, 31, 36 ], // room 15
  [32, 12, 37, 20 ], // room 16
  [32, 21,37, 36 ], // room 17
  [38, 4, 48, 20 ], // room 18
  [38, 21,48, 36 ], // room 19
  [49, 4,60, 20 ], // room 20
  [49, 21,60, 36 ] // room 21
]


//TILE_ROOF_SIDERIGHT
//TILE_ROOF_BACKRIGHT
//TILE_ROOF_FRONTRIGHT
//TILE_ROOF_BACKSIDE
//TILE_ROOF_BACKLEFT
//TILE_ROOF_LEFTSIDE
//TILE_ROOF_FRONTLEFT
//TILE_ROOF_FRONT
//TILE_ROOF_CENTER

function drawRooftops(rooftops) {
  var px = Math.round(redWarrior.x / TILE_W);
  var py = Math.round(redWarrior.y / TILE_H);

  redWarrior.isInsideAnyBuilding = false;

  for (var roofnum = 0; roofnum < rooftops.length; roofnum++) {

    var firstRow = rooftops[ roofnum ][ 1 ];
    var lastRow = rooftops[ roofnum ][ 3 ];
    var firstCol = rooftops[ roofnum ][ 0 ];
    var lastCol = rooftops[ roofnum ][ 2 ];
    var pic = TILE_ROOF_CENTER;
    var playerInsideBuilding = false;
    var mouseInsideBuilding = false;

    // only draw roof if player is not underneath it
    if (px >= firstCol && px <= lastCol && py >= firstRow && py <= lastRow) {
      playerInsideBuilding = true;
      redWarrior.isInsideAnyBuilding = true;
    }

    var mx = Math.round((mouseX + camera.x - TILE_W / 2) / TILE_W);
    var my = Math.round((mouseY + camera.y - TILE_H / 2) / TILE_H);
    if (mx >= firstCol && mx <= lastCol && my >= firstRow && my <= lastRow) {
      mouseInsideBuilding = true;
    }

    if (!playerInsideBuilding) {

      if (mouseInsideBuilding) canvasContext.globalAlpha = 0.85;

      for (var row = firstRow; row < lastRow + 1; row++) {
        for (var col = firstCol; col < lastCol + 1; col++) {

          pic = TILE_ROOF_CENTER;
          if (row == firstRow) {
            if (col == firstCol) pic = TILE_ROOF_BACKLEFT;
            else if (col == lastCol) pic = TILE_ROOF_BACKRIGHT;
            else pic = TILE_ROOF_BACKSIDE;
          } else if (row == lastRow) {
            if (col == firstCol) pic = TILE_ROOF_FRONTLEFT;
            else if (col == lastCol) pic = TILE_ROOF_FRONTRIGHT;
            else pic = TILE_ROOF_FRONT;
          } else { // not first or last row
            if (col == firstCol) pic = TILE_ROOF_LEFTSIDE;
            else if (col == lastCol) pic = TILE_ROOF_SIDERIGHT;
            else pic = TILE_ROOF_CENTER;
          }

          canvasContext.drawImage(worldPics[ pic ], col * TILE_H, row * TILE_W);
        }
      }

      canvasContext.globalAlpha = 1.0;

    }
  }
}