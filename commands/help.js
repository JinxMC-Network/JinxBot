const {MessageEmbed} = require("discord.js");

module.exports.run = async (client, message, args) =>{

    if(message.author.id !== "412070526081695744"){
        message.reply("You can't use that. It's still in development. \nIf you want it to be done quicker, bug <@412070526081695744>");
        return;
    }

    // This is for nothing, it's just to eliminate warns.
    let argument = args[0]
    console.log(argument)

        let helpEmbed = new MessageEmbed()
        .setTitle("Commands")

         fs.readdir("./commands", (err, files) => {
           files.forEach(file => {
             let commandName = file.split(".")[0];
                helpEmbed.addFields({ name: null, value: `${commandName}`})

           });
           message.channel.send({embeds: [helpEmbed]})
     });

}
