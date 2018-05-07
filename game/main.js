var canvas;
var ctx;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1920, 1080);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.arc(400, 400, 100, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}
window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    gameLoop();
};
