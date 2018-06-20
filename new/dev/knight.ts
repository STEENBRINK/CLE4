/// <reference path="gameobject.ts" /> 

class Knight extends GameObject {

    private rightkey: number
    private leftkey: number

    private goingLeft:boolean
    private goingRight:boolean

    private eListenerUp: any
    private eListenerDown: any

    private facingRight:boolean
    private frameCounter:number

    private images:Array<HTMLImageElement>

    constructor(x : number, y : number, leftkey : number, rightkey : number, facingRight:boolean, hueRotate:boolean) {
        super(x, y, 0, 0, "knight")

        this.images = new Array<HTMLImageElement>()
        for(let i:number = 0; i < 18; i++){
            this.images.push(new Image())
            this.images[i].src = "images/lgkw/r" + (i+1) + ".png"
        }
        for(let i:number = 0; i < 18; i++){
            this.images.push(new Image())
            this.images[i+18].src = "images/lgkw/l" + (i+1) + ".png"
        }

        this.leftkey = leftkey
        this.rightkey = rightkey

        this.facingRight = facingRight
        this.frameCounter = 1

        this.goingRight=false
        this.goingLeft=false

        if(hueRotate){
            this.div.style.webkitFilter = "hue-rotate(" + 230 + "deg)"
        }else{
            this.div.style.webkitFilter = "hue-rotate(" + 150 + "deg)"
        }

        this.eListenerDown = (e: KeyboardEvent) => this.onKeyDown(e)
        this.eListenerUp = (e: KeyboardEvent) => this.onKeyUp(e)

        window.addEventListener("keydown", this.eListenerDown)
        window.addEventListener("keyup", this.eListenerUp)

        this.Animation()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.speedX = -10
                this.facingRight = false
                this.goingLeft = true
                break
            case this.rightkey:
                this.speedX = 10
                this.facingRight = true
                this.goingRight = true
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                if(this.goingRight){
                    this.speedX = 10
                }else{
                    this.speedX = 0
                }
                this.goingLeft = false
                break
            case this.rightkey:
                if(this.goingLeft){
                    this.speedX = -10
                }else{
                    this.speedX = 0
                }
                this.goingRight=false
        }
    }

    public update() {
        if (this.x >= window.innerWidth - this.getRectangle().width){ 
            this.x = window.innerWidth - this.getRectangle().width;
        }
        if (this.x <= 0 ){
            this.x = 0
        }

        super.move()
    }

    public removeMe(){
        window.removeEventListener("keydown", this.eListenerDown)
        window.removeEventListener("keyup", this.eListenerUp)
        this.div.remove()
    }

    private Animation():void{
        if(this.facingRight){
            //console.log(this.frameCounter)
            this.div.style.backgroundImage = "url(" + this.images[this.frameCounter-1].src + ")"
            if(this.frameCounter == 18){
                this.frameCounter = 1
            }else{
                this.frameCounter++
            }
                
        }else{
            this.div.style.backgroundImage = "url(" + this.images[this.frameCounter+17].src + ")"
            if(this.frameCounter == 18){
                this.frameCounter = 1
            }else{
                this.frameCounter++
            }
        }
        setTimeout(()=>this.Animation(), 50)
    }
}