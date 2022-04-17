const {MessageEmbed} = require("discord.js");
module.exports.help = {
	Name: "Command",
	RoleNeeded: "Administrator",
	Usage: `Command {Args}`,
	Restrictions: "N/A"
}

module.exports.run = async (client, message, args) => {

	if(!message.member.roles.cache.has(process.env.STAFF_ROLE)){
		message.reply("You are not permitted to use this.")
		return;
	}

	let suggestionId = args[0]
	if(!suggestionId || !client.suggestions.has(suggestionId) || args.length < 2){
		return message.reply({content: `Please supply a valid suggestion and reason`, allowedMentions: {repliedUser: false}})}

	args.shift()
	let response = args.join(" ")

	//pulls defined info from suggest.js to use elsewhere.
	let suggestionEntry = client.suggestions.get(suggestionId)

	//Embed for the accepted suggestion.
	let acceptedEmbed = new MessageEmbed()
	.setTitle(`${suggestionEntry.user}'s suggestion | Accepted`)
	.setDescription(`\`\`\`${suggestionEntry.suggestion}\`\`\``)
	.addField("Notes:", `\`\`\`${response}\`\`\``)
	.setColor('#00AA00')
	.setTimestamp(suggestionEntry.timestamp)
	.setThumbnail(suggestionEntry.avatar)
	.setFooter({text: `Accepted by: ${message.author.tag}`})
	
	let suggestionMessage = await message.guild.channels.cache.get(process.env.PENDING).messages.fetch(suggestionEntry.messageId)
	await suggestionMessage.delete()
	await suggestionMessage.thread.delete()
	suggestionEntry.status = "ACCEPTED"
	message.guild.channels.cache.get(process.env.ACCEPTED).send({embeds: [acceptedEmbed]})
	client.suggestions.set(suggestionId, suggestionEntry)
	
	await message.delete()
}