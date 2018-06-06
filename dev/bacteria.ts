/// <reference path="enemy.ts" />


/**
 * Bacteria
 */
class Bacteria extends Enemy{
    
    public id: number;
    public hitbox: Rectangle;
    public hitboxPosition: Vector;
    public rectanglePosition: Vector;
    public splitBacteria;
    public counter = 300;
    private random:number;
    public div:HTMLElement;
    
    constructor(id: number, pos: Vector) {
        super(pos);
        this.id = id;
        this.div = document.createElement("bacteria");
        this.div.setAttribute("id", "bacteria" + this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);

        // this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.random = Math.floor((Math.random() * 5) + 3);
        
        let random = Math.floor(Math.random() * 60);
        this.counter = this.counter - random;
        
    }
    
    public move(life: Life) {
        // bij diffrence waar je naartoe wilt als eerste


        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(this.random / 7);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        
        this.rectanglePosition = new Vector(this.position.x + 25, this.position.y + 50);
        this.rectangle = new Rectangle(this.rectanglePosition, 150, 100);

        this.hitboxPosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 400, 400);
    }
    
}