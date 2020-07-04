const {saveAuditLog} = require('../db')
module.exports = async function (client, member) {
    console.log(`remove ${member.user.username}#${member.user.discriminator}`);  
    await saveAuditLog('guildMemberRemove', member.id, member.user.username, 'Removed member')   

}