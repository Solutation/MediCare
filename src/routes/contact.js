const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// router.get('/channel', ContactController.getChannelList);
// router.post('/channel/add', ContactController.addUserToChannel);
router.post('/consultant/create', ContactController.createConsultantContact);

module.exports = router;
