const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const QueueChannel = require('../../schemas/queueChannel');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_queue_channel')
        .setDescription(`Sets a queue channel`)
        .addChannelOption(option =>
            option
            .setName('channel')
            .setDescription('The desired queue channel')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const queueChannel = interaction.options.getChannel('channel');
        let queueChannelProfile = await QueueChannel.findOne({channelId: queueChannel.id});

        if(!queueChannelProfile) {
            queueChannelProfile = new QueueChannel({
                guildId: interaction.guild.id,
                channelId: queueChannel.id
            })

            await queueChannelProfile.save();
            await interaction.reply('The channel was added as a queue.');
       } else {
            await interaction.reply('The channel you are adding already exists.');
       }
        


    }
}