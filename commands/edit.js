const {MessageEmbed} = require("discord.js");

module.exports.help = {
    Name: "Command",
    RoleNeeded: "Administrator",
    Usage: `Command {Args}`,
    Restrictions: "N/A"
}
module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.has(process.env.STAFF_ROLE)) return;
    let suggestionId = args[0]
    if(!suggestionId || !client.suggestions.has(suggestionId) || args.length < 2){

        let invalidEdit = new MessageEmbed()
            .setDescription(`:x: Please supply a valid suggestion ID, and your updated suggestion.`)
            .setColor("#ff0000")
        return message.reply({embeds: [invalidEdit], allowedMentions: {repliedUser: true}})
    }

    //Check if the person editing is staff, or suggestion owner


    args.shift()
    let updatedSuggestion = args.join(" ")
    let suggestionEntry = client.suggestions.get(suggestionId)

    let editedEmbed = new MessageEmbed()
        .setTitle(`${message.author.tag}'s suggestion | Pending`)
        .setDescription(`\`\`\`${updatedSuggestion}\`\`\``)
        .setColor('#ea00ff')
        .setFooter({text: `Suggestion ID: ${suggestionId}`})
        .setTimestamp()
        .setThumbnail(message.member.avatar)

    let suggestionMessage = await message.guild.channels.cache.get(process.env.PENDING).messages.fetch(suggestionEntry.messageId)
    await suggestionMessage.edit("test" + {embeds: [editedEmbed]})
    client.suggestions.set(suggestionId, suggestionEntry)

}