const Game = require('./games/gameClass');

let Team1 = 1000    
let Team2 = 999

let difference = Team2 - Team1
if(difference < 0) {
    difference = difference * -1;
}

let eloGain = 50;
let eloLoss = 50;
const total = Team1 + Team2;

let percentageDifference = difference / total;
let percentageCalcLoss = 0.5 - percentageDifference/2;
let percentageCalcWin = 0.5 + percentageDifference/2;
let Team1Gain;
let Team1Loss;
let Team2Gain;
let Team2Loss;


if(Team1 > Team2 ) {
     Team1Gain = percentageCalcLoss*50;
     Team1Loss = percentageCalcWin*50;

} else {
     Team1Gain = percentageCalcWin*50;
     Team1Loss = percentageCalcLoss*50;
}

if(Team1 < Team2 ) {
    Team2Gain = percentageCalcLoss*50;
    Team2Loss = percentageCalcWin*50;

} else {
    Team2Gain = percentageCalcWin*50;
    Team2Loss = percentageCalcLoss*50;
}

console.log(`Team 1 win: ${Math.ceil(Team1Gain)}. Team 1 loss: ${Math.ceil(Team1Loss)}. Team 2 win: ${Math.ceil(Team2Gain)}. Team 2 loss: ${Math.ceil(Team2Loss)}`);
console.log("hello \n how are you?")








