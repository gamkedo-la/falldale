// simple little level transition title that fades out
// used by LevelsUtilities.js loadMap()

let fadingTitles = new function () {

  let title = "";
  let subtitle = "";
  let currentAlpha = 0;
  const fadeAlphaPerFrame = 0.01;

  this.begin = function (mainTitle, aboveTitle, belowTitle) {

    //	console.log("Starting title animation: " + mainTitle);
    currentAlpha = 1;
    title = mainTitle || "UNKNOWN LEVEL NAME";
    surtitle = aboveTitle || "Now entering...";
    subtitle = belowTitle || "beware the monsters!";
  };

  this.draw = function () {

    if (currentAlpha > 0) {

      let midx = Math.round(canvas.width / 2);
      let midy = Math.round(canvas.height / 2);
      let color = "rgba(255,255,255," + currentAlpha + ")";

      drawTextWithShadowCentered(surtitle, midx, midy - 128, color, "32px sans");
      drawTextWithShadowCentered(title, midx, midy - 64, color, "64px sans");
      drawTextWithShadowCentered(subtitle, midx, midy - 32, color, "32px sans");

      currentAlpha -= fadeAlphaPerFrame;

    }

  }

}();