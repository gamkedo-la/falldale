const TILE_W = 50;
const TILE_H = 50;
const ROOM_COLS = 32; 
const ROOM_ROWS = 24; 

var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;


var levelOne =   [122,120,117,123,119, 66, 65, 66, 66, 66, 66, 66, 66, 66, 66, 68, 68, 68, 20, 98, 95, 97,101, 94, 99, 67, 86, 82, 83, 85, 83, 87,
				  121, 05, 00,124, 93, 65, 66, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 20,104, 84, 84,102, 00, 93, 68, 92, 00, 84, 84, 84, 93,
				  104, 10, 00, 00, 93, 66, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 67, 20,104, 00, 31, 00, 00, 93, 18, 92, 00, 00, 43, 00, 93,
				  116,112,114, 52,115, 18, 18, 65,122,120,123,120,117,120,117,120,119, 68, 20,104, 00, 00,100, 00, 93, 18, 92, 00, 88, 00, 00, 93,
				   65, 18, 18, 00, 18, 18, 18, 66,121, 00,124, 00, 00, 46, 00, 19, 93, 18, 20,103, 91, 89, 91, 91,106, 18, 90, 91, 91, 89, 91,106,
				   66, 67, 18, 00, 08, 00, 18, 18,104, 00, 00, 00, 00, 00, 00, 00, 93, 18, 20, 18, 18, 00, 18, 18, 18, 18, 18, 18, 18, 00, 18, 67,
				   65, 68, 18, 18, 18, 00, 18, 18,104, 00, 00, 00, 00, 00, 00, 00, 93, 18, 20, 18, 18, 00, 18, 18, 18, 18, 18, 18, 18, 00, 00, 68,
				   66, 67, 18, 18, 41, 00, 18, 67,104, 00, 00, 00, 00, 00, 00, 00, 93, 18, 20, 59, 00, 00, 00, 00, 21, 00, 00, 00, 00, 37, 00, 38,
				   65, 68, 18, 18, 18, 00, 42, 68,104, 00, 00, 00, 00, 00, 00, 00, 93, 18, 20, 00, 18, 18, 18, 18, 00, 18, 18, 18, 18, 18, 67, 18,
				   66, 65, 18, 18, 18, 00, 41, 18,116,114,112,113, 52,113, 51,114,115, 18, 20, 00, 18, 67, 18, 18, 00, 18, 18, 18, 18, 18, 68, 67,
				   67, 66, 18, 18, 00, 00, 00, 18, 18, 18, 18, 18, 00, 18, 18, 18, 18, 18, 80, 00, 18, 68, 18, 18, 00, 18, 18, 18, 18, 18, 18, 68,
				   68, 18, 21, 61, 00, 45, 09, 37, 36, 00, 69, 00, 00, 00, 00, 00, 00, 00, 81, 00, 18, 18, 18, 18, 00, 18, 18, 18, 18, 67, 18, 18,
				   18, 18, 00, 18, 00, 00, 00, 18, 18, 18, 18, 18, 18, 00, 18, 18, 18, 18, 20, 18, 18, 98, 94, 94, 00, 94, 94, 94, 99, 18, 65, 68,
				   00, 00, 00, 18, 18, 18, 67, 18, 18, 18, 18, 18, 18, 00, 18, 18, 18, 18, 20, 18, 18,104, 00, 00, 00, 00, 00, 00, 93, 18, 66, 65,
				   65, 67, 00, 18, 18, 18, 68, 35, 35, 18, 18, 18, 18, 00, 18, 18, 67, 18, 20, 18, 18,104, 00, 00, 00, 00, 00, 00, 93, 18, 18, 66, 
				   66, 68, 00, 18, 18, 18, 20, 20, 20, 18, 18, 18, 18, 00, 18, 18, 68, 18, 20, 18, 18,104, 00, 00, 00, 00, 00, 00, 93, 18, 18, 65,
				   65, 67, 00, 18, 18, 20, 20, 20, 18, 18, 18,122,120, 00,120,120,120,119, 20, 18, 18,104, 00, 00, 00, 00, 00, 00, 93, 18, 65, 66,
				   66, 68, 00, 18, 18, 20, 18, 67, 18, 18, 18,121, 00, 00, 00, 00, 00, 93, 20, 18, 18,104, 13, 00, 00, 00, 00, 00, 93, 18, 66, 65,
				  122,120, 00,117,119, 20, 18, 68, 18, 18, 18,104, 00, 00, 00, 00, 00, 93, 20, 18, 18,116,114, 51,114, 51,114,112,115, 18, 18, 66,
				  121, 00, 00, 00, 93, 20, 18, 18, 18, 18, 18,104, 00, 00, 00, 00, 00, 93, 20, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 67,
				  104, 00, 00, 00, 93, 20, 18, 18, 18, 18, 18,104, 00, 00, 70, 00, 00, 93, 20, 18, 18, 18, 65, 18, 18, 18, 18, 18, 18, 18, 18, 68,
				  104, 00, 00, 00, 93, 20, 18, 18, 18, 18, 18,104, 00, 00, 00, 00, 71, 93, 20, 18, 18, 18, 66, 18, 18, 67, 18, 18, 18, 18, 18, 67,
				  104, 08, 10, 12, 93, 20, 18, 18, 18, 18, 18,104, 00, 00, 00, 00, 00, 93, 20, 18, 18, 18, 18, 18, 18, 68, 18, 18, 18, 18, 18, 68,
				  116,112,114,114,115, 04, 04, 04, 04, 04, 04,116, 04, 04, 04, 04, 07,115, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04, 04];

var levelThree =  
					[04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,
					 32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,				 
					 32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,18,18,18,18,32,32,32,32,32,32,32,18,18,18,18,18,18,35,35,35,18,32,18,35,35,35,18,32,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,35,35,40,18,32,18,35,35,35,18,32,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,				 
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,35,35,35,18,32,18,35,35,35,18,32,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,18,18,18,32,32,32,18,18,18,32,32,18,18,18,18,18,18,40,35,35,18,32,18,35,35,35,18,32,18,18,32,
					 32,32,32,32,32,32,32,18,18,18,18,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,18,36,00,00,00,00,00,18,18,18,32,18,18,18,18,18,18,35,35,35,18,32,18,35,40,35,32,32,18,32,32,				 
					 32,18,00,20,20,20,20,37,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,00,00,20,20,20,20,00,00,00,00,00,21,21,00,00,00,00,08,00,08,00,00,00,00,00,00,00,37,00,05,39,
					 32,18,00,20,20,20,20,37,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,18,00,00,00,00,00,00,18,18,18,32,18,18,18,32,32,18,35,35,35,18,32,18,35,35,35,18,32,18,32,32,
					 32,32,32,32,32,32,32,18,18,18,18,32,18,18,18,32,32,18,18,18,18,18,18,18,18,18,18,18,32,18,18,32,				 
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,32,32,18,35,35,35,18,32,18,35,35,35,18,32,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,32,32,18,40,35,35,18,32,18,35,35,35,18,32,18,18,32,
					 32,18,18,18,18,32,32,18,18,18,32,32,18,18,18,32,32,18,18,18,18,18,18,18,18,18,18,18,32,18,18,32,
					 32,18,18,18,18,32,32,32,32,32,32,32,18,18,18,32,32,18,35,35,35,18,32,18,35,35,35,18,32,18,18,32,
					 32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,
					 04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04];
					
var graveYard =
				[04,04,07,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 04,00,00,00,00,04,12,00,00,00,08,04,18,18,18,18,18,18,18,18,04,10,00,00,10,04,18,04,31,00,00,04,
				 04,00,00,00,00,17,08,00,00,00,00,04,18,18,18,18,18,18,18,18,04,00,00,00,00,04,18,04,30,26,00,04,
				 04,00,00,00,00,04,00,00,00,00,00,16,00,00,00,00,00,00,00,00,14,00,00,00,00,04,18,04,00,28,28,04,
				 04,00,21,00,00,04,00,00,00,00,00,04,18,18,18,18,18,18,00,18,04,21,00,00,12,04,18,04,00,00,00,04,
				 04,04,04,04,04,04,00,00,00,00,00,04,18,18,18,18,18,18,00,18,04,04,04,04,04,04,18,04,00,04,04,04,
				 04,00,00,00,00,04,00,00,00,00,00,04,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,00,18,32,18,
				 04,00,00,00,00,04,16,04,04,04,04,04,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,00,00,32,18,32,
				 04,00,00,00,00,00,00,04,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,18,18,32,18,
				 04,13,00,00,00,00,00,04,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,18,32,18,18,
				 04,04,04,04,04,04,04,04,18,18,32,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,32,18,18,18,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,00,18,18,32,18,32,
				 32,18,18,18,18,18,32,18,18,18,18,18,18,18,18,20,18,18,00,18,18,18,18,18,18,18,00,18,04,04,04,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,00,18,18,18,18,18,18,18,00,18,04,10,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,20,18,00,18,18,18,18,18,18,18,00,18,04,00,05,04,
				 20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,18,00,00,00,00,00,00,00,00,00,00,14,00,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,18,18,18,18,18,18,18,18,18,18,04,00,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,18,18,18,18,18,18,18,18,18,18,04,10,00,04,
				 32,18,18,18,18,18,18,18,18,18,18,18,18,18,20,20,18,18,32,18,18,18,18,18,18,18,18,18,04,04,04,04,
				 04,04,04,04,18,18,32,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,18,18,18,18,18,32,
				 04,00,00,04,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,18,32,18,18,18,18,18,18,18,18,18,32,18,
				 04,00,00,14,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,32,18,18,
				 04,19,00,04,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,32,18,18,32,
				 04,04,04,04,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,18,18,18,18];
				  
var levelFour =	[04,04,07,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 04,00,00,00,04,00,31,00,04,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,04,19,04,
				 04,00,00,00,04,27,30,29,04,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,04,14,04,
				 04,00,00,00,04,00,00,00,04,18,18,18,18,18,18,18,04,04,04,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,04,17,04,04,04,00,04,04,18,18,18,18,18,18,18,04,21,13,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,00,18,18,18,18,18,18,18,18,18,04,00,00,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,00,00,00,00,18,18,18,18,18,18,18,18,18,04,00,00,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,16,04,04,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,04,04,04,04,04,04,04,04,04,04,04,04,04,
				 04,18,00,18,18,18,18,18,18,18,18,18,18,18,18,18,18,00,18,04,00,00,00,00,10,00,00,08,04,00,08,04,
				 04,18,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,16,00,00,00,00,00,00,00,00,14,00,00,04,
				 04,18,00,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,00,00,00,04,00,00,04,
				 04,18,00,18,18,18,18,18,00,18,18,18,18,18,18,18,18,18,18,04,00,00,00,00,00,00,00,00,04,00,00,04,
				 04,18,00,18,18,18,04,04,14,04,04,18,18,18,18,18,18,18,18,04,04,04,14,04,04,14,04,04,04,00,00,04,
				 04,18,10,18,18,18,04,00,21,00,04,18,18,18,18,18,18,18,18,04,00,00,00,00,04,00,00,00,04,00,00,04,
				 04,18,00,18,18,18,04,00,00,00,04,18,18,18,18,18,18,18,18,04,00,00,00,00,04,00,00,00,04,00,00,04,
				 04,18,05,18,18,18,04,00,12,00,04,18,18,18,18,18,18,18,18,04,10,00,00,10,04,10,00,10,04,00,12,04,
				 04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04,04];
				 
var allGrass =   [18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
				  18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18];
  
var levelList = [levelOne, graveYard, levelThree, levelFour];
var levelNow = 0;
var roomGrid = [];

//These will be renumbered once Tile Editor is complete.  82 is the next available tile.  
const TILE_PLAYERSTART = 05;
//terrain tiles
const TILE_ROAD = 00;
const TILE_WALL = 04;
const TILE_DOOR = 06;
const TILE_FINISH = 07;
const TILE_YELLOW_DOOR = 14;
const TILE_GREEN_DOOR = 15;
const TILE_BLUE_DOOR = 16;
const TILE_RED_DOOR = 17;
const TILE_GRASS = 18;
const TILE_WATER = 20;
const TILE_CABINET = 33;
const TILE_BED = 34;
const TILE_GRAVE = 35;
const TILE_FRESH_GRAVE = 40;
const TILE_ALTER = 44;
const TILE_FOUNTAIN = 45;
//portals
const TILE_GRAVE_YARD_PORTAL = 38;
const TILE_HOME_VILLAGE_PORTAL = 39;
//traps
const TILE_SPIKES = 02;
const TILE_SPIKES_BLOODY = 03;
// these can be deleted, but need to clear code related to them first
const TILE_SHOP_1 = 22;
const TILE_SHOP_2 = 23;
const TILE_SHOP_3 = 24;
const TILE_SHOP_4 = 25;
const TILE_SHOP_6 = 26;
const TILE_SHOP_7 = 27;
const TILE_SHOP_8 = 28;
const TILE_SHOP_9 = 29;
const TILE_SHOP_A = 30;
//findable items
const TILE_ARROWS = 42;
const TILE_THROWINGROCKS = 41;
const TILE_KEY = 01;
const TILE_YELLOW_KEY = 10;
const TILE_GREEN_KEY = 11;
const TILE_BLUE_KEY = 12;
const TILE_RED_KEY = 13;
const TILE_TREASURE = 19;
//players house
const TILE_ROOF_FRONTRIGHT = 47;
const TILE_ROOF_SIDERIGHT = 48;
const TILE_ROOF_BACKRIGHT = 49;
const TILE_FRONTWALL_WINDOW = 50;
const TILE_FRONTWALL_SOLID = 51;
const TILE_FRONTDOOR_YELLOW = 52;
const TILE_ROOF_BACKSIDE = 53;
const TILE_ROOF_BACKLEFT = 54;
const TILE_ROOF_LEFTSIDE = 55;
const TILE_ROOF_FRONTLEFT = 56;
const TILE_ROOF_FRONT = 57;
const TILE_ROOF_CENTER = 58;
//healer's shop
const TILE_HEALER_BW = 82;
const TILE_HEALER_BW_CABINET_POTIONS = 83;
const TILE_HEALER_BW_CABINET_LH = 84;
const TILE_HEALER_BW_CABINET_EMPTY = 85;
const TILE_HEALER_BW_LS = 86;
const TILE_HEALER_BW_RS = 87;
const TILE_HEALER_DESK = 88;
const TILE_HEALER_FRONTDOOR = 89;
const TILE_HEALER_FW_LS = 90;
const TILE_HEALER_FW_WINDOW = 91;
const TILE_HEALER_LW = 92;	
const TILE_HEALER_RW = 93;
const TILE_HEALER_FW_RS = 106;
//blacksmith's shop
const TILE_BS_BW = 94;
const TILE_BS_BW_CABINET_POTIONS = 95;
const TILE_BS_BW_CABINET_EMPTY = 97;
const TILE_BS_BW_LS = 98;
const TILE_BS_BW_RS = 99;
const TILE_BS_DESK = 100;
const TILE_BS_BW_WEAPONSRACK = 101;
const TILE_BS_BW_WEAPONSRACKBOTTOM = 102;
const TILE_BS_FW_LS = 103;
const TILE_BS_LW = 104;	
const TILE_BS_FW_RS = 107;
//monsters
const TILE_SKELETON = 08;
const TILE_GOBLIN = 36;
const TILE_BAT = 09;
const TILE_ZOMBIE = 21;
const TILE_ZOMBIE2 = 72;
const TILE_ZOMBIE3 = 73;
const TILE_GREEN_ORC_SWORD = 62;
const TILE_GREEN_ORC_CLUB = 63;
const TILE_GREEN_ORC_AX = 64;
const TILE_ARCHER = 37;
// NPCs 
const TILE_SHOPKEEPER = 31;
const TILE_HEALER = 43;
const TILE_PRINCESS = 46;
const TILE_DODD = 59;
const TILE_TARAN = 60;
const TILE_DELKON = 61;
const TILE_ADDY = 69;
const TILE_GABRIEL = 70;
const TILE_FENTON = 71;
// trees
const TILE_TREE = 32;
const TILE_TREE2TOPHALF = 65;
const TILE_TREE2BOTTOMHALF = 66;
const TILE_TREE3TOPHALF = 67;
const TILE_TREE3BOTTOMHALF = 68;
// town props
const TILE_BRIDGE_UPPER = 80;
const TILE_BRIDGE_LOWER = 81;
//town houses
const TILE_HOUSE_FRONT_WALL = 110;
const TILE_HOUSE_FRONT_WALL_DAMAGED = 111;
const TILE_HOUSE_FRONT_WALL_BROKEN = 112;
const TILE_HOUSE_FRONT_WINDOW = 113;
const TILE_HOUSE_FRONT_WINDOW_BROKEN = 114;
const TILE_HOUSE_FW_RS = 115;
const TILE_HOUSE_FW_LS = 116;
const TILE_HOUSE_BW = 117;
const TILE_HOUSE_BW_LS = 118;
const TILE_HOUSE_BW_RS = 119;
const TILE_HOUSE_BW_WINDOW = 120;
const TILE_HOUSE_LS_BED_TOP = 121;
const TILE_HOUSE_LS_BED_BOTTOM = 122;
const TILE_HOUSE_DRESSER_TOP = 123;
const TILE_HOUSE_DRESSER_BOTTOM = 124;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < ROOM_COLS &&
		row >= 0 && row < ROOM_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return roomGrid[worldIndexUnderCoord];
	} else {
		return TILE_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / TILE_W);
	// FIX: row was .floor but this would return the tile
	// NORTH of the player for 50% of the tile height
	var warriorWorldRow = Math.round(atY / TILE_H); 
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < ROOM_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < ROOM_ROWS) {
		return worldIndexUnderWarrior;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_FINISH ||
			checkTileType == TILE_KEY ||
			checkTileType == TILE_GREEN_KEY ||
			checkTileType == TILE_YELLOW_KEY ||
			checkTileType == TILE_BLUE_KEY ||
			checkTileType == TILE_RED_KEY ||
			checkTileType == TILE_YELLOW_DOOR ||
			checkTileType == TILE_GREEN_DOOR ||
			checkTileType == TILE_BLUE_DOOR ||
			checkTileType == TILE_RED_DOOR ||
			checkTileType == TILE_TREASURE ||
			checkTileType == TILE_SHOP_1 || 
			checkTileType == TILE_SHOP_2 || 
			checkTileType == TILE_SHOP_3 || 
			checkTileType == TILE_SHOP_4 || 
			checkTileType == TILE_SHOP_6 || 
			checkTileType == TILE_SHOP_7 ||
			checkTileType == TILE_SHOP_8 ||
			checkTileType == TILE_SHOP_9 ||
			checkTileType == TILE_SHOP_A ||
			checkTileType == TILE_HEALER_LW ||
			checkTileType == TILE_HEALER_RW ||
			checkTileType == TILE_HEALER_BW_CABINET_LH ||
			checkTileType == TILE_HEALER_DESK ||
			checkTileType == TILE_BS_LW ||
			checkTileType == TILE_BS_DESK ||
			checkTileType == TILE_BS_BW_WEAPONSRACKBOTTOM ||
			checkTileType == TILE_HOUSE_LS_BED_BOTTOM ||
			checkTileType == TILE_HOUSE_DRESSER_BOTTOM ||
			checkTileType == TILE_CABINET ||
			checkTileType == TILE_BED ||
			checkTileType == TILE_FOUNTAIN ||
			checkTileType == TILE_ALTER 
			);
}

function tileTypeHasGrassTransparency(checkTileType) {
	return (checkTileType == TILE_TREE ||
			checkTileType == TILE_GRAVE ||
			checkTileType == TILE_FRESH_GRAVE ||
			checkTileType == TILE_ARROWS ||
			checkTileType == TILE_TREE2TOPHALF ||
			checkTileType == TILE_TREE2BOTTOMHALF ||
			checkTileType == TILE_TREE3TOPHALF ||
			checkTileType == TILE_TREE3BOTTOMHALF ||
			checkTileType == TILE_THROWINGROCKS 
			);
}

// add special fx for tiles that need it
var shinyAngle = 0;
var shinyAngleDelta = 0.03; // radians of rotation per frame
function drawTileFX(checkTileType, drawTileX, drawTileY) {
	if (checkTileType == TILE_RED_KEY ||
		checkTileType == TILE_GREEN_KEY ||
		checkTileType == TILE_YELLOW_KEY ||
		checkTileType == TILE_BLUE_KEY
		) 
	{
		drawBitmapCenteredWithRotation(shinyPic, drawTileX+24, drawTileY+16, shinyAngle);
	}
}

function drawRoom() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	shinyAngle += shinyAngleDelta;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = roomGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_ROAD], drawTileX, drawTileY);
			}
			if( tileTypeHasGrassTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_GRASS], drawTileX, drawTileY);
			}
			drawTileFX(tileKindHere, drawTileX, drawTileY);
			canvasContext.drawImage(useImg, drawTileX, drawTileY);

			// edit mode highlight
			if (tileEditor && arrayIndex==tileSelected) {
				canvasContext.beginPath();
				canvasContext.lineWidth = "1";
				canvasContext.strokeStyle = "red";
				canvasContext.rect(drawTileX+1, drawTileY+1, TILE_W-1, TILE_H-1); 
				canvasContext.stroke();
			}

			drawTileX += TILE_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TILE_H;
		drawTileX = 0;
	} // end of for each row
	
	// TODO: why is this here?
	// fadingTitles.begin("COOL MESSAGE","headline","subtitle");
}
	
function drawOnlyTilesOnScreen() {
	var cameraLeftMostCol = Math.floor(camPanX / TILE_W);
	var cameraTopMostRow = Math.floor(camPanY / TILE_H);
	var colsThatFitOnScreen = Math.floor(canvas.width / TILE_W);
	var rowsThatFitOnScreen = Math.floor(canvas.height / TILE_W);
	var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
	var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
	
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
		
	for(var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
		for(var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {
				
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = roomGrid[arrayIndex];				
			var useImg = worldPics[tileKindHere];
			
			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_ROAD], drawTileX, drawTileY);
			}
			
			if (drawTileX <= 32) {
			canvasContext.drawImage(useImg, drawTileX, drawTileY);
			drawTileX += TILE_W;
			arrayIndex++;
			}
		}
	}
}
	
function resetLevel() {
	loadLevel(levelList[levelNow])
}

pather = new Pathfinder();
pather.calculateDistancesFromIndex(400);