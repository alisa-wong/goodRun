const { Users, Regions, UserGenders } = require('../models');
const { UserHelper,
        UserAvailabilityHelper,
        PlayerHelper } = require('../helpers');

const UserController = {

    getAllPlayers: async function(req, res) {
        const raw_players = await Players.findAll();
        let players = []
        raw_players.forEach(player => { players.push(player.toJSON()) });
        return res.render("players", { players });
    },

    createPlayer: async function(req, res) {
        try {
            await PlayerHelper.createPlayer(req.body.user.id, req.body.skillLevelId, req.body.position);
            return res.sendStatus(200);
        } catch(err) {
            req.flash('error', 'User not found');
            res.redirect('/users');
            return;
        }
    },

    updatePlayerPost: async function(req, res) {
        let willTravel = req.body.willTravel == "on";
        let updatedUser = {
            email: req.body.email,
            phone: req.body.phone,
            willTravel: willTravel,
            homeRegionId: req.body.homeLocation,
            workRegionId: req.body.workLocation
        }
        let user = await Users.findOne({
            where: {
                accessCode: req.cookies.accessCode
            }
        });
        await user.update(updatedUser);
        return res.redirect('/players');
    },

    updateAvailabilityPost: async function(req, res) {
        let blocks = JSON.parse(req.body.data);
        let user = await UserHelper.getUserByAccessCode(req.cookies.accessCode);
        await UserAvailabilityHelper.updateUserAvailabilityBlocks(blocks, user.id);
        return res.redirect('/players');
    },

    accessCodeLoginGet: async function(req, res) {
        return res.render('account/accessCodeLogin');
    },

    accessCodeLoginPost: async function(req, res) {
        let user = await UserHelper.getUserByAccessCode(req.body.accessCode);
        if(user) {
            res.cookie('accessCode', req.body.accessCode);
            return res.redirect('/players');
        }
        return res.redirect('/players/login');
    },

    playerViewGet: async function(req, res) {
        // If the user is logged in via accessCode (ie. has accessCode cookie)
        if(req.cookies && req.cookies.accessCode) {
            let user = await UserHelper.getUserByAccessCode(req.cookies.accessCode);

            // Get name for home and work location using user.--RegionId
            let homeLocation = await Regions.findOne({
                where: { id: user.homeRegionId }
            });
            let workLocation = await Regions.findOne({
                where: { id: user.workRegionId }
            });
            if (homeLocation) user.homeLocation = homeLocation.name;
            if (workLocation) user.workLocation = workLocation.name;
            user.availabilityBlocks = await UserAvailabilityHelper.getUserAvailabilityBlocks(user.id);

            // Get all regions for location select options in form
            let locations = await Regions.findAll({raw: true});
            
            let data = { 
                user: user, 
                locations: locations
                // gamesByLocation
                // gamesByTime
            }
            return res.render('player/index.pug', data);
        }
        // Otherwise, redirect to login
        return res.redirect('/players/login');
    },
    
}

module.exports = UserController;