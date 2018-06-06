/**
 * GameObject
 */


class GameObject {
    
    public position:Vector;
    public speed:Vector;
    public div:HTMLElement;
    public rectangle:Rectangle;
    
    constructor(pos:Vector) {
        this.position = pos;
    }
    
    public changeImage(image: string){
        this.div.style.backgroundImage = (image);
    }

}