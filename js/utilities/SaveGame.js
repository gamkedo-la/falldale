function SaveGame() {
    if (typeof Storage === "undefined") {
        console.log('Web Storage is not supported. Progress will not be saved');
        return this;
    }

    this.saveData = function () {

        if (typeof Storage !== "undefined") {
            localStorage.levelNow = levelNow;
            redWarrior.saveData();
            localStorage.localHighestLevel = 1;
        } else {
            console.log("update your browser to be able to load/save your game.");
        }
    };

    this.loadData = function () {
        if (typeof Storage !== "undefined") {
            levelNow = parseInt(localStorage.levelNow);
            resetLevel();
            redWarrior.loadData();
        } else {
            console.log("update your browser to be able to load/save your game.");
        }
    }
}


