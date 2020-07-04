var config = require('../config')
var {checkUrl, sendMessageEmbed} = require('../utils')

const Discord = require('discord.js');
var exampleEmbed = new Discord.MessageEmbed()

module.exports = async function (client, message) {
    if (!message || // нет сообщения
        message.author.bot || // автор - бот
        (message.guild && message.guild.id !== config.guild)) { // не наш сервер
        return
    }

    if (message.content.startsWith(config.prefix)) {
        if (message.channel.id === config.channels.commands ||           
            message.member.roles.cache.some(role => role.id === config.config.roles.admin)){            
            
            let [cmd, ...params] = message.content
                .slice(1) // убрать '!'
                .split(' ') // сделать массив
                .filter(token => token) // убрать пустые строки
                .map(token => token.toLowerCase()) // toLowerCase

            if (client.commands.hasOwnProperty(cmd)) {
                client.commands[cmd](client, message, params)
            } else {
                message.channel.send('Неизвестная команда')              
               
            }
        } 
        return        
    }       
 
    message.channel.send('sfsdfsdfsdfs')
    
   // message.channel.send(sendMessageEmbed('text'))
    

    // if ((message.content.startsWith('{'))&&(message.content.endsWith('}'))){
    //     console.log(exampleEmbed );
    //     message.channel.send({ embed: message.content })
    // }
}


