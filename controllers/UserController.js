const { Users, Genders, UserGenders, Regions } = require('../models');
const UserAvailabilityHelper = require('../helpers/UserAvailabilityHelper.js');
const GenderHelper = require('../helpers/GenderHelper.js');
const UserHelper = require('../helpers/UserHelper');

const UserController = {

    getAllUsers: async function(req, res) {
        const raw_users = await Users.findAll();
        let users = []
        raw_users.forEach(user => { users.push(user.toJSON()) });
        return res.json(users);
    },

    createGet: async function(req, res) {
        return res.render('account/createUser');
    },

    createPost: async function(req, res) {
        try {
            let newUser = await Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username || null,
                password: req.body.password || null,
                phone: req.body.phone,
                email: req.body.email,
            });
    
            if(newUser) {
                if (req.body.blocks) {
                    await UserAvailabilityHelper.createUserAvailabilities(req.body.blocks, newUser.id);
                }
                let genderId = await GenderHelper.getGenderId(req.body.gender);
                await UserGenders.create({
                    userId: newUser.id,
                    genderId: genderId
                });
            }
            return res.redirect('/');
    
        } catch(err) {
            console.log(err.message);
            return res.redirect('/users/create');
        }
        
    },
    
}

module.exports = UserController;