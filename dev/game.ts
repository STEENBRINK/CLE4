//Start the game
class Game {
<<<<<<< HEAD
    constructor(){
        new Titlescreen();
=======

    private backgrounds:Array<Background>
    private bgCounter: number
    private bombCounter: number
    private car:Car
    private bombs:Array<Bomb>
    private explosions:Array<Explosion>
    private score:number
    private startTime:number
    private scoreElement:HTMLElement
    private healthELement:HTMLElement
    private speed:number
    private health:number
    private test:number

    constructor() {
        this.health=3
        this.speed = 2000
        this.explosions = new Array<Explosion>()
        //create backgrounds
        this.backgrounds = new Array<Background>()
        this.backgrounds.push(new Background(0, "0"))
        this.backgrounds.push(new Background(1280, "1"))
        this.bgCounter = 2
        //create score element
        this.score = 0
        let date = new Date()
        this.startTime = date.getTime()
        this.scoreElement = document.createElement("score")
        this.healthELement = document.createElement("health")
        document.body.appendChild(this.scoreElement)
        document.body.appendChild(this.healthELement)
        this.scoreElement.innerHTML = this.score.toString()
        this.healthELement.innerHTML = "Health: " + this.health
        //create car
        this.car = new Car()
        //create bombs
        this.bombs = new Array<Bomb>()
        this.bombCounter = document.getElementsByTagName("bomb").length
        this.checkBomb()
        //initiate game loop
        this.gameLoop()
>>>>>>> 339b0a6f5d036490f6a102b3de80159e3807358a
    }
    

    
}