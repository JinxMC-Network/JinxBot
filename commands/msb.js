const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) =>{

    if(args.length < 1) return message.channel.send("Message cannot be empty");
    let msgText = args.join("+")
    let embed = new MessageEmbed()
    .setTitle("Mocking Spongebob")
    .setColor('#fff56c')
    .setImage(`https://mockingspongebob.org/${msgText}`)

    message.channel.send({embeds: [embed]})


}
