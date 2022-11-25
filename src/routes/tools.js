const express = require('express');
const router = express.Router();
const ToolsController = require('../controllers/toolsController');

router.post('/bmi', ToolsController.handleBMI);
router.post('/bmr', ToolsController.handleBMR);
router.post('/ovulation', ToolsController.handleOvulation);

module.exports = router;
