var config = require('../config')
let {time, setGameRole,sortingGameChannels} = require('../utils')

module.exports = async function (client, oldMember, newMember) {

  sortingGameChannels(client.guild);
  // Here I'm storing the IDs of their voice channels, if available
  let oldChannel = oldMember.channel ? oldMember.channelID : null;
  let newChannel = newMember.channel ? newMember.channelID : null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // Here I'm getting the bot's channel (bot.voiceChannel does not exist)
  let botMember = oldMember.guild.member(client.user),
    botChannel = botMember ? botMember.сhannelID : null;
  
  if (oldChannel == botChannel) {
    setGameRole(newChannel, oldMember.member);
    console.log("A user joined.");

  } else if (newChannel == botChannel) {
    console.log("A user left.");
    // textChannel.send(`${member} has left the voice channel.`);

    // nMember.roles.remove(role)
    //   .then(console.log(`${time} | The role is removed.`));
  }
}
