const { SlashCommandBuilder } = require('discord.js');

const testVar = 'test';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test'),
    async execute(interaction) {
        await interaction.reply(`${testVar}`);
    }
}