const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const GameCategory = require('../../schemas/gameCategroy');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_game_category')
        .setDescription('Set the game category')
        .addChannelOption(option => 
            option
            .setName('category')
            .setDescription('The category to add')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const category = interaction.options.getChannel('category');

        let gameCategory = await GameCategory.findOne({channelId: category.id});

        if(!gameCategory) {
            gameCategory = new GameCategory({
                guildId: interaction.guild.id,
                channelId: category.id
            })

            await gameCategory.save();

           await interaction.reply('Category added.');
        } else {
           await interaction.reply('You are trying to add the same channel.')
        }


    }
}