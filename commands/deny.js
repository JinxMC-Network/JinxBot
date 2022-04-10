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

		let invalidSR = new MessageEmbed()
		.setDescription(`:x: Please supply a valid suggestion and reason`)
		.setColor("#ff0000")
		return message.reply({embeds: [invalidSR], allowedMentions: {repliedUser: true}})
	}
	args.shift()
	let response = args.join(" ")
	let suggestionEntry = client.suggestions.get(suggestionId)

	let deniedEmbed = new MessageEmbed()
	.setTitle(`${suggestionEntry.user}'s suggestion | Denied`)
	.setDescription(`\`\`\`${suggestionEntry.suggestion}\`\`\``)
	.addField("Notes:", `\`\`\`${response}\`\`\``)
	.setColor('#ff0000')
	.setTimestamp(suggestionEntry.timestamp)
	.setThumbnail(suggestionEntry.avatar)
	.setFooter(`Denied by: ${message.author.tag}`)
	
	let suggestionMessage = await message.guild.channels.cache.get(process.env.PENDING).messages.fetch(suggestionEntry.messageId)
	await suggestionMessage.delete()
	await suggestionMessage.thread.delete()
	suggestionEntry.status = "DENIED"
	message.guild.channels.cache.get(process.env.DENIED).send({embeds: [deniedEmbed]})
	client.suggestions.set(suggestionId, suggestionEntry)
	
	await message.delete()
}