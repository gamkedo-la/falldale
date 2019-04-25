//DialogManager
function DialogManager() {
  let dialogUIVisibilityCountdown = 0;
  let dialog = "";

  this.setDialogWithCountdown = function (text, countdown = 3) {
    if (text != dialog) {
      dialog = text;
      dialogUIVisibilityCountdown = countdown * FRAMES_PER_SECOND;
    }
  };

  this.drawDialog = function () {
    colorRect(0, canvas.height - 50, canvas.width, DIALOG_BOX_HEIGHT, "black");
    colorRect(5, canvas.height - 45, canvas.width - 10, 40, "white");

    dialogUIVisibilityCountdown--;
    if ((dialogUIVisibilityCountdown <= 0) || (dialog == null)) {
      dialog = "";

    } else {
      colorText(dialog, 20, canvas.height - 20, "Black");
    }
  }
}