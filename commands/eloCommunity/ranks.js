const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const EloRank = require('../../schemas/eloRanks');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ranks')
        .setDescription('Shows the ranks of the server'),
    async execute(interaction) {


        const eloRanks = EloRank.find({ guildId: interaction.guild.id });

        let arr = [];


        for await (const doc of eloRanks.find()) {
            arr.push(doc.eloRankId);
        }

        
        
        const ranksEmbed = new EmbedBuilder().setTitle('Ranks');

        for(let i = 0; i < arr.length; i++) {
            ranksEmbed.addFields({
                name: ` `, value: `<@&${arr[i]}>`
            })
        };

        interaction.reply({embeds: [ranksEmbed]});

        console.log(arr);        

}


}