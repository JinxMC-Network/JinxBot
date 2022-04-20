const { MessageEmbed } = require('discord.js');
module.exports.help = {
    Name: "Command",
    RoleNeeded: "Administrator",
    Usage: `Command {Args}`,
    Restrictions: "N/A"
}

module.exports.run = async (client, message, args) => {

// eventual check for server booster status.
    if(!args[0]){
        message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("Invalid syntax. \nCorrect syntax \`!setcolor [#RRGGBB | RANDOM]`")]})
            return;
    }

    let roleColor = args[0].toUpperCase();
    let regex = /^#[0-9A-F]{6}$/i.test(roleColor);
    if(regex === false && roleColor.toLowerCase() !== "random"){
        message.channel.send({
            embeds: [new MessageEmbed()
                  .setDescription("Invalid syntax. \nCorrect syntax \`!setcolor [#RRGGBB | RANDOM]`")]})
        return;
    }

    try {
        guild.roles.create({
          name: `${message.author.username}`,
          color: `${roleColor}`,
          position: 10,
        })

          .then(message.channel.send({
          embeds: [new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Your color has been updated to \`${roleColor}\`.`)]}))

    } catch (error) {
        console.log(error);
        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor('RED')
                .setDescription(`"Could not set role color. Contact a staff member for help"`)]});
    }
}
