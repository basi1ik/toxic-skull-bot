var {
    saveGameRole,
    deleteGameRole,
    updateGameRole
} = require('../db')
module.exports = async function (client, message, args) {
    // message.channel.send('this is example command')
   
    console.log('this is role command')
    if (!args.length == 0) {
        if ((args[0]) || (args[1]) || (args[2])) {
            switch (args[0]) {
                case 'add':
                    saveGameRole(args[1], args[2])
                        .then(console.log('add')) 
                        .then(message.channel.send('Игровая роль добавлена'))                       
                    break;
                case 'update':
                    updateGameRole(args[1], args[2])
                        .then(console.log('update'))
                        .then(message.channel.send('Игровая роль изменена'))               
                    break;
                case 'delete':
                    deleteGameRole(args[1])
                        .then(console.log('delete'))
                        .then(message.channel.send('Игровая роль удалена'))              
                    break;
                default:
                    console.log("не существующий параметр");
                    message.channel.send('Не существующий параметр')            

            }
        }
    } else {
        console.log('Введите атрибуты')
    }
    console.log(message.content)    
    message.delete({timeout: 1000})
}

module.exports.aliases = ['role']