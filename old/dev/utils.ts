class Utils {
    //
    // kijk of twee objecten elkaar raken
    // dit moeten objecten zijn die een public x, y, width en height hebben
    // met overerving kunnen we gaan zorgen dat je hier ook andere objecten behalve charmeleon aan kan geven
    //
    isOverlap(c1:Player, c2:Player): boolean {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    }
    
    public removePreviousBackground(){
        var bg = document.getElementById("background");
        while (bg.hasChildNodes()) {   
            //bg.firstChild.remove();
             bg.removeChild(bg.firstChild);
        }
        bg.remove();
    }   
}