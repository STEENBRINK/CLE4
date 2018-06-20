class StartScreen {

    private div: HTMLElement
    private splash: HTMLElement
    private instr: HTMLElement
    private game : Game
    private keys:HTMLElement
    private keys2:HTMLElement
    private event:any

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("div")
        document.body.appendChild(this.div)
        this.splash = document.createElement("splash")
        this.div.appendChild(this.splash)
        this.splash.innerHTML = "START HET SPEL"
        this.event = (()=>this.splashClicked())
        this.div.addEventListener("click", this.event)

        this.instr = document.createElement("instruction")
        this.div.appendChild(this.instr)
        this.instr.innerHTML = "Probeer alle schilderijern te vangen van de schilder die je ziet!"
    
        this.keys = document.createElement("keysPlayerOne")
        this.div.appendChild(this.keys)
        this.keys.innerHTML = "SPELER 1"

        this.keys = document.createElement("keyswasd")
        this.div.appendChild(this.keys)

        this.keys2 = document.createElement("keysPlayerTwo")
        this.div.appendChild(this.keys2)
        this.keys2.innerHTML = "SPELER 2"

        this.keys2 = document.createElement("keysarrow")
        this.div.appendChild(this.keys2)
    }

    public update(): void {
    }

    private splashClicked() {
        this.removeMe()
        this.game.showPlayScreen()
    }

    public removeMe(){
        this.div.removeEventListener("click", this.event)
        this.div.remove()
    }
}