const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const userController = require('../controllers/user.controller');

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.get('/me', verifyToken, userController.getMe)

module.exports = router;