const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const QueueChannel = require('../../schemas/queueChannel');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('queues')
        .setDescription('List all queues on the server.'),
    async execute(interaction) {

        const queueChannels = await QueueChannel.find({guildId: interaction.guild.id});
        
        let arr = [];

        for await (const doc of queueChannels) {
            arr.push(doc.channelId);
        }

        const queuesEmbed = new EmbedBuilder()
            .setColor('bb00ff')
            .setTitle('Queues')
            .setDescription('These are the current queues');

        for (let i = 0; i < arr.length; i++) {
            queuesEmbed.addFields({name: `<#${arr[i]}>`, value: ' '});
        }

        interaction.reply({embeds: [queuesEmbed]});

    }
}