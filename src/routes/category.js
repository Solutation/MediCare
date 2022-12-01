const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/list', CategoryController.getCategoryPagination);
router.get('/header/list', CategoryController.getCategoryBy5);
router.get('/list/all', CategoryController.getAllCategory);

module.exports = router;
