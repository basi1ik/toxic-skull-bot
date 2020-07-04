const mongoose = require('mongoose');
const { MessageEmbedProvider } = require('discord.js');

var Example = new mongoose.model('Example', {
    // id: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    id: String,
    content: String
})

var GameRoles = new mongoose.model('GameRoles', {
    ChannelID: String,
    RoleID: String,
})

var AuditLog = new mongoose.model('Audit_Log', {
    event: String,
    date: {
        type: Date,
        default: new Date(Date.now()+10800000).toISOString()
        
    },
    member: {
        id: String,
        name: String
    },
    description: String
})
               
async function saveAuditLog(event, memberId, memberName, description) {
    let auditLog = new AuditLog ({
        event: event,
        member: {
            id: memberId,
            name: memberName
        },
        description: description
    })
    const saved = await auditLog.save()    
}


async function saveGameRole(channelID, roleID) {
    let gameRole = await GameRoles.findOne({
        ChannelID: channelID
    }).exec();
    if (!gameRole) {
        gameRole = new GameRoles({
            ChannelID: channelID,
            RoleID: roleID
        })
        const saved = await gameRole.save()
        console.log('saved', saved)
        console.log('inserted new gameRole')
    } else {
        gameRole = await GameRoles.updateOne({
            RoleID: roleID
        })
        console.log('updated existing gameRole')
        console.log(gameRole)
    }
}

async function getGameRoleIdByChannelId(channelId) {
    let gameRole = await GameRoles.findOne({
        ChannelID: channelId
    }).exec();
    if (!gameRole)
        return 'null'
    return gameRole.RoleID;
}

async function getExample(_id) {
    let example = await Example.findOne({
        id: _id
    }).exec();
    if (!example)
        return 'sdfsf'
    return example.content
}

module.exports = {
    Example,
    getExample,
    saveGameRole,
    getGameRoleIdByChannelId,
    saveAuditLog
}