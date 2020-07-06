var Discord = require('discord.js');
var config = require('./config')
var fs = require("fs");
var {
  getGameRoleIdByChannelId
} = require('./db')

function _getMoscowTime() {
  var now = new Date()
  return {
    hours: (now.getUTCHours() + 3) % 24, // GMT+3
    minutes: now.getMinutes()
  }
}

const _prependZero = val => ("0" + val).slice(-2)

let {
  hours,
  minutes
} = _getMoscowTime()
hours = _prependZero(hours)
minutes = _prependZero(minutes)
let time = `${hours}:${minutes}`

function sortingGameChannels(guild) {

  var listMembers = [];
  guild.channels.cache.forEach((channel) => {
    if ((channel.type == 'voice') && (channel.parentID == config.channels.gamesParent)) {
      let {
        nMembers,
        uMembers
      } = getNumberOfMember(channel);

      var channelsByMember = {
        'idChannel': channel.id,
        'nameChannel': channel.name,
        'positionChannel': channel.position,
        'nMembers': nMembers,
      };
      if (nMembers > 0){
         console.log(channel.name + '|' + nMembers + '|' + channel.position)
      listMembers.push(channelsByMember);
      }     
    }
  });

  var orderedMember = orderByCountMember(listMembers);

  for (var i = 0; i < orderedMember.length; i++) {   
    var channel = guild.channels.cache.get(orderedMember[i].idChannel);
    channel.setPosition(i)
      .then(newChannel => console.log(`Channel's ${newChannel.name} new position is ${newChannel.position}`))
      .catch(console.error);
  }
}

function getNumberOfMember(channel) {
  let nMembers = 0;
  let uMembers = [];
  channel.members.forEach(member => {
    uMembers.push(member.user.username);    
    nMembers++;
  });
  return {
    nMembers,
    uMembers
  };
}

function orderByCountMember(channelsByMember) {
  channelsByMember.sort(function (a, b) {
    return b.nMembers - a.nMembers
  });
  return channelsByMember;
}

function setStatus(client) {
  client.user.setActivity(client.guild.name, { type: 'WATCHING' });  
}

async function setGameRole(channel, member) {

    const gameRoleId = await getGameRoleIdByChannelId(channel)
    let isGameRole = member.roles.cache.some(role => role.id === gameRoleId);
    const gameRole = member.guild.roles.cache.get(gameRoleId);

    if (!isGameRole) {
      member.roles.add(gameRole)
        .then(console.log(`${time} | The role ${gameRole.name} is added.`));
    } else {
      console.log(`you have [${gameRole.name}] already!`)
    }
}

function checkUrl(channelID, message) {

  if (channelID !== config.channels.links) {
        if (isUrlValid(message.content) == true) {
            console.log('это ссылка');
            message.delete({
                timeout: 1000,
                reason: 'It had to be done.'
            });
        }
    } else {
        if (isUrlValid(message.content) == false) {
            console.log('это ссылка');
            message.delete({
                timeout: 1000,
                reason: 'It had to be done.'
            });
        }
    }
  if (isDiscordInvite(message.content) == true) {
    console.log('это приглашение на другой сервер');
    message.delete({
      timeout: 1000,
      reason: 'It had to be done.'
    })
  } 
}

function isUrlValid(userInput) {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  //   /(http(s)?:\/\/.)?discord.gg\b([-a-zA-Z0-9]{0,6})/g - discord's link 
  if (res == null)
      return false;
  else
      return true;
}

function isDiscordInvite(userInput) 
{
  var res = userInput.match(/(http(s)?:\/\/.)?discord.gg\b([-a-zA-Z0-9]{0,6})/g);
 
  if (res == null)
    return false;
  else 
    return true; 
  
}
function sendMessageEmbed(text) {
  var embedMessage = new Discord.MessageEmbed()
  
  embedMessage = {
    color: 0x0099ff,
		description: text,
  }  
  return embedMessage         
  
}

module.exports = {
  time,
  sortingGameChannels,  
  setStatus,
  setGameRole,
  checkUrl,
  sendMessageEmbed
};