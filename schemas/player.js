const { Schema, model } = require('mongoose');


const PlayerSchema = new Schema({
    playerId: String,
    playerName: String,
    playerElo: Number,
    playerWins: Number,
    playerLosses: Number,
    playerMVPs: Number
});



module.exports = model('Player', PlayerSchema)