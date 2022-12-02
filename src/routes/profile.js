const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

router.get('/patient/info/:patientId', ProfileController.getPatientByPatientId);
router.put('/patient/update/:patientId', ProfileController.updatePatientInfoById);
router.put('/patient/password/update/:patientId', ProfileController.updatePatientPasswordById);

module.exports = router;
