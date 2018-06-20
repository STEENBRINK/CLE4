/// <reference path="gameobject.ts" /> 

 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Painting extends GameObject {

    constructor(x : number, y : number, paintingClass:string) {
        super(x, y, 1, 0, "painting") 
        this.div.classList.add(paintingClass)
    }
}