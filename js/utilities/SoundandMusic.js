var audioFormat;
var muteAudio = true;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {

    setFormat();

    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);

    var altSoundTurn = false;

    this.play = function() {
        if (altSoundTurn) {
            altSound.currentTime = 0;
            altSound.play();
        } else {
            mainSound.currentTime = 0;
            mainSound.play();
        }
        altSoundTurn = !this.altSoundTurn;
    }
}

function BackgroundMusicClass() {

    var musicSound = null;

    this.loopSong = function(filenameWithPath) {
        setFormat();

        if (musicSound != null) {
            musicSound.pause();
            musicSound = null;
        }
        musicSound = new Audio("sound/" + filenameWithPath + audioFormat);
        musicSound.loop = true;
        musicSound.play();
		muteAudio = false;
    }

    this.startOrStopMusic = function() {
        if (musicSound.paused) {
            musicSound.play();
        } else {
            musicSound.pause();
			muteAudio = true;
        }
    }
}

function CycleMute() {
    switch(muteInputCycle) {
        case 1:
            // Mute background music
            backgroundMusic.startOrStopMusic();
            break;
        case 2:
            // Mute SFX
            doorSound.startOrStopSFX();
            keySound.startOrStopSFX();
            spikeSound.startOrStopSFX();
            zombieHurtSound.startOrStopSFX();
            goblinHurtSound.startOrStopSFX();
            skeletonHurtSound.startOrStopSFX();
            batHurtSound.startOrStopSFX();
            playerHurtSound.startOrStopSFX();
            break;
        case 3:
            // Return music and SFX to normal
            backgroundMusic.startOrStopMusic();
            doorSound.startOrStopSFX();
            keySound.startOrStopSFX();
            spikeSound.startOrStopSFX();
            zombieHurtSound.startOrStopSFX();
            goblinHurtSound.startOrStopSFX();
            skeletonHurtSound.startOrStopSFX();
            batHurtSound.startOrStopSFX();
            playerHurtSound.startOrStopSFX();

            // Reset the counter to zero
            muteInputCycle = 0;
            break;
    }
}
