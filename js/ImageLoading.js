var titlepagePic = document.createElement("img");
var scrollBackgroundPic = document.createElement("img");
var storeFrontPic = document.createElement("img");
var healerStorePic = document.createElement("img");


var warriorPic = document.createElement("img");
var swordPic = document.createElement("img");

var skeletonPic = document.createElement("img");
var deadSkeletonPic = document.createElement("img");

var zombiePic = document.createElement("img");
var deadZombiePic = document.createElement("img");
 
var batPic = document.createElement("img");
var deadBatPic = document.createElement("img");

var goblinPic = document.createElement("img");
var deadGoblinPic = document.createElement("img");

var orcPic = document.createElement("img");
var deadOrcPic = document.createElement("img");

var archerPic = document.createElement("img");
var deadArcherPic = document.createElement("img");

var dicePic = document.createElement("img");
var twentySidedDicePic = document.createElement("img");





var worldPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName)  {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{tileType: TILE_ROAD,  theFile: "worldRoad.png"},
			{tileType: TILE_YELLOW_KEY,  theFile: "yellowkey.png"},
			{tileType: TILE_GREEN_KEY,  theFile: "greenkey.png"},
			{tileType: TILE_BLUE_KEY,  theFile: "bluekey.png"},
			{tileType: TILE_RED_KEY,  theFile: "redkey.png"},
			{tileType: TILE_WALL, theFile: "wallEast.png"},
			{tileType: TILE_YELLOW_DOOR, theFile: "yellowdoor.png"},
			{tileType: TILE_BLUE_DOOR, theFile: "bluedoor.png"},
			{tileType: TILE_GREEN_DOOR, theFile: "greendoor.png"},
			{tileType: TILE_RED_DOOR, theFile: "reddoor.png"},
			{tileType: TILE_FINISH, theFile: "world_goal.png"},
			{tileType: TILE_SPIKES, theFile: "spikes.png"},
			{tileType: TILE_SPIKES_BLOODY, theFile: "spikesBloody.png"},
			{tileType: TILE_GRASS,  theFile: "grass.png"},
			{tileType: TILE_TREASURE,  theFile: "treasure.png"},
			{tileType: TILE_WATER,  theFile: "water.png"},
			{tileType: TILE_SHOP_1,  theFile: "table1.png"},
			{tileType: TILE_SHOP_2,  theFile: "table2.png"},
			{tileType: TILE_SHOP_3,  theFile: "table3.png"},
			{tileType: TILE_SHOP_4,  theFile: "table4.png"},
			{tileType: TILE_SHOP_6,  theFile: "table6.png"},
			{tileType: TILE_SHOP_7,  theFile: "table7.png"},
			{tileType: TILE_SHOP_8,  theFile: "table8.png"},
			{tileType: TILE_SHOP_9,  theFile: "table9.png"},
			{tileType: TILE_SHOP_A,  theFile: "tablea.png"},
			{tileType: TILE_BED,  theFile: "bed.png"},
			{tileType: TILE_SHOPKEEPER,  theFile: "shopkeeper.png"},
			{tileType: TILE_TREE,  theFile: "tree.png"},
			{tileType: TILE_GRAVE,  theFile: "grave.png"},
			{tileType: TILE_FRESH_GRAVE,  theFile: "freshgrave.png"},
			{tileType: TILE_CABINET,  theFile: "cabinet.png"},
			{tileType: TILE_GRAVE_YARD_PORTAL,  theFile: "worldRoad.png"},
			{tileType: TILE_HOME_VILLAGE_PORTAL,  theFile: "worldRoad.png"},
			{tileType: TILE_THROWINGROCKS,  theFile: "throwingRocks.png"},
			{tileType: TILE_ARROWS,  theFile: "arrow.png"},
			{tileType: TILE_HEALER,  theFile: "healer.png"},
			{tileType: TILE_ALTER,  theFile: "alter.png"},
			{tileType: TILE_FOUNTAIN,  theFile: "fountain.png"},
			{tileType: TILE_PRINCESS,  theFile: "princess.png"},
			{tileType: TILE_ROOF_SIDERIGHT,  theFile: "roofbottomright.png"},
			{tileType: TILE_ROOF_BACKRIGHT,  theFile: "roofbackright.png"},
			{tileType: TILE_ROOF_FRONTRIGHT,  theFile: "roofFrontRight.png"},
			{tileType: TILE_FRONTDOOR_YELLOW,  theFile: "door.png"},
			{tileType: TILE_FRONTWALL_SOLID,  theFile: "solidwall.png"},
			{tileType: TILE_FRONTWALL_WINDOW,  theFile: "frontwall.png"},
			{tileType: TILE_ROOF_BACKSIDE,  theFile: "roofbackside.png"},
			{tileType: TILE_ROOF_BACKLEFT,  theFile: "roofbackleft.png"},
			{tileType: TILE_ROOF_LEFTSIDE,  theFile: "roofleftside.png"},
			{tileType: TILE_ROOF_FRONTLEFT,  theFile: "rooffrontleft.png"},
			{tileType: TILE_ROOF_FRONT,  theFile: "rooffront.png"},
			{tileType: TILE_ROOF_CENTER,  theFile: "roofcenter.png"},				
							
			{varName: warriorPic, theFile: "warrior.png"},
			{varName: swordPic, theFile: "sword.png"},
			{varName: skeletonPic, theFile: "skeleton.png"},
			{varName: deadSkeletonPic, theFile: "deadSkeleton.png"},
			{varName: deadZombiePic, theFile: "deadZombie.png"},
			{varName: batPic, theFile: "bat.png"},
			{varName: deadBatPic, theFile: "deadbat.png"},
			{varName: orcPic, theFile: "Orc1.png"},
			{varName: zombiePic, theFile: "zombie.png"},
			{varName: goblinPic, theFile: "goblin.png"},
			{varName: deadGoblinPic, theFile: "deadgoblin.png"},
			{varName: archerPic, theFile: "archer.png"},
			{varName: deadArcherPic, theFile: "deadgoblin.png"},
			{varName: storeFrontPic, theFile: "storefront.jpg"},
			{varName: healerStorePic, theFile: "healerStore.jpg"},
			{varName: dicePic, theFile: "dice.png"},
			{varName: twentySidedDicePic, theFile: "20sided.png"},
			{varName: scrollBackgroundPic, theFile: "scrollBackground.jpg"},
			{varName: titlepagePic, theFile: "background.png"}
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode( imageList[i].tileType, imageList[i].theFile );
		}
	}
}