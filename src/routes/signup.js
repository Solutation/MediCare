const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/signupController');

router.post('/', SignupController.signUp);

module.exports = router;
