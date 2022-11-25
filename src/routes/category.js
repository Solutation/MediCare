const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/list', CategoryController.getCategoryPagination);

module.exports = router;
