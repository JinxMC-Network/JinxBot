module.exports = async(client, files) => {
  console.log(`Loaded ${client.commands.size} commands.`)
  console.log(`Running as ${client.user.username}`)
  await client.user.setStatus(`online`)
  await client.user.setActivity(`JinxMC`, {type: "WATCHING"});
  console.log(new Date().toLocaleTimeString());
  await client.guilds.fetch(config.guildID, true, true).catch(e => e)
  global.guild = await client.guilds.cache.get(config.guildID)
};