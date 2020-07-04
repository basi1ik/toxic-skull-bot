const {saveAuditLog} = require('../db')
module.exports = async function (client, member) {
    console.log(`add ${member.user.username}#${member.user.discriminator}`);  
    await saveAuditLog('guildMemberAdd', member.id, member.user.username, 'Join new member')     
}