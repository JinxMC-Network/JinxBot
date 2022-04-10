module.exports = async(client, files) => {
  console.log(`Loaded ${client.commands.size} commands.`)
  console.log(`Running as ${client.user.username}`)
  await client.user.setStatus(`DND`)
  await client.user.setActivity(`JinxMC`, {type: "WATCHING"});
  console.log(new Date().toLocaleTimeString());
  await client.guilds.fetch(process.env.GUILD_ID, true, true).catch(e => e)
  global.guild = await client.guilds.cache.get(process.env.GUILD_ID)
  // client.channels.cache.get('904898129147592796').send(client.user.username + " is Online");

};