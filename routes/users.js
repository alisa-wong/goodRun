const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/create', UserController.createGet);
router.post('/create', UserController.createPost);
router.get('/all', UserController.getAllUsers);

module.exports = router;