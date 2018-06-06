/**
 * Virus
 */
class Virus extends Enemy {

    public id: number;
    public hitbox: Rectangle;
    public hitboxPosition: Vector;
    private rectanglePosition: Vector;
    private random:number;

    constructor(id: number, pos: Vector) {
        super(pos);
        this.id = id;
        this.div = document.createElement("virus");
        this.div.setAttribute("id", "virus" + this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);

        this.position = this.randomPosition();
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        this.random = (Math.random() * 1.5) + 0.5;
    }
    
    public move(life: Life) {
        // bij diffrence waar je naartoe wilt als eerste

        this.direction = life.position.difference(this.position);
        this.direction = this.direction.normalize();
        this.direction = this.direction.scale(this.random);
        this.position = this.position.add(this.direction);
        this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
        
        this.rectanglePosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.rectangle = new Rectangle(this.position, 75, 75);

        this.hitboxPosition = new Vector(this.position.x + 50, this.position.y + 50);
        this.hitbox = new Rectangle(this.hitboxPosition, 300, 300);
    }

}