const {Schema, model} = require('mongoose');


const GuildSchema = new Schema({
    guildId: String,
    guildName: String,
    guildOwner: String,
    registerRole: {type: String, default: 'null'},
    adminRole: {type: String, default: 'null'},
    eloAdmin: {type: String, default: 'null'}
}) 

module.exports = model('Guild', GuildSchema);