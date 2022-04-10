const { MessageEmbed } = require("discord.js");
let randomAnswer;
let url;

module.exports.run = async (client, message, args) =>{


    switch (args[0]){
        case "join":
            randomAnswer = join[Math.floor(Math.random() * join.length)]
            url = `https://cdn.discordapp.com/emojis/${randomAnswer}.gif`;

            const joinEmbed = new MessageEmbed()
            .setColor('#9b59b6')
            .setAuthor(`${message.member.user.username}`, `${message.member.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Welcome <@${message.member.id}> to JinxMC!`)
            .setThumbnail(url);
            return message.channel.send({embeds: [joinEmbed]});
            break;

        case "leave":
            randomAnswer = leave[Math.floor(Math.random() * leave.length)]
            url = `https://cdn.discordapp.com/emojis/${randomAnswer}.gif`;

            const leaveEmbed = new MessageEmbed()
            .setColor('#9b59b6')
            .setAuthor(`${message.member.user.username}`, `${message.member.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Goodbye <@${message.member.id}>...`)
            .setThumbnail(url);
            return message.channel.send({embeds: [leaveEmbed]});
            break;

        case undefined:
            message.reply("please specify an argument");
            break;
            
        default:
            message.channel.send("I don't know what you mean by " + args[0]);
            break;
    }
};