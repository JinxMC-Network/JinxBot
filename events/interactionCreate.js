const { MessageEmbed } = require("discord.js");

module.exports = async(client, interaction, message) => {
    if(interaction.isButton()){
    let failedButton = new MessageEmbed()
    .setDescription('A user pressed a button which didn\'t work correctly. \nSee information below to debug it.')
    .addFields(
        { name: '**User**', value: `${interaction.user.tag}`, inline: true },
        { name: '**ButtonID**', value: `${interaction.customId}`, inline: true },
        )
        switch (interaction.customId){
                case "test-primary":
                console.log("Test-Primary is active.");
                interaction.reply({ content: 'Pong!', ephemeral: true });
                break;

                case "secondary":
                console.log("Secondary is active.");
                break;

                default:
//                 interaction.reply({ content: `Button not registered. Contact a staff member for help.`, ephemeral: true });
                client.channels.cache.get(process.env.BOT_LOGS_CHANNEL).send({embeds: [failedButton] });
                console.log("Button not registered. \nCustomID: " + interaction.customId)
                break;
        }
    }
}
