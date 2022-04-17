module.exports = async(client) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const memberCount = guild.memberCount;
  const memberCountChannel = guild.channels.cache.get(process.env.MEMBER_COUNT_CHANNEL);

  console.log(`Loaded ${client.commands.size} commands.`)
  console.log(`Running as ${client.user.username}`)
  await client.user.setStatus(`DND`)
  await client.user.setActivity(`JinxMC`, {type: "WATCHING"});
  console.log(new Date().toLocaleTimeString());
  await client.guilds.fetch(process.env.GUILD_ID, true, true).catch(e => e)
  global.guild = await client.guilds.cache.get(process.env.GUILD_ID)

  setInterval(function() {
    memberCountChannel.setName(`Members:  ${memberCount}`)
    // loops every 6 minutes
  }, 6 * 100000);

};