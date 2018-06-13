//Create a new background with 3 layers
class Background {
    
    private backgroundItems:backgroundItems;
    public animation: boolean;
    
    //Use the parameters to choose background images (back & front layer)
    constructor(backLayerImage:number, frontLayerImage:number, animation:boolean){
        this.createBackground();
        this.backLayer(backLayerImage);
        this.midLayer();
        this.animation = animation;
        this.frontLayer(frontLayerImage, this.animation);


    }    
   
    createBackground(){
        var background = document.createElement("background");
        background.setAttribute("id", "background");
        document.body.appendChild(background);
    }
    
    //Create the back layer image (first background image)
    backLayer(backLayerImage){
        var backLayer = document.createElement("backLayer");
        backLayer.style.backgroundImage = "url(\"../images/backgrounds/backLayer" + backLayerImage + ".jpg\")";
        document.getElementById("background").appendChild(backLayer);
    }
        
    //Create the mid layer images (animated backgrounditems)
    midLayer(){
        //Create far range items (small size & low speed)
        this.backgroundItems = new backgroundItems(26,36, "backgroundItemsmall", "small");
         
        //Create mid range items (mid size & mid speed)
        this.backgroundItems = new backgroundItems(16,26, "backgroundItemMedium", "medium");
         
        //Create close range items (big sized & fast speed)
        this.backgroundItems = new backgroundItems(6,16, "backgroundItemLarge", "large");        
    }
        
    //Create front layer image (transparent second background image)
    private frontLayer(frontLayerImage, animation:boolean){
        var frontLayer = document.createElement("frontLayer");
        frontLayer.style.backgroundImage = "url(\"../images/backgrounds/frontLayer" + frontLayerImage + ".png\")";
        document.getElementById("background").appendChild(frontLayer);
        if(animation == true){
            frontLayer.style.animation = "changeFrontLayer 210000ms linear";
            frontLayer.style.animationFillMode = "forwards";
        }    
    }
}