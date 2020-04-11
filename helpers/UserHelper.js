const { Users } = require('../models');


const UserHelper = {

    getUserByAccessCode: async function(accessCode) {
        let user = await Users.findOne({
            where: {
                accessCode: accessCode
            },
            raw: true
        });
        
        return user;
    }

}

module.exports = UserHelper;