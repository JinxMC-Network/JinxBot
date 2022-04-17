const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {

    await member.roles.add(process.env.DISCORD_MEMBER_ROLE, 'Auto-Role on Join');

    let randomAnswer = join[Math.floor(Math.random() * join.length)];
    let joinURL = `https://cdn.discordapp.com/emojis/${randomAnswer}.gif`;
    
    const joinEmbed = new MessageEmbed()
    .setColor('#9b59b6')
    .setAuthor({name: `${member.user.username}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
    .setDescription(`Welcome <@${member.user.id}> to JinxMC!`)
    .setThumbnail(joinURL)
    await client.channels.cache.get(process.env.JOIN_MESSAGE_CHANNEL).send({embeds: [joinEmbed] });
    }
