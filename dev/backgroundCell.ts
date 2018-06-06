/**
 * backgroundCells
 */
class backgroundCells {
    
    private start:number;
    private end:number;
    private size:string;
    
    constructor(start:number, end:number, div:string, size:string) {
         
         this.start = start;
         this.end = end;
         this.size = size;
         
         for (var i = this.start; i < this.end; i++) {
            let backgroundCell = document.createElement(div);
            let randomImage = Math.floor(Math.random()*15 + 1);
            let positionX = window.innerWidth;
            let randomPositionY = Math.floor(Math.random()*window.innerHeight);
            let randomAnimationSpeed = i;
            
            backgroundCell.style.backgroundImage = "url(\"../images/backgrounds/cell" + randomImage + this.size +".png\")";
            backgroundCell.style.transform = "translatez(0)";
            backgroundCell.style.left = positionX + "px";
            backgroundCell.style.top = randomPositionY + "px";
            backgroundCell.style.animation = "backgroundCellMove " + randomAnimationSpeed + "s linear infinite";
            
            document.getElementById("background").appendChild(backgroundCell);       
        }
    }
}