require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    db: process.env.DB,
    prefix: '!',    
    guild: process.env.GUILD,

    channels: {
        commands: process.env.COMMANDS,
        links: process.env.LINKS,
        gamesParent: process.env.GAMES_PARENT,
        welcome: '',
    },

    roles: {
        admin: process.env.ROLE_ADMIN,
        moderator: '',
        eventHost: '',
    }
}