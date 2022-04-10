module.exports.help = {
	Name: "Command",
	RoleNeeded: "Administrator",
	Usage: `Command {Args}`,
	Restrictions: "N/A"
}

module.exports.run = async (client, message, args) => {

	if(!message.member.roles.cache.has(config.staffRole)){
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
	let acceptedEmbed = new Discord.MessageEmbed()
	acceptedEmbed.setTitle(`${suggestionEntry.user}'s suggestion | Accepted`)
	acceptedEmbed.setDescription(`\`\`\`${suggestionEntry.suggestion}\`\`\``)
	acceptedEmbed.addField("Notes:", `\`\`\`${response}\`\`\``)
	acceptedEmbed.setColor('#00AA00')
	acceptedEmbed.setTimestamp(suggestionEntry.timestamp)
	acceptedEmbed.setThumbnail(suggestionEntry.avatar)
	acceptedEmbed.setFooter(`Accepted by: ${message.author.tag}`)
	
	let suggestionMessage = await message.guild.channels.cache.get(config.channels.pendingChannel).messages.fetch(suggestionEntry.messageId)
	await suggestionMessage.delete()
	await suggestionMessage.thread.delete()
	suggestionEntry.status = "ACCEPTED"
	message.guild.channels.cache.get(config.channels.acceptedChannel).send({embeds: [acceptedEmbed]})
	client.suggestions.set(suggestionId, suggestionEntry)
	
	await message.delete()
}