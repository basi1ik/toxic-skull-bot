const mongoose = require('mongoose');

var GameRoles = new mongoose.model('GameRoles', {
    ChannelID: String,
    RoleID: String,
})

var AuditLog = new mongoose.model('Audit_Log', {
    event: String,
    date: {
        type: Date,
        default: new Date(Date.now() + 10800000).toISOString()

    },
    member: {
        id: String,
        name: String
    },
    description: String
})

async function saveAuditLog(event, memberId, memberName, description) {
    let auditLog = new AuditLog({
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
   
    if((channelID !== undefined) || (roleID !== undefined)){
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
    }else {
        console.log('нет аргументов')
    }
}

async function deleteGameRole(channelID) {
    let gameRole = await GameRoles.findOne({
        ChannelID: channelID
    }).exec();
    if (gameRole) {
        GameRoles.deleteOne({
            ChannelID: channelID
        }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });
    } else {
        console.log('the channel is not exist')
    }
}

async function updateGameRole(channelID, roleID) {
    if ((channelID !== undefined) || (roleID !== undefined)) {
        let gameRole = await GameRoles.findOne({
            ChannelID: channelID
        }).exec();

        if ((gameRole) || (roleID !== null)) {
            gameRole = await GameRoles.updateOne({
                RoleID: roleID
            })
            console.log('updated existing gameRole')
            console.log(gameRole)
        } else {
            console.log('the channel is not exist')
        }
    }
}

async function getGameRoleIdByChannelId(channelId) {
    let gameRole = await GameRoles.findOne({
        ChannelID: channelId
    }).exec();
    if (!gameRole)
        return
    return gameRole.RoleID;
}

module.exports = {
    saveGameRole,
    deleteGameRole,
    updateGameRole,
    getGameRoleIdByChannelId,
    saveAuditLog
}