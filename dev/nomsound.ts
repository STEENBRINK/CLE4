class NomSound {
    
    //Choose track by using the parameter
    constructor(nomNumber:number){
        
        this.nomSound(nomNumber);
    }
    
    nomSound(nomNumber){
        var audio = document.createElement("audio");
        
        audio.src = "../audio/nom" + nomNumber + ".mp3";
        audio.loop = false;
        audio.play();
        document.getElementById("background").appendChild(audio);
    }
}