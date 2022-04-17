require("discord.js");

module.exports.run = async (client, message, args) =>{
    const isPermitted = message.member.roles.cache.has(process.env.STAFF_ROLE);
    if(!isPermitted){
        message.channel.send("You're not permitted to use that");
        return;
    }
    let image = args[0];
    if(image === undefined) {
        message.channel.send("Please specify an image")
        return;
    }
    try {
        await client.user.setAvatar(image);
        message.channel.send("Avatar updated");
    } catch {
        message.channel.send("Could not update avatar. Check for errors");
    }
}
