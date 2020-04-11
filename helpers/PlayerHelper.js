const { Roles, Players, Users, UserRoles, sequelize } = require('../models');

const PlayerHelper = {

    createPlayer: async function(userId, skillLevelId, position) {
        let newRole = await Roles.create({
            skillLevelId: skillLevelId,
            genreId: GenreHelper.getGenreIdByName("basketball")
        });
        let newPlayer = await Players.create({
            userId: userId,
            roleId: newRole.id,
            position: position
        });
        return newPlayer.id;
    },

    getAllPlayerInfo: async function() {
        let results = await sequelize.query("Select firstName, lastName, phone, email, players.position from users, players where users.id=players.userId;", 
                                            { type: sequelize.QueryTypes.SELECT });
        return results;
    }
}

module.exports = PlayerHelper;