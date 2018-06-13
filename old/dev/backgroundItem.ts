/**
 * backgroundItems
 */
class backgroundItems {
    
    private start:number;
    private end:number;
    private size:string;
    
    constructor(start:number, end:number, div:string, size:string) {
         
         this.start = start;
         this.end = end;
         this.size = size;
         
         for (var i = this.start; i < this.end; i++) {
            let backgroundItem = document.createElement(div);
            let randomImage = Math.floor(Math.random()*15 + 1);
            let positionX = window.innerWidth;
            let randomPositionY = Math.floor(Math.random()*window.innerHeight);
            let randomAnimationSpeed = i;
            
            backgroundItem.style.backgroundImage = "url(\"../images/backgrounds/villager" + randomImage + this.size +".png\")"; //TODO rename
            backgroundItem.style.transform = "translatez(0)";
            backgroundItem.style.left = positionX + "px";
            backgroundItem.style.top = randomPositionY + "px";
            backgroundItem.style.animation = "backgroundItemMove " + randomAnimationSpeed + "s linear infinite";
            
            document.getElementById("background").appendChild(backgroundItem);       
        }
    }
}