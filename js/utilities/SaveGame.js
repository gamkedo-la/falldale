function SaveGame() {
    if (typeof Storage === "undefined") {
        console.log('Web Storage is not supported. Progress will not be saved');
        return this;
    }
    if (localStorage.localHighScore) {
        this.highScoreValue = parseInt(localStorage.localHighScore);
    } else {
        this.highScoreValue = 0;
    }
    if (localStorage.localHighestLevel) {
        this.highestLevelValue = Number(localStorage.localHighestLevel);
    } else {
        this.highestLevelValue = 0;
    }

    this.saveData = function () {
        'use strict';
        if (typeof Storage !== "undefined") {
            localStorage.localHighScore = 9;
            localStorage.localHighestLevel = 1;
        } else {
            console.log("web storage not supported");
        }
    };
}


