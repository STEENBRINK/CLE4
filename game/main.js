window.addEventListener("load", function () {
    new Game();
});
var Game = /** @class */ (function () {
    function Game() {
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        //update game elements
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
