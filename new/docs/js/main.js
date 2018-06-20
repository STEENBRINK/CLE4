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
var Credits = (function () {
    function Credits(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.splash = document.createElement("return");
        this.div.appendChild(this.splash);
        this.splash.innerHTML = "TERUG NAAR HET SPEL";
        this.event = (function () { return _this.splashClicked(); });
        this.div.addEventListener("click", this.event);
        this.credits = document.createElement("credits");
        this.div.appendChild(this.credits);
        this.credits.innerHTML = "CREDITS <br><br><br> Gemaakt Door <br> <br> Marleen van Lubeek <br> Bram Steenbrink <br><br><br> Gemaakt Voor <br> <br> Dieuwke van Woerden <br> Veerle van Woerden <br> Manouk Halderman <br><br><br> Met Dank Aan <br> <br> Bob Pikaar";
    }
    Credits.prototype.update = function () {
    };
    Credits.prototype.splashClicked = function () {
        this.removeMe();
        this.game.startAgain();
    };
    Credits.prototype.removeMe = function () {
        this.div.removeEventListener("click", this.event);
        this.div.remove();
    };
    return Credits;
}());
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
    GameObject.prototype.getDiv = function () {
        return this.div;
    };
    return GameObject;
}());
var Dragon = (function (_super) {
    __extends(Dragon, _super);
    function Dragon(g, p) {
        var _this = _super.call(this, 101, 100, 0, 5, "dragon") || this;
        _this.game = g;
        _this.paintings = new Array();
        _this.currentFrame = 1;
        _this.frameCheck = true;
        _this.facingRight = true;
        _this.paintingCounter = 0;
        _this.playscreen = p;
        _this.counterElement = document.createElement("countdown");
        document.body.appendChild(_this.counterElement);
        _this.counterElement.innerHTML = "40";
        _this.counterElement.style.left = ((window.innerWidth / 2) - (_this.counterElement.getBoundingClientRect().width / 2)) + "px";
        _this.Animation();
        _this.createPainting();
        return _this;
    }
    Dragon.prototype.update = function () {
        this.erasePaitnigsOutOfBounds();
        if (this.x >= window.innerWidth - this.getRectangle().width - 100 || this.x <= 100) {
            this.speedX *= -1;
        }
        if (this.speedX > 0) {
            this.facingRight = true;
        }
        else {
            this.facingRight = false;
        }
        for (var _i = 0, _a = this.paintings; _i < _a.length; _i++) {
            var painting = _a[_i];
            painting.move();
        }
        if (this.paintings.length == 0) {
            this.playscreen.removeMe();
            this.game.gameoverScreen();
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
    Dragon.prototype.createPainting = function () {
        var _this = this;
        var paintingClass = "painting" + Math.floor((Math.random() * 5) + 1);
        this.paintings.push(new Painting(this.x, this.y, paintingClass));
        if (this.paintingCounter < 40) {
            this.paintingCounter++;
            this.counterElement.innerHTML = "Schilderijen te gaan:" + (40 - this.paintingCounter);
            setTimeout(function () { return _this.createPainting(); }, (Math.random() * 500 + 1000));
        }
    };
    Dragon.prototype.speedFaster = function () {
        for (var _i = 0, _a = this.paintings; _i < _a.length; _i++) {
            var painting = _a[_i];
            painting.speedY += 0.01;
        }
    };
    Dragon.prototype.increaseSpeed = function () {
        var _this = this;
        for (var _i = 0, _a = this.paintings; _i < _a.length; _i++) {
            var painting = _a[_i];
            if (painting.speedY == 1) {
                setTimeout(function () { return _this.speedFaster(); }, 10000);
            }
            if (painting.speedY == 1.01) {
                setTimeout(function () { return _this.speedFaster(); }, 10000);
            }
            if (painting.speedY == 1.02) {
                setTimeout(function () { return _this.speedFaster(); }, 10000);
            }
        }
    };
    Dragon.prototype.getPaintings = function () {
        return this.paintings;
    };
    Dragon.prototype.erasePaitnigsOutOfBounds = function () {
        for (var _i = 0, _a = this.paintings; _i < _a.length; _i++) {
            var painting = _a[_i];
            if (painting.y > innerHeight) {
                painting.removeMe();
                this.paintings.splice(this.paintings.indexOf(painting), 1);
            }
        }
    };
    Dragon.prototype.removeMe = function () {
        this.counterElement.remove();
        _super.prototype.removeMe.call(this);
    };
    return Dragon;
}(GameObject));
var Painting = (function (_super) {
    __extends(Painting, _super);
    function Painting(x, y, paintingClass) {
        var _this = _super.call(this, x, y, 1, 0, "painting") || this;
        _this.div.classList.add(paintingClass);
        return _this;
    }
    return Painting;
}(GameObject));
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(x, y, leftkey, rightkey, facingRight, hueRotate) {
        var _this = _super.call(this, x, y, 0, 0, "knight") || this;
        _this.images = new Array();
        for (var i = 0; i < 18; i++) {
            _this.images.push(new Image());
            _this.images[i].src = "images/lgkw/r" + (i + 1) + ".png";
        }
        for (var i = 0; i < 18; i++) {
            _this.images.push(new Image());
            _this.images[i + 18].src = "images/lgkw/l" + (i + 1) + ".png";
        }
        _this.leftkey = leftkey;
        _this.rightkey = rightkey;
        _this.facingRight = facingRight;
        _this.frameCounter = 1;
        _this.goingRight = false;
        _this.goingLeft = false;
        if (hueRotate) {
            _this.div.style.webkitFilter = "hue-rotate(" + 230 + "deg)";
        }
        else {
            _this.div.style.webkitFilter = "hue-rotate(" + 150 + "deg)";
        }
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
                this.goingLeft = true;
                break;
            case this.rightkey:
                this.speedX = 10;
                this.facingRight = true;
                this.goingRight = true;
                break;
        }
    };
    Knight.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.leftkey:
                if (this.goingRight) {
                    this.speedX = 10;
                }
                else {
                    this.speedX = 0;
                }
                this.goingLeft = false;
                break;
            case this.rightkey:
                if (this.goingLeft) {
                    this.speedX = -10;
                }
                else {
                    this.speedX = 0;
                }
                this.goingRight = false;
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
        _super.prototype.removeMe.call(this);
    };
    Knight.prototype.Animation = function () {
        var _this = this;
        if (this.facingRight) {
            this.div.style.backgroundImage = "url(" + this.images[this.frameCounter - 1].src + ")";
            if (this.frameCounter == 18) {
                this.frameCounter = 1;
            }
            else {
                this.frameCounter++;
            }
        }
        else {
            this.div.style.backgroundImage = "url(" + this.images[this.frameCounter + 17].src + ")";
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
        this.audioElement = document.createElement("music");
        document.body.appendChild(this.audioElement);
        var sound = new SoundPlayer(this.audioElement, "music.mp3", true);
        this.gameLoop();
    }
    Game.prototype.showPlayScreen = function () {
        document.body.appendChild(this.backgroundElement);
        this.screen = new PlayScreen(this);
    };
    Game.prototype.gameoverScreen = function () {
        document.body.appendChild(this.backgroundElement);
        this.screen = new GameOverScreen(this.screen, this);
    };
    Game.prototype.startAgain = function () {
        document.body.appendChild(this.backgroundElement);
        this.screen = new StartScreen(this);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showCredits = function () {
        document.body.appendChild(this.backgroundElement);
        this.screen = new Credits(this);
    };
    Game.prototype.getAudioElement = function () {
        return this.audioElement;
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOverScreen = (function () {
    function GameOverScreen(p, g) {
        var _this = this;
        this.game = g;
        this.playScreen = p;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.goedGedaan = document.createElement("endgame");
        this.div.appendChild(this.goedGedaan);
        this.goedGedaan.innerHTML = "GOED GEDAAN!";
        this.text = document.createElement("text");
        this.div.appendChild(this.text);
        this.text.innerHTML = "Bedankt voor het helpen!";
        this.scoreElement = document.createElement('endscore');
        this.div.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : " + (this.playScreen.score - 1);
        this.restartElement = document.createElement('restart');
        this.div.appendChild(this.restartElement);
        this.restartElement.innerHTML = "START OPNIEUW!";
        this.restartEvent = (function () { return _this.buttonClicked(); });
        this.restartElement.addEventListener("click", this.restartEvent);
        this.restartElement.style.top = (window.innerHeight / 2 - this.restartElement.getBoundingClientRect().height / 2 + 100) + "px";
        this.restartElement.style.left = (window.innerWidth / 2 - this.restartElement.getBoundingClientRect().width / 2) + "px";
        this.creditElement = document.createElement("creditlink");
        this.div.appendChild(this.creditElement);
        this.creditElement.innerHTML = "CREDITS";
        this.creditEvent = (function () { return _this.creditsClicked(); });
        this.creditElement.addEventListener("click", this.creditEvent);
        this.creditElement.style.top = (window.innerHeight / 2 - this.creditElement.getBoundingClientRect().height / 2 + 200) + "px";
        this.creditElement.style.left = (window.innerWidth / 2 - this.creditElement.getBoundingClientRect().width / 2) + "px";
    }
    GameOverScreen.prototype.update = function () {
    };
    GameOverScreen.prototype.buttonClicked = function () {
        this.restartElement.removeEventListener("click", this.restartEvent);
        this.creditElement.removeEventListener("click", this.creditEvent);
        this.div.remove();
        this.game.startAgain();
    };
    GameOverScreen.prototype.creditsClicked = function () {
        this.restartElement.removeEventListener("click", this.restartEvent);
        this.creditElement.removeEventListener("click", this.creditEvent);
        this.div.remove();
        this.game.showCredits();
    };
    return GameOverScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.div = document.createElement("playscreen");
        document.body.appendChild(this.div);
        this.currentPainting = "";
        this.currentPaintingElement = document.createElement("display");
        this.div.appendChild(this.currentPaintingElement);
        this.currentPaintingText = document.createElement("paintingtext");
        this.div.appendChild(this.currentPaintingText);
        this.game = g;
        this.score = 1;
        this.dragon = new Dragon(g, this);
        this.scoreElement = document.createElement('score');
        this.div.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : 0";
        this.knight1 = new Knight(window.innerWidth / 4 - 50, window.innerHeight - 90, 65, 68, true, true);
        this.knight2 = new Knight(window.innerWidth / 4 * 3 - 50, window.innerHeight - 90, 37, 39, false, false);
        this.currentPainting = "painting" + Math.floor((Math.random() * 5) + 1);
        this.currentPaintingElement.classList.add(this.currentPainting);
        this.setCurrentPainting();
    }
    PlayScreen.prototype.checkCollision = function () {
        for (var _i = 0, _a = this.dragon.getPaintings(); _i < _a.length; _i++) {
            var painting = _a[_i];
            if ((painting.getRectangle().left < (this.knight1.getRectangle().left + this.knight1.getRectangle().width)) && ((painting.getRectangle().left + painting.getRectangle().width) > this.knight1.getRectangle().left)) {
                if ((painting.getRectangle().top + painting.getRectangle().height) > this.knight2.getRectangle().top) {
                    painting.removeMe();
                    this.dragon.getPaintings().splice(this.dragon.getPaintings().indexOf(painting), 1);
                    if (painting.getDiv().classList.contains(this.currentPainting)) {
                        this.scoreElement.innerHTML = "Score : " + this.score++;
                        var sound = new SoundPlayer(this.game.getAudioElement(), "painting_good.wav", false);
                    }
                    else {
                        this.scoreElement.innerHTML = "Score : " + this.score--;
                        var sound = new SoundPlayer(this.game.getAudioElement(), "painting_bad.wav", false);
                    }
                }
            }
            if ((painting.getRectangle().left < (this.knight2.getRectangle().left + this.knight2.getRectangle().width)) && ((painting.getRectangle().left + painting.getRectangle().width) > this.knight2.getRectangle().left)) {
                if ((painting.getRectangle().top + painting.getRectangle().height) > (this.knight2.getRectangle().top)) {
                    painting.removeMe();
                    this.dragon.getPaintings().splice(this.dragon.getPaintings().indexOf(painting), 1);
                    if (painting.getDiv().classList.contains(this.currentPainting)) {
                        this.scoreElement.innerHTML = "Score : " + this.score++;
                    }
                    else {
                        this.scoreElement.innerHTML = "Score : " + this.score--;
                    }
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
    PlayScreen.prototype.setCurrentPainting = function () {
        var _this = this;
        this.currentPaintingElement.classList.remove(this.currentPainting);
        this.currentPainting = "painting" + Math.floor((Math.random() * 5) + 1);
        this.currentPaintingElement.classList.add(this.currentPainting);
        switch (this.currentPainting) {
            case "painting1":
                this.currentPaintingText.innerHTML = "Van Gogh";
                break;
            case "painting2":
                this.currentPaintingText.innerHTML = "Frida Kahlo";
                break;
            case "painting3":
                this.currentPaintingText.innerHTML = "Da Vinci";
                break;
            case "painting4":
                this.currentPaintingText.innerHTML = "Vermeer";
                break;
            case "painting5":
                this.currentPaintingText.innerHTML = "Klimt";
                break;
        }
        setTimeout(function () { return _this.setCurrentPainting(); }, 10000);
    };
    PlayScreen.prototype.removeMe = function () {
        this.dragon.removeMe();
        this.div.remove();
        this.knight1.removeMe();
        this.knight2.removeMe();
    };
    return PlayScreen;
}());
var SoundPlayer = (function () {
    function SoundPlayer(html, name, doLoop) {
        var audio = document.createElement("audio");
        audio.src = "../docs/audio/" + name;
        audio.loop = doLoop;
        audio.play();
        html.appendChild(audio);
    }
    return SoundPlayer;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("div");
        document.body.appendChild(this.div);
        this.splash = document.createElement("splash");
        this.div.appendChild(this.splash);
        this.splash.innerHTML = "START HET SPEL";
        this.event = (function () { return _this.splashClicked(); });
        this.div.addEventListener("click", this.event);
        this.instr = document.createElement("instruction");
        this.div.appendChild(this.instr);
        this.instr.innerHTML = "Probeer alle schilderijern te vangen van de schilder die je ziet!";
        this.keys = document.createElement("keysPlayerOne");
        this.div.appendChild(this.keys);
        this.keys.innerHTML = "SPELER 1";
        this.keys = document.createElement("keyswasd");
        this.div.appendChild(this.keys);
        this.keys2 = document.createElement("keysPlayerTwo");
        this.div.appendChild(this.keys2);
        this.keys2.innerHTML = "SPELER 2";
        this.keys2 = document.createElement("keysarrow");
        this.div.appendChild(this.keys2);
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.removeMe();
        this.game.showPlayScreen();
    };
    StartScreen.prototype.removeMe = function () {
        this.div.removeEventListener("click", this.event);
        this.div.remove();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map