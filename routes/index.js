const router = require('express').Router();
const passport = require('../config/passportConfig.js');
const { MainController,
        InitializeController } = require('../controllers');

// Handler function to wrap each route
function asyncHandler(cb){
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    }
}

// router.use('*', asyncHandler);

router.use('/users', require('./users.js'));
router.use('/players', require('./players.js'))
router.use('/organizers', require('./organizers.js'))

router.get('/', MainController.frontEndTesting);
router.get('/login', MainController.loginGet);
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login'}), 
    MainController.loginPost);
router.get('/logout', MainController.logout);
router.post('/initialize', InitializeController.initializeData);
router.post('/load-data', InitializeController.loadData);


module.exports = router;