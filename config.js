require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    db: process.env.DB,
    prefix: '!',    
    guild: '725061419103551560',

    channels: {
        commands: '725061419703468034',
        links: '',
        gamesParent:'',
        welcome: '',
    },

    roles: {
        admin: '727762646916399137',
        moderator: '',
        eventHost: '',
    }
}