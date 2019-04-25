//PathFinder3

//From World.js
//Columns = 32
//Rows = 24
function Pathfinder3() {
  this.pathFrom_To_ = function (start, target, isPassableFunction) {
    const frontier = [];
    frontier.push(start);
    const cameFrom = {};
    cameFrom[ start ] = "S";

    while (frontier.length > 0) {
      const current = frontier.shift();
      const neighbors = neighborsForIndex(current, isPassableFunction);

      for (let i = 0; i < neighbors.length; i++) {
        const next = neighbors[ i ];
        if (cameFrom[ next ] == undefined) {
          frontier.push(next);
          cameFrom[ next ] = current;
        }

        if (next == target) {
          break;
        }
      }
    }

    const path = [];

    let current = target;

    while (current != start) {
      path.splice(0, 0, current);
      current = cameFrom[ current ];
      if (current == undefined) {
        return null;
      }
    }

    path.splice(0, 0, start);

    /*        let string = "";
     for(let j = 0; j < levelList[levelNow].length; j++) {
     let distString = cameFrom[j];

     if(distString == undefined) {distString = "B";}

     distString = distString.toString();
     if(distString.length < 2) {
     distString = ("00" + distString);
     } else if(distString.length < 3) {
     distString = ("0" + distString);
     }

     distString += ", "
     string += distString;
     if((j + 1) % ROOM_COLS == 0) {
     string += "\n";
     }
     }

     //        console.log(string); */

    return path;
  };

  const neighborsForIndex = function (index, isPassable) {
    const result = [];

    let above = indexAboveIndex(index);
    if (above != null) {
      if (isPassable(levelList[ levelNow ][ above ])) {
        result.push(above);
      }
    }

    let below = indexBelowIndex(index);
    if (below != null) {
      if (isPassable(levelList[ levelNow ][ below ])) {
        result.push(below);
      }
    }

    let left = indexLeftofIndex(index);
    if (left != null) {
      if (isPassable(levelList[ levelNow ][ left ])) {
        result.push(left);
      }
    }

    let right = indexRightOfIndex(index);
    if (right != null) {
      if (isPassable(levelList[ levelNow ][ right ])) {
        result.push(right);
      }
    }

    return result;
  };

  const indexAboveIndex = function (index) {
    const result = index - ROOM_COLS;
    if (result < 0) {
      return null;
    } else {
      return result;
    }
  };

  const indexBelowIndex = function (index) {
    const result = index + ROOM_COLS;
    if (result >= levelList[ levelNow ].length) {
      return null;
    } else {
      return result;
    }
  };

  const indexLeftofIndex = function (index) {
    const result = index - 1;
    if ((result < 0) || (result % ROOM_COLS == (ROOM_COLS - 1))) {
      return null;
    } else {
      return result;
    }
  };

  const indexRightOfIndex = function (index) {
    const result = index + 1;
    if ((result >= levelList[ levelNow ].length) || (result % ROOM_COLS == 0)) {
      return null;
    } else {
      return result;
    }
  }
}