//PathFinder3

//From World.js
//Columns = 32
//Rows = 24
function Pathfinder3() {
    this.pathFrom_To_ = function(start, target) {
        const frontier = [];
        frontier.push(start);
        const cameFrom = {};
        cameFrom[start] = "S";
                
        while(frontier.length > 0) {
            const current = frontier.shift();
            const neighbors = neighborsForIndex(current);

            for(let i = 0; i < neighbors.length; i++) {
                const next = neighbors[i];
                if(cameFrom[next] == undefined) {
                    frontier.push(next);
/*
                    if(next == start) {
                        //do nothing
                    } else if(next - current == ROOM_COLS) {
                        cameFrom[next] = "^";
                    } else if(next - current == 1) {
                        cameFrom[next] = "<";
                    } else if(next - current == -ROOM_COLS) {
                        cameFrom[next] = "v";
                    } else if(next - current == -1) {
                        cameFrom[next] = ">";
                    } else {
                        cameFrom[next] = "B";
                    }*/

                    cameFrom[next] = current;
                }

                if(next == target) {break;}
            }
        }

        const path = [];

        let current = target;

//        console.log("Current: " + current);

        while(current != start) {
            path.splice(0, 0, current);
            current = cameFrom[current];
            if(current == undefined) {return null;}
        }

        path.splice(0, 0, start);

/*        for(let n = 0; n < path.length; n++) {
            console.log("Path Segment " + (n + 1) + " is: " + path[n]);
        }*/

        let string = "";
        for(let j = 0; j < levelList[levelNow].length; j++) {
            let distString = cameFrom[j];

            if(distString == undefined) {distString = "B";}

            distString += ", "
            string += distString;
            if((j + 1) % ROOM_COLS == 0) {
                string += "\n";
            }
        }
//        console.log(string);//Temporary

        return path;
    }

    this.calculateDistancesFromIndex = function(start) {
        const frontier = [];
        frontier.push(start);
        const cameFrom = {};
        cameFrom[start] = "S";
                
        while(frontier.length > 0) {
            const current = frontier.shift();
            const neighbors = neighborsForIndex(current);

            for(let i = 0; i < neighbors.length; i++) {
                const next = neighbors[i];
                if(cameFrom[next] == undefined) {
                    frontier.push(next);

                    if(next == start) {
                        //do nothing
                    } else if(next - current == ROOM_COLS) {
                        cameFrom[next] = "^";
                    } else if(next - current == 1) {
                        cameFrom[next] = "<";
                    } else if(next - current == -ROOM_COLS) {
                        cameFrom[next] = "v";
                    } else if(next - current == -1) {
                        cameFrom[next] = ">";
                    } else {
                        cameFrom[next] = "B";
                    }
                }
            }
        }

        let string = "";
        for(let j = 0; j < levelList[levelNow].length; j++) {
            let distString = cameFrom[j];

            if(distString == undefined) {distString = "B";}

            distString += ", "
            string += distString;
            if((j + 1) % ROOM_COLS == 0) {
                string += "\n";
            }
        }
//        console.log(string);//Temporary
    }

    const neighborsForIndex = function(index) {
        const result = [];
        let above = indexAboveIndex(index);
        if(!isPassableTile(levelOne[above])) {above = null;}
        if(above != null) {result.push(above);}
        let below = indexBelowIndex(index);
        if(!isPassableTile(levelOne[below])) {below = null;}
        if(below != null) {result.push(below);}
        let left = indexLeftofIndex(index);
        if(!isPassableTile(levelOne[left])) {left = null;}
        if(left != null) {result.push(left);}
        let right = indexRightOfIndex(index);
        if(!isPassableTile(levelOne[right])) {right = null;}
        if(right != null) {result.push(right);}

        return result;
    }

    const indexAboveIndex = function(index) {
        const result = index - ROOM_COLS;
        if(result < 0) {
            return null;
        } else {
            return result;
        }
    }

    const indexBelowIndex = function(index) {
        const result = index + ROOM_COLS;
        if(result > levelList[levelNow].length) {
            return null;
        } else {
            return result;
        }
    }

    const indexLeftofIndex = function(index) {
        const result = index - 1;
        if((result < 0) || (result % ROOM_COLS == (ROOM_COLS - 1))) {
            return null;
        } else {
            return result;
        }
    }

    const indexRightOfIndex = function(index) {
        const result = index + 1;
        if((result > levelList[levelNow].length) || (result % ROOM_COLS == 0)) {
            return null;
        } else {
            return result;
        }
    }

    const isPassableTile = function(tileType) {
        switch(tileType) {
            case TILE_ROAD:
            case TILE_FINISH:
            case TILE_GRASS:
            case TILE_BRIDGE_UPPER:
            case TILE_BRIDGE_LOWER:
            case TILE_YELLOW_DOOR:
            case TILE_GREEN_DOOR:
            case TILE_BLUE_DOOR:
            case TILE_RED_DOOR:
            case TILE_GRAVE_YARD_PORTAL:
            case TILE_HOME_VILLAGE_PORTAL:
            case TILE_ARROWS:
            case TILE_THROWINGROCKS:
            case TILE_KEY:
            case TILE_YELLOW_KEY:
            case TILE_GREEN_KEY:
            case TILE_BLUE_KEY:
            case TILE_RED_KEY:
            case TILE_TREASURE:
            case TILE_SKELETON:
            case TILE_GOBLIN:
            case TILE_BAT:
            case TILE_ZOMBIE:
            case TILE_ZOMBIE2:
            case TILE_ZOMBIE3:
            case TILE_GREEN_ORC_SWORD:
            case TILE_GREEN_ORC_CLUB:
            case TILE_GREEN_ORC_AX:
            case TILE_ARCHER:
            case TILE_SHOPKEEPER:
            case TILE_HEALER:
            case TILE_PRINCESS:
            case TILE_DODD:
            case TILE_TARAN:
            case TILE_DELKON:
            case TILE_ADDY:
            case TILE_GABRIEL:
            case TILE_FENTON:
            return true;
        }

        return false;
    }
}