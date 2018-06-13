/// <reference path="gameobject.ts" /> 
 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Paddle extends GameObject {
    //private y: number -> staat al in parent
    //private speedY : number -> staat al in parent

    private downkey: number
    private upkey: number

    // private downSpeed: number = 0
    // private upSpeed: number = 0

    constructor(x : number, y : number, upkey : number, downkey : number) {
        super(x, y, 0, 0, "paddle") // refereert naar de class die boven jou zit, geeft de x en y van hier door naar gameobjects

        this.upkey = upkey
        this.downkey = downkey

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.speedX = -5
                break
            case this.downkey:
                this.speedX = 5
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
        // check of de paddle binnen beeld blijft
        if (this.y > window.innerHeight - 100){ 
        this.y = window.innerHeight - 100;
        }
        if (this.y < 0 ){
        this.y = 1
        }

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}