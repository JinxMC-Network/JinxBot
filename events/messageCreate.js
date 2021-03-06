require("../index.js");
const { MessageEmbed } = require("discord.js")
let channelID = process.env.MODMAIL_CHANNEL;

module.exports = async(client, message) => {

	 if(message.author.id === '924021335724789770' || message.author.id === '923071514163707965') return;
	 if(message.channel.type === 'DM' || message.content.startsWith("private ")){

    let channel = message.channel.type;
    switch (channel) {
      case 'DM':
        channel = "Direct Message";
        break;
      default:
        channel = `<#${message.channel.id}>`
        break;
    }

    let mContent;
    if(message.content.length === 0){
      mContent = "**None**";
    } else {
      mContent = message.content;
    }

    if(message.attachments.length === undefined){
//         message.channel.send("I cannot see attachments. Please send images/files with a link.")
    console.log("its undefined")
    }


    let embed = new MessageEmbed()
    .setColor('#FF0000')
    .setDescription("ModMail")
    .addFields(
      { name: '**Author**', value: `<@${message.author.id}>`, inline: true},
      { name: '\u200B', value: '\u200B', inline: true },
      { name: '**Channel**', value: channel, inline: true})
    .setThumbnail("https://images-ext-1.discordapp.net/external/AwkdRkXWlpPdIsjDM716uH2HI0CPP6GxPlnMqwT0W_g/https/i.imgur.com/zY8VBQ8.png")
    .addField('Message', mContent)

    if (message.channel.type === "GUILD_TEXT"){
      message.delete();

    }
    client.channels.cache.get(channelID).send({ embeds: [embed]});

  }

	// Ignore all bots
	if(message.author.bot) return


	// Ignore messages not starting with the prefix (in .env)
	if (message.content.indexOf(process.env.PREFIX) !== 0) return;

	// Our standard argument/command name definition.
	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	// Grab the command oldData from the client.commands Enmap
	const cmd = client.commands.get(command);

	// If that command doesn't exist, silently exit and do nothing
	if (!cmd) return;

	// Run the command
	cmd.run(client, message, args);

};
