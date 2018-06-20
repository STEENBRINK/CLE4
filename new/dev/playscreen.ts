/// <reference path="painting.ts"/>
/// <reference path="knight.ts"/>

class PlayScreen {

    game:Game
    private knight1: Knight
    private knight2:Knight
    public score:number
    private scoreElement : HTMLElement
    private dragon:Dragon
    private currentPainting:string
    private currentPaintingElement:HTMLElement
    private currentPaintingText:HTMLElement
    
    constructor(g:Game) {
        this.currentPainting = ""
        this.currentPaintingElement = document.createElement("display")
        document.body.appendChild(this.currentPaintingElement)
        
        this.currentPaintingText = document.createElement("paintingtext")
        document.body.appendChild(this.currentPaintingText)

        this.game = g
        this.score = 1

        this.dragon = new Dragon(g)
    //    this.gameover = 0
        this.scoreElement = document.createElement('score')
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : 0` //${this.score}

        this.knight1 = new Knight(window.innerWidth / 4 - 50, window.innerHeight - 90, 65, 68, true, true)
        this.knight2 = new Knight(window.innerWidth /4 * 3 - 50, window.innerHeight - 90, 37, 39, false, false)

        
        this.currentPainting = "painting"+Math.floor((Math.random()*5) + 1)
        this.currentPaintingElement.classList.add(this.currentPainting)
        this.setCurrentPainting()
    }

    checkCollision():void {
        for(let painting of this.dragon.getPaintings()){
            if((painting.getRectangle().left < (this.knight1.getRectangle().left+this.knight1.getRectangle().width))&&((painting.getRectangle().left+painting.getRectangle().width) > this.knight1.getRectangle().left)){
                if((painting.getRectangle().top+painting.getRectangle().height) > this.knight2.getRectangle().top){
                    painting.removeMe()
                    this.dragon.getPaintings().splice(this.dragon.getPaintings().indexOf(painting),1)
                    console.log( "1" + painting.getDiv().classList.contains(this.currentPainting))
                    if(painting.getDiv().classList.contains(this.currentPainting)){
                        this.scoreElement.innerHTML = `Score : ${this.score++}`
                    }else{
                        this.scoreElement.innerHTML = `Score : ${this.score--}`
                    }
                }
            }
            if((painting.getRectangle().left < (this.knight2.getRectangle().left+this.knight2.getRectangle().width))&&((painting.getRectangle().left+painting.getRectangle().width) > this.knight2.getRectangle().left)){
                if((painting.getRectangle().top+painting.getRectangle().height) > (this.knight2.getRectangle().top)){
                    painting.removeMe()
                    this.dragon.getPaintings().splice(this.dragon.getPaintings().indexOf(painting),1)
                    console.log("2" + painting.getDiv().classList.contains(this.currentPainting))
                    if(painting.getDiv().classList.contains(this.currentPainting)){
                        this.scoreElement.innerHTML = `Score : ${this.score++}`
                    }else{
                        this.scoreElement.innerHTML = `Score : ${this.score--}`
                    }
                }
            }
        }
    }
    
    public update(): void {
        this.knight1.update()
        this.knight2.update()
        this.dragon.update()

        this.checkCollision()
    }

    private setCurrentPainting(){
        this.currentPaintingElement.classList.remove(this.currentPainting)
        this.currentPainting = "painting"+Math.floor((Math.random()*5) + 1)
        this.currentPaintingElement.classList.add(this.currentPainting)

        switch(this.currentPainting){
            case "painting1":
                this.currentPaintingText.innerHTML = "Van Gogh"
                break
            case "painting2":
                this.currentPaintingText.innerHTML = "Fridakahlo" 
                break
            case "painting3":
                this.currentPaintingText.innerHTML = "Da Vinci"
                break
            case "painting4":
                this.currentPaintingText.innerHTML = "Vermeer" 
                break
            case "painting5":
                this.currentPaintingText.innerHTML = "Klimt"  
                break                 
        }

        setTimeout(()=> this.setCurrentPainting(),10000)
    }
}