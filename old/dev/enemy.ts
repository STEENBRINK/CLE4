/// <reference path="gameobject.ts" />


/**
 * Enemy
 */
class Enemy extends GameObject {
    
    hitboxPosition: Vector;
    hitbox: Rectangle;
    direction: Vector;
    
    constructor(pos: Vector) {
        super(pos);
    }


    public randomPosition() {

        let random = Math.floor(Math.random() * 4) + 1;
        //links
        if (random == 1) {
            var x = -125;
            var y = Math.floor(Math.random() * window.innerHeight);
            return new Vector(x, y);
        //rechts
        } else if (random == 2) {
            var x = window.innerWidth + 125;
            var y = Math.floor(Math.random() * window.innerHeight + 125);
            return new Vector(x, y);
        //boven    
        } else if (random == 3) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = -125;
            return new Vector(x, y);
        } else if (random == 4) {
            var x = Math.floor(Math.random() * window.innerWidth - 125);
            var y = window.innerHeight + 125;
            return new Vector(x, y);
        }
    }
    
    

    public hitsLife(life: Life) {
        if (this.rectangle.hitsOtherRectangle(life.rectangle)) {
            return true;
        }
    }
    
    public remove() {
        this.div.remove();
    }
}