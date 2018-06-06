class CharacterSelect {
    
    public utils:Utils;
    //public glassesNumber1:number;
    
    constructor(playerCount:number){
        this.gameMode(playerCount);

    }

    public goBack(){
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen();
    }
    
    public singleplayer(){
        new Level1(1);
    }
    
    public multiplayer(){
        new Level1(2);
    }
    
    gameMode(playerCount){


        
        if(playerCount == 1){
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            let background = new Background(1,1,false);
            var music = new Music(2,1);

             let backButton = document.createElement("backButton");
            backButton.setAttribute("id","backButton");
            document.getElementById("background").appendChild(backButton);
            document.getElementById("backButton").addEventListener("click", this.goBack);
            
            
            // Create image for player 1
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "50%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            
            // Create mouth for player 1
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            
            // Create sunglasses for player 1
            let player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber1+".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");

            //Instructions buttons
            let controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            controllers.style.marginLeft = "-150px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "50%";

            let arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.marginLeft = "-57.5px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "50%";
            arrowUpButton.style.backgroundImage = "url('../images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id","arrowUpButton");
            
            let arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.marginLeft = "-57.5px";
            arrowRightButton.style.top = "64%";
            arrowRightButton.style.left = "55.2%";
            arrowRightButton.style.backgroundImage = "url('../images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id","arrowUpButton");

            
            let arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.marginLeft = "-57.5px";
            arrowDownButton.style.top = "64%";
            arrowDownButton.style.left = "50%";
            arrowDownButton.style.backgroundImage = "url('../images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id","arrowDownButton");
            
            let arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.marginLeft = "-57.5px";
            arrowLeftButton.style.top = "64%";
            arrowLeftButton.style.left = "45%";
            arrowLeftButton.style.backgroundImage = "url('../images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id","arrowUpButton");

            // Choose glasses
            let buttonRight = document.createElement("chooseButtonRight");
            buttonRight.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight.style.cursor = "pointer";
            buttonRight.style.width = "82px";
            buttonRight.style.height = "110px";
            buttonRight.style.transform = "scale("+ -1 +")";
            buttonRight.style.top = "30%";
            buttonRight.style.left = "60%";
            buttonRight.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight);
            buttonRight.setAttribute("id", "buttonRight");
            document.getElementById("buttonRight").addEventListener("click", this.chooseGlasses1);
            buttonRight.onmouseover=function(){
                buttonRight.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            }
            buttonRight.onmouseleave=function(){
                buttonRight.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            }
            
            let buttonLeft = document.createElement("chooseButtonLeft");
            buttonLeft.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft.style.cursor = "pointer";
            buttonLeft.style.width = "80px";
            buttonLeft.style.height = "110px";
            buttonLeft.style.top = "30%";
            buttonLeft.style.left = "40%";
            buttonLeft.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft);
            buttonLeft.setAttribute("id", "buttonLeft");
            document.getElementById("buttonLeft").addEventListener("click", this.chooseGlasses1Prev);
            buttonLeft.onmouseover=function(){
                buttonLeft.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            }
            buttonLeft.onmouseleave=function(){
                buttonLeft.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            }

            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('../images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "50%";
            startButton.style.marginLeft = "-142.5px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.singleplayer);
            startButton.onmouseover=function(){
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton-hover.png\")";
            }
            startButton.onmouseleave=function(){
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton.png\")";
            }
        }
        
        else{
            this.utils = new Utils();
            this.utils.removePreviousBackground();
            var background = new Background(1,1,false);
            var music = new Music(2,1);
            
            let backButton = document.createElement("backButton");
            backButton.setAttribute("id","backButton");
            document.getElementById("background").appendChild(backButton);
            document.getElementById("backButton").addEventListener("click", this.goBack);

            // Create image for player 1
            let player1 = document.createElement("choosePlayer1");
            player1.setAttribute("id", "choosePlayer1");
            player1.style.backgroundImage = "url('../images/player/player.png')";
            player1.style.width = "200px";
            player1.style.height = "200px";
            player1.style.top = "25%";
            player1.style.left = "75%";
            player1.style.marginLeft = "-100px";
            player1.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player1);
            
            // Create mouth for player 1
            let player1Mouth = document.createElement("player1Mouth");
            player1Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player1Mouth.style.width = "200px";
            player1Mouth.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Mouth);
            
            // Create sunglasses for player 1
            let player1Glasses = document.createElement("player1Glasses");
            player1Glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber1+".png')";
            player1Glasses.style.width = "200px";
            player1Glasses.style.height = "200px";
            document.getElementById("choosePlayer1").appendChild(player1Glasses);
            player1Glasses.setAttribute("id", "player1Glasses");
                        
            let buttonRight1 = document.createElement("chooseButtonRight1");
            buttonRight1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight1.style.cursor = "pointer";
            buttonRight1.style.width = "82px";
            buttonRight1.style.height = "110px";
            buttonRight1.style.transform = "scale("+ -1 +")";
            buttonRight1.style.top = "30%";
            buttonRight1.style.left = "85%";
            buttonRight1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight1);
            buttonRight1.setAttribute("id", "buttonRight1");
            document.getElementById("buttonRight1").addEventListener("click", this.chooseGlasses1);
            buttonRight1.onmouseover=function(){
                buttonRight1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            }
            buttonRight1.onmouseleave=function(){
                buttonRight1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            }
            
            let buttonLeft1 = document.createElement("chooseButtonLeft1");
            buttonLeft1.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft1.style.cursor = "pointer";
            buttonLeft1.style.width = "80px";
            buttonLeft1.style.height = "110px";
            buttonLeft1.style.top = "30%";
            buttonLeft1.style.left = "65%";
            buttonLeft1.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft1);
            buttonLeft1.setAttribute("id", "buttonLeft1");
            document.getElementById("buttonLeft1").addEventListener("click", this.chooseGlasses1Prev);
            buttonLeft1.onmouseover=function(){
                buttonLeft1.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            }
            buttonLeft1.onmouseleave=function(){
                buttonLeft1.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            }

            // Create image for player 2
            let player2 = document.createElement("choosePlayer2");
            player2.setAttribute("id", "choosePlayer2");
            player2.style.backgroundImage = "url('../images/player/player.png')";
            player2.style.width = "200px";
            player2.style.height = "200px";
            player2.style.top = "25%";
            player2.style.left = "25%";
            player2.style.marginLeft = "-100px";
            player2.style.animation = "characterSelectMove 10s infinite";
            document.getElementById("background").appendChild(player2);
            
            // Create mouth for player 2
            let player2Mouth = document.createElement("player2Mouth");
            player2Mouth.style.backgroundImage = "url('../images/player/mouth1.png')";
            player2Mouth.style.width = "200px";
            player2Mouth.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Mouth);
            
            // Create sunglasses for player 2
            let player2Glasses = document.createElement("player2Glasses");
            player2Glasses.style.backgroundImage = "url('../images/player/glasses"+glassesNumber2+".png')";
            player2Glasses.style.width = "200px";
            player2Glasses.style.height = "200px";
            document.getElementById("choosePlayer2").appendChild(player2Glasses);
            player2Glasses.setAttribute("id", "player2Glasses");
            
            //Instructions buttons
            let controllers = document.createElement('controllers');
            controllers.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers.style.width = "300px";
            controllers.style.height = "123px";
            document.getElementById("background").appendChild(controllers);
            controllers.style.top = "45%";
            controllers.style.left = "68%";

            let controllers2 = document.createElement('controllers2');
            controllers2.style.backgroundImage = "url('../images/interface/icons/controllers.png')";
            controllers2.style.width = "300px";
            controllers2.style.height = "123px";
            document.getElementById("background").appendChild(controllers2);
            controllers2.style.top = "45%";
            controllers2.style.left = "18%";

            let arrowUpButton = document.createElement('arrowUpButton');
            arrowUpButton.style.height = "115px";
            arrowUpButton.style.width = "115px";
            arrowUpButton.style.top = "54.3%";
            arrowUpButton.style.left = "72.6%";
            arrowUpButton.style.backgroundImage = "url('../images/interface/icons/up-arrow.png')";
            document.getElementById('background').appendChild(arrowUpButton);
            arrowUpButton.setAttribute("id","arrowUpButton");
            
            let arrowRightButton = document.createElement('arrowRightButton');
            arrowRightButton.style.height = "115px";
            arrowRightButton.style.width = "115px";
            arrowRightButton.style.top = "64.1%";
            arrowRightButton.style.left = "77.5%";
            arrowRightButton.style.backgroundImage = "url('../images/interface/icons/right-arrow.png')";
            document.getElementById('background').appendChild(arrowRightButton);
            arrowRightButton.setAttribute("id","arrowUpButton");

            
            let arrowDownButton = document.createElement('arrowDownButton');
            arrowDownButton.style.height = "115px";
            arrowDownButton.style.width = "115px";
            arrowDownButton.style.top = "64.1%";
            arrowDownButton.style.left = "72.5%";
            arrowDownButton.style.backgroundImage = "url('../images/interface/icons/down-arrow.png')";
            document.getElementById('background').appendChild(arrowDownButton);
            arrowDownButton.setAttribute("id","arrowDownButton");
            
            let arrowLeftButton = document.createElement('arrowLeftButton');
            arrowLeftButton.style.height = "115px";
            arrowLeftButton.style.width = "115px";
            arrowLeftButton.style.top = "64.1%";
            arrowLeftButton.style.left = "67.7%";
            arrowLeftButton.style.backgroundImage = "url('../images/interface/icons/left-arrow.png')";
            document.getElementById('background').appendChild(arrowLeftButton);
            arrowUpButton.setAttribute("id","arrowUpButton");

            let wButton = document.createElement('wButton');
            wButton.style.height = "115px";
            wButton.style.width = "115px";
            wButton.style.top = "54.3%";
            wButton.style.left = "22.1%";
            wButton.style.backgroundImage = "url('../images/interface/icons/w-button.png')";
            document.getElementById('background').appendChild(wButton);
            wButton.setAttribute("id","wButton");
            
            let dButton = document.createElement('dButton');
            dButton.style.height = "115px";
            dButton.style.width = "115px";
            dButton.style.top = "64.1%";
            dButton.style.left = "27%";
            dButton.style.backgroundImage = "url('../images/interface/icons/d-button.png')";
            document.getElementById('background').appendChild(dButton);
            dButton.setAttribute("id","dButton");
            
            let sButton = document.createElement('sButton');
            sButton.style.height = "115px";
            sButton.style.width = "115px";
            sButton.style.top = "64.1%";
            sButton.style.left = "22.1%";
            sButton.style.backgroundImage = "url('../images/interface/icons/s-button.png')";
            document.getElementById('background').appendChild(sButton);
            sButton.setAttribute("id","sButton");
            
            let aButton = document.createElement('aButton');
            aButton.style.height = "115px";
            aButton.style.width = "115px";
            aButton.style.top = "64.1%";
            aButton.style.left = "17.2%";
            aButton.style.backgroundImage = "url('../images/interface/icons/a-button.png')";
            document.getElementById('background').appendChild(aButton);
            aButton.setAttribute("id","aButton");
           
            let buttonRight2 = document.createElement("chooseButtonRight1");
            buttonRight2.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonRight2.style.cursor = "pointer";
            buttonRight2.style.width = "82px";
            buttonRight2.style.height = "110px";
            buttonRight2.style.transform = "scale("+ -1 +")";
            buttonRight2.style.top = "30%";
            buttonRight2.style.left = "35%";
            buttonRight2.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonRight2);
            buttonRight2.setAttribute("id", "buttonRight2");
            document.getElementById("buttonRight2").addEventListener("click", this.chooseGlasses2);
            buttonRight2.onmouseover=function(){
                buttonRight2.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            }
            buttonRight2.onmouseleave=function(){
                buttonRight2.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            }
            
            let buttonLeft2 = document.createElement("chooseButtonLeft1");
            buttonLeft2.style.backgroundImage = "url('../images/interface/icons/arrow.png')";
            buttonLeft2.style.cursor = "pointer";
            buttonLeft2.style.width = "80px";
            buttonLeft2.style.height = "110px";
            buttonLeft2.style.top = "30%";
            buttonLeft2.style.left = "15%";
            buttonLeft2.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(buttonLeft2);
            buttonLeft2.setAttribute("id", "buttonLeft2");
            document.getElementById("buttonLeft2").addEventListener("click", this.chooseGlasses2Prev);
            buttonLeft2.onmouseover=function(){
                buttonLeft2.style.backgroundImage = "url(\"../images/interface/icons/arrow-hover.png\")";
            }
            buttonLeft2.onmouseleave=function(){
                buttonLeft2.style.backgroundImage = "url(\"../images/interface/icons/arrow.png\")";
            }

            var startButton = document.createElement("startButton");
            startButton.style.backgroundImage = "url('../images/interface/icons/startButton.png')";
            startButton.style.cursor = "pointer";
            startButton.style.width = "285px";
            startButton.style.height = "123px";
            startButton.style.top = "80%";
            startButton.style.left = "47%";
            startButton.style.marginLeft = "-41px";
            document.getElementById("background").appendChild(startButton);
            startButton.setAttribute("id", "startButton");
            document.getElementById("startButton").addEventListener("click", this.multiplayer);
            startButton.onmouseover=function(){
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton-hover.png\")";
            }
            startButton.onmouseleave=function(){
                startButton.style.backgroundImage = "url(\"../images/interface/icons/startButton.png\")";
            }
        }
        
        
        
    }
    
    chooseGlasses1 = () => {
       if(glassesNumber1 == 16){
           glassesNumber1 = 1;
           this.changeGlasses1();
       } else {
           glassesNumber1 += 1;
           this.changeGlasses1();
       }
    } 

    chooseGlasses1Prev  = () => {
        if(glassesNumber1 == 1){
            glassesNumber1 = 15;
            this.changeGlasses1();
        }
        else{
            glassesNumber1 -= 1;
            this.changeGlasses1();
        }
    }
    
    changeGlasses1 = () => { 
        
        var glasses = document.getElementById("player1Glasses");
        glasses.style.backgroundImage = "url(\"../images/player/glasses"+glassesNumber1+".png\")";
    }
    
    chooseGlasses2 = () => {
       if(glassesNumber2 == 16){
           glassesNumber2 = 1;
           this.changeGlasses2();
       } else {
           glassesNumber2 += 1;
           this.changeGlasses2();
       }
    } 

    chooseGlasses2Prev  = () => {
        if(glassesNumber2 == 1){
            glassesNumber2 = 15;
            this.changeGlasses2();
        }
        else{
            glassesNumber2 -= 1;
            this.changeGlasses2();
        }
    } 
    
    changeGlasses2 = () => { 
        
        var glasses = document.getElementById("player2Glasses");
        glasses.style.backgroundImage = "url(\"../images/player/glasses"+glassesNumber2+".png\")";
    }
            
}