const { Message, MessageEmbed, MessageMentions } = require("discord.js");

module.exports.run = async (client, message, args) =>{

    let embed = new MessageEmbed()
    .setTitle("Server Info")
    .setURL("https://discord.jinxmc.net")
    .setColor('#6f0f9f')
    .addFields(
      { name: '**Author**', value: `<@${message.author.id}>`, inline: true},
      { name: '\u200B', value: '\u200B', inline: true },
      { name: '**Channel**', value: "channel", inline: true})

    message.reply({ embeds: [embed] });
}