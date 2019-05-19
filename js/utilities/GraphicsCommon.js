function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
}

function colorRect(topLeftX, topRightY, boxWidth, boxHeight, fillColor) {  //draw rectangles
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topRightY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {  //draw circles
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();

  // idea:
  // canvasContext.drawImage(circlePic,centerX-radius,centerY-radius);
}

function resizeText(text, maxWidth = canvas.width, resizeFactor = 0.8) {
  let theFont = canvasContext.font.split("px");
  let fontsize = Number(theFont[0]);  

  if (canvasContext.measureText(text).width > maxWidth)
  {
      fontsize *= resizeFactor;
      canvasContext.font = fontsize + "px" + theFont[theFont.length - 1];
  }
}

function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black", maxWidth = canvas.width, resizeFactor = 0.5) {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  resizeText(showWords, maxWidth, resizeFactor);
  canvasContext.fillText(showWords, textX, textY);
}

function drawTextWithShadowCentered(text, x, y, color, font = "13px sans-serif", maxWidth = canvas.width, resizeFactor = 0.5) {
  canvasContext.textAlign = "center";
  canvasContext.font = font;
  canvasContext.shadowBlur = 8;
  canvasContext.shadowColor = "black";
  // if these are both 0, it's more like a "glow"
  canvasContext.shadowOffsetX = 0;
  canvasContext.shadowOffsetY = 0;
  canvasContext.fillStyle = color;
  resizeText(text, maxWidth, resizeFactor);
  canvasContext.fillText(text, x, y);
  canvasContext.shadowBlur = 0;
}

function drawTextWith1pxShadowCentered(text, x, y, color, font = "13px sans-serif", maxWidth = canvas.width, resizeFactor = 0.5) {
  canvasContext.textAlign = "center";
  canvasContext.font = font;
  canvasContext.fillStyle = "black";
  resizeText(text, maxWidth, resizeFactor);
  canvasContext.fillText(text, x+1, y+1);
  canvasContext.fillStyle = color;
  resizeText(text, maxWidth, resizeFactor);
  canvasContext.fillText(text, x, y);
}

function drawTextCentered(text, x, y, color, font = "13px sans-serif", maxWidth = canvas.width, resizeFactor = 0.5) {
  canvasContext.textAlign = "center";
  canvasContext.font = font;
  canvasContext.fillStyle = color;
  resizeText(text, maxWidth, resizeFactor);
  canvasContext.fillText(text, x, y);
}

function emptyRect(x, y, width, height, lineWidth, strokeColor) {
  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeColor;
  canvasContext.strokeRect(x, y, width, height);
  canvasContext.lineWidth = 0;
}

// arguments
// ctx : the context on which to draw the mirrored image
// image : the image to mirror
// x,y : the top left of the rendered image
// horizontal : boolean if true mirror along X
// vertical : boolean if true mirror along y
function mirrorImage(ctx, image, x = 0, y = 0, horizontal = false, vertical = false) {
  ctx.save();  // save the current canvas state
  ctx.setTransform(
      horizontal ? -1 : 1, 0, // set the direction of x axis
      0, vertical ? -1 : 1,   // set the direction of y axis
      x + horizontal ? image.width : 0, // set the x origin
      y + vertical ? image.height : 0   // set the y origin
  );
  ctx.drawImage(image, 0, 0);
  ctx.restore(); // restore the state as it was when this function was called
}

function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, axisX, axisY) {
  canvasContext.translate(positionX, positionY);
  canvasContext.rotate(angleInRad);
  canvasContext.drawImage(image, -axisX, -axisY);
  canvasContext.rotate(-angleInRad);
  canvasContext.translate(-positionX, -positionY);
}