/// <reference path="ball.ts"/>
class PlayScreen {

    game:Game
    private balls:Array<Ball>;
    private paddle: Paddle
    private paddle2:Paddle
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

        this.paddle = new Paddle(window.innerWidth / 4 - 50, window.innerHeight - 100, 65, 68)
        this.paddle2 = new Paddle(window.innerWidth /4 * 3 - 50, window.innerHeight - 100, 37, 39)

        this.balls = new Array;

        for (let i : number = 0; i < 40; i++)
        { 
            //this.newBall()
            setTimeout(() => this.newBall(), 1000*i)
        }
        
        // let counter = 0
        
        // this.ballzz()        

    }

    // private ballzz(){
    //     counter++
    //     this.newBall()
    //     if(counter < 40){
    //         setTimeout(() => this.ballzz(), 1000)
    //     }
    // }

    private newBall(){
        this.balls.push(new Ball(Math.random()/ 1.5 * window.innerWidth + 200, Math.random()/4 * window.innerHeight))
    }

    public speedFaster(): void{
        for ( let b of this.balls)
        {
            b.speedY += 0.01
        }
    }

    public increaseSpeed(): void{
        for ( let b of this.balls)
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

    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
    
    public update(): void {
        this.paddle.move()
        this.paddle2.move()
        this.paddle.update()
        this.paddle2.update()

        this.increaseSpeed()

        let paddleRect = this.paddle.getRectangle()
        let paddle2Rect = this.paddle2.getRectangle()

        for(let b of this.balls){
            let ballRect = b.getFutureRectangle();
            
            if(this.checkCollision(paddleRect, ballRect) || this.checkCollision(paddle2Rect, ballRect)){
              //  b.bounce()
                b.removeMe()
                this.scoreElement.innerHTML = `Score : ${this.score++}`
            } else {
                b.update() 
            } 
            b.update()
        }
        this.eraseBallsBad()
    }

    private eraseBallsBad(){
        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (ball.y > innerHeight){
                // verwijder het object tijdens de loop
                ball.removeMe()
                this.balls.splice(i,1)
                    if (this.balls.length == 0){
                        this.detectGameover()
                    }
                // this.gameover ++
                //     if(this.gameover > 3){
                //         this.detectGameover()
                //     }
            }
        }
    }

    private detectGameover(){
        this.game.showGameScreen()
    }
}