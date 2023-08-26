const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Guild = require('../../schemas/guild');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription(`Adds the server to the bot's database`)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        let guildProfile = await Guild.findOne({guildId: interaction.guild.id});
        if(!guildProfile) {
            guildProfile = new Guild({
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                guildOwner: interaction.guild.ownerId
            })

            await guildProfile.save().catch(console.error);
            await interaction.reply('Your guild has been added.');
        } else {
            await interaction.reply('Your guild has already been setup.');
        }

    }
}