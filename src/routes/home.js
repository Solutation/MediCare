const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');

router.get('/info', HomeController.getHomeData);

module.exports = router;
