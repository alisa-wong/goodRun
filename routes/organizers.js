const router = require('express').Router()
const { OrganizerController,
        MainController } = require('../controllers');

// router.get('/', MainController.isAuthenticated, OrganizerController.organizerViewGet);
router.get('/', OrganizerController.organizerViewGet);

module.exports = router;


