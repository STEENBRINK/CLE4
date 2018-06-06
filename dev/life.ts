/**
 * Life
 */
class Life {
    
    public div:HTMLElement;
    // public x: number;
    // public y: number;
    public width: number;
    public height: number;
    public life: Life;
    public position: Vector;
    public newPosition : Vector;
    public rectangle: Rectangle;
    public newRectangle: Rectangle;
    public id: number;
    private direction: Vector;
    
    constructor(id:number) {
        this.id = id;
        this.div = document.createElement("redBloodCell");
        this.div.setAttribute("id", ""+this.id);
        this.div.style.transform = "translatez(0)";
        document.getElementById("background").appendChild(this.div);
        this.position = this.randomPosition();
        this.newPosition = this.randomPosition();

        this.width = 75;
        this.height = 75;
    }
    
    randomPosition(): Vector{
        
        let x = Math.floor(Math.random() * window.innerWidth / 3) + window.innerWidth / 3;
        let y = Math.floor(Math.random() * window.innerHeight / 3) + window.innerHeight / 3; 
        
        return new Vector(x,y);
    }
    
    move() : void{
            this.newRectangle = new Rectangle(this.newPosition, 10, 10);
            this.rectangle = new Rectangle(this.position, 50, 50);  
               
        if(this.rectangle.hitsOtherRectangle(this.newRectangle)){
            this.newPosition = this.randomPosition();
        }
        
        else{
            this.direction = this.newPosition.difference(this.position);
            this.direction = this.direction.normalize();
            let randomSpeed = Math.floor((Math.random() * 3) + 1);
            this.direction = this.direction.scale(randomSpeed);
            this.position = this.position.add(this.direction);
            if(this.direction.x >= 0){
                  this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scaleX(1)";
            } else {
                  this.div.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scaleX(-1)";
            }


        }
    }
    
    draw() : void {
        this.div.style.transform = "translate("+this.position.x+"px, "+this.position.y+"px)";
    }
    
    // animationTimer(){
    //     var timer = setInterval(this.move(), 2000);
        
    // }
}