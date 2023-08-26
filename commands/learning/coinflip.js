const { SlashCommandBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flips a coin.'),
    async execute(interaction) {
        let x = Math.round(Math.random() * 1);
        let result;
        if(x == 1) {
        result = 'Tails';
         } else if (x == 0) {
             result = 'Heads';
            }
        await interaction.reply(`It was ${result}`);
    }
}