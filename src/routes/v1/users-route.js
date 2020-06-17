const express = require('express');
const { isAuth, isValidHostname, isAdmin } = require('../../middlewares/auth');
const userController = require('../../controllers/v1/user-controllers');

const router = express.Router();

router.post('/login', userController.login);
router.post('/create', userController.createuser);
router.post('/update', isValidHostname, isAuth, userController.updateuser);
router.post('/delete', isAuth, isAdmin ,userController.deleteuser);
router.get('/get-all', isAuth, isAdmin ,userController.getusers);

module.exports = router;
