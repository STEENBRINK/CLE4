/// <reference path="gameobject.ts" />
var glasses1Scale;
var glasses2Scale;

class Player extends GameObject {

    public playerNumber: number;

    private downkey: number;
    private upkey: number;
    private leftkey: number;
    private rightkey: number;

    private leftSpeed : Vector;
    private rightSpeed : Vector;
    private downSpeed : Vector;
    private upSpeed : Vector;

    // om te zien of objecten elkaar raken moeten ze een public x,y,width,height hebben
    public targetX: number;
    public targetY: number;
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public hitboxPosition: Vector;

    constructor(left: number, right: number, up: number, down: number, pos: Vector, playerNumber: number) {
        super(pos);
        
        this.playerNumber = playerNumber;

        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.speed = new Vector(0, 0);
        
        this.rightSpeed = new Vector(0,0);
        this.leftSpeed = new Vector(0,0);
        this.upSpeed = new Vector(0,0);
        this.downSpeed = new Vector(0,0);

        // positie
        this.width = 200;
        this.height = 200;

        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

    }
    
    public hitsVirus(virus: Virus){
        if(this.rectangle.hitsOtherRectangle(virus.rectangle)){
            return true;
            
        }
    }
    
    public getBounds():Rectangle{
        return new Rectangle(this.position,this.width, this.height);
    };



    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0, -10);
                
                break;
            case this.downkey:
                this.downSpeed = new Vector(0, 10);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(-10, 0);
                switch(this.playerNumber){
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
                switch(this.playerNumber){
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

    }

    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = new Vector(0,0);
                break;
            case this.downkey:
                this.downSpeed = new Vector(0,0);
                break;
            case this.leftkey:
                this.leftSpeed = new Vector(0,0);
                break;
            case this.rightkey:
                this.rightSpeed = new Vector(0,0);
                break;
        }
    }


    // bewegen - let op, de move functie wordt door game aangeroepen - animatie is niet smooth als de keydown listener een beweging triggered
    public move(): void {
        
        this.hitboxPosition = new Vector(this.position.x + 25, this.position.y + 25);
        
        this.rectangle = new Rectangle(this.hitboxPosition,100,100);
        
        
        this.position = this.position.add(this.leftSpeed.add(this.rightSpeed));
        this.position = this.position.add(this.upSpeed.add(this.downSpeed));
        // this.rectangle = new Rectangle(this.position, 150,150);

        // de div positie aanpassen met transform - tip: scaleX kan je gebruiken om de andere kant op te kijken
        
        switch(this.playerNumber){
            
            case 1:
                document.getElementById("character1").style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
                break;
                
            case 2:
                document.getElementById("character2").style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
                break;
        }
        //clamp van x en y op breedte en hoogte van het scherm
        this.position.x = this.clamp(this.position.x, 0, window.innerWidth - this.width);
        this.position.y = this.clamp(this.position.y, 0, window.innerHeight - this.height);
    }

    private clamp(val: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, val))
    }
}