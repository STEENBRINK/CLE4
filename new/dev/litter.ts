/// <reference path="gameobject.ts" /> 

 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Litter extends GameObject {

    constructor(x : number, y : number, garbageClass : string) {
        super(x, y, 1, 0, "litter") 
        this.div.classList.add(garbageClass)
    }
}