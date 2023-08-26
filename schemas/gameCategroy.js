const { Schema, model } = require('mongoose');


const GameCategory = new Schema({
    guildId: String,
    channelId: String
});



module.exports = model('GameCategory', GameCategory, 'gameCategories');

