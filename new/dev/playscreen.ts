/// <reference path="litter.ts"/>
class PlayScreen {

    game:Game
    private litter:Array<Litter>;
    private bin1: Bin
    private bin2:Bin
    public score:number
    private scoreElement : HTMLElement
  //  private gameover : number
    
    constructor(g:Game) {
        this.game = g
        this.score = 1
    //    this.gameover = 0
        this.scoreElement = document.createElement('score')
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : 0` //${this.score}

        this.bin1 = new Bin(window.innerWidth / 4 - 50, window.innerHeight - 100, 65, 68)
        this.bin2 = new Bin(window.innerWidth /4 * 3 - 50, window.innerHeight - 100, 37, 39)

        this.litter = new Array;

        for (let i : number = 0; i < 40; i++)
        { 
            //this.newBall()
            setTimeout(() => this.newBall(), 1000*i)
        } 

    }

    private newBall(){
        this.litter.push(new Litter(Math.random()/ 1.5 * window.innerWidth + 200, Math.random()/4 * window.innerHeight))
    }

    public speedFaster(): void{
        for ( let b of this.litter)
        {
            b.speedY += 0.01
        }
    }

    public increaseSpeed(): void{
        for ( let b of this.litter)
        {
            if (b.speedY == 1){
            setTimeout(() => this.speedFaster(), 10000)
            }
            if (b.speedY == 1.01){
            setTimeout(() => this.speedFaster(), 10000)
            }
            if (b.speedY == 1.02){
            setTimeout(() => this.speedFaster(), 10000)
            }
        }
    }

    checkCollision():void {
        for(let can of this.litter){
            if((can.getRectangle().left < (this.bin1.getRectangle().left+this.bin1.getRectangle().width))&&((can.getRectangle().left+can.getRectangle().width) > this.bin1.getRectangle().left)){
                if((can.getRectangle().top+can.getRectangle().height) > this.bin2.getRectangle().top){
                    can.removeMe()
                    this.litter.splice(this.litter.indexOf(can),1)
                    this.scoreElement.innerHTML = `Score : ${this.score++}`
                }
            }
            if((can.getRectangle().left < (this.bin2.getRectangle().left+this.bin2.getRectangle().width))&&((can.getRectangle().left+can.getRectangle().width) > this.bin2.getRectangle().left)){
                if((can.getRectangle().top+can.getRectangle().height) > (this.bin2.getRectangle().top)){
                    can.removeMe()
                    this.litter.splice(this.litter.indexOf(can),1)
                    this.scoreElement.innerHTML = `Score : ${this.score++}`
                }
            }
        }
    }
    
    
    public update(): void {
        this.bin1.update()
        this.bin2.update()

        this.increaseSpeed()

        this.checkCollision()
        this.eraseBallsBad()

        for(let can of this.litter){
            can.move()
        }
    }

    private eraseBallsBad(){
        for (let i of this.litter) {
            if (i.y > innerHeight){
                i.removeMe()
                this.litter.splice(this.litter.indexOf(i),1)
                    if (this.litter.length == 0){
                        this.detectGameover()
                    }
            }
        }
    }

    private detectGameover(){
        this.game.showGameScreen()
    }
}