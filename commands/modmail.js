const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) =>{

    let embed = new MessageEmbed()
    .setColor('#6f0f9f')
    .setDescription(`
    If you would like to use modmail, start a message with \`Private\`, OR DM <@923071514163707965> 
    **Please upload any images/files with an external site** 
    For images, use [Imgur](https://imgur.com) | For large text files, use a [Pastebin](https://pastes.dev)`
    )
      message.channel.send({embeds: [embed]});
}