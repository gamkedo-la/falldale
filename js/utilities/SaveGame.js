function SaveGame() {
  if (typeof Storage === "undefined") {
    console.log('Web Storage is not supported. Progress will not be saved');
    return this;
  }

  this.saveData = function () {

    if (typeof Storage !== "undefined") {
      localStorage.levelRow = levelRow;
      localStorage.levelCol = levelCol;
      localStorage.levelNow = levelNow;
      redWarrior.saveData();
      localStorage.localHighestLevel = 1;
    } else {
      console.log("update your browser to be able to load/save your game.");
    }
  };

  this.loadData = function () {
    if (typeof Storage !== "undefined") {
      levelRow = parseInt(localStorage.levelRow);
      levelCol = parseInt(localStorage.levelCol);
      resetLevel();
      redWarrior.loadData();
    } else {
      console.log("update your browser to be able to load/save your game.");
    }
  }
}


