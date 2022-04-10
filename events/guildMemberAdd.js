const { MessageEmbed } = require("discord.js");
const { client } = require("../index.js");


module.exports = async(member) => {


      const role = process.env.DISCORD_MEMBER_ROLE;
      await member.roles.add(role, 'Auto-Role on Join');
      
      var randomAnswer = join[Math.floor(Math.random() * join.length)];
      const url = `https://cdn.discordapp.com/emojis/${randomAnswer}.gif`;

    
    const joinEmbed = new MessageEmbed()
    .setColor('#9b59b6')
    .setAuthor(`${member.user.username}`, `${member.user.displayAvatarURL({ dynamic: true })}`)
    .setDescription(`Welcome <@${member.id}> to JinxMC!`)
    .setThumbnail(url)

      const channel = process.env.JOIN_MESSAGE_CHANNEL;
      await client.channels.cache.get(channel).send({embeds: [joinEmbed] });
      
  }
