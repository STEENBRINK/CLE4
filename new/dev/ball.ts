/// <reference path="gameobject.ts" /> 

 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Ball extends GameObject {

    constructor(x : number, y : number) {
        super(x, y, 1, 0, "ball") // refereert naar de class die boven jou zit, geeft de x en y van hier door naar gameobjects
      //  this.div.style.background = 
        this.update()
    }

    public getFutureRectangle(){
        let rect = this.div.getBoundingClientRect()
        rect.y += this.speedY
        return rect
    }

    // public speedFaster(){
        
    // }

    public bounce() {
        //this.speedX *= -1 // -1.1 als sneller moet gaan
        // bounce ball to paddle
        this.speedY *= -1
    }

    public update(): void {

      //  Bounce ball to wall
       if (this.x + 40 > window.innerWidth || this.x < 0) {
           this.speedX *= -1
        }

        // Ball update loop
        this.x += this.speedX
        this.y += this.speedY   
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }

    public removeMe() {
        this.div.remove()
    }
}