var canvas:HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

function gameLoop(){
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1920,1080);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.arc(400, 400, 100, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('canvas');
    ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    gameLoop();
}