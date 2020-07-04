module.exports = async function(client, message, args) {
    message.channel.send('this is example command')
    console.log('example_alias1');
    console.log(args)
}

module.exports.aliases = ['example_alias1', 'example_alias2']
