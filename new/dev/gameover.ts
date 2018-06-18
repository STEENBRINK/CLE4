class GameOverScreen {

    private div: HTMLElement
    private game : Game
    playScreen:PlayScreen
    private button: HTMLElement
    private scoreElement : HTMLElement
    private text: HTMLElement

    constructor(p:PlayScreen, g:Game) {
        this.game = g
        this.playScreen = p
        //Text bovenaan
        this.div = document.createElement("endgame")
        document.body.appendChild(this.div)
        this.div.innerHTML = "GOED GEDAAN!"
        //text in het midden
        this.text = document.createElement("text")
        document.body.appendChild(this.text)
        this.text.innerHTML = "BEDANKT VOOR JE HULP!"
        // score weergeven
        this.scoreElement = document.createElement('endscore')
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : ${this.playScreen.score - 1}`
        // knop terug naar startscherm
        this.button = document.createElement("button")
        document.body.appendChild(this.button)
        this.button.innerHTML = "OPNIEUW SPELEN"
        this.button.addEventListener("click", ()=>this.buttonClicked())
    }

    public update(): void {
    }

    private buttonClicked() {
        // TODO: geef door aan 'game' dat het spel gestart moet worden
        this.game.startAgain()
    }
}