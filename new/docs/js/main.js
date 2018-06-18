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
    GameObject.prototype.removeMe = function () {
        this.div.remove();
    };
    GameObject.prototype.move = function () {
        this.y += this.speedY;
        this.x += this.speedX;
        this.draw();
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Bin = (function (_super) {
    __extends(Bin, _super);
    function Bin(x, y, upkey, downkey) {
        var _this = _super.call(this, x, y, 0, 0, "bin") || this;
        _this.upkey = upkey;
        _this.downkey = downkey;
        _this.eListenerDown = function (e) { return _this.onKeyDown(e); };
        _this.eListenerUp = function (e) { return _this.onKeyUp(e); };
        window.addEventListener("keydown", _this.eListenerDown);
        window.addEventListener("keyup", _this.eListenerUp);
        return _this;
    }
    Bin.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = -10;
                break;
            case this.downkey:
                this.speedX = 10;
                break;
        }
    };
    Bin.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = 0;
                break;
            case this.downkey:
                this.speedX = 0;
                break;
        }
    };
    Bin.prototype.update = function () {
        if (this.y > window.innerHeight - 100) {
            this.y = window.innerHeight - 100;
        }
        if (this.y < 0) {
            this.y = 1;
        }
        _super.prototype.move.call(this);
    };
    return Bin;
}(GameObject));
var Litter = (function (_super) {
    __extends(Litter, _super);
    function Litter(x, y, garbageClass) {
        var _this = _super.call(this, x, y, 1, 0, "litter") || this;
        _this.div.classList.add(garbageClass);
        return _this;
    }
    return Litter;
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
        this.bin1 = new Bin(window.innerWidth / 4 - 50, window.innerHeight - 100, 65, 68);
        this.bin2 = new Bin(window.innerWidth / 4 * 3 - 50, window.innerHeight - 100, 37, 39);
        this.litter = new Array;
        for (var i = 0; i < 40; i++) {
            setTimeout(function () { return _this.newLitter(); }, 1000 * i);
        }
    }
    PlayScreen.prototype.newLitter = function () {
        var garbageClass = "litter" + Math.floor((Math.random() * 5) + 1);
        this.litter.push(new Litter(Math.random() / 1.5 * window.innerWidth + 200, Math.random() / 6 * window.innerHeight, garbageClass));
    };
    PlayScreen.prototype.speedFaster = function () {
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var b = _a[_i];
            b.speedY += 0.01;
        }
    };
    PlayScreen.prototype.increaseSpeed = function () {
        var _this = this;
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
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
    PlayScreen.prototype.checkCollision = function () {
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var can = _a[_i];
            if ((can.getRectangle().left < (this.bin1.getRectangle().left + this.bin1.getRectangle().width)) && ((can.getRectangle().left + can.getRectangle().width) > this.bin1.getRectangle().left)) {
                if ((can.getRectangle().top + can.getRectangle().height) > this.bin2.getRectangle().top) {
                    can.removeMe();
                    this.litter.splice(this.litter.indexOf(can), 1);
                    this.scoreElement.innerHTML = "Score : " + this.score++;
                }
            }
            if ((can.getRectangle().left < (this.bin2.getRectangle().left + this.bin2.getRectangle().width)) && ((can.getRectangle().left + can.getRectangle().width) > this.bin2.getRectangle().left)) {
                if ((can.getRectangle().top + can.getRectangle().height) > (this.bin2.getRectangle().top)) {
                    can.removeMe();
                    this.litter.splice(this.litter.indexOf(can), 1);
                    this.scoreElement.innerHTML = "Score : " + this.score++;
                }
            }
        }
    };
    PlayScreen.prototype.update = function () {
        this.bin1.update();
        this.bin2.update();
        this.increaseSpeed();
        this.checkCollision();
        this.eraseLitterBad();
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var can = _a[_i];
            can.move();
        }
    };
    PlayScreen.prototype.eraseLitterBad = function () {
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.y > innerHeight) {
                i.removeMe();
                this.litter.splice(this.litter.indexOf(i), 1);
                if (this.litter.length == 0) {
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