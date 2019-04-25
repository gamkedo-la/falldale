//Pathfinder

//From World.js
//Columns = 32
//Rows = 24
function Pathfinder() {
  this.calculateDistancesFromIndex = function (start) {
    let frontier = new Set();
    const distances = [];
    frontier.add(start);
    distances[ start ] = 0;

    let neighbors = neighborsForIndex(start);
    let currentDistance = 1;

    while (frontier.size <= levelList[ levelNow ].length) {
      let newNeighbors = [];
      for (let i = 0; i < neighbors.length; i++) {
        const frontierSize = frontier.size;
        frontier.add(neighbors[ i ]);
        if (frontier.size > frontierSize) {
          distances[ neighbors[ i ] ] = currentDistance;
          newNeighbors = newNeighbors.concat(neighborsForIndex(neighbors[ i ]));
        }
      }

      neighbors = newNeighbors;

      currentDistance++;
    }

    let string = "";
    for (let j = 0; j < levelList[ levelNow ].length; j++) {
      let distString = distances[ j ].toString();
      if (distString.length < 2) {
        distString = ("0" + distString);
      }

      distString += ", ";
      string += distString;
      if ((j + 1) % ROOM_COLS == 0) {
        string += "\n";
      }
    }
//        console.log(string);//Temporary
  };

  const neighborsForIndex = function (index) {
    const result = [];
    const above = indexAboveIndex(index);
    if (above != null) {
      result.push(above);
    }
    const below = indexBelowIndex(index);
    if (below != null) {
      result.push(below);
    }
    const left = indexLeftofIndex(index);
    if (left != null) {
      result.push(left);
    }
    const right = indexRightOfIndex(index);
    if (right != null) {
      result.push(right);
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
    if (result > levelList[ levelNow ].length) {
      return null;
    } else {
      return result;
    }
  };

  const indexLeftofIndex = function (index) {
    const result = index - 1;
    if (result < 0) {
      return null;
    } else {
      return result;
    }
  };

  const indexRightOfIndex = function (index) {
    const result = index + 1;
    if (result > levelList[ levelNow ].length) {
      return null;
    } else {
      return result;
    }
  }
}