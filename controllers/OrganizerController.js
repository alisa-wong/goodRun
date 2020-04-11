const { Organizer, Venues, SkillLevels } = require('../models')
const { UserHelper, PlayerHelper } = require('../helpers')

const OrganizerController = {

    organizerViewGet: async function(req, res) {
        if(req.cookies && req.cookies.accessCode) {
            let user = await UserHelper.getUserByAccessCode(req.cookies.accessCode);
            let venues = await Venues.findAll();
            let skillLevels = await SkillLevels.findAll();
            let players = await PlayerHelper.getAllPlayerInfo();
            let data = {
                user: user,
                venues: venues,
                skillLevels: skillLevels,
                locations: [],
                players: players
            }
            
            return res.render('organizer/index.pug', data);
        }
    }


}

module.exports = OrganizerController;