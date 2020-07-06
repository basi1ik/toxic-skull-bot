var config = require('../config')
let {sortingGameChannels,setStatus} = require('../utils')
module.exports = async function (client) {

  console.log("Client ready. Connected as " + client.user.tag);
  client.guild = client.guilds.cache.get(config.guild);
  console.log('Server: ' + client.guild.name);
  setStatus(client)

  function intervalFunc() {
    sortingGameChannels(client.guild);    
  }   
 
  //setInterval(intervalFunc, 5000);
}
