const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Guild = require('../../schemas/guild');
const EloRank = require('../../schemas/eloRanks');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_rank')
        .setDescription('Add ranks')
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The role to use as a rank')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('starting_elo')
                .setDescription('The starting elo of the rank')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('rankup_elo')
                .setDescription('The elo required to rank up')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        const rankRole = interaction.options.getRole('role');
        const startingElo = interaction.options.getInteger('starting_elo');
        const endingElo = interaction.options.getInteger('rankup_elo');

        let eloRankProfile = await EloRank.findOne({ guildId: guildProfile.guildId });
        const startingEloCheck = await EloRank.findOne({guildId: guildProfile.guildId}).where({startingElo: startingElo});
        const endingEloCheck = await EloRank.findOne({guildId: guildProfile.guildId}).where({endingElo: endingElo});
        const existingEloCheck = await EloRank.findOne({guildId: guildProfile.guildId}).where({eloRankId: rankRole.id});
        if (!eloRankProfile || !existingEloCheck && !endingEloCheck && !existingEloCheck) {
            eloRankProfile = new EloRank({
                guildId: guildProfile.guildId,
                eloRankId: rankRole.id,
                startingElo: startingElo,
                endingElo: endingElo
            })

            await eloRankProfile.save();
            await interaction.reply('Rank successfully added!');

        } else if(startingEloCheck) {
            await interaction.reply('Your starting elo contradicts with a different rank.')

        } else if (endingEloCheck) {
            await interaction.reply('Your ending elo contradicts with a different rank.')

        } else if (existingEloCheck){
            await interaction.reply('This role has already been chosen as a rank.');
        }

    }
}