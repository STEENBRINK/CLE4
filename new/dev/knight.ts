/// <reference path="gameobject.ts" /> 

class Knight extends GameObject {

    private rightkey: number
    private leftkey: number

    private eListenerUp: any
    private eListenerDown: any

    private facingRight:boolean
    private frameCounter:number

    constructor(x : number, y : number, leftkey : number, rightkey : number, facingRight:boolean) {
        super(x, y, 0, 0, "knight")

        //load the images
        let tempHTML:HTMLElement = document.createElement("temp")
        document.body.appendChild(tempHTML)
        for(let i:number = 0; i < 18; i++){
            tempHTML.style.backgroundImage = "url(../docs/images/lgkw/l" + (i+1) + ".png)"
        }
        for(let i:number = 0; i < 18; i++){
            tempHTML.style.backgroundImage = "url(../docs/images/lgkw/r" + (i+1) + ".png)"
        }
        tempHTML.remove()

        this.leftkey = leftkey
        this.rightkey = rightkey

        this.facingRight = facingRight
        this.frameCounter = 1

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
                break
            case this.rightkey:
                this.speedX = 10
                this.facingRight = true
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.speedX = 0
                break
            case this.rightkey:
                this.speedX = 0
                break
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
            this.div.style.backgroundImage = "url(../docs/images/lgkw/r" + this.frameCounter +".png)"
            if(this.frameCounter == 18){
                this.frameCounter = 1
            }else{
                this.frameCounter++
            }
                
        }else{
            this.div.style.backgroundImage = "url(../docs/images/lgkw/l" + this.frameCounter +".png)"
            if(this.frameCounter == 18){
                this.frameCounter = 1
            }else{
                this.frameCounter++
            }
        }
        setTimeout(()=>this.Animation(), 50)
    }
}