const router = require('express').Router()
const { PlayerController } = require('../controllers');

router.get('/', PlayerController.playerViewGet);
router.get('/login', PlayerController.accessCodeLoginGet);
router.post('/login', PlayerController.accessCodeLoginPost);
router.post('/update', PlayerController.updatePlayerPost);
router.post('/availability/update', PlayerController.updateAvailabilityPost);

module.exports = router;