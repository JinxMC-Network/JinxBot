module.exports.help = {
	Name: "Command",
	RoleNeeded: "Administrator",
	Usage: `Command {Args}`,
	Restrictions: "N/A"
}
module.exports.run = async (client, message, args) => {
	if(!message.member.roles.cache.has(config.staffRole)) return;
	let suggestionId = args[0]
	if(!suggestionId || !client.suggestions.has(suggestionId) || args.length < 2){

		let invalidSR = new Discord.MessageEmbed()
		invalidSR.setDescription(`:x: Please supply a valid suggestion and reason`)
		invalidSR.setColor("#ff0000")
		return message.reply({embeds: [invalidSR], allowedMentions: {repliedUser: true}})
	}
	args.shift()
	let response = args.join(" ")
	let suggestionEntry = client.suggestions.get(suggestionId)
	let deniedEmbed = new Discord.MessageEmbed()

	deniedEmbed.setTitle(`${suggestionEntry.user}'s suggestion | Denied`)
	deniedEmbed.setDescription(`\`\`\`${suggestionEntry.suggestion}\`\`\``)
	deniedEmbed.addField("Notes:", `\`\`\`${response}\`\`\``)
	deniedEmbed.setColor('#ff0000')
	deniedEmbed.setTimestamp(suggestionEntry.timestamp)
	deniedEmbed.setThumbnail(suggestionEntry.avatar)
	deniedEmbed.setFooter(`Denied by: ${message.author.tag}`)
	
	let suggestionMessage = await message.guild.channels.cache.get(config.channels.pendingChannel).messages.fetch(suggestionEntry.messageId)
	await suggestionMessage.delete()
	await suggestionMessage.thread.delete()
	suggestionEntry.status = "DENIED"
	message.guild.channels.cache.get(config.channels.deniedChannel).send({embeds: [deniedEmbed]})
	client.suggestions.set(suggestionId, suggestionEntry)
	
	await message.delete()
}