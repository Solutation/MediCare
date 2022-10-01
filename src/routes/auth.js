const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.get('/', AuthController.getUser);

module.exports = router;
