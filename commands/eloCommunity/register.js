const { SlashCommandBuilder } = require('discord.js');
const Player = require('../../schemas/player.js')
const Guild = require('../../schemas/guild.js')







module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers the player')
        .addStringOption(option =>
            option
              .setName('ign')
              .setDescription('Your in-game name')
              .setRequired(true)),
    async execute(interaction) {

        const role = await Guild.findOne({ guildId: interaction.guildId });
        const member = interaction.member
        const nickname = interaction.options.getString('ign');
        let playerProfile = await Player.findOne({ playerId: interaction.user.id });
        if (!playerProfile) {


            playerProfile = new Player({
                playerId: interaction.user.id,
                playerName: nickname,
                playerElo: 0,
                playerWins: 0,
                playerLosses: 0,
                playerMVPs: 0
            })

            await playerProfile.save().catch(console.error);
            await interaction.reply("You have been registered");
            await member.roles.add(role.registerRole).catch(console.error);
            const playerStat = await Player.findOne({playerId: interaction.user.id});
            const elo = playerStat.playerElo;
            await member.setNickname(`[${elo}] ${playerStat.playerName}`);
        } else {
            await interaction.reply("You are already registered. Use the command /rename to change name.");
            await member.roles.add(role.registerRole).catch(console.error);
        }

    }
}