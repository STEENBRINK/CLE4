/// <reference path="gameobject.ts"/>

class Dragon extends GameObject {
    private currentFrame:number
    private frameCheck:boolean
    private facingRight:boolean
    private paintings:Array<Painting>
    private game:Game
    private paintingCounter:number
    private counterElement:HTMLElement
    private playscreen:PlayScreen

    constructor(g:Game, p:PlayScreen){
        super(101, 100, 0, 5, "dragon")
        this.game = g
        this.paintings = new Array<Painting>();
        this.currentFrame = 1
        this.frameCheck = true
        this.facingRight = true
        this.paintingCounter = 0
        this.playscreen = p

        this.counterElement = document.createElement("countdown")
        document.body.appendChild(this.counterElement)
        this.counterElement.innerHTML = "40"
        this.counterElement.style.left = ((window.innerWidth/2)-(this.counterElement.getBoundingClientRect().width/2)) + "px"
        
        this.Animation()
        this.createPainting()
    }

    public update(){
        this.erasePaitnigsOutOfBounds()
        if(this.x >= window.innerWidth-this.getRectangle().width-100 || this.x <= 100){
            this.speedX *= -1
        }

        if(this.speedX > 0){
            this.facingRight = true
        }else{
            this.facingRight = false
        }
        

        for(let painting of this.paintings){
            painting.move()
        }

        if (this.paintings.length == 0){
            this.playscreen.removeMe()
            this.game.gameoverScreen()
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

    private createPainting(){
        let paintingClass = "painting"+Math.floor((Math.random()*5) + 1)
        this.paintings.push(new Painting(this.x, this.y, paintingClass))
        if(this.paintingCounter < 40){
            this.paintingCounter++
            this.counterElement.innerHTML = "Schilderijen te gaan:" + (40-this.paintingCounter)
            setTimeout(()=>this.createPainting(), (Math.random()*500+1000))
        }
    }

    public speedFaster(): void{
        for ( let painting of this.paintings)
        {
            painting.speedY += 0.01
        }
    }

    public increaseSpeed(): void{
        for ( let painting of this.paintings)
        {
            if (painting.speedY == 1){
            setTimeout(() => this.speedFaster(), 10000)
            }
            if (painting.speedY == 1.01){
            setTimeout(() => this.speedFaster(), 10000)
            }
            if (painting.speedY == 1.02){
            setTimeout(() => this.speedFaster(), 10000)
            }
        }
    }

    public getPaintings():Array<Painting>{
        return this.paintings
    }

    private erasePaitnigsOutOfBounds(){
        for (let painting of this.paintings) {
            if (painting.y > innerHeight){
                painting.removeMe()
                this.paintings.splice(this.paintings.indexOf(painting),1)
            }
        }
    }

    public removeMe(){
        this.counterElement.remove()
        super.removeMe()
    }
}