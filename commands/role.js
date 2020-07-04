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
                    break;
                case 'update':
                    updateGameRole(args[1], args[2])
                        .then(console.log('update'))
                    break;
                case 'delete':
                    deleteGameRole(args[1])
                        .then(console.log('delete'))
                    break;
                default:
                    console.log("the parameter is not exist");
            }
        }
    } else {
        console.log('enter attribute')
    }
    console.log(message.content)    
    message.delete({timeout: 1000})
}

module.exports.aliases = ['role']