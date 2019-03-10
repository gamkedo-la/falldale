function Camera () {    
    this.camPanX = 0.0;
    this.camPanY = 0.0;

    this.follow = function (target, distFromCenterX = 150, distFromCenterY = 100) {
        var cameraFocusCenterX = this.camPanX + canvas.width/2;
        var cameraFocusCenterY = this.camPanY + canvas.height/2;

        var playerDistFromCameraFocusX = Math.abs(target.x-cameraFocusCenterX);
        var playerDistFromCameraFocusY = Math.abs(target.y-cameraFocusCenterY);

        if(playerDistFromCameraFocusX > distFromCenterX) {
            if(cameraFocusCenterX < target.x)  {
                this.camPanX += target.speed;
            } else {
                this.camPanX -= target.speed;
            }
        }
        if(playerDistFromCameraFocusY > distFromCenterY) {
            if(cameraFocusCenterY < target.y)  {
                this.camPanY += target.speed;
            } else {
                this.camPanY -= target.speed;
            }
        }
        if (playerDistFromCameraFocusX > ROOM_ROWS * TILE_W / 2) {
            this.camPanX = target.x;
        }
        if (playerDistFromCameraFocusY > ROOM_COLS * TILE_H / 2) {
            this.camPanY = target.y;
        }

        if(this.camPanX < 0) {
            this.camPanX = 0;
        }
        if(this.camPanY < 0) {
            this.camPanY = 0;
        }        
        var maxPanRight = ROOM_COLS * TILE_W - canvas.width;
        var maxPanTop = ROOM_ROWS * TILE_H - canvas.height;
        if(this.camPanX > maxPanRight) {
            this.camPanX = maxPanRight;
        }
        if(this.camPanY > maxPanTop) {
            this.camPanY = maxPanTop;
        }
    };
}