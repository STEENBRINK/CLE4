class GameObject {

    public x : number
    public y : number

    public speedY : number
    protected speedX : number
    protected div : HTMLElement

    constructor(x : number, y : number, speedY: number, speedX: number, object:string){
        // Creates element
        this.div = document.createElement(object)
        document.body.appendChild(this.div)

        // Set position
        this.x = x
        this.y = y

        // Set speed
        this.speedY = speedY
        this.speedX = speedX
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    public removeMe() {
        this.div.remove()
    }

    public move() : void {
        this.y += this.speedY
        this.x += this.speedX

        this.draw()
    }

    private draw():void{
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

}