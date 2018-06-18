class StartScreen {

    private div: HTMLElement
    private instr: HTMLElement
    private keys:HTMLElement
    private keys2:HTMLElement
    game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "START HET SPEL"
        this.click()

        this.instr = document.createElement("instruction")
        document.body.appendChild(this.instr)
        this.instr.innerHTML = "Probeer alle schilderijern te vangen die de draak naar beneden gooit!"
    
        this.keys = document.createElement("keysPlayerOne")
        document.body.appendChild(this.keys)
        this.keys.innerHTML = "SPELER 1"

        this.keys = document.createElement("keyswasd")
        document.body.appendChild(this.keys)

        this.keys2 = document.createElement("keysPlayerTwo")
        document.body.appendChild(this.keys2)
        this.keys2.innerHTML = "SPELER 2"

        this.keys2 = document.createElement("keysarrow")
        document.body.appendChild(this.keys2)
    }

    private click(){
        this.div.addEventListener("click", ()=>this.splashClicked())
    }

    public update(): void {
    }

    private splashClicked() {
        // TODO: geef door aan 'game' dat het spel gestart moet worden
        this.game.showPlayScreen()
    }
}