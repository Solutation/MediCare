const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

router.get('/search', ArticleController.getArticleSearchByCategoryId);
router.get('/detail/:articleId', ArticleController.getArticleDetail);
router.get('/list', ArticleController.getArticleListByCategoryId);

module.exports = router;
