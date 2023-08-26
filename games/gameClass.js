class Game {

    channelId;
    guildId;
    players = [];
    totalElo;
    gameId;

    mapPool = ['Mirage', 'Dust_2', 'Overpass', 'Anubis', 'Nuke', 'Ancient', 'Inferno'];



    constructor(guildId, channelId, players, gameId) {
        this.players = players;
        this.guildId = guildId;
        this.channelId = channelId;
        this.gameId = gameId;
    };

   
    
};

module.exports = Game;

