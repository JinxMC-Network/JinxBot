require("discord.js");
module.exports.help = {
    Name: "Command",
    RoleNeeded: "Administrator",
    Usage: `Command {Args}`,
    Restrictions: "N/A"
}

module.exports.run = async (client, message, args) => {
    let SentMessage = args.join(" ")
    message.channel.send(SentMessage);
    await message.delete();
}