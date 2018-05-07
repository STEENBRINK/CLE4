window.addEventListener("load", () => {
    new Game()
})

class Game {
    constructor(){
        this.gameLoop()
    }

    private gameLoop(){
        //update game elements

        requestAnimationFrame(()=>this.gameLoop())
    }
}