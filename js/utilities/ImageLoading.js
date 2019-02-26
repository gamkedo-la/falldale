var titlepagePic = document.createElement("img");
var scrollBackgroundPic = document.createElement("img");
var storeFrontPic = document.createElement("img");
var healerStorePic = document.createElement("img");
var muteAudioPic = document.createElement("img");

var warriorPic = document.createElement("img");
var swordPic = document.createElement("img");
var biggyPic = document.createElement("img");

var skeletonPic = document.createElement("img");
var skeletonPic2 = document.createElement("img");
var skeletonPic3 = document.createElement("img");
var deadSkeletonPic = document.createElement("img");

var zombiePic = document.createElement("img");
var zombiePic2 = document.createElement("img");
var zombiePic3 = document.createElement("img");
var deadZombiePic = document.createElement("img");
 
var batPic = document.createElement("img");
var deadBatPic = document.createElement("img");

var goblinPic = document.createElement("img");
var goblinPic2 = document.createElement("img");
var deadGoblinPic = document.createElement("img");

var orcPic = document.createElement("img");
var orcPic2 = document.createElement("img");
var orcPic3 = document.createElement("img");
var deadOrcPic = document.createElement("img");

var addyPic = document.createElement("img");
var delkonPic = document.createElement("img");
var doddPic = document.createElement("img");
var fentonPic = document.createElement("img");
var gabrielPic = document.createElement("img");
var healerPic = document.createElement("img");
var princessPic = document.createElement("img");
var shopkeeperPic = document.createElement("img");
var taranPic = document.createElement("img");

var archerPic = document.createElement("img");
var deadArcherPic = document.createElement("img");

var dicePic = document.createElement("img");
var twentySidedDicePic = document.createElement("img");

var shadowPic = document.createElement("img");
var shinyPic = document.createElement("img");

var falldaleMap = document.createElement("img");

var worldPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		//console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
	//console.log("Downloading " + imgVar.src);
}

function loadImageForWorldCode(worldCode, fileName)  {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{tileType: TILE_ROAD,  theFile: "worldRoad.png"},
			{tileType: TILE_YELLOW_KEY,  theFile: "keyedDoorsandKeys/yellowKey.png"},
			{tileType: TILE_GREEN_KEY,  theFile: "keyedDoorsandKeys/greenKey.png"},
			{tileType: TILE_BLUE_KEY,  theFile: "keyedDoorsandKeys/blueKey.png"},
			{tileType: TILE_RED_KEY,  theFile: "keyedDoorsandKeys/redKey.png"},
			{tileType: TILE_WALL, theFile: "wallEast.png"},
			{tileType: TILE_YELLOW_DOOR, theFile: "keyedDoorsandKeys/yellowDoor.png"},
			{tileType: TILE_BLUE_DOOR, theFile: "keyedDoorsandKeys/blueDoor.png"},
			{tileType: TILE_GREEN_DOOR, theFile: "keyedDoorsandKeys/greenDoor.png"},
			{tileType: TILE_RED_DOOR, theFile: "keyedDoorsandKeys/redDoor.png"},
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
			{tileType: TILE_SHOP_A,  theFile: "tableA.png"},
			{tileType: TILE_BED,  theFile: "bed.png"},
			{tileType: TILE_TREE,  theFile: "Trees/tree.png"},
			{tileType: TILE_GRAVE,  theFile: "grave.png"},
			{tileType: TILE_FRESH_GRAVE,  theFile: "freshgrave.png"},
			{tileType: TILE_CABINET,  theFile: "Cabinet.png"},
			{tileType: TILE_GRAVE_YARD_PORTAL,  theFile: "worldRoad.png"},
			{tileType: TILE_HOME_VILLAGE_PORTAL,  theFile: "worldRoad.png"},
			{tileType: TILE_THROWINGROCKS,  theFile: "throwingRocks.png"},
			{tileType: TILE_ARROWS,  theFile: "arrow.png"},
			{tileType: TILE_ALTER,  theFile: "alter.png"},
			{tileType: TILE_FOUNTAIN,  theFile: "fountain.png"},
			{tileType: TILE_ROOF_SIDERIGHT,  theFile: "House1/roofbottomright.png"},
			{tileType: TILE_ROOF_BACKRIGHT,  theFile: "House1/roofbackright.png"},
			{tileType: TILE_ROOF_FRONTRIGHT,  theFile: "House1/roofFrontRight.png"},
			{tileType: TILE_FRONTDOOR_YELLOW,  theFile: "House1/door.png"},
			{tileType: TILE_FRONTWALL_SOLID,  theFile: "House1/solidwall.png"},
			{tileType: TILE_FRONTWALL_WINDOW,  theFile: "House1/frontwall.png"},
			{tileType: TILE_ROOF_BACKSIDE,  theFile: "House1/roofbackside.png"},
			{tileType: TILE_ROOF_BACKLEFT,  theFile: "House1/roofbackleft.png"},
			{tileType: TILE_ROOF_LEFTSIDE,  theFile: "House1/roofleftside.png"},
			{tileType: TILE_ROOF_FRONTLEFT,  theFile: "House1/rooffrontleft.png"},
			{tileType: TILE_ROOF_FRONT,  theFile: "House1/rooffront.png"},
			{tileType: TILE_ROOF_CENTER,  theFile: "House1/roofcenter.png"},	
			{tileType: TILE_TREE2TOPHALF,  theFile: "Trees/tree2tophalf.png"},
			{tileType: TILE_TREE2BOTTOMHALF,  theFile: "Trees/tree2bottomhalf.png"},		
			{tileType: TILE_TREE3TOPHALF,  theFile: "Trees/tree3tophalf.png"},
			{tileType: TILE_TREE3BOTTOMHALF,  theFile: "Trees/tree3bottomhalf.png"},				
			{tileType: TILE_BRIDGE_UPPER,  theFile: "bridge-upper.png"},				
			{tileType: TILE_BRIDGE_LOWER,  theFile: "bridge-lower.png"},		
			{tileType: TILE_HEALER_BW,  theFile: "shopHealer/backwall.png"},
			{tileType: TILE_HEALER_BW_CABINET_POTIONS,  theFile: "shopHealer/backwallcabinettophalf.png"},
			{tileType: TILE_HEALER_BW_CABINET_LH,  theFile: "shopHealer/backwallcabinetlowerhalf.png"},
			{tileType: TILE_HEALER_BW_CABINET_EMPTY,  theFile: "shopHealer/backwallemptycabinet.png"},
			{tileType: TILE_HEALER_BW_LS,  theFile: "shopHealer/backwallleftside.png"},
			{tileType: TILE_HEALER_BW_RS,  theFile: "shopHealer/backwallrightside.png"},
			{tileType: TILE_HEALER_DESK,  theFile: "shopHealer/desk.png"},
			{tileType: TILE_HEALER_FRONTDOOR,  theFile: "shopHealer/frontdoor.png"},
			{tileType: TILE_HEALER_FW_LS,  theFile: "shopHealer/frontwallleftside.png"},
			{tileType: TILE_HEALER_FW_RS,  theFile: "shopHealer/frontwallrightside.png"},	
			{tileType: TILE_HEALER_FW_WINDOW,  theFile: "shopHealer/frontwallwindow.png"},
			{tileType: TILE_HEALER_LW,  theFile: "shopHealer/leftwall.png"},		
			{tileType: TILE_HEALER_RW,  theFile: "shopHealer/rightwall.png"},
			{tileType: TILE_BS_BW,  theFile: "shopBlacksmith/backwall.png"},
			{tileType: TILE_BS_BW_CABINET_EMPTY,  theFile: "shopBlacksmith/backwallemptycabinet.png"},
			{tileType: TILE_BS_BW_CABINET_POTIONS,  theFile: "shopBlacksmith/backwallcabinettophalf.png"},
			{tileType: TILE_BS_BW_WEAPONSRACK,  theFile: "shopBlacksmith/weaponsrack.png"},
			{tileType: TILE_BS_BW_WEAPONSRACKBOTTOM,  theFile: "shopBlacksmith/weaponsracklh.png"},
			{tileType: TILE_BS_BW_LS,  theFile: "shopBlacksmith/backwallleftside.png"},
			{tileType: TILE_BS_BW_RS,  theFile: "shopBlacksmith/backwallrightside.png"},
			{tileType: TILE_BS_DESK,  theFile: "shopBlacksmith/desk.png"},
			{tileType: TILE_BS_FW_LS,  theFile: "shopBlacksmith/frontwallleftside.png"},
			{tileType: TILE_BS_LW,  theFile: "shopBlacksmith/leftwall.png"},
			{tileType: TILE_HOUSE_FRONT_WALL, theFile: "House1/solidwall.png"},
			{tileType: TILE_HOUSE_FRONT_WALL_DAMAGED, theFile: "House1/solidwall2.png"},
			{tileType: TILE_HOUSE_FRONT_WALL_BROKEN, theFile: "House1/brokenwall.png"},
			{tileType: TILE_HOUSE_FRONT_WINDOW, theFile: "House1/window.png"},
			{tileType: TILE_HOUSE_FRONT_WINDOW_BROKEN, theFile: "House1/broken-window.png"},
			{tileType: TILE_HOUSE_FW_RS, theFile: "House1/frontrightwall.png"},
			{tileType: TILE_HOUSE_FW_LS, theFile: "House1/frontleftwall.png"},
			{tileType: TILE_HOUSE_BW, theFile: "House1/backwall.png"},
			{tileType: TILE_HOUSE_BW_LS, theFile: "House1/backwallleftside.png"},
			{tileType: TILE_HOUSE_BW_RS, theFile: "House1/backwallrightside.png"},
			{tileType: TILE_HOUSE_BW_WINDOW, theFile: "House1/backwallwindow.png"},
			{tileType: TILE_HOUSE_LS_BED_TOP, theFile: "House1/bedleftside.png"},
			{tileType: TILE_HOUSE_LS_BED_BOTTOM, theFile: "House1/bedleftsidets.png"},
			{tileType: TILE_HOUSE_DRESSER_TOP, theFile: "House1/dressertop.png"},
			{tileType: TILE_HOUSE_DRESSER_BOTTOM, theFile: "House1/dresserbottom.png"},
			{tileType: TILE_BAR_CABINET, theFile: "bar/cabinet.png"},
			{tileType: TILE_BAR, theFile: "bar/bar.png"},
			{tileType: TILE_BAR_TOP, theFile: "bar/barTopEnd.png"},
			{tileType: TILE_CHAIR, theFile: "bar/chair.png"},
			{tileType: TILE_MAP, theFile: "map.png"},
			{tileType: TILE_MAUSOLEUM_TL, theFile: "graves/mausoleumTL.png"},
			{tileType: TILE_MAUSOLEUM_TM, theFile: "graves/mausoleumTM.png"},
			{tileType: TILE_MAUSOLEUM_TR, theFile: "graves/mausoleumTR.png"},
			{tileType: TILE_MAUSOLEUM_ML, theFile: "graves/mausoleumML.png"},
			{tileType: TILE_MAUSOLEUM_MM, theFile: "graves/mausoleumMM.png"},
			{tileType: TILE_MAUSOLEUM_MR, theFile: "graves/mausoleumMR.png"},
			{tileType: TILE_MAUSOLEUM_BL, theFile: "graves/mausoleumBL.png"},
			{tileType: TILE_MAUSOLEUM_BM, theFile: "graves/mausoleumBM.png"},
			{tileType: TILE_MAUSOLEUM_BR, theFile: "graves/mausoleumBR.png"},
			{tileType: TILE_GRAVEYARD_FENCE_LEFT, theFile: "graves/fenceleftpost.png"},
			{tileType: TILE_GRAVEYARD_FENCE_RIGHT, theFile: "graves/fencerightpost.png"},
			{tileType: TILE_GRAVEYARD_FENCE, theFile: "graves/fence.png"},
			{tileType: TILE_GRAVE_1, theFile: "graves/1 grave.png"},
			{tileType: TILE_GRAVE_2, theFile: "graves/2 graves.png"},
			{tileType: TILE_GRAVE_3, theFile: "graves/large grave.png"},
			{tileType: TILE_GRAVE_4, theFile: "graves/oblisk grave.png"},
			
			
			{varName: muteAudioPic, theFile: "muteAudio.png"},
			{varName: warriorPic, theFile: "warrior.png"},
			{varName: swordPic, theFile: "sword.png"},
			{varName: biggyPic, theFile: "Sprites/player/biggy.png"},
			{varName: skeletonPic, theFile: "Monsters/skeleton1.png"},
			{varName: skeletonPic2, theFile: "Monsters/skeleton2.png"},
			{varName: skeletonPic3, theFile: "Monsters/skeleton3.png"},
			{varName: deadSkeletonPic, theFile: "Monsters/deadSkeleton.png"},
			{varName: deadZombiePic, theFile: "Monsters/deadZombie.png"},
			{varName: batPic, theFile: "Monsters/bat.png"},
			{varName: deadBatPic, theFile: "Monsters/deadBat.png"},
			{varName: zombiePic, theFile: "Monsters/zombie1.png"},
			{varName: zombiePic2, theFile: "Monsters/zombie2.png"},
			{varName: zombiePic3, theFile: "Monsters/zombie3.png"},
			{varName: goblinPic, theFile: "Sprites/goblin/Goblin.png"},
			{varName: goblinPic2, theFile: "Sprites/goblin/Goblin2.png"},
			{varName: orcPic, theFile: "Monsters/Orc1.png"},
			{varName: orcPic2, theFile: "Monsters/Orc2.png"},
			{varName: orcPic3, theFile: "Monsters/Orc3.png"},
			{varName: deadGoblinPic, theFile: "Monsters/deadGoblin.png"},
			{varName: archerPic, theFile: "Monsters/archer.png"},
			{varName: deadArcherPic, theFile: "Monsters/deadGoblin.png"},
			{varName: storeFrontPic, theFile: "storefront.jpg"},
			{varName: healerStorePic, theFile: "healerStore.jpg"},
			{varName: dicePic, theFile: "dice.png"},
			{varName: twentySidedDicePic, theFile: "20sided.png"},
			{varName: scrollBackgroundPic, theFile: "scrollBackground.jpg"},
			{varName: titlepagePic, theFile: "background.png"},
			{varName: shadowPic, theFile: "shadow.png"},
			{varName: shinyPic, theFile: "shiny.png"},
			{varName: falldaleMap, theFile: "falldaleMap.png"},
			{varName: addyPic, theFile: "NPCs/Addy.png"},
			{varName: delkonPic, theFile: "NPCs/Delkon.png"},
			{varName: doddPic, theFile: "NPCs/Dodd.png"},
			{varName: fentonPic, theFile: "NPCs/Fenton.png"},
			{varName: gabrielPic, theFile: "NPCs/Gabriel.png"},
			{varName: healerPic, theFile: "NPCs/healer.png"},
			{varName: princessPic, theFile: "NPCs/princess.png"},
			{varName: shopkeeperPic, theFile: "NPCs/shopkeeper.png"},
			{varName: taranPic, theFile: "NPCs/Taran.png"}
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
