/**
 * Rectangle
 */
class Rectangle {
    
    public position: Vector;
    public width: number;
    public height: number;
    
    constructor(pos:Vector, w:number, h:number) {
        this.position = pos;
        this.width = w;
        this.height = h;
    }
    
    // kijk of een punt binnen deze rectangle is - handig voor muis kliks
    hitsPoint(posx:number, posy:number): boolean {
        var differencex = this.position.x - posx;
        var differencey = this.position.y - posy;
        
        return Math.abs(differencex) < this.width/2 && Math.abs(differencey) < this.height/2;
    }
    
    // kijk of twee rectangles elkaar raken
    hitsOtherRectangle(rec: Rectangle): boolean {
        var differencex = this.position.x - rec.position.x;
        var differencey = this.position.y - rec.position.y;
        
        return Math.abs(differencex) < this.width/2 + rec.width/2 && Math.abs(differencey) < this.height/2 + rec.height/2;
    }
    
    // geef terug of de rectangle HELEMAAL binnen de andere rectangle past
    isInsideRectangle(rec:Rectangle) : boolean {
        var rx = this.position.x - rec.position.x;
        var ry = this.position.y - rec.position.y;
        
        return(rx > 0 && 
           rx + this.width < window.innerWidth && 
           ry > 0 && 
           ry + this.height < window.innerHeight)
    }
}