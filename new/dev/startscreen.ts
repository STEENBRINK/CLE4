class StartScreen {

    private div: HTMLElement
    private instr: HTMLElement
    game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "START HET SPEL"
        this.click()

        this.instr = document.createElement("instruction")
        document.body.appendChild(this.instr)
        this.instr.innerHTML = "Redt de natuur door al het afval te verzamelen"
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