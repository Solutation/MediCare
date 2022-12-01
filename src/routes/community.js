const express = require('express');
const router = express.Router();
const CommunityController = require('../controllers/communityController');

router.get('/reaction/list/all', CommunityController.getReactionList);
router.get('/reaction/list', CommunityController.getReactionListByPostId);
router.get('/post', CommunityController.getPostByCategoryId);
// router.get('/post/all', CommunityController.getPostAllCategory);
router.post('/post/reaction', CommunityController.handleReactionByPost);
router.delete('/post/reaction/delete', CommunityController.handleDeleteReactionByPost);
router.get('/post/reaction/check', CommunityController.getUserReactionTypeByPost);
router.post('/post/comment/add', CommunityController.addCommentPost);
router.post('/post/add', CommunityController.addPostByCategoryId);
router.get('/post/reaction/count', CommunityController.handlePostCountAndReactCount);
router.get('/post/list', CommunityController.getAllPostByUserId);

module.exports = router;
