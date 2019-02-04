function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colorRect(topLeftX,topRightY, boxWidth,boxHeight, fillColor) {  //draw rectangles
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topRightY, boxWidth, boxHeight,);
}

function colorCircle(centerX,centerY, radius, fillColor) {  //draw circles
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function drawTextWithShadowCentered(text, x,y, color, font="13px sans-serif") {
	canvasContext.textAlign = "center";
	canvasContext.font = font;
	canvasContext.shadowBlur = 8;
	canvasContext.shadowColor = "black";
	// if these are both 0, it's more like a "glow"
	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x,y);
	canvasContext.shadowBlur = 0;
}

