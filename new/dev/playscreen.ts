/// <reference path="litter.ts"/>
/// <reference path="knight.ts"/>

class PlayScreen {

    game:Game
    private knight1: Knight
    private knight2:Knight
    public score:number
    private scoreElement : HTMLElement
    private dragon:Dragon
    
    constructor(g:Game) {
        this.game = g
        this.score = 1

        this.dragon = new Dragon(g)
    //    this.gameover = 0
        this.scoreElement = document.createElement('score')
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : 0` //${this.score}

        this.knight1 = new Knight(window.innerWidth / 4 - 50, window.innerHeight - 250, 65, 68, true)
        this.knight2 = new Knight(window.innerWidth /4 * 3 - 50, window.innerHeight - 250, 37, 39, false)

    }

    checkCollision():void {
        for(let can of this.dragon.getLitter()){
            if((can.getRectangle().left < (this.knight1.getRectangle().left+this.knight1.getRectangle().width))&&((can.getRectangle().left+can.getRectangle().width) > this.knight1.getRectangle().left)){
                if((can.getRectangle().top+can.getRectangle().height) > this.knight2.getRectangle().top){
                    can.removeMe()
                    this.dragon.getLitter().splice(this.dragon.getLitter().indexOf(can),1)
                    this.scoreElement.innerHTML = `Score : ${this.score++}`
                }
            }
            if((can.getRectangle().left < (this.knight2.getRectangle().left+this.knight2.getRectangle().width))&&((can.getRectangle().left+can.getRectangle().width) > this.knight2.getRectangle().left)){
                if((can.getRectangle().top+can.getRectangle().height) > (this.knight2.getRectangle().top)){
                    can.removeMe()
                    this.dragon.getLitter().splice(this.dragon.getLitter().indexOf(can),1)
                    this.scoreElement.innerHTML = `Score : ${this.score++}`
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
}