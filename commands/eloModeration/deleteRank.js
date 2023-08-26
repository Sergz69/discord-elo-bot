const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Guild = require('../../schemas/guild');
const EloRank = require('../../schemas/eloRanks');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete_rank')
        .setDescription('Delete a rank')
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The role to delete as a rank')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        const rankRole = interaction.options.getRole('role');


        let eloRankProfile = await EloRank.findOne({ guildId: guildProfile.guildId });

        if (eloRankProfile) {
         

            await eloRankProfile.deleteOne({eloRankId: rankRole.id});
            await interaction.reply('Rank successfully deleted!');

        } else {
            interaction.reply(`The rank you are trying to delete hasn't been set.`);
        }

    }
}