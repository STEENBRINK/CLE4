/// <reference path="player.ts" />
var glassesNumber1 = 1;
var glassesNumber2 = 1;

class Character extends Player{
    
    public characterNumber:number;
    
    public div:HTMLElement;
    public body;
    public mouth;
    public glasses;
    
    constructor(left:number, right:number, up:number, down:number, pos:Vector, playerNumber: number){
        super(left, right, up, down, pos, playerNumber);
        
        this.characterNumber = playerNumber;
        
        this.div = document.createElement("character");
        this.div.setAttribute("id", "character" + this.characterNumber);
        document.getElementById("background").appendChild(this.div);
        
        this.body = document.createElement("characterBody");
        this.body.setAttribute("id", "character"+ this.characterNumber +"Body");
        document.getElementById("character" + this.characterNumber).appendChild(this.body);
        
        this.mouth = document.createElement("characterMouth");
        this.mouth.setAttribute("id", "character"+ this.characterNumber +"Mouth");
        document.getElementById("character" + this.characterNumber).appendChild(this.mouth);
        
        this.glasses = document.createElement("characterGlasses");
        this.glasses.setAttribute("id", "character"+ this.characterNumber +"Glasses");
        
        switch(this.characterNumber){
            case 1:
                this.glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber1+".png')"
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
            case 2:
                this.glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber2+".png')"
                document.getElementById("character" + this.characterNumber).appendChild(this.glasses);
                break;
        } 
    }
    
    
}