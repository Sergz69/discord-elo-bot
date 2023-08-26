const { Schema, model } = require('mongoose');

const EloRanksSchema = new Schema({
    guildId: String,
    eloRankId: String,
    startingElo: Number,
    endingElo: Number,
    iterator: {type: Number, default: 0}
})


module.exports = model('EloRank', EloRanksSchema);

