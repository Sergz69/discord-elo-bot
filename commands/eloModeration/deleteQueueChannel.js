const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const QueueChannel = require('../../schemas/queueChannel');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete_queue_channel')
        .setDescription(`Delete a queue channel`)
        .addChannelOption(option =>
            option
            .setName('channel')
            .setDescription('The desired queue channel')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const queueChannel = interaction.options.getChannel('channel');
        let queueChannelProfile = await QueueChannel.findOne({channelId: queueChannel.id});

        if(queueChannelProfile) {
            await queueChannelProfile.deleteOne({channelId: queueChannel.id});
            await interaction.reply('The channel was deleted');
       } else {
            await interaction.reply(`The channel you are trying to delete hasn't been set.`);
       }
        


    }
}