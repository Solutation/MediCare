const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// router.get('/channel', ContactController.getChannelList);
// router.post('/channel/add', ContactController.addUserToChannel);
router.post('/consultant/create', ContactController.createConsultantContact);
router.post('/consultant/create/specific', ContactController.createSpecificConsultantContact);

module.exports = router;
