const { Users } = require('../models');
const UserHelper = require('../helpers/UserHelper.js');

const MainController = {

    accessGet: async function(req, res) {
        res.cookie('accessCode', req.params.accessCode);
        res.redirect('/');
    },

    userAccessCodeGet: async function(req, res) {
        let data = {}
        data.user = await UserHelper.getUserByAccessCode(req.params.accessCode);
        // ALLAN TODO: Add data.games info by setting up a GameHelper and a GameController to get all games

        // Since we're not dealing with views rn, just use res.json to send the data as a JSON response
        // res.render('home.pug', { data });
        res.json(data);
    },

    frontEndTesting: async function(req, res) {
        let data = {}
        //Add whatever data you want to play with on the front end like this
        data.user = {
            firstName: "noel"
        }
        data.gameCount = 90;

        res.render('home.pug', { data });
    },

    sampleHomeGet: function(req, res) {
        console.log(req)
        let user = null;
        if (req.session.passport) {
            user = req.session.passport.user;
        }
        res.render('index.pug', { user });
    },

    loginGet: async function(req, res) {
        return res.render('account/login');
    },

    loginPost: async function(req, res) {
        // add accesscode cookie
        return res.redirect('/');
    },

    logout: async function(req, res) {
        req.logout();
        res.clearCookie('accessCode');
        return res.redirect('/');
    },

    isAuthenticated: async function(req, res, next) {
        if (req.isAuthenticated()) return next();
        return res.redirect('/login');
    }

}

module.exports = MainController;