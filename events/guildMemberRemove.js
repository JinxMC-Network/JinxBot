const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {

    let randomAnswer = leave[Math.floor(Math.random() * leave.length)];
    const leaveURL = `https://cdn.discordapp.com/emojis/${randomAnswer}.gif`;

    const leaveEmbed = new MessageEmbed()
        .setColor('#9b59b6')
        .setAuthor({
            name: `${member.user.username}`,
            iconURL: `${member.user.displayAvatarURL()}`
        })
        .setDescription(`Goodbye <@${member.user.id}>...`)
        .setThumbnail(leaveURL)
    //
    const channel = process.env.JOIN_MESSAGE_CHANNEL;
    await client.channels.cache.get(channel).send({embeds: [leaveEmbed] });
}
