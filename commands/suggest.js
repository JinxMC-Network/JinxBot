const {nanoid} = require("nanoid");
module.exports.help = {
	Name: "Command",
	RoleNeeded: "Administrator",
	Usage: `Command {Args}`,
	Restrictions: "N/A"
}
module.exports.run = async (client, message, args) => {
	let prefix = config.prefix

	//Command can only be used in 1 channel
	if(message.channel.id !== config.channels.suggestionChannel){
		let invalidChannel = new Discord.MessageEmbed()
		invalidChannel.setDescription(`:x: This command can only be used in <#${config.channels.suggestionChannel}>`)
		invalidChannel.setColor("#ff0000")
		return message.reply({embeds: [invalidChannel], allowedMentions: {repliedUser: true}})
	}

	let suggestion = args.join(" ")
	if(!suggestion || suggestion === "" || suggestion.length < 2){
		let invalidFormat = new Discord.MessageEmbed()
		invalidFormat.setDescription(`:x: Incorrect format. Correct format: \n\`\`\`${prefix}suggest (suggestion here)\`\`\``)
		invalidFormat.setColor("#ff0000")
		return message.reply({embeds: [invalidFormat], allowedMentions: {repliedUser: true}})
	}

	let id = nanoid(7)
	let suggestionEmbed = new Discord.MessageEmbed()
	let avatar = message.author.displayAvatarURL()
	let user = message.author

	//Suggestion = Pending Embed
	suggestionEmbed.setTitle(`${message.author.tag}'s suggestion | Pending`)
	suggestionEmbed.setDescription(`\`\`\`${suggestion}\`\`\``)
	suggestionEmbed.setColor('#ea00ff')
	suggestionEmbed.setFooter(`Suggestion ID: ${id}`)
	suggestionEmbed.setTimestamp()
	suggestionEmbed.setThumbnail(avatar)

	let suggestionMessage = await message.guild.channels.cache.get(config.channels.pendingChannel).send({embeds: [suggestionEmbed]})

	//creates the thread, reacts with :yay: and :nay:.
	await suggestionMessage.startThread({name: `Discussion - ${id}`})
	await suggestionMessage.react('923086929791172608')
	await suggestionMessage.react('923086929363365908')
	await message.client.suggestions.set(
		id, {
			messageId: suggestionMessage.id,
			suggestion: suggestion,
			timestamp: message.createdTimestamp,
			user: message.author.tag,
			status: "PENDING",
			avatar: message.author.displayAvatarURL(),
			sender: message.author.id
		})

	//sends to user when they submit a suggestion.
	await message.react('928534175508742184')
	try {
		await user.send(`Your suggestion has been submitted!\nYour suggestion was \`\`\`${suggestion}\`\`\``);
	}
	catch (err){
		message.reply(`Your suggestion has been updated! \nI tried to DM you, but your Direct Messages are disabled.`)
	}
}