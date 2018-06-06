var bacteriaCount = 0;

class Level1 {


    private char1: Player;
    private char2: Player;
    public playerCount;
    private utils: Utils;
    public lifes: Array<Life> = new Array<Life>();
    public viruses: Array<Virus> = new Array<Virus>();
    public bacteria: Array<Bacteria> = new Array<Bacteria>();
    public timer: number;
    public virusCount: number = 0;
    //public bacteriaCount: number = 0;
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


            this.spawnTimer(this.spawnVirus, this.spawnTime);

            // setInterval(function(){ this.viruses.push(new Virus()); },500);           
            // for (var i = 0; i < 10; i++) {
            //     this.viruses.push(new Virus());
            // }

            this.char1 = new Character(37, 39, 38, 40, new Vector(500, 500), 1);


        } else {

            for (var i = 0; i < 5; i++) {
                this.lifes.push(new Life(i));
            }

            this.timer = setInterval(this.spawnVirus.bind(this), 750);

            this.char1 = new Character(37, 39, 38, 40, new Vector(1500, 1500), 1);
            this.char2 = new Character(65, 68, 87, 83, new Vector(1500, 1500), 2);
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private spawnVirus() {

        let random = Math.floor(Math.random() * 10);

        if (random <= 7) {
            this.viruses.push(new Virus(this.virusCount, this.enemy.randomPosition()));
            this.virusCount++;
        } else {
            this.bacteria.push(new Bacteria(bacteriaCount, this.enemy.randomPosition()));
            bacteriaCount++;
        }


        if (this.spawnTime > 200) {
            this.spawnTime = this.spawnTime - 10;
        }
        clearInterval(this.timer);
        this.spawnTimer(this.spawnVirus, this.spawnTime);
    }

    private spawnTimer(spawnVirus, time: number) {
        this.timer = setInterval(this.spawnVirus.bind(this), this.spawnTime);
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


        //virus movement
        for (let i = 0; i < this.viruses.length; i++) {
            let random = Math.floor(Math.random() * this.lifes.length);
            if (this.lifes.length == 0) {
                this.viruses.splice(0, this.viruses.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new GameOver(this.scoreCount, this.playerCount);
            } else {
                this.viruses[i].move(this.lifes[random]);
                if (this.viruses[i].hitsLife(this.lifes[random]) == true) {
                    var life = document.getElementById("" + this.lifes[random].id);
                    life.remove();
                    this.lifes.splice(random, 1);
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                }
            }



            if (this.playerCount == 1) {


                if (this.viruses[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].changeImage("url(\"../images/characters/virus2.png\")");
                    inRange1 = true;
                }
                else {
                    this.viruses[i].changeImage("url(\"../images/characters/virus1.png\")");
                }

                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;

                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                }
            }
            else {


                if (this.viruses[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].changeImage("url(\"../images/characters/virus2.png\")");
                    inRange1 = true;
                } else if (this.viruses[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    this.viruses[i].changeImage("url(\"../images/characters/virus2.png\")");
                    inRange2 = true;
                } else {
                    this.viruses[i].changeImage("url(\"../images/characters/virus1.png\")");
                }



                if (this.viruses[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                }
                else if (this.viruses[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                    this.viruses[i].remove();
                    this.viruses.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                }



            }

        }

        //bacteria movement
        for (let i = 0; i < this.bacteria.length; i++) {
            let random = Math.floor(Math.random() * this.lifes.length);

            //setInterval(this.splitBacteria(), 1000);
            this.bacteria[i].counter--;
            if (this.bacteria[i].counter == 0) {
                let newPosition = new Vector(this.bacteria[i].position.x, this.bacteria[i].position.y - 40);
                this.bacteria.push(new Bacteria(bacteriaCount, newPosition));
                this.bacteria[i].position.y += 40;
                this.bacteria[i].div.style.transform = "translate(" + this.bacteria[i].position.x + "px, " + this.bacteria[i].position.y + "px)";
                bacteriaCount++;
                this.bacteria[i].counter = 300;
            }




            if (this.lifes.length == 0) {
                this.bacteria.splice(0, this.bacteria.length);
                clearInterval(this.timer);
                this.utils.removePreviousBackground();
                new GameOver(this.scoreCount, this.playerCount);
            } else {
                this.bacteria[i].move(this.lifes[0]);

                let angle = Math.atan2(this.lifes[0].position.y - this.bacteria[i].position.y, this.lifes[0].position.x - this.bacteria[i].position.x);
                angle = angle * (180 / Math.PI);

                if (angle < 0) {
                    angle = 360 - (-angle);
                }

                // this.bacteria[i].div.style.transform = "rotate("+angle+"deg)";
                if (this.bacteria[i].direction.x >= 0) {
                    this.bacteria[i].div.style.transform = "translate(" + this.bacteria[i].position.x + "px, " + this.bacteria[i].position.y + "px) rotate(" + angle + "deg) scale(-1, 1)";
                } else {
                    this.bacteria[i].div.style.transform = "translate(" + this.bacteria[i].position.x + "px, " + this.bacteria[i].position.y + "px) rotate(" + angle + "deg) scale(-1, -1)";
                }



            }



            if (this.playerCount == 1) {


                if (this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.bacteria[i].counter > 60) {
                    this.bacteria[i].changeImage("url(\"../images/characters/bacteria2.png\")");
                    inRange1 = true;
                }
                else if (this.bacteria[i].counter < 60 && this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.bacteria[i].changeImage("url(\"../images/enemy/bacteria3.png\")");
                    inRange1 = true;
                }
                else if (this.bacteria[i].counter > 60) {
                    this.bacteria[i].changeImage("url(\"../images/characters/bacteria1.png\")");
                } else {
                    this.bacteria[i].changeImage("url(\"../images/enemy/bacteria3.png\")");
                }

                if (this.bacteria[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    this.bacteria[i].remove();
                    this.bacteria.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
            }
            else {


                if (this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle) && this.bacteria[i].counter > 60) {
                    
                    this.bacteria[i].changeImage("url(\"../images/characters/bacteria2.png\")");
                    inRange1 = true;
                } else if (this.bacteria[i].hitbox.hitsOtherRectangle(this.char2.rectangle) && this.bacteria[i].counter > 60) {
                    
                    this.bacteria[i].changeImage("url(\"../images/characters/bacteria2.png\")");
                    inRange2 = true;
                } else if (this.bacteria[i].counter < 60 && this.bacteria[i].hitbox.hitsOtherRectangle(this.char1.rectangle)) {
                    this.bacteria[i].changeImage("url(\"../images/enemy/bacteria3.png\")");
                    inRange1 = true;
                } else if (this.bacteria[i].counter < 60 && this.bacteria[i].hitbox.hitsOtherRectangle(this.char2.rectangle)) {
                    this.bacteria[i].changeImage("url(\"../images/enemy/bacteria3.png\")");
                    inRange2 = true;
                } else if (this.bacteria[i].counter < 60){
                    this.bacteria[i].changeImage("url(\"../images/enemy/bacteria3.png\")");
                } else {
                    this.bacteria[i].changeImage("url(\"../images/characters/bacteria1.png\")");
                }


                if (this.bacteria[i].rectangle.hitsOtherRectangle(this.char1.rectangle)) {
                    // var enemy  = document.getElementById("virus"+virus.id);
                    this.bacteria[i].remove();
                    this.bacteria.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }
                else if (this.bacteria[i].rectangle.hitsOtherRectangle(this.char2.rectangle)) {
                    this.bacteria[i].remove();
                    this.bacteria.splice(i, 1);
                    this.scoreCount++;
                    this.score.innerHTML = "" + this.scoreCount;
                    this.randomNomNumber = Math.floor(Math.random() * 5 + 1);
                    var nomSound = new NomSound(this.randomNomNumber);
                    break;
                }

            }
            if (this.bacteria[i].hitsLife(this.lifes[random]) == true) {
                var life = document.getElementById("" + this.lifes[random].id);
                life.remove();
                this.lifes.splice(random, 1);
                this.bacteria[i].remove();
                this.bacteria.splice(i, 1);
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