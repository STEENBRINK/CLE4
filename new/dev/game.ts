/// <reference path="painting.ts"/>
/// <reference path="knight.ts"/>

class Game {
    private screen:any
    private backgroundElement : HTMLElement
    private audioElement:HTMLElement

    constructor() {
        this.screen = new StartScreen(this)
        this.backgroundElement = document.createElement('background')

        
        this.audioElement = document.createElement("music")
        document.body.appendChild(this.audioElement)

        let sound = new SoundPlayer(this.audioElement, "music.mp3", true)

        this.gameLoop()
    }

    public showPlayScreen(){

        // STAP 1
        // maak de BODY leeg met innerHTML = ""
        document.body.appendChild(this.backgroundElement)

        // STAP 2
        // plaats een instance van PlayScreen in de screen variabele
        this.screen = new PlayScreen(this)
    }

    public gameoverScreen(){
        document.body.appendChild(this.backgroundElement)
        this.screen = new GameOverScreen(this.screen, this)
    }

    public startAgain(){
        document.body.appendChild(this.backgroundElement)
        this.screen = new StartScreen(this)
    }
    
    private gameLoop():void{
        this.screen.update()
        requestAnimationFrame(()=>this.gameLoop())
    }

    public showCredits():void{
        document.body.appendChild(this.backgroundElement)
        this.screen = new Credits(this)
    }

    public getAudioElement():HTMLElement{
        return this.audioElement
    }
} 

window.addEventListener("load", () => new Game())