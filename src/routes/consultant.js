const express = require('express');
const router = express.Router();
const ConsultantController = require('../controllers/consultantController');

router.post('/add', ConsultantController.addConsultant);
router.get('/list', ConsultantController.getConsultantPagination);
router.get('/detail/:consultantId', ConsultantController.getConsultantDetail);
router.post('/rating', ConsultantController.handleRatingConsultant);

module.exports = router;
