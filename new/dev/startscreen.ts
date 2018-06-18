class StartScreen {

    private div: HTMLElement
    private instr: HTMLElement
    private game : Game
    private keys:HTMLElement
    private keys2:HTMLElement

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "START HET SPEL"
        this.click()

        this.instr = document.createElement("instruction")
        this.div.appendChild(this.instr)
        this.instr.innerHTML = "Redt de natuur door al het afval te verzamelen"
    
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

    private click(){
        this.div.addEventListener("click", ()=>this.splashClicked())
    }

    public update(): void {
    }

    private splashClicked() {
        this.game.showPlayScreen()
    }
}