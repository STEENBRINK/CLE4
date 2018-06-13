class Vector {
    
    public x : number;
    public y : number;
    
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    
    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    public difference(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    public scale(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    // x en y delen door de lengte (magnitude) geeft normalized
    public normalize():Vector {
        let mag = this.magnitude();
        return new Vector(this.x/mag, this.y/mag);
    }

    public static reflectX(point: Vector, x: number) {
        return new Vector(2 * x - point.x, point.y);
    }

    public static reflectY(point: Vector, y: number) {
        return new Vector(point.x, 2 * y - point.y);
    }
}