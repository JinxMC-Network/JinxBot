// Import and load all required modules and make them global to be used anywhere
global.Discord = require("discord.js");
global.Enmap = require("enmap");
global.fs = require('fs');
global.join = require('./join.json');
global.leave = require('./leave.json');
require("dotenv").config();

// Clear the console and setup the client
console.clear()

// global.client = new Discord.Client({partials: [`MESSAGE`, `CHANNEL`, `REACTION`],intents: [GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILDS,]})

 global.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "GUILD_MEMBERS"], partials: ["CHANNEL"] })


// Create the needed databases for the bot
client.commands = new Enmap();
client.suggestions = new Enmap({name: `Suggestions`})

// Load all needed functions so they can be accessed later
require("./functions/timeFunctions")

// Load all Discord.JS events
fs.readdir("./events/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".js")) return
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0]
    console.log(`Attempting to load discord client event ${eventName}`);
    client.on(eventName, event.bind(null, client))
  })
})

// Load all Client commands
fs.readdir("./commands", (err, files) => {
  if (err) return console.error(err);
  console.log("    - - - - - - - - - - - - - - - - - - - - - - - -")
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);

  });
});
// Login to the client using the token in the env` file
client.login(process.env.TOKEN)
