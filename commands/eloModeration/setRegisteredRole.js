const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Guild = require('../../schemas/guild')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_registered_role')
        .setDescription('Set the role that will be given to users once they register.')
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The registered role')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        
        const getRole = interaction.options.getRole('role');
        await Guild.updateOne({ guildId: interaction.guild.id }, { registerRole: getRole.id }).catch(console.error);
        console.log(getRole.name);
        await interaction.reply('Role set');

    }
}