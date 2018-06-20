class Credits{

    private div: HTMLElement
    private splash: HTMLElement
    private credits: HTMLElement
    private game : Game
    private event:any

    constructor(g:Game){
        this.game = g
        this.div = document.createElement("div")
        document.body.appendChild(this.div)
        this.splash = document.createElement("return")
        this.div.appendChild(this.splash)
        this.splash.innerHTML = "TERUG NAAR HET SPEL"
        this.event = (()=>this.splashClicked())
        this.div.addEventListener("click", this.event)

        this.credits = document.createElement("credits")
        this.div.appendChild(this.credits)
        this.credits.innerHTML = "CREDITS <br><br><br> Gemaakt Door <br> <br> Marleen van Lubeek <br> Bram Steenbrink <br><br><br> Gemaakt Voor <br> <br> Dieuwke van Woerden <br> Veerle van Woerden <br> Manouk Halderman <br><br><br> Met Dank Aan <br> <br> Bob Pikaar"
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