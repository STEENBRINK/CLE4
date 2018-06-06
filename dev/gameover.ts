/**
 * GameOver
 */
class GameOver {
    private scoreDiv:HTMLElement;
    private tryAgainDiv: HTMLElement;
    private scoreContainerDiv: HTMLElement;
    private totalContainerDiv: HTMLElement;
    private totalDiv: HTMLElement;
    private finalScore: number;
    private feedbackDiv:HTMLElement;
    private buttonYes:HTMLElement;
    private buttonNo:HTMLElement;
    public playerCount: number;
    public utils:Utils;

    constructor(score, playerCount) {
        var background = new Background(1,1,false);
        this.playerCount = playerCount;
        this.finalScore = score;
        document.getElementById("background").style.cursor = "auto";
        this.createFinalScore();
    }

    public levelload1(){
        if (this.playerCount == 1) {
             new Level1(1);
        } else {
            new Level1(2);
        }

    }

    public goBack(){
        this.utils = new Utils();
        this.utils.removePreviousBackground();
        new Titlescreen();
    }

    public createFinalScore(){
        this.feedbackDiv = document.createElement("span");
        this.feedbackDiv.setAttribute("id", "feedback");
        document.getElementById("background").appendChild(this.feedbackDiv);

        this.scoreContainerDiv = document.createElement("span");
        this.scoreContainerDiv.setAttribute("id", "score-container");
        document.getElementById("background").appendChild(this.scoreContainerDiv);
        
        this.scoreDiv = document.createElement("span");
        this.scoreDiv.setAttribute("id", "score");
        document.getElementById("score-container").appendChild(this.scoreDiv);
        
        this.totalContainerDiv = document.createElement("span");
        this.totalContainerDiv.setAttribute("id", "total-container");
        document.getElementById("score-container").appendChild(this.totalContainerDiv);

        this.totalDiv = document.createElement("span");
        this.totalDiv.setAttribute("id", "total");
        this.totalDiv.innerHTML = ""+this.finalScore;
        document.getElementById("total-container").appendChild(this.totalDiv);

        this.tryAgainDiv = document.createElement("span");
        this.tryAgainDiv.setAttribute("id", "tryAgain");
        document.getElementById("background").appendChild(this.tryAgainDiv);

        this.buttonYes = document.createElement("span");
        this.buttonYes.setAttribute("id","resetGame");
        document.getElementById("background").appendChild(this.buttonYes);
        this.buttonYes.addEventListener("click",  () => this.levelload1());

        this.buttonNo = document.createElement("span");
        this.buttonNo.setAttribute("id","stopGame");
        document.getElementById("background").appendChild(this.buttonNo);
        this.buttonNo.addEventListener("click", this.goBack);

        let widthScore = document.getElementById("score").clientWidth;
        let widthTotal = document.getElementById("total").clientWidth;

        let scoreContainerWidth = widthScore + widthTotal;
        let windowWidth = window.innerWidth;

        let offsetLeft = (windowWidth - scoreContainerWidth) /2;

        let marginLeft = scoreContainerWidth / 2;
        marginLeft = offsetLeft;
        // this.score.style.width = "100px";
        this.scoreContainerDiv.style.width = ""+scoreContainerWidth+"px";
        this.scoreContainerDiv.style.marginLeft = ""+marginLeft+"px";
    }

}