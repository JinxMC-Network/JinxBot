const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const used = process.memoryUsage().heapUsed / 1024 / 1024;

module.exports.run = async (client, message) =>{

  message.channel.send('Calculating result...').then(resultMessage => {

    const ping = resultMessage.createdTimestamp - message.createdTimestamp;
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new MessageEmbed()
    .setColor('#6f0f9f')
    .addFields(
      { name: '**Uptime**', value: `${duration}`, inline: true },
      { name: '**Memory Used**', value: `${Math.round(used * 100) / 100} MB`, inline: true },
      { name: '**Latency**', value: `\`\`\`Bot Latency: ${ping}ms` + `\nAPI Latency is ${Math.round(client.ws.ping)}ms\`\`\``})
      
      resultMessage.delete()
      message.reply({ embeds: [embed] }).catch(console.error)

  });
}