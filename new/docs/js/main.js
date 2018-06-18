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
        this.div = document.createElement(object);
        document.body.appendChild(this.div);
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
var Dragon = (function (_super) {
    __extends(Dragon, _super);
    function Dragon(g) {
        var _this = _super.call(this, 101, 100, 0, 5, "dragon") || this;
        _this.game = g;
        _this.litter = new Array();
        _this.currentFrame = 1;
        _this.frameCheck = true;
        _this.facingRight = true;
        _this.litterCounter = 0;
        _this.Animation();
        _this.createLitter();
        return _this;
    }
    Dragon.prototype.update = function () {
        this.eraseBallsBad();
        if (this.x >= window.innerWidth - this.getRectangle().width - 100 || this.x <= 100) {
            this.speedX *= -1;
        }
        if (this.speedX > 0) {
            this.facingRight = true;
        }
        else {
            this.facingRight = false;
        }
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var can = _a[_i];
            can.move();
        }
        if (this.litter.length == 0) {
            this.game.showGameScreen();
        }
        this.increaseSpeed();
        _super.prototype.move.call(this);
    };
    Dragon.prototype.Animation = function () {
        var _this = this;
        if (this.facingRight) {
            this.div.style.backgroundImage = "url(../docs/images/dragonright" + this.currentFrame + ".png)";
            if (this.frameCheck) {
                this.currentFrame++;
                if (this.currentFrame = 3) {
                    this.frameCheck = false;
                }
            }
            else {
                this.currentFrame--;
                if (this.currentFrame = 1) {
                    this.frameCheck = true;
                }
            }
        }
        else {
            this.div.style.backgroundImage = "url(../docs/images/dragonleft" + this.currentFrame + ".png)";
            if (this.frameCheck) {
                this.currentFrame++;
                if (this.currentFrame = 3) {
                    this.frameCheck = false;
                }
            }
            else {
                this.currentFrame--;
                if (this.currentFrame = 1) {
                    this.frameCheck = true;
                }
            }
        }
        setTimeout(function () { return _this.Animation(); }, 180);
    };
    Dragon.prototype.createLitter = function () {
        var _this = this;
        this.litter.push(new Litter(this.x, this.y));
        if (this.litterCounter < 400) {
            setTimeout(function () { return _this.createLitter(); }, (Math.random() * 500 + 1000));
            this.litterCounter++;
        }
    };
    Dragon.prototype.speedFaster = function () {
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var b = _a[_i];
            b.speedY += 0.01;
        }
    };
    Dragon.prototype.increaseSpeed = function () {
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
    Dragon.prototype.getLitter = function () {
        return this.litter;
    };
    Dragon.prototype.eraseBallsBad = function () {
        for (var _i = 0, _a = this.litter; _i < _a.length; _i++) {
            var can = _a[_i];
            if (can.y > innerHeight) {
                can.removeMe();
                this.litter.splice(this.litter.indexOf(can), 1);
            }
        }
    };
    return Dragon;
}(GameObject));
var Litter = (function (_super) {
    __extends(Litter, _super);
    function Litter(x, y) {
        return _super.call(this, x, y, 1, 0, "litter") || this;
    }
    return Litter;
}(GameObject));
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(x, y, leftkey, rightkey, facingRight) {
        var _this = _super.call(this, x, y, 0, 0, "knight") || this;
        var tempHTML = document.createElement("temp");
        document.body.appendChild(tempHTML);
        for (var i = 0; i < 18; i++) {
            tempHTML.style.backgroundImage = "url(../docs/images/lgkw/l" + (i + 1) + ".png)";
        }
        for (var i = 0; i < 18; i++) {
            tempHTML.style.backgroundImage = "url(../docs/images/lgkw/r" + (i + 1) + ".png)";
        }
        tempHTML.remove();
        _this.leftkey = leftkey;
        _this.rightkey = rightkey;
        _this.facingRight = facingRight;
        _this.frameCounter = 1;
        _this.eListenerDown = function (e) { return _this.onKeyDown(e); };
        _this.eListenerUp = function (e) { return _this.onKeyUp(e); };
        window.addEventListener("keydown", _this.eListenerDown);
        window.addEventListener("keyup", _this.eListenerUp);
        _this.Animation();
        return _this;
    }
    Knight.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.speedX = -10;
                this.facingRight = false;
                break;
            case this.rightkey:
                this.speedX = 10;
                this.facingRight = true;
                break;
        }
    };
    Knight.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.speedX = 0;
                break;
            case this.rightkey:
                this.speedX = 0;
                break;
        }
    };
    Knight.prototype.update = function () {
        if (this.x >= window.innerWidth - this.getRectangle().width) {
            this.x = window.innerWidth - this.getRectangle().width;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        _super.prototype.move.call(this);
    };
    Knight.prototype.removeMe = function () {
        window.removeEventListener("keydown", this.eListenerDown);
        window.removeEventListener("keyup", this.eListenerUp);
        this.div.remove();
    };
    Knight.prototype.Animation = function () {
        var _this = this;
        if (this.facingRight) {
            this.div.style.backgroundImage = "url(../docs/images/lgkw/r" + this.frameCounter + ".png)";
            if (this.frameCounter == 18) {
                this.frameCounter = 1;
            }
            else {
                this.frameCounter++;
            }
        }
        else {
            this.div.style.backgroundImage = "url(../docs/images/lgkw/l" + this.frameCounter + ".png)";
            if (this.frameCounter == 18) {
                this.frameCounter = 1;
            }
            else {
                this.frameCounter++;
            }
        }
        setTimeout(function () { return _this.Animation(); }, 50);
    };
    return Knight;
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
        this.div.innerHTML = "GOED GEDAAN!";
        this.text = document.createElement("text");
        document.body.appendChild(this.text);
        this.text.innerHTML = "Bedankt voor het helpen!";
        this.scoreElement = document.createElement('endscore');
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : " + (this.playScreen.score - 1);
        this.restartElement = document.createElement('restart');
        document.body.appendChild(this.restartElement);
        this.restartElement.innerHTML = "START OPNIEUW!";
        this.restartEvent = (function () { return _this.buttonClicked(); });
        this.restartElement.addEventListener("click", this.restartEvent);
        this.restartElement.style.top = (window.innerHeight / 2 - this.restartElement.getBoundingClientRect().height / 2 + 100) + "px";
        this.restartElement.style.left = (window.innerWidth / 2 - this.restartElement.getBoundingClientRect().width / 2) + "px";
    }
    GameOverScreen.prototype.update = function () {
    };
    GameOverScreen.prototype.buttonClicked = function () {
        this.restartElement.removeEventListener("click", this.restartEvent);
        this.div.remove();
        this.game.startAgain();
    };
    return GameOverScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.game = g;
        this.score = 1;
        this.dragon = new Dragon(g);
        this.scoreElement = document.createElement('score');
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : 0";
        this.knight1 = new Knight(window.innerWidth / 4 - 50, window.innerHeight - 250, 65, 68, true);
        this.knight2 = new Knight(window.innerWidth / 4 * 3 - 50, window.innerHeight - 250, 37, 39, false);
    }
    PlayScreen.prototype.checkCollision = function () {
        for (var _i = 0, _a = this.dragon.getLitter(); _i < _a.length; _i++) {
            var can = _a[_i];
            if ((can.getRectangle().left < (this.knight1.getRectangle().left + this.knight1.getRectangle().width)) && ((can.getRectangle().left + can.getRectangle().width) > this.knight1.getRectangle().left)) {
                if ((can.getRectangle().top + can.getRectangle().height) > this.knight2.getRectangle().top) {
                    can.removeMe();
                    this.dragon.getLitter().splice(this.dragon.getLitter().indexOf(can), 1);
                    this.scoreElement.innerHTML = "Score : " + this.score++;
                }
            }
            if ((can.getRectangle().left < (this.knight2.getRectangle().left + this.knight2.getRectangle().width)) && ((can.getRectangle().left + can.getRectangle().width) > this.knight2.getRectangle().left)) {
                if ((can.getRectangle().top + can.getRectangle().height) > (this.knight2.getRectangle().top)) {
                    can.removeMe();
                    this.dragon.getLitter().splice(this.dragon.getLitter().indexOf(can), 1);
                    this.scoreElement.innerHTML = "Score : " + this.score++;
                }
            }
        }
    };
    PlayScreen.prototype.update = function () {
        this.knight1.update();
        this.knight2.update();
        this.dragon.update();
        this.checkCollision();
    };
    return PlayScreen;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.innerHTML = "START HET SPEL";
        this.click();
        this.instr = document.createElement("instruction");
        document.body.appendChild(this.instr);
        this.instr.innerHTML = "Redt de natuur door al het afval te verzamelen";
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