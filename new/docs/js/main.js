"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y, speedY, speedX, object) {
        var _this = this;
        this.div = document.createElement(object);
        document.body.appendChild(this.div);
        this.div.addEventListener('click', function () { return _this.div.remove(); });
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.speedX = speedX;
    }
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.move = function () {
        this.y += this.speedY;
        this.x += this.speedX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this, x, y, 1, 0, "ball") || this;
        _this.update();
        return _this;
    }
    Ball.prototype.getFutureRectangle = function () {
        var rect = this.div.getBoundingClientRect();
        rect.y += this.speedY;
        return rect;
    };
    Ball.prototype.bounce = function () {
        this.speedY *= -1;
    };
    Ball.prototype.update = function () {
        if (this.x + 40 > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Ball.prototype.removeMe = function () {
        this.div.remove();
    };
    return Ball;
}(GameObject));
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(x, y, upkey, downkey) {
        var _this = _super.call(this, x, y, 0, 0, "paddle") || this;
        _this.upkey = upkey;
        _this.downkey = downkey;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = -5;
                break;
            case this.downkey:
                this.speedX = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = 0;
                break;
            case this.downkey:
                this.speedX = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        if (this.y > window.innerHeight - 100) {
            this.y = window.innerHeight - 100;
        }
        if (this.y < 0) {
            this.y = 1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}(GameObject));
var Game = (function () {
    function Game() {
        this.screen = new StartScreen(this);
        this.backgroundElement = document.createElement('background');
        this.gameLoop();
    }
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        document.body.appendChild(this.backgroundElement);
        this.screen = new PlayScreen(this);
    };
    Game.prototype.showGameScreen = function () {
        document.body.innerHTML = "";
        document.body.appendChild(this.backgroundElement);
        this.screen = new GameOverScreen(this.screen, this);
    };
    Game.prototype.startAgain = function () {
        document.body.innerHTML = "";
        document.body.appendChild(this.backgroundElement);
        this.screen = new StartScreen(this);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOverScreen = (function () {
    function GameOverScreen(p, g) {
        var _this = this;
        this.game = g;
        this.playScreen = p;
        this.div = document.createElement("endgame");
        document.body.appendChild(this.div);
        this.div.innerHTML = "GREAT JOB!";
        this.text = document.createElement("text");
        document.body.appendChild(this.text);
        this.text.innerHTML = "Thanks for your help!";
        this.scoreElement = document.createElement('endscore');
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : " + (this.playScreen.score - 1);
        this.button = document.createElement("button");
        document.body.appendChild(this.button);
        this.button.innerHTML = "START AGAIN";
        this.button.addEventListener("click", function () { return _this.buttonClicked(); });
    }
    GameOverScreen.prototype.update = function () {
    };
    GameOverScreen.prototype.buttonClicked = function () {
        this.game.startAgain();
    };
    return GameOverScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        var _this = this;
        this.game = g;
        this.score = 1;
        this.scoreElement = document.createElement('score');
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : 0";
        this.paddle = new Paddle(window.innerWidth / 4 - 50, window.innerHeight - 100, 65, 68);
        this.paddle2 = new Paddle(window.innerWidth / 4 * 3 - 50, window.innerHeight - 100, 37, 39);
        this.balls = new Array;
        for (var i = 0; i < 40; i++) {
            setTimeout(function () { return _this.newBall(); }, 1000 * i);
        }
    }
    PlayScreen.prototype.newBall = function () {
        this.balls.push(new Ball(Math.random() / 1.5 * window.innerWidth + 200, Math.random() / 4 * window.innerHeight));
    };
    PlayScreen.prototype.speedFaster = function () {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            b.speedY += 0.01;
        }
    };
    PlayScreen.prototype.increaseSpeed = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            if (b.speedY == 1) {
                setTimeout(function () { return _this.speedFaster(); }, 10000);
            }
            if (b.speedY == 1.01) {
                setTimeout(function () { return _this.speedFaster(); }, 10000);
            }
            if (b.speedY == 1.02) {
                setTimeout(function () { return _this.speedFaster(); }, 10000);
            }
        }
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    PlayScreen.prototype.update = function () {
        this.paddle.move();
        this.paddle2.move();
        this.paddle.update();
        this.paddle2.update();
        this.increaseSpeed();
        var paddleRect = this.paddle.getRectangle();
        var paddle2Rect = this.paddle2.getRectangle();
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            var ballRect = b.getFutureRectangle();
            if (this.checkCollision(paddleRect, ballRect) || this.checkCollision(paddle2Rect, ballRect)) {
                b.removeMe();
                this.scoreElement.innerHTML = "Score : " + this.score++;
            }
            else {
                b.update();
            }
            b.update();
        }
        this.eraseBallsBad();
    };
    PlayScreen.prototype.eraseBallsBad = function () {
        for (var i = 0; i < this.balls.length; i++) {
            var ball = this.balls[i];
            if (ball.y > innerHeight) {
                ball.removeMe();
                this.balls.splice(i, 1);
                if (this.balls.length == 0) {
                    this.detectGameover();
                }
            }
        }
    };
    PlayScreen.prototype.detectGameover = function () {
        this.game.showGameScreen();
    };
    return PlayScreen;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.innerHTML = "START THE GAME";
        this.click();
        this.instr = document.createElement("instruction");
        document.body.appendChild(this.instr);
        this.instr.innerHTML = "Help save the environment by collecting all the garbage!";
    }
    StartScreen.prototype.click = function () {
        var _this = this;
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
    };
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map