
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Load a BackGround Image
var bgImage = new Image();
bgImage.onload = function () {
    ctx.drawImage(bgImage, 0, 0);
};
bgImage.src = "ressources/BgImages/pd2-Hostpital1.png";







