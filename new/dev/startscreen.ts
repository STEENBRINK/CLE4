class StartScreen {

    private div: HTMLElement
    private instr: HTMLElement
    game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "START THE GAME"
        this.click()

        this.instr = document.createElement("instruction")
        document.body.appendChild(this.instr)
        this.instr.innerHTML = "Help save the environment by collecting all the garbage!"
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