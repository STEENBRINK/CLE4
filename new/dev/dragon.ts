/// <reference path="gameobject.ts"/>

class Dragon extends GameObject {
    private currentFrame:number
    private frameCheck:boolean
    private facingRight:boolean
    private litter:Array<Litter>
    private game:Game
    private litterCounter:number

    constructor(g:Game){
        super(101, 100, 0, 5, "dragon")
        this.game = g
        this.litter = new Array<Litter>();
        this.currentFrame = 1
        this.frameCheck = true
        this.facingRight = true
        this.litterCounter = 0
        this.Animation()
        this.createLitter()
    }

    public update(){
        this.eraseBallsBad()
        if(this.x >= window.innerWidth-this.getRectangle().width-100 || this.x <= 100){
            this.speedX *= -1
        }

        if(this.speedX > 0){
            this.facingRight = true
        }else{
            this.facingRight = false
        }
        

        for(let can of this.litter){
            can.move()
        }

        if (this.litter.length == 0){
            this.game.showGameScreen()
        }

        this.increaseSpeed()
        super.move()
    }

    private Animation():void{
        if(this.facingRight){
            this.div.style.backgroundImage = "url(../docs/images/dragonright" + this.currentFrame +".png)"
            if(this.frameCheck){
                this.currentFrame++
                if(this.currentFrame = 3){
                    this.frameCheck = false
                }
            }else{
                this.currentFrame--
                if(this.currentFrame = 1){
                    this.frameCheck = true
                }
            }
        }else{
            this.div.style.backgroundImage = "url(../docs/images/dragonleft" + this.currentFrame +".png)"
            if(this.frameCheck){
                this.currentFrame++
                if(this.currentFrame = 3){
                    this.frameCheck = false
                }
            }else{
                this.currentFrame--
                if(this.currentFrame = 1){
                    this.frameCheck = true
                }
            }
        }
        setTimeout(()=>this.Animation(), 180)
    }

    private createLitter(){
        this.litter.push(new Litter(this.x, this.y))
        if(this.litterCounter < 400){
            setTimeout(()=>this.createLitter(), (Math.random()*500+1000))
            this.litterCounter++
        }
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

    public getLitter():Array<Litter>{
        return this.litter
    }

    private eraseBallsBad(){
        for (let can of this.litter) {
            if (can.y > innerHeight){
                can.removeMe()
                this.litter.splice(this.litter.indexOf(can),1)
                
            }
        }
    }
}