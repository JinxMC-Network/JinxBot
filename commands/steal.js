const { MessageEmbed, Util } = require("discord.js");

module.exports.run = async (client, message, args) =>{

    const isPermitted = message.member.roles.cache.has(process.env.STAFF_ROLE);
    
    if(!isPermitted){
        message.channel.send("You are not permitted to use that");
        return;
    }

    const embed = new MessageEmbed()
    .setColor("DARK_RED")
    .setDescription(`:x: Incorrect format\n Correct format: ${process.env.PREFIX}steal (emoji) [name]`)

    if (!args.length){
    return message.channel.send({ embeds: [embed] });
    }


    for (const raw_emoji of args){
        const parsed_emoji = Util.parseEmoji(raw_emoji);
        if(parsed_emoji.id){
            const extension = parsed_emoji.animated ? ".gif" : ".png";
            let url = `https://cdn.discordapp.com/emojis/${parsed_emoji.id + extension}`;
            try {
                message.guild.emojis.create(url, parsed_emoji.name).then((emoji) => {

                    const embed1 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`${emoji} has been added to the server, with the name ${parsed_emoji.name}.`)
                    message.channel.send(
                        {embeds: [embed1]}
                    );
                
                });

            } catch (error) {
                message.channel.send("Could not add emoji");
                console.log(error);
                return;

            }
        }
    }
}