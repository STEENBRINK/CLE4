//Create titlescreen with background, title & audio
class Titlescreen {
    
    constructor(){
        var background = new Background(1,1,false);
        this.titleAnimation();
        this.createMenu();
        var music = new Music(1,1); 
        // document.getElementsByTagName("player1").addEventListener("click", this.levelload);
        
    }
    
    public levelload1(){
        new Level1(1);
    }
    
    public levelload2(){
        new Level1(2);
    }
    
    public CharacterSelect1(){
        new CharacterSelect(1);
    }
    
    public CharacterSelect2(){
        new CharacterSelect(2);
    }
    
    createMenu(){
        
        //Create 1 player button
        var player1 = document.createElement("player1");
        player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        player1.style.cursor = "pointer";
        player1.style.width = "472px";
        player1.style.height = "82px";
        player1.style.left = "50%";
        player1.style.top = "50%";
        player1.style.marginLeft = "-259px";
        player1.style.position = "absolute";
        document.getElementById("background").appendChild(player1);
        player1.setAttribute("id", "player1");
        document.getElementById("player1").addEventListener("click", this.CharacterSelect1);
        player1.style.display = "inline-block";
        player1.onmouseover=function(){
            player1.style.backgroundImage = "url(\"../images/interface/icons/1player_hover.png\")"
        }
        player1.onmouseleave=function(){
            player1.style.backgroundImage = "url(\"../images/interface/icons/1player.png\")";
        }
        player1.style.animation = "menuMove1 20s infinite";
        
        //Create 2 player button
        var player2 = document.createElement("player2");
        player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        player2.style.cursor = "pointer";
        player2.style.width = "519px";
        player2.style.height = "78px";
        player2.style.left = "50%";
        player2.style.top = "60%";
        player2.style.marginLeft = "-259px";
        player2.style.position = "absolute";
        document.getElementById("background").appendChild(player2);
        player2.setAttribute("id", "player2");
        document.getElementById("player2").addEventListener("click", this.CharacterSelect2);
        player2.style.display = "inline-block";
        player2.onmouseover=function(){
            player2.style.backgroundImage = "url(\"../images/interface/icons/2players_hover.png\")"
        }
        player2.onmouseleave=function(){
            player2.style.backgroundImage = "url(\"../images/interface/icons/2players.png\")";
        }
        player2.style.animation = "menuMove2 20s infinite";
        
        //Create achievements button
        var achievements = document.createElement("achievement");
        achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        achievements.style.cursor = "pointer";
        achievements.style.width = "594px";
        achievements.style.height = "78px";
        achievements.style.left = "50%";
        achievements.style.top = "70%";
        achievements.style.marginLeft = "-259px";
        achievements.style.position = "absolute";
        // document.getElementById("background").appendChild(achievements);
        achievements.style.display = "inline-block";
        achievements.onmouseover=function(){
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties_hover.png\")"
        }
        achievements.onmouseleave=function(){
            achievements.style.backgroundImage = "url(\"../images/interface/icons/prestaties.png\")";
        }
        achievements.style.animation = "menuMove3 20s infinite";
    }
    
    titleAnimation(){    
        
        //Create far range image with animation (white cell chase)
        var titleChaseFar = document.createElement('titleChaseFar');
        titleChaseFar.setAttribute("id", "titleChaseFar");
        titleChaseFar.style.backgroundImage = "url(\"../images/titlescreen/titleChaseFar.png\")";
        titleChaseFar.style.height = "100px";
        titleChaseFar.style.width = "200px";
        titleChaseFar.style.left = "-200px";
        titleChaseFar.style.top = "30%";
        titleChaseFar.style.position = "absolute";
        titleChaseFar.style.animation = "titleChaseFarMove 15s infinite";
        titleChaseFar.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseFar);
            
        //Create mid range title image with animation
        var title1 = document.createElement("title1");
        title1.style.backgroundImage = "url(\"../images/titlescreen/title3.png\")";
        title1.style.width = "1066px";
        title1.style.height = "434px";
        title1.style.left = "50%";
        title1.style.marginLeft = "-533px";
        title1.style.position = "absolute";
        title1.style.animation = "title1Move 20s infinite";
        document.getElementById("background").appendChild(title1);
        
        //Create close range image with animation (white cell chase)
        var titleChaseClose = document.createElement('titleChaseClose');
        var positionX = window.innerWidth;
        titleChaseClose.style.backgroundImage = "url(\"../images/titlescreen/titleChaseClose.png\")";
        titleChaseClose.style.height = "200px";
        titleChaseClose.style.width = "400px";
        titleChaseClose.style.left = positionX + "px";
        titleChaseClose.style.top = "60%";
        titleChaseClose.style.position = "absolute";
        titleChaseClose.style.animation = "titleChaseCloseMove 15s infinite";
        titleChaseClose.style.animationTimingFunction = "linear";
        document.getElementById("background").appendChild(titleChaseClose);
        
    } 
}