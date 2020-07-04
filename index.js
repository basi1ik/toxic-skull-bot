const Discord = require("discord.js");
const config = require('./config');
const client = new Discord.Client();

const {setStatus} = require('./utils');
//setStatus();

client.commands = {};

loadEvents();
loadCommands();

function loadEvents() {
  console.log('=========== loading events =============')
  var normalizedPath = require("path").join(__dirname, "events");
  require("fs").readdirSync(normalizedPath).forEach(function (fileName) {
    var handler = require("./events/" + fileName);
    let eventName = fileName.replace(/\.[^/.]+$/, "") // drop extension
    client.on(eventName, handler.bind(null, client))
    console.log(`${fileName} loaded`)
  })
  console.log('=========================================')
}

function loadCommands() {
  console.log('=========== loading commands =============')
  var normalizedPath = require("path").join(__dirname, "commands");
  require("fs").readdirSync(normalizedPath).forEach(function (fileName) {
    var handler = require("./commands/" + fileName);
    let cmdName = fileName.replace(/\.[^/.]+$/, "") // drop extension
    client.commands[cmdName] = handler
    console.log(`command ${cmdName} loaded`)
    handler.aliases.forEach(aliasName => {
      client.commands[aliasName] = handler
      console.log(`setting alias ${aliasName}`)
    })
  })
  console.log('=========================================')
}

client.login(config.token);

// client.on('raw', async event => {
//   console.log(event);
// })



