const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) =>{
    let embed = new MessageEmbed()
        .setDescription("Pong!");
    message.channel.send({embeds: [ embed ]});
}
