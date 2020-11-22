const router = require('express').Router();
const UserController = require('../controllers/user-controller.js');
const UserPostRoute = require('./user-routes.js');
router.post('/login', UserController.postLogin);
router.post('/register', UserController.postRegister);
router.patch('/:userToken/-b/active',UserController.patchUserActivation);
router.use('/content', UserPostRoute);
module.exports = router;
