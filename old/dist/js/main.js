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
var Background = (function () {
    function Background(backLayerImage, frontLayerImage, animation) {
        this.createBackground();
        this.backLayer(backLayerImage);
        this.midLayer();
        this.animation = animation;
        this.frontLayer(frontLayerImage, this.animation);
    }
    Background.prototype.createBackground = function () {
        var background = document.createElement("background");
        background.setAttribute("id", "background");
        document.body.appendChild(background);
    };
    Background.prototype.backLayer = function (backLayerImage) {
        var backLayer = document.createElement("backLayer");
        backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".jpg\")";
        document.getElementById("background").appendChild(backLayer);
    };
    Background.prototype.midLayer = function () {
        this.backgroundItems = new backgroundItems(26, 36, "backgroundItemsmall", "small");
        this.backgroundItems = new backgroundItems(16, 26, "backgroundItemMedium", "medium");
        this.backgroundItems = new backgroundItems(6, 16, "backgroundItemLarge", "large");
    };
    Background.prototype.frontLayer = function (frontLayerImage, animation) {
        var frontLayer = document.createElement("frontLayer");
        frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
        document.getElementById("background").appendChild(frontLayer);
        if (animation == true) {
            frontLayer.style.animation = "changeFrontLayer 210000ms linear";
            frontLayer.style.animationFillMode = "forwards";
        }
    };
    return Background;
}());
var backgroundItems = (function () {
    function backgroundItems(start, end, div, size) {
        this.start = start;
        this.end = end;
        this.size = size;
        for (var i = this.start; i < this.end; i++) {
            var backgroundItem = document.createElement(div);
            var randomImage = Math.floor(Math.random() * 15 + 1);
            var positionX = window.innerWidth;
            var randomPositionY = Math.floor(Math.random() * window.innerHeight);
            var randomAnimationSpeed = i;
            backgroundItem.style.backgroundImage = "url(\"../images/backgrounds/villager" + randomImage + this.size + ".png\")";
            backgroundItem.style.transform = "translatez(0)";
            backgroundItem.style.left = positionX + "px";
            backgroundItem.style.top = randomPositionY + "px";
            backgroundItem.style.animation = "backgroundItemMove " + randomAnimationSpeed + "s linear infinite";
            document.getElementById("background").appendChild(backgroundItem);
        }
    }
    return backgroundItems;
}());
var GameObject = (function () {
    function GameObject(pos) {
        this.position = pos;
    }
    GameObject.prototype.changeImage = function (image) {
        this.div.style.backgroundImage = (image);
    };
    return GameObject;
}());
var glasses1Scale;
var glasses2Scale;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(left, right, up, down, pos, playerNumber) {
        var _this = _super.call(this, pos) || this;
        _this.playerNumber = playerNumber;
        _this.upkey = up;
        _this.downkey = down;
        _this.leftkey = left;
        _this.rightkey = right;
        _this.speed = new Vector(0, 0);
        _this.rightSpeed = new Vector(0, 0);
        _this.leftSpeed = new Vector(0, 0);
        _this.upSpeed = new Vector(0, 0);
        _this.downSpeed = new Vector(0, 0);
        _this.width = 200;
        _this.height = 200;
        window.addEventListener("keydown", _this.onKeyDown.bind(_this));
        window.addEventListener("keyup", _this.onKeyUp.bind(_this));
        return _this;
    }
    Player.prototype.FireDragon = function (fireDragon) {
        if (this.rectangle.hitsOtherRectangle(fireDragon.rectangle)) {
            return true;
        }
    };
    Player.prototype.getBounds = function () {
        return new Rectangle(this.position, this.width, this.height);
    };
    ;
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, -10);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 10);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(-10, 0);
                switch (this.playerNumber) {
                    case 1:
                        glasses1Scale = "scaleX(-1)";
                        document.getElementById("character1Body").style.transform = "scaleX(-1)";
                        document.getElementById("character1Mouth").style.transform = "scaleX(-1)";
                        document.getElementById("character1Glasses").style.transform = glasses1Scale;
                        break;
                    case 2:
                        glasses2Scale = "scaleX(-1)";
                        document.getElementById("character2Body").style.transform = "scaleX(-1)";
                        document.getElementById("character2Mouth").style.transform = "scaleX(-1)";
                        document.getElementById("character2Glasses").style.transform = glasses2Scale;
                        break;
                }
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(10, 0);
                switch (this.playerNumber) {
                    case 1:
                        glasses1Scale = "scaleX(1)";
                        document.getElementById("character1Body").style.transform = "scaleX(1)";
                        document.getElementById("character1Mouth").style.transform = "scaleX(1)";
                        document.getElementById("character1Glasses").style.transform = glasses1Scale;
                        break;
                    case 2:
                        glasses2Scale = "scaleX(1)";
                        document.getElementById("character2Body").style.transform = "scaleX(1)";
                        document.getElementById("character2Mouth").style.transform = "scaleX(1)";
                        document.getElementById("character2Glasses").style.transform = glasses2Scale;
                        break;
                }
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, 0);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 0);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(0, 0);
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(0, 0);
                break;
        }
    };
    Player.prototype.move = function () {
        this.hitboxPosition = new Vector(this.position.x + 25, this.position.y + 25);
        this.rectangle = new Rectangle(this.hitboxPosition, 100, 100);
        this.position = this.position.add(this.leftSpeed.add(this.rightSpeed));
        this.position = this.position.add(this.upSpeed.add(this.downSpeed));
        switch (this.playerNumber) {
            case 1:
                document.getElementById("character1").style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
                break;
            case 2:
                document.getElementById("character2").style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
                break;
        }
        this.position.x = this.clamp(this.position.x, 0, window.innerWidth - this.width);
        this.position.y = this.clamp(this.position.y, 0, window.innerHeight - this.height);
    };
    Player.prototype.clamp = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };
    return Player;
}(GameObject));
var glassesNumber1 = 1;
var glassesNumber2 = 1;
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(left, right, up, down, pos, playerNumber) {
        var _this = _super.call(this, left, right, up, down, pos, playerNumber) || this;
        _this.characterNumber = playerNumber;
        _this.div = document.createElement("character");
        _this.div.setAttribute("id", "character" + _this.characterNumber);
        document.getElementById("background").appendChild(_this.div);
        _this.body = document.createElement("characterBody");
        _this.body.setAttribute("id", "character" + _this.characterNumber + "Body");
        document.getElementById("character" + _this.characterNumber).appendChild(_this.body);
        _this.mouth = document.createElement("characterMouth");
        _this.mouth.setAttribute("id", "character" + _this.characterNumber + "Mouth");
        document.getElementById("character" + _this.characterNumber).appendChild(_this.mouth);
        _this.glasses = document.createElement("characterGlasses");
        _this.glasses.setAttribute("id", "character" + _this.characterNumber + "Glasses");
        switch (_this.characterNumber) {
            case 1:
                _this.glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber1 + ".png')";
                document.getElementById("character" + _this.characterNumber).appendChild(_this.glasses);
                break;
            case 2:
                _this.glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber2 + ".png')";
                document.getElementById("character" + _this.characterNumber).appendChild(_this.glasses);
                break;
        }
        return _this;
    }
    return Character;
}(Player));
var CharacterSelect = (function () {
    function CharacterSelect(playerCount) {
        var _this = this;
        this.chooseGlasses1 = function () {
            if (glassesNumber1 == 16) {
                glassesNumber1 = 1;
                _this.changeGlasses1();
            }
            else {
                glassesNumber1 += 1;
                _this.changeGlasses1();
            }
        };
        this.chooseGlasses1Prev = function () {
            if (glassesNumber1 == 1) {
                glassesNumber1 = 15;
                _this.changeGlasses1();
            }
            else {
                glassesNumber1 -= 1;
                _this.changeGlasses1();
            }
        };
        this.changeGlasses1 = function () {
            var glasses = document.getElementById("player1Glasses");
            glasses.style.backgroundImage = "url(\"../images/player/glasses" + glassesNumber1 + ".png\")";
        };
        this.chooseGlasses2 = function () {
            if (glassesNumber2 == 16) {
                glassesNumber2 = 1;
                _this.changeGlasses2();
            }
            else {
                glassesNumber2 += 1;
                _this.changeGlasses2();
            }
        };
        this.chooseGlasses2Prev = function () {
            if (glassesNumber2 == 1) {
                glassesNumber2 = 15;
                _this.changeGlasses2();
            }
            else {
                glassesNumber2 -= 1;
                _this.changeGlasses2();
            }
        };
        this.changeGlasses2 = function () {
            var glasses = document.getElementById("player2Glasses");
            glasses.style.backgroundImage = "url(\"../images/player/glasses" + glassesNumber2 + ".png\")";
        };
        this.gameMode(playerCount);
    }
    CharacterSelect.prototype.goBack = function () {
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen();
    };
    CharacterSelect.prototype.singleplayer = function () {
        new Level1(1);
    };
    CharacterSelect.prototype.multiplayer = function () {
        new Level1(2);
    };
    CharacterSelect.prototype.gameMode = function (playerCount) {
        if (playerCount == 1) {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background_1 = new Background(1, 1, false);
            var music = new Music(2, 1);
            var backButton = document.createElement("backButton");
            backButton.setAttribute("id", "backButton");
            document.getElementById("background").appendChild(backButton);
            document.getElementById("backButton").addEventListener("click", this.goBack);
            var player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "50%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            var player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            var player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber1 + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            var controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            controllers.style.marginLeft = "-150px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "50%";
            var arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.marginLeft = "-57.5px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "50%";
            arrowUpButton.style.backgroundImage = "url('../images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.marginLeft = "-57.5px";
            arrowRightButton.style.top = "64%";
            arrowRightButton.style.left = "55.2%";
            arrowRightButton.style.backgroundImage = "url('../images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id", "arrowUpButton");
            var arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.marginLeft = "-57.5px";
            arrowDownButton.style.top = "64%";
            arrowDownButton.style.left = "50%";
            arrowDownButton.style.backgroundImage = "url('../images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id", "arrowDownButton");
            var arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.marginLeft = "-57.5px";
            arrowLeftButton.style.top = "64%";
            arrowLeftButton.style.left = "45%";
            arrowLeftButton.style.backgroundImage = "url('../images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var buttonRight_1 = document.createElement("chooseButtonRight");
            buttonRight_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight_1.style.cursor = "pointer";
            buttonRight_1.style.width = "82px";
            buttonRight_1.style.height = "110px";
            buttonRight_1.style.transform = "scale(" + -1 + ")";
            buttonRight_1.style.top = "30%";
            buttonRight_1.style.left = "60%";
            buttonRight_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight_1);
            buttonRight_1.setAttribute("id", "buttonRight");
            document.getElementById("buttonRight").addEventListener("click", this.chooseGlasses1);
            buttonRight_1.onmouseover = function () {
                buttonRight_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonRight_1.onmouseleave = function () {
                buttonRight_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var buttonLeft_1 = document.createElement("chooseButtonLeft");
            buttonLeft_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft_1.style.cursor = "pointer";
            buttonLeft_1.style.width = "80px";
            buttonLeft_1.style.height = "110px";
            buttonLeft_1.style.top = "30%";
            buttonLeft_1.style.left = "40%";
            buttonLeft_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft_1);
            buttonLeft_1.setAttribute("id", "buttonLeft");
            document.getElementById("buttonLeft").addEventListener("click", this.chooseGlasses1Prev);
            buttonLeft_1.onmouseover = function () {
                buttonLeft_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonLeft_1.onmouseleave = function () {
                buttonLeft_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('../images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "50%";
            startButton.style.marginLeft = "-142.5px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.singleplayer);
            startButton.onmouseover = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton-hover.png\")";
            };
            startButton.onmouseleave = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton.png\")";
            };
        }
        else {
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1, 1, false);
            var music = new Music(2, 1);
            var backButton = document.createElement("backButton");
            backButton.setAttribute("id", "backButton");
            document.getElementById("background").appendChild(backButton);
            document.getElementById("backButton").addEventListener("click", this.goBack);
            var player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "75%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            var player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            var player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber1 + ".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
            var buttonRight1_1 = document.createElement("chooseButtonRight1");
            buttonRight1_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight1_1.style.cursor = "pointer";
            buttonRight1_1.style.width = "82px";
            buttonRight1_1.style.height = "110px";
            buttonRight1_1.style.transform = "scale(" + -1 + ")";
            buttonRight1_1.style.top = "30%";
            buttonRight1_1.style.left = "85%";
            buttonRight1_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight1_1);
            buttonRight1_1.setAttribute("id", "buttonRight1");
            document.getElementById("buttonRight1").addEventListener("click", this.chooseGlasses1);
            buttonRight1_1.onmouseover = function () {
                buttonRight1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonRight1_1.onmouseleave = function () {
                buttonRight1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var buttonLeft1_1 = document.createElement("chooseButtonLeft1");
            buttonLeft1_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft1_1.style.cursor = "pointer";
            buttonLeft1_1.style.width = "80px";
            buttonLeft1_1.style.height = "110px";
            buttonLeft1_1.style.top = "30%";
            buttonLeft1_1.style.left = "65%";
            buttonLeft1_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft1_1);
            buttonLeft1_1.setAttribute("id", "buttonLeft1");
            document.getElementById("buttonLeft1").addEventListener("click", this.chooseGlasses1Prev);
            buttonLeft1_1.onmouseover = function () {
                buttonLeft1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonLeft1_1.onmouseleave = function () {
                buttonLeft1_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var player2 = document.createElement("choosePlayer2");
            player2.setAttribute("id", "choosePlayer2");
            player2.style.backgroundImage = "url('../images/player/player.png')";
            player2.style.width = "200px";
            player2.style.height = "200px";
            player2.style.top = "25%";
            player2.style.left = "25%";
            player2.style.marginLeft = "-100px";
            player2.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player2);
            var player2Mouth = document.createElement("player2Mouth");
            player2Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player2Mouth.style.width = "200px";
            player2Mouth.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Mouth);
            var player2Glasses = document.createElement("player2Glasses");
            player2Glasses.style.backgroundImage = "url('../images/player/glasses" + glassesNumber2 + ".png')";
            player2Glasses.style.width = "200px";
            player2Glasses.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Glasses);
            player2Glasses.setAttribute("id", "player2Glasses");
            var controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "68%";
            var controllers2 = document.createElement('controllers2');
            controllers2.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers2.style.width = "300px";
            controllers2.style.height = "123px";
            document.getElementById("background").appendChild(controllers2);
            controllers2.style.top = "45%";
            controllers2.style.left = "18%";
            var arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "72.6%";
            arrowUpButton.style.backgroundImage = "url('../images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.top = "64.1%";
            arrowRightButton.style.left = "77.5%";
            arrowRightButton.style.backgroundImage = "url('../images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id", "arrowUpButton");
            var arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.top = "64.1%";
            arrowDownButton.style.left = "72.5%";
            arrowDownButton.style.backgroundImage = "url('../images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id", "arrowDownButton");
            var arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.top = "64.1%";
            arrowLeftButton.style.left = "67.7%";
            arrowLeftButton.style.backgroundImage = "url('../images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id", "arrowUpButton");
            var wButton = document.createElement('wButton');
            wButton.style.height = "115px";
            wButton.style.width = "115px";
            wButton.style.top = "54.3%";
            wButton.style.left = "22.1%";
            wButton.style.backgroundImage = "url('../images/interface/icons/w-button.png')";
            document.getElementById('background').appendChild(wButton);
            wButton.setAttribute("id", "wButton");
            var dButton = document.createElement('dButton');
            dButton.style.height = "115px";
            dButton.style.width = "115px";
            dButton.style.top = "64.1%";
            dButton.style.left = "27%";
            dButton.style.backgroundImage = "url('../images/interface/icons/d-button.png')";
            document.getElementById('background').appendChild(dButton);
            dButton.setAttribute("id", "dButton");
            var sButton = document.createElement('sButton');
            sButton.style.height = "115px";
            sButton.style.width = "115px";
            sButton.style.top = "64.1%";
            sButton.style.left = "22.1%";
            sButton.style.backgroundImage = "url('../images/interface/icons/s-button.png')";
            document.getElementById('background').appendChild(sButton);
            sButton.setAttribute("id", "sButton");
            var aButton = document.createElement('aButton');
            aButton.style.height = "115px";
            aButton.style.width = "115px";
            aButton.style.top = "64.1%";
            aButton.style.left = "17.2%";
            aButton.style.backgroundImage = "url('../images/interface/icons/a-button.png')";
            document.getElementById('background').appendChild(aButton);
            aButton.setAttribute("id", "aButton");
            var buttonRight2_1 = document.createElement("chooseButtonRight1");
            buttonRight2_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight2_1.style.cursor = "pointer";
            buttonRight2_1.style.width = "82px";
            buttonRight2_1.style.height = "110px";
            buttonRight2_1.style.transform = "scale(" + -1 + ")";
            buttonRight2_1.style.top = "30%";
            buttonRight2_1.style.left = "35%";
            buttonRight2_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight2_1);
            buttonRight2_1.setAttribute("id", "buttonRight2");
            document.getElementById("buttonRight2").addEventListener("click", this.chooseGlasses2);
            buttonRight2_1.onmouseover = function () {
                buttonRight2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonRight2_1.onmouseleave = function () {
                buttonRight2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var buttonLeft2_1 = document.createElement("chooseButtonLeft1");
            buttonLeft2_1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft2_1.style.cursor = "pointer";
            buttonLeft2_1.style.width = "80px";
            buttonLeft2_1.style.height = "110px";
            buttonLeft2_1.style.top = "30%";
            buttonLeft2_1.style.left = "15%";
            buttonLeft2_1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft2_1);
            buttonLeft2_1.setAttribute("id", "buttonLeft2");
            document.getElementById("buttonLeft2").addEventListener("click", this.chooseGlasses2Prev);
            buttonLeft2_1.onmouseover = function () {
                buttonLeft2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            };
            buttonLeft2_1.onmouseleave = function () {
                buttonLeft2_1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            };
            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('../images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "47%";
            startButton.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.multiplayer);
            startButton.onmouseover = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton-hover.png\")";
            };
            startButton.onmouseleave = function () {
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton.png\")";
            };
        }
    };
    return CharacterSelect;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(pos) {
        return _super.call(this, pos) || this;
    }
    Enemy.prototype.randomPosition = function () {
        var random = Math.floor(Math.random() * 4) + 1;
        if (random == 1) {
            var x = -125;
            var y = Math.floor(Math.random() * window.innerHeight);
            return new Vector(x, y);
        }
        else if (random == 2) {
            var x = window.innerWidth + 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        }
        else if (random == 3) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = -125;
            return new Vector(x, y);
        }
        else if (random == 4) {
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = window.innerHeight + 125;
            return new Vector(x, y);
        }
    };
    Enemy.prototype.hitsLife = function (life) {
        if (this.rectangle.hitsOtherRectangle(life.rectangle)) {
            return true;
        }
    };
    Enemy.prototype.remove = function () {
        this.div.remove();
    };
    return Enemy;
}(GameObject));
var FireDragon = (function (_super) {
    __extends(FireDragon, _super);
    function FireDragon(id, pos) {
        var _this = _super.call(this, pos) || this;
        _this.counter = 300;
        _this.id = id;
        _this.div = document.createElement("firedragon");
        _this.div.setAttribute("id", "firedragon" + _this.id);
        _this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(_this.div);
        _this.position = _this.randomPosition();
        _this.div.style.transform = "translate(" + _this.position.x + "px, " + _this.position.y + "px)";
        _this.random = (Math.random() * 1.5) + 0.5;
        return _this;
    }
    FireDragon.prototype.move = function (life) {
        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(this.random);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectanglePosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.rectangle = new Rectangle(this.position, 75, 75);
        this.hitboxPosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300, 300);
    };
    return FireDragon;
}(Enemy));
var Game = (function () {
    function Game() {
        new Titlescreen();
    }
    return Game;
}());
var GameOver = (function () {
    function GameOver(score, playerCount) {
        var background = new Background(1, 1, false);
        this.playerCount = playerCount;
        this.finalScore = score;
        document.getElementById("background").style.cursor = "auto";
        this.createFinalScore();
    }
    GameOver.prototype.levelload1 = function () {
        if (this.playerCount == 1) {
            new Level1(1);
        }
        else {
            new Level1(2);
        }
    };
    GameOver.prototype.goBack = function () {
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen();
    };
    GameOver.prototype.createFinalScore = function () {
        var _this = this;
        this.feedbackDiv = document.createElement("span");
        this.feedbackDiv.setAttribute("id", "feedback");
        document.getElementById("background").appendChild(this.feedbackDiv);
        this.scoreContainerDiv = document.createElement("span");
        this.scoreContainerDiv.setAttribute("id", "score-container");
        document.getElementById("background").appendChild(this.scoreContainerDiv);
        this.scoreDiv = document.createElement("span");
        this.scoreDiv.setAttribute("id", "score");
        document.getElementById("score-container").appendChild(this.scoreDiv);
        this.totalContainerDiv = document.createElement("span");
        this.totalContainerDiv.setAttribute("id", "total-container");
        document.getElementById("score-container").appendChild(this.totalContainerDiv);
        this.totalDiv = document.createElement("span");
        this.totalDiv.setAttribute("id", "total");
        this.totalDiv.innerHTML = "" + this.finalScore;
        document.getElementById("total-container").appendChild(this.totalDiv);
        this.tryAgainDiv = document.createElement("span");
        this.tryAgainDiv.setAttribute("id", "tryAgain");
        document.getElementById("background").appendChild(this.tryAgainDiv);
        this.buttonYes = document.createElement("span");
        this.buttonYes.setAttribute("id", "resetGame");
        document.getElementById("background").appendChild(this.buttonYes);
        this.buttonYes.addEventListener("click", function () { return _this.levelload1(); });
        this.buttonNo = document.createElement("span");
        this.buttonNo.setAttribute("id", "stopGame");
        document.getElementById("background").appendChild(this.buttonNo);
        this.buttonNo.addEventListener("click", this.goBack);
        var widthScore = document.getElementById("score").clientWidth;
        var widthTotal = document.getElementById("total").clientWidth;
        var scoreContainerWidth = widthScore + widthTotal;
        var windowWidth = window.innerWidth;
        var offsetLeft = (windowWidth - scoreContainerWidth) / 2;
        var marginLeft = scoreContainerWidth / 2;
        marginLeft = offsetLeft;
        this.scoreContainerDiv.style.width = "" + scoreContainerWidth + "px";
        this.scoreContainerDiv.style.marginLeft = "" + marginLeft + "px";
    };
    return GameOver;
}());
var IceDragon = (function (_super) {
    __extends(IceDragon, _super);
    function IceDragon(id, pos) {
        var _this = _super.call(this, pos) || this;
        _this.counter = 300;
        _this.id = id;
        _this.div = document.createElement("icedragon");
        _this.div.setAttribute("id", "icedragon" + _this.id);
        _this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(_this.div);
        _this.div.style.transform = "translate(" + _this.position.x + "px, " + _this.position.y + "px)";
        _this.random = Math.floor((Math.random() * 5) + 3);
        var random = Math.floor(Math.random() * 60);
        _this.counter -= random;
        return _this;
    }
    IceDragon.prototype.move = function (life) {
        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(this.random / 7);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.rectanglePosition = new Vector(this.position.x + 25, this.position.y + 50);
        this.rectangle = new Rectangle(this.rectanglePosition, 150, 100);
        this.hitboxPosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 400, 400);
    };
    return IceDragon;
}(Enemy));
var iceDragonCount = 0;
var Level1 = (function () {
    function Level1(playerCount) {
        this.lifes = new Array();
        this.fireDragons = new Array();
        this.iceDragons = new Array();
        this.fireDragonCount = 0;
        this.scoreCount = 0;
        this.enemy = new Enemy(new Vector(0, 0));
        this.playerCount = playerCount;
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        var background = new Background(1, 1, true);
        var music = new Music(3, 0.3);
        document.getElementById("background").style.cursor = "none";
        this.score = document.createElement("score");
        this.score.innerHTML = "" + this.scoreCount;
        this.score.style.marginLeft = "50%";
        this.score.style.width = "100px";
        this.score.style.height = "50px";
        this.score.style.fontSize = "70px";
        document.body.appendChild(this.score);
        this.spawnTime = 2000;
        if (playerCount == 1) {
            for (var i = 0; i < 10; i++) {
                this.lifes.push(new Life(i));
            }
            this.spawnTimer(this.spawnFireDragon, this.spawnTime);
            this.char1 = new Character(37, 39, 38, 40, new Vector(500, 500), 1);
        }
        else {
            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }
            this.timer = setInterval(this.spawnFireDragon.bind(this), 750);
            this.char1 = new Character(37, 39, 38, 40, new Vector(1500, 1500), 1);
            this.char2 = new Character(65, 68, 87, 83, new Vector(1500, 1500), 2);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Level1.prototype.spawnFireDragon = function () {
        var random = Math.floor(Math.random() * 10);
        if (random <= 7) {
            this.fireDragons.push(new FireDragon(this.fireDragonCount, this.enemy.randomPosition()));
            this.fireDragonCount++;
        }
        else {
            this.iceDragons.push(new IceDragon(iceDragonCount, this.enemy.randomPosition()));
            iceDragonCount++;
        }
        if (this.spawnTime > 200) {
            this.spawnTime = this.spawnTime - 10;
        }
        clearInterval(this.timer);
        this.spawnTimer(this.spawnFireDragon, this.spawnTime);
    };
    Level1.prototype.spawnTimer = function (spawnFireDragon, time) {
        this.timer = setInterval(this.spawnFireDragon.bind(this), this.spawnTime);
    };
    Level1.prototype.gameLoop = function () {
        var character1Mouth = document.getElementById("character1Mouth");
        var character1Glasses = document.getElementById("character1Glasses");
        var character2Mouth = document.getElementById("character2Mouth");
        var character2Glasses = document.getElementById("character2Glasses");
        var inRange1 = false;
        var inRange2 = false;
        if (this.playerCount == 1) {
            this.char1.move();
        }
        else {
            this.char1.move();
            this.char2.move();
        }
        for (var i = 0; i < this.lifes.length; i++) {
            this.lifes[i].move();
        }
        for (var i = 0; i < this.fireDragons.length; i++) {
            var random = Math.floor(Math.random() * this.lifes.length);
            this.fireDragons[i].counter--;
            if (this.fireDragons[i].counter == 0) {
                var newPosition = new Vector(this.fireDragons[i].position.x, this.fireDragons[i].position.y - 40);
                this.fireDragons.push(new FireDragon(this.fireDragonCount, newPosition));
                this.fireDragons[i].position.y += 40;
                this.fireDragons[i].div.style.transform = "translate(" + this.fireDragons[i].position.x + "px, " + this.fireDragons[i].position.y + "px)";
                this.fireDragonCount++;
                this.fireDragons[i].counter = 300;
            }
            if (this.lifes.length == 0) {
                this.fireDragons.splice(0, this.fireDragons.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new GameOver(this.scoreCount, this.playerCount);
            }
            else {
                this.fireDragons[i].move(this.lifes[0]);
                var angle = Math.atan2(this.lifes[0].position.y - this.fireDragons[i].position.y, this.lifes[0].position.x - this.fireDragons[i].position.x);
                angle = angle * (180 / Math.PI);
                if (angle < 0) {
                    angle = 360 - (-angle);
                }
                if (this.fireDragons[i].direction.x >= 0) {
                    this.fireDragons[i].div.style.transform = "translate(" + this.fireDragons[i].position.x + "px, " + this.fireDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, 1)";
                }
                else {
                    this.fireDragons[i].div.style.transform = "translate(" + this.fireDragons[i].position.x + "px, " + this.fireDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, -1)";
                }
            }
            if (this.playerCount == 1) {
                if (this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.fireDragons[i].counter > 60) {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon2.png\")");
                    inRange1 = true;
                }
                else if (this.fireDragons[i].counter < 60 && this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");
                    inRange1 = true;
                }
                else if (this.fireDragons[i].counter > 60) {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon1.png\")");
                }
                else {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");
                }
                if (this.fireDragons[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.fireDragons[i].remove();
                    this.fireDragons.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
            }
            else {
                if (this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.fireDragons[i].counter > 60) {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon2.png\")");
                    inRange1 = true;
                }
                else if (this.fireDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle) && this.fireDragons[i].counter > 60) {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon2.png\")");
                    inRange2 = true;
                }
                else if (this.fireDragons[i].counter < 60 && this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");
                    inRange1 = true;
                }
                else if (this.fireDragons[i].counter < 60 && this.fireDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");
                    inRange2 = true;
                }
                else if (this.fireDragons[i].counter < 60) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");
                }
                else {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon1.png\")");
                }
                if (this.fireDragons[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.fireDragons[i].remove();
                    this.fireDragons.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
                else if (this.fireDragons[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                    this.fireDragons[i].remove();
                    this.fireDragons.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
            }
            if (this.fireDragons[i].hitsLife(this.lifes[random]) == true) {
                var life = document.getElementById("" + this.lifes[random].id);
                life.remove();
                this.lifes.splice(random, 1);
                this.fireDragons[i].remove();
                this.fireDragons.splice(i, 1);
            }
        }
        for (var i = 0; i < this.iceDragons.length; i++) {
            var random = Math.floor(Math.random() * this.lifes.length);
            this.iceDragons[i].counter--;
            if (this.iceDragons[i].counter == 0) {
                var newPosition = new Vector(this.iceDragons[i].position.x, this.iceDragons[i].position.y - 40);
                this.iceDragons.push(new IceDragon(iceDragonCount, newPosition));
                this.iceDragons[i].position.y += 40;
                this.iceDragons[i].div.style.transform = "translate(" + this.iceDragons[i].position.x + "px, " + this.iceDragons[i].position.y + "px)";
                iceDragonCount++;
                this.iceDragons[i].counter = 300;
            }
            if (this.lifes.length == 0) {
                this.iceDragons.splice(0, this.iceDragons.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new GameOver(this.scoreCount, this.playerCount);
            }
            else {
                this.iceDragons[i].move(this.lifes[0]);
                var angle = Math.atan2(this.lifes[0].position.y - this.iceDragons[i].position.y, this.lifes[0].position.x - this.iceDragons[i].position.x);
                angle = angle * (180 / Math.PI);
                if (angle < 0) {
                    angle = 360 - (-angle);
                }
                if (this.iceDragons[i].direction.x >= 0) {
                    this.iceDragons[i].div.style.transform = "translate(" + this.iceDragons[i].position.x + "px, " + this.iceDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, 1)";
                }
                else {
                    this.iceDragons[i].div.style.transform = "translate(" + this.iceDragons[i].position.x + "px, " + this.iceDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, -1)";
                }
            }
            if (this.playerCount == 1) {
                if (this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.iceDragons[i].counter > 60) {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon2.png\")");
                    inRange1 = true;
                }
                else if (this.iceDragons[i].counter < 60 && this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");
                    inRange1 = true;
                }
                else if (this.iceDragons[i].counter > 60) {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon1.png\")");
                }
                else {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");
                }
                if (this.iceDragons[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.iceDragons[i].remove();
                    this.iceDragons.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
            }
            else {
                if (this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.iceDragons[i].counter > 60) {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon2.png\")");
                    inRange1 = true;
                }
                else if (this.iceDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle) && this.iceDragons[i].counter > 60) {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon2.png\")");
                    inRange2 = true;
                }
                else if (this.iceDragons[i].counter < 60 && this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");
                    inRange1 = true;
                }
                else if (this.iceDragons[i].counter < 60 && this.iceDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");
                    inRange2 = true;
                }
                else if (this.iceDragons[i].counter < 60) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");
                }
                else {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon1.png\")");
                }
                if (this.iceDragons[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.iceDragons[i].remove();
                    this.iceDragons.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
                else if (this.iceDragons[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                    this.iceDragons[i].remove();
                    this.iceDragons.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
            }
            if (this.iceDragons[i].hitsLife(this.lifes[random]) == true) {
                var life = document.getElementById("" + this.lifes[random].id);
                life.remove();
                this.lifes.splice(random, 1);
                this.iceDragons[i].remove();
                this.iceDragons.splice(i, 1);
            }
        }
        if (this.playerCount == 1) {
            if (inRange1) {
                character1Mouth.style.backgroundImage = "url(\"../images/player/mouth2.png\")";
                if (glasses1Scale != "scaleX(-1)") {
                    character1Glasses.style.transform = "rotate(-45deg) " + glasses1Scale;
                }
                else {
                    character1Glasses.style.transform = "rotate(45deg) " + glasses1Scale;
                }
            }
            else {
                character1Mouth.style.backgroundImage = "url(\"../images/player/mouth1.png\")";
                character1Glasses.style.transform = "rotate(0deg) " + glasses1Scale;
            }
        }
        else {
            if (inRange1) {
                character1Mouth.style.backgroundImage = "url(\"../images/player/mouth2.png\")";
                if (glasses1Scale != "scaleX(-1)") {
                    character1Glasses.style.transform = "rotate(-45deg) " + glasses1Scale;
                }
                else {
                    character1Glasses.style.transform = "rotate(45deg) " + glasses1Scale;
                }
            }
            else {
                character1Mouth.style.backgroundImage = "url(\"../images/player/mouth1.png\")";
                character1Glasses.style.transform = "rotate(0deg)" + glasses1Scale;
            }
            if (inRange2) {
                character2Mouth.style.backgroundImage = "url(\"../images/player/mouth2.png\")";
                if (glasses2Scale != "scaleX(-1)") {
                    character2Glasses.style.transform = "rotate(-45deg) " + glasses2Scale;
                }
                else {
                    character2Glasses.style.transform = "rotate(45deg) " + glasses2Scale;
                }
            }
            else {
                character2Mouth.style.backgroundImage = "url(\"../images/player/mouth1.png\")";
                character2Glasses.style.transform = "rotate(0deg) " + glasses2Scale;
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Level1;
}());
var Life = (function () {
    function Life(id) {
        this.id = id;
        this.div = document.createElement("villager");
        this.div.setAttribute("id", "" + this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.newPosition = this.randomPosition();
        this.width = 75;
        this.height = 75;
    }
    Life.prototype.randomPosition = function () {
        var x = Math.floor(Math.random() * window.innerWidth / 3) + window.innerWidth / 3;
        var y = Math.floor(Math.random() * window.innerHeight / 3) + window.innerHeight / 3;
        return new Vector(x, y);
    };
    Life.prototype.move = function () {
        this.newRectangle = new Rectangle(this.newPosition, 10, 10);
        this.rectangle = new Rectangle(this.position, 50, 50);
        if (this.rectangle.hitsOtherRectangle(this.newRectangle)) {
            this.newPosition = this.randomPosition();
        }
        else {
            this.direction = this.newPosition.difference(this.position);
            this.direction = this.direction.normalize();
            var randomSpeed = Math.floor((Math.random() * 3) + 1);
            this.direction = this.direction.scale(randomSpeed);
            this.position = this.position.add(this.direction);
            if (this.direction.x >= 0) {
                this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scaleX(1)";
            }
            else {
                this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scaleX(-1)";
            }
        }
    };
    Life.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
    };
    return Life;
}());
window.addEventListener("load", function () {
    new Game();
});
var Music = (function () {
    function Music(musicNumber, volumeNumber) {
        this.musicLoop(musicNumber, volumeNumber);
    }
    Music.prototype.musicLoop = function (musicNumber, volumeNumber) {
        var audio = document.createElement("audio");
        audio.setAttribute("id", "audio");
        audio.src = "../audio/music" + musicNumber + ".mp3";
        audio.loop = true;
        audio.volume = volumeNumber;
        audio.play();
        document.getElementById("background").appendChild(audio);
    };
    return Music;
}());
var NomSound = (function () {
    function NomSound(nomNumber) {
        this.nomSound(nomNumber);
    }
    NomSound.prototype.nomSound = function (nomNumber) {
        var audio = document.createElement("audio");
        audio.src = "../audio/nom" + nomNumber + ".mp3";
        audio.loop = false;
        audio.play();
        document.getElementById("background").appendChild(audio);
    };
    return NomSound;
}());
var Rectangle = (function () {
    function Rectangle(pos, w, h) {
        this.position = pos;
        this.width = w;
        this.height = h;
    }
    Rectangle.prototype.hitsPoint = function (posx, posy) {
        var differencex = this.position.x - posx;
        var differencey = this.position.y - posy;
        return Math.abs(differencex) < this.width / 2 && Math.abs(differencey) < this.height / 2;
    };
    Rectangle.prototype.hitsOtherRectangle = function (rec) {
        var differencex = this.position.x - rec.position.x;
        var differencey = this.position.y - rec.position.y;
        return Math.abs(differencex) < this.width / 2 + rec.width / 2 && Math.abs(differencey) < this.height / 2 + rec.height / 2;
    };
    Rectangle.prototype.isInsideRectangle = function (rec) {
        var rx = this.position.x - rec.position.x;
        var ry = this.position.y - rec.position.y;
        return (rx > 0 &&
            rx + this.width < window.innerWidth &&
            ry > 0 &&
            ry + this.height < window.innerHeight);
    };
    return Rectangle;
}());
var Titlescreen = (function () {
    function Titlescreen() {
        var background = new Background(1, 1, false);
        this.titleAnimation();
        this.createMenu();
        var music = new Music(1, 1);
    }
    Titlescreen.prototype.levelload1 = function () {
        new Level1(1);
    };
    Titlescreen.prototype.levelload2 = function () {
        new Level1(2);
    };
    Titlescreen.prototype.CharacterSelect1 = function () {
        new CharacterSelect(1);
    };
    Titlescreen.prototype.CharacterSelect2 = function () {
        new CharacterSelect(2);
    };
    Titlescreen.prototype.createMenu = function () {
        var player1 = document.createElement("player1");
        player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        player1.style.cursor = "pointer";
        player1.style.width = "472px";
        player1.style.height = "82px";
        player1.style.left = "50%";
        player1.style.top = "50%";
        player1.style.marginLeft = "-259px";
        player1.style.position = "absolute";
        document.getElementById("background").appendChild(player1);
        player1.setAttribute("id", "player1");
        document.getElementById("player1").addEventListener("click", this.CharacterSelect1);
        player1.style.display = "inline-block";
        player1.onmouseover = function () {
            player1.style.backgroundImage = "url(\"../images/interface/icons/1player_hover.png\")";
        };
        player1.onmouseleave = function () {
            player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        };
        player1.style.animation = "menuMove1 20s infinite";
        var player2 = document.createElement("player2");
        player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        player2.style.cursor = "pointer";
        player2.style.width = "519px";
        player2.style.height = "78px";
        player2.style.left = "50%";
        player2.style.top = "60%";
        player2.style.marginLeft = "-259px";
        player2.style.position = "absolute";
        document.getElementById("background").appendChild(player2);
        player2.setAttribute("id", "player2");
        document.getElementById("player2").addEventListener("click", this.CharacterSelect2);
        player2.style.display = "inline-block";
        player2.onmouseover = function () {
            player2.style.backgroundImage = "url(\"../images/interface/icons/2players_hover.png\")";
        };
        player2.onmouseleave = function () {
            player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        };
        player2.style.animation = "menuMove2 20s infinite";
        var achievements = document.createElement("achievement");
        achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        achievements.style.cursor = "pointer";
        achievements.style.width = "594px";
        achievements.style.height = "78px";
        achievements.style.left = "50%";
        achievements.style.top = "70%";
        achievements.style.marginLeft = "-259px";
        achievements.style.position = "absolute";
        achievements.style.display = "inline-block";
        achievements.onmouseover = function () {
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties_hover.png\")";
        };
        achievements.onmouseleave = function () {
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        };
        achievements.style.animation = "menuMove3 20s infinite";
    };
    Titlescreen.prototype.titleAnimation = function () {
        var titleChaseFar = document.createElement('titleChaseFar');
        titleChaseFar.setAttribute("id", "titleChaseFar");
        titleChaseFar.style.backgroundImage = "url(\"../images/titlescreen/titleChaseFar.png\")";
        titleChaseFar.style.height = "100px";
        titleChaseFar.style.width = "200px";
        titleChaseFar.style.left = "-200px";
        titleChaseFar.style.top = "30%";
        titleChaseFar.style.position = "absolute";
        titleChaseFar.style.animation = "titleChaseFarMove 15s infinite";
        titleChaseFar.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseFar);
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"../images/titlescreen/title3.png\")";
        title1.style.width = "1066px";
        title1.style.height = "434px";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.getElementById("background").appendChild(title1);
        var titleChaseClose = document.createElement('titleChaseClose');
        var positionX = window.innerWidth;
        titleChaseClose.style.backgroundImage = "url(\"../images/titlescreen/titleChaseClose.png\")";
        titleChaseClose.style.height = "200px";
        titleChaseClose.style.width = "400px";
        titleChaseClose.style.left = positionX + "px";
        titleChaseClose.style.top = "60%";
        titleChaseClose.style.position = "absolute";
        titleChaseClose.style.animation = "titleChaseCloseMove 15s infinite";
        titleChaseClose.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseClose);
    };
    return Titlescreen;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.isOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    Utils.prototype.removePreviousBackground = function () {
        var bg = document.getElementById("background");
        while (bg.hasChildNodes()) {
            bg.removeChild(bg.firstChild);
        }
        bg.remove();
    };
    return Utils;
}());
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    };
    Vector.prototype.difference = function (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    };
    Vector.prototype.scale = function (n) {
        return new Vector(this.x * n, this.y * n);
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.normalize = function () {
        var mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    };
    Vector.reflectX = function (point, x) {
        return new Vector(2 * x - point.x, point.y);
    };
    Vector.reflectY = function (point, y) {
        return new Vector(point.x, 2 * y - point.y);
    };
    return Vector;
}());
//# sourceMappingURL=main.js.map