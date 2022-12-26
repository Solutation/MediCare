const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

router.get('/patient/info/:patientId', ProfileController.getPatientByPatientId);
router.put('/patient/update/:patientId', ProfileController.updatePatientInfoById);
router.put('/patient/password/update/:patientId', ProfileController.updatePatientPasswordById);
router.get('/consultant/info/:consultantId', ProfileController.getConsultantById);
router.put('/consultant/update/:consultantId', ProfileController.updateConsultantInfoById);
router.put('/consultant/password/update/:consultantId', ProfileController.updateConsultantPasswordById);

module.exports = router;
