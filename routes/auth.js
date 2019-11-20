const express = require('express');

const authController = require('../controllers/auth');
const validator = require('../util/validator');

const router = express.Router();

router.put('/signup', validator.validateSignup() , authController.signup);

router.post('/login', authController.login);

module.exports = router;