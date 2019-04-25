function Camera() {
  this.x = 0.0;
  this.y = 0.0;

  this.follow = function (target, distFromCenterX = 150, distFromCenterY = 100) {
    var cameraFocusCenterX = this.x + canvas.width / 2;
    var cameraFocusCenterY = this.y + canvas.height / 2;

    var playerDistFromCameraFocusX = Math.abs(target.x - cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(target.y - cameraFocusCenterY);
    var scrollSpeed = target.speed;

    if (playerDistFromCameraFocusX > distFromCenterX) {
      if (cameraFocusCenterX < target.x) {
        this.x += scrollSpeed;
      } else {
        this.x -= scrollSpeed;
      }
    }
    if (playerDistFromCameraFocusY > distFromCenterY) {
      if (cameraFocusCenterY < target.y) {
        this.y += scrollSpeed;
      } else {
        this.y -= scrollSpeed;
      }
    }
    if (playerDistFromCameraFocusX > canvas.width) {
      this.x = target.x;
    }
    if (playerDistFromCameraFocusY > canvas.height) {
      this.y = target.y;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    var maxPanRight = ROOM_COLS * TILE_W - canvas.width;
    var maxPanTop = ROOM_ROWS * TILE_H - canvas.height + DIALOG_BOX_HEIGHT;
    if (this.x > maxPanRight) {
      this.x = maxPanRight;
    }
    if (this.y > maxPanTop) {
      this.y = maxPanTop;
    }
  };

  this.canShow = function (x, y, width, height) {
    if (x + width < this.x) {
      return false;
    }
    if (x > this.x + canvas.width) {
      return false;
    }
    if (y + height < this.y) {
      return false;
    }
    if (y > this.y + canvas.height) {
      return false;
    }

    return true;
  }
}
