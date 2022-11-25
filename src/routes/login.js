const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginController');

router.post('/patient/login', LoginController.patientLogin);
router.post('/consultant/login', LoginController.consultantLogin);
router.get('/verify', LoginController.verify);

module.exports = router;
