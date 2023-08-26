const { Schema, model } = require('mongoose');

const QueueChannel = new Schema({
    guildId: String,
    channelId: String
})

module.exports = model('QueueChannel', QueueChannel);

