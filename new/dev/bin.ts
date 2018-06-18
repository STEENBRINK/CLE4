/// <reference path="gameobject.ts"/> 
 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Bin extends GameObject {
    //private y: number -> staat al in parent
    //private speedY : number -> staat al in parent

    private downkey: number
    private upkey: number

    private eListenerUp: any
    private eListenerDown: any

    constructor(x : number, y : number, upkey : number, downkey : number) {
        super(x, y, 0, 0, "bin") // refereert naar de class die boven jou zit, geeft de x en y van hier door naar gameobjects

        this.upkey = upkey
        this.downkey = downkey

        this.eListenerDown = (e: KeyboardEvent) => this.onKeyDown(e)
        this.eListenerUp = (e: KeyboardEvent) => this.onKeyUp(e)

        window.addEventListener("keydown", this.eListenerDown)
        window.addEventListener("keyup", this.eListenerUp)
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = -10
                break
            case this.downkey:
                this.speedX = 10
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = 0
                break
            case this.downkey:
                this.speedX = 0
                break
        }
    }

    public update() {
        if (this.y > window.innerHeight - 100){ 
            this.y = window.innerHeight - 100;
        }
        if (this.y < 0 ){
            this.y = 1
        }

        super.move()
    }
}