const { SlashCommandBuilder } = require('discord.js');
const Player = require('../../schemas/player');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('Change your IGN')
        .addStringOption(option => 
            option
            .setName('ign')
            .setDescription('Your new IGN')
            .setRequired(true)),
    async execute(interaction) {
                const nickname = interaction.options.getString('ign');
                const playerProfile = await Player.findOne({playerId: interaction.user.id});
                const member = interaction.member;
                const elo = playerProfile.playerElo;
                
                await playerProfile.updateOne({playerName: nickname});
                await member.setNickname(`[${elo}] ${nickname}`);
                await interaction.reply('IGN updated');
    }
}