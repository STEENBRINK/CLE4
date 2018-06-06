//Load music
class Music {
    
    //Choose track by using the parameter
    constructor(musicNumber:number, volumeNumber:number){
        
        this.musicLoop(musicNumber, volumeNumber);
    }
    
    musicLoop(musicNumber, volumeNumber){
        var audio = document.createElement("audio");
        audio.setAttribute("id", "audio");
        
        audio.src = "../audio/music" + musicNumber + ".mp3";
        audio.loop = true;
        audio.volume = volumeNumber;
        audio.play();
        document.getElementById("background").appendChild(audio);
    }
}