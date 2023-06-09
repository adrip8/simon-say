const simonButtons = document.getElementsByClassName('button');
const startButton = document.getElementById('start-button');
const round = document.getElementById('round');

/*const buttonColors = ['blue','green','red','yellow'];
const gamePattern = []; */

class Simon {
    constructor(simonButtons, startButton, round){ 

        this.round = 0;
        this.totalRounds = 3;
        this.gameSequence = [];
        this.userPosition = 0;
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = {startButton, round}
    }

init() {
    this.display.startButton.onclick = () => this.startGame();

    }

startGame() {
    this.display.startButton.disabled = true;
    this.userPosition = 0;
    this.updateRound(0);
    this.gameSequence = this.createSequence();
    this.buttons.forEach((element, i) =>{
        element.classList.remove('winner'); 
        element.onclick = () => this.buttonClick(i);

    });
    this.showSequence();


}

//actualiza la ronda , es decir el tablero, resetea la ronda
updateRound(value){
    this.round = value;
    this.display.round.textContent = `Round ${this.round}`;

}

//array aleatorio de botones
createSequence() {
    return Array.from({length:this.totalRounds}, () => this.getRandomColor());

}
//devulve numero (0-3)
getRandomColor(){
    return Math.floor(Math.random()*4);
}

//se ejecuta cuando se hace click en un boton validando que los botones no esten bloqueados
buttonClick(index){
    !this.blockedButtons && this.validateChooseColor(value);
}

validateChooseColor(value){

    if (this.gameSequence[this.userPosition] == value){
        if (this.round == this.userPosition){
            this.updateRound(this.round++);
            this.isGameOver();
        }else{
            this.userPosition++;
        }
    }else{
        this.gameLost();
    }

}

//validando si la partida ya termino
isGameOver(){
    if (this.round == this.totalRounds){
        this.gameWon();
    }else{
        this.userPosition = 0;
        this.showSequence();
    };
}

showSequence() {

    this.blockedButtons = true;
    let sequenceIndex = 0;
    let timer = setInterval(() => {
        const button = this.buttons[[this.gameSequence[sequenceIndex]]]
        this.toggleButtonsStyle(button);
        setTimeout(() => this.toggleButtonsStyle(button), this.speed/2 )
        sequenceIndex = sequenceIndex + 1 ;
        if(sequenceIndex < this.round){
            this.blockedButtons = false;
            clearInterval(timer);
        }
       

    }, this.speed); 
}
//pinta los botones 
toggleButtonsStyle(button){
    button.classList.toggle('active');

}

gameLost(){
}

gameWon(){

}

};



const simon = new Simon (simonButtons, startButton, round);
simon.init();
