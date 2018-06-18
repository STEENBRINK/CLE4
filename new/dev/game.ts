/// <reference path="litter.ts"/>
/// <reference path="knight.ts"/>

class Game {
    private screen:any
    private backgroundElement : HTMLElement

    constructor() {
        this.screen = new StartScreen(this)
        this.backgroundElement = document.createElement('background')
        this.gameLoop()
    }

    public showPlayScreen(){

        // STAP 1
        // maak de BODY leeg met innerHTML = ""
        document.body.innerHTML = "" 
        document.body.appendChild(this.backgroundElement)

        // STAP 2
        // plaats een instance van PlayScreen in de screen variabele
        this.screen = new PlayScreen(this)
    }

    public showGameScreen(){
        document.body.innerHTML = "" 
        document.body.appendChild(this.backgroundElement)
        this.screen = new GameOverScreen(this.screen, this)
    }

    public startAgain(){
        document.body.innerHTML = "" 
        document.body.appendChild(this.backgroundElement)
        this.screen = new StartScreen(this)
    }
    
    private gameLoop():void{
        this.screen.update()
        requestAnimationFrame(()=>this.gameLoop())
    }
} 

window.addEventListener("load", () => new Game())