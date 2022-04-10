const { Message, MessageEmbed, MessageMentions } = require("discord.js");

module.exports.run = async (client, message, args) =>{

    const embed = new MessageEmbed()
    .setColor("DARKER_GREY")
    .setDescription(
        `Latency is ${Date.now() - message.createdTimestamp}ms.`
        + `\n API Latency is ${Math.round(client.ws.ping)}ms`
        );

    message.reply({ embeds: [embed] });
}