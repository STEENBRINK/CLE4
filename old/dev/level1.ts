var iceDragonCount = 0;

class Level1 {


    private char1: Player;
    private char2: Player;
    public playerCount;
    private utils: Utils;
    public lifes: Array<Life> = new Array<Life>();
    public fireDragons: Array<FireDragon> = new Array<FireDragon>();
    public iceDragons: Array<IceDragon> = new Array<IceDragon>();
    public timer: number;
    public fireDragonCount: number = 0;
    public scoreCount: number = 0;
    private score: HTMLElement;
    public spawnTime: number;
    public enemy: Enemy;
    public randomNomNumber: number;

    constructor(playerCount: number) {

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
        // this.score.style.font = "foo.tff";
        this.score.style.fontSize = "70px";
        document.body.appendChild(this.score);

        this.spawnTime = 2000;


        if (playerCount == 1) {

            for (var i = 0; i < 10; i++) {
                this.lifes.push(new Life(i));
            }


            this.spawnTimer(this.spawnFireDragon, this.spawnTime);

            this.char1 = new Character(37, 39, 38, 40, new Vector(500, 500), 1);


        } else {

            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }

            this.timer = setInterval(this.spawnFireDragon.bind(this), 750);

            this.char1 = new Character(37, 39, 38, 40, new Vector(1500, 1500), 1);
            this.char2 = new Character(65, 68, 87, 83, new Vector(1500, 1500), 2);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private spawnFireDragon() {

        let random = Math.floor(Math.random() * 10);

        if (random <= 7) {
            this.fireDragons.push(new FireDragon(this.fireDragonCount, this.enemy.randomPosition()));
            this.fireDragonCount++;
        } else {
            this.iceDragons.push(new IceDragon(iceDragonCount, this.enemy.randomPosition()));
            iceDragonCount++;
        }


        if (this.spawnTime > 200) {
            this.spawnTime = this.spawnTime - 10;
        }
        clearInterval(this.timer);
        this.spawnTimer(this.spawnFireDragon, this.spawnTime);
    }

    private spawnTimer(spawnFireDragon, time: number) {
        this.timer = setInterval(this.spawnFireDragon.bind(this), this.spawnTime);
    }


    private gameLoop() {
        var character1Mouth = document.getElementById("character1Mouth");
        var character1Glasses = document.getElementById("character1Glasses");
        var character2Mouth = document.getElementById("character2Mouth");
        var character2Glasses = document.getElementById("character2Glasses");


        let inRange1 = false;
        let inRange2 = false;

        if (this.playerCount == 1) {
            this.char1.move();
        } else {
            this.char1.move();
            this.char2.move();
        }

        //for(let life of this.lifes){

        //}

        for (let i = 0; i < this.lifes.length; i++) {
            //this.lifes[i].draw();
            this.lifes[i].move();
        }


        //fd movement
        for (let i = 0; i < this.fireDragons.length; i++) {
            let random = Math.floor(Math.random() * this.lifes.length);

            this.fireDragons[i].counter--;
            if (this.fireDragons[i].counter == 0) {
                let newPosition = new Vector(this.fireDragons[i].position.x, this.fireDragons[i].position.y - 40);
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
            } else {
                this.fireDragons[i].move(this.lifes[0]);

                let angle = Math.atan2(this.lifes[0].position.y - this.fireDragons[i].position.y, this.lifes[0].position.x - this.fireDragons[i].position.x);
                angle = angle * (180 / Math.PI);

                if (angle < 0) {
                    angle = 360 - (-angle);
                }

                if (this.fireDragons[i].direction.x >= 0) {
                    this.fireDragons[i].div.style.transform = "translate(" + this.fireDragons[i].position.x + "px, " + this.fireDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, 1)";
                } else {
                    this.fireDragons[i].div.style.transform = "translate(" + this.fireDragons[i].position.x + "px, " + this.fireDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, -1)";
                }



            }



            if (this.playerCount == 1) {


                if (this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.fireDragons[i].counter > 60) {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon2.png\")");  //TODO rename
                    inRange1 = true;
                }
                else if (this.fireDragons[i].counter < 60 && this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");   //TODO rename
                    inRange1 = true;
                }
                else if (this.fireDragons[i].counter > 60) {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon1.png\")");  //TODO rename
                } else {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");   //TODO rename
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
                    
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon2.png\")");  //TODO rename
                    inRange1 = true;
                } else if (this.fireDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle) && this.fireDragons[i].counter > 60) {
                    
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon2.png\")");  //TODO rename
                    inRange2 = true;
                } else if (this.fireDragons[i].counter < 60 && this.fireDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");   //TODO rename
                    inRange1 = true;
                } else if (this.fireDragons[i].counter < 60 && this.fireDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");   //TODO rename
                    inRange2 = true;
                } else if (this.fireDragons[i].counter < 60){
                    this.fireDragons[i].changeImage("url(\"../images/enemy/firedragon3.png\")");   //TODO rename
                } else {
                    this.fireDragons[i].changeImage("url(\"../images/characters/firedragon1.png\")");  //TODO rename
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

        //id movement
        for (let i = 0; i < this.iceDragons.length; i++) {
            let random = Math.floor(Math.random() * this.lifes.length);

            this.iceDragons[i].counter--;
            if (this.iceDragons[i].counter == 0) {
                let newPosition = new Vector(this.iceDragons[i].position.x, this.iceDragons[i].position.y - 40);
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
            } else {
                this.iceDragons[i].move(this.lifes[0]);

                let angle = Math.atan2(this.lifes[0].position.y - this.iceDragons[i].position.y, this.lifes[0].position.x - this.iceDragons[i].position.x);
                angle = angle * (180 / Math.PI);

                if (angle < 0) {
                    angle = 360 - (-angle);
                }

                if (this.iceDragons[i].direction.x >= 0) {
                    this.iceDragons[i].div.style.transform = "translate(" + this.iceDragons[i].position.x + "px, " + this.iceDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, 1)";
                } else {
                    this.iceDragons[i].div.style.transform = "translate(" + this.iceDragons[i].position.x + "px, " + this.iceDragons[i].position.y + "px) rotate(" + angle + "deg) scale(-1, -1)";
                }



            }



            if (this.playerCount == 1) {


                if (this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.iceDragons[i].counter > 60) {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon2.png\")");  //TODO rename
                    inRange1 = true;
                }
                else if (this.iceDragons[i].counter < 60 && this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");   //TODO rename
                    inRange1 = true;
                }
                else if (this.iceDragons[i].counter > 60) {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon1.png\")");  //TODO rename
                } else {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");   //TODO rename
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
                    
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon2.png\")");  //TODO rename
                    inRange1 = true;
                } else if (this.iceDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle) && this.iceDragons[i].counter > 60) {
                    
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon2.png\")");  //TODO rename
                    inRange2 = true;
                } else if (this.iceDragons[i].counter < 60 && this.iceDragons[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");   //TODO rename
                    inRange1 = true;
                } else if (this.iceDragons[i].counter < 60 && this.iceDragons[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");   //TODO rename
                    inRange2 = true;
                } else if (this.iceDragons[i].counter < 60){
                    this.iceDragons[i].changeImage("url(\"../images/enemy/icedragon3.png\")");   //TODO rename
                } else {
                    this.iceDragons[i].changeImage("url(\"../images/characters/icedragon1.png\")");  //TODO rename
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
                //character1Glasses.style
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
                //character1Glasses.style
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
                //character2Glasses.style
            }
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

}