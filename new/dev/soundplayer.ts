class SoundPlayer {
    constructor(html:HTMLElement, name:string, doLoop:boolean){
        let audio = document.createElement("audio");
        
        audio.src = "../docs/audio/" + name;
        audio.loop = doLoop;
        audio.play();
        html.appendChild(audio)
    }
    
}