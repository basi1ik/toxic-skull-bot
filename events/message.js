var config = require('../config')
var {checkUrl} = require('../utils')

const Discord = require('discord.js');
var exampleEmbed = new Discord.MessageEmbed()

module.exports = async function (client, message) {
    if (!message || // нет сообщения
        message.author.bot || // автор - бот
        (message.guild && message.guild.id !== config.guild)) { // не наш сервер
        return
    }

    //let isRole = member.roles.cache.some(role => role.id === gameRoles[i].RoleID);

    if (message.content.startsWith(config.prefix)) {
        if (message.channel.id === config.channels.commands ||           
            message.member.roles.cache.some(role => role.id === config.config.roles.admin)){            
            
            let [cmd, ...params] = message.content
                .slice(1) // убрать '!'
                .split(' ') // сделать массив
                .filter(token => token) // убрать пустые строки
                .map(token => token.toLowerCase()) // toLowerCase

            if (client.commands.hasOwnProperty(cmd)) {
               // message.react("🛐")
                client.commands[cmd](client, message, params)
            } else {
                message.channel.send('Неизвестная команда')              
               
            }
        } 
        return        
    }    
    
    checkUrl(message.channel.id, message);

    if ((message.content.startsWith('{'))&&(message.content.endsWith('}'))){
        console.log(exampleEmbed );
        message.channel.send({ embed: message.content })
    }
}
//{(color|title):\"[a-zA-Zа-яА-Я0–9]{0,200}\"}
exampleEmbed = {
	color: 0x0099ff,
	title: 'Some title',
	url: 'https://discord.js.org',
	author: {
		name: 'Some name',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
		url: 'https://discord.js.org',
	},
	description: 'Some description here',
	thumbnail: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},	
	image: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
	timestamp: new Date(),
	footer: {
		text: 'Some footer text here',
		icon_url: 'https://i.imgur.com/wSTFkRM.png',
	},
};

