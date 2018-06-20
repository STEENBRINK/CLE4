class GameOverScreen {

    private div: HTMLElement
    private game : Game
    private playScreen:PlayScreen
    private scoreElement : HTMLElement
    private text: HTMLElement
    private restartElement:HTMLElement
    private creditElement:HTMLElement
    private creditEvent:any
    private restartEvent:any

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
        this.text.innerHTML = "Bedankt voor het helpen!"
        // score weergeven
        this.scoreElement = document.createElement('endscore')
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : ${this.playScreen.score - 1}`
        // restart
        this.restartElement = document.createElement('restart')
        document.body.appendChild(this.restartElement)
        this.restartElement.innerHTML = "START OPNIEUW!"
        this.restartEvent = (()=>this.buttonClicked())
        this.restartElement.addEventListener("click", this.restartEvent)
        this.restartElement.style.top = (window.innerHeight/2 - this.restartElement.getBoundingClientRect().height/2 + 100) + "px"
        this.restartElement.style.left = (window.innerWidth/2 - this.restartElement.getBoundingClientRect().width/2) + "px"

        //credits
        this.creditElement = document.createElement("creditlink")
        document.body.appendChild(this.creditElement)
        this.creditElement.innerHTML = "CREDITS"
        this.creditEvent = (()=>this.creditsClicked())
        this.creditElement.addEventListener("click", this.creditEvent)
        this.creditElement.style.top = (window.innerHeight/2 - this.creditElement.getBoundingClientRect().height/2 + 200) + "px"
        this.creditElement.style.left = (window.innerWidth/2 - this.creditElement.getBoundingClientRect().width/2) + "px"
    }

    public update(): void {
    }

    private buttonClicked() {
        this.restartElement.removeEventListener("click", this.restartEvent)
        this.creditElement.removeEventListener("click", this.creditEvent)
        this.div.remove()
        this.game.startAgain()
    }

    private creditsClicked() {
        this.restartElement.removeEventListener("click", this.restartEvent)
        this.creditElement.removeEventListener("click", this.creditEvent)
        this.div.remove()
        this.game.showCredits()
    }
}