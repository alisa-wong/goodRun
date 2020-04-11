const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../models');


const strategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
    async function(username, password, done) {
        let user;
        try {
            user = await Users.findOne({
                where: {
                    username: username
                }
            });
            
            if (!user) {
                return done(null, false, {message: "Login failed. Incorrect username or password."});
            }
        } catch(e) {
            return done(e);
        }

        let match = await user.comparePassword(password);
        if(!match) {
            return done(null, false, {message: "Login failed. Incorrect username or password."});
        }

        return done(null, {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        });
    }
)

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(async function(id, done) {
    let user = await Users.findOne({ where: { id } });
    if(!user) return done(null, false);
    done(null, user);
});

module.exports = passport;