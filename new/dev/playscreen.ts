/// <reference path="painting.ts"/>
/// <reference path="knight.ts"/>

class PlayScreen {

    private game:Game
    private knight1: Knight
    private knight2:Knight
    public score:number
    private scoreElement : HTMLElement
    private dragon:Dragon
    private currentPainting:number
    private currentPaintingElement:HTMLElement
    private currentPaintingText:HTMLElement
    private div:HTMLElement
    
    constructor(g:Game) {
        this.div = document.createElement("playscreen")
        document.body.appendChild(this.div)
        this.currentPaintingElement = document.createElement("display")
        this.div.appendChild(this.currentPaintingElement)
        
        this.currentPaintingText = document.createElement("paintingtext")
        this.div.appendChild(this.currentPaintingText)

        this.game = g
        this.score = 0

        this.dragon = new Dragon(g, this)
    //    this.gameover = 0
        this.scoreElement = document.createElement('score')
        this.div.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : 0` //${this.score}

        this.knight1 = new Knight(window.innerWidth / 4 - 50, window.innerHeight - 90, 65, 68, true, true)
        this.knight2 = new Knight(window.innerWidth /4 * 3 - 50, window.innerHeight - 90, 37, 39, false, false)
        
        this.currentPainting = Math.floor((Math.random()*5) + 1)
        this.currentPaintingElement.classList.add("painting" + this.currentPainting)
        this.setCurrentPainting()
    }

    checkCollision():void {
        for(let painting of this.dragon.getPaintings()){
            if((painting.getRectangle().left < (this.knight1.getRectangle().left+this.knight1.getRectangle().width))&&((painting.getRectangle().left+painting.getRectangle().width) > this.knight1.getRectangle().left)){
                if((painting.getRectangle().top+painting.getRectangle().height) > this.knight2.getRectangle().top){
                    //console.log( "1: " + painting.getDiv().classList.contains("painting" + this.currentPainting))
                    if(painting.getDiv().classList.contains("painting" + this.currentPainting)){
                        this.score++
                        this.scoreElement.innerHTML = `Score : ${this.score}`
                        let sound = new SoundPlayer(this.game.getAudioElement(), "painting_good.wav", false)
                    }else{
                        this.score--
                        this.scoreElement.innerHTML = `Score : ${this.score}`
                        let sound = new SoundPlayer(this.game.getAudioElement(), "painting_bad.wav", false)
                    }
                    this.dragon.getPaintings().splice(this.dragon.getPaintings().indexOf(painting),1)
                    painting.removeMe()
                }
            }
            if((painting.getRectangle().left < (this.knight2.getRectangle().left+this.knight2.getRectangle().width))&&((painting.getRectangle().left+painting.getRectangle().width) > this.knight2.getRectangle().left)){
                if((painting.getRectangle().top+painting.getRectangle().height) > (this.knight2.getRectangle().top)){
                    //console.log("2: " + painting.getDiv().classList.contains("painting"+ this.currentPainting))
                    if(painting.getDiv().classList.contains("painting" + this.currentPainting)){
                        this.score++
                        this.scoreElement.innerHTML = `Score : ${this.score}`
                        let sound = new SoundPlayer(this.game.getAudioElement(), "painting_good.wav", false)
                    }else{
                        this.score--
                        this.scoreElement.innerHTML = `Score : ${this.score}`
                        let sound = new SoundPlayer(this.game.getAudioElement(), "painting_bad.wav", false)
                    }
                    this.dragon.getPaintings().splice(this.dragon.getPaintings().indexOf(painting),1)
                    painting.removeMe()
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
        this.currentPaintingElement.classList.remove("painting" + this.currentPainting)
        this.currentPainting = Math.floor((Math.random()*5) + 1)
        //console.log(this.currentPainting)
        this.currentPaintingElement.classList.add("painting" + this.currentPainting)

        switch(this.currentPainting){
            case 1:
                this.currentPaintingText.innerHTML = "Van Gogh"
                break
            case 2:
                this.currentPaintingText.innerHTML = "Frida Kahlo" 
                break
            case 3:
                this.currentPaintingText.innerHTML = "Da Vinci"
                break
            case 4:
                this.currentPaintingText.innerHTML = "Vermeer" 
                break
            case 5:
                this.currentPaintingText.innerHTML = "Klimt"  
                break                 
        }

        if(this.dragon.getPaintings().length > 0){
            setTimeout(()=>(this.setCurrentPainting()), 10000)
        }
    }

    public removeMe():void{
        this.dragon.removeMe()
        this.div.remove()
        this.knight1.removeMe()
        this.knight2.removeMe()
    }
}