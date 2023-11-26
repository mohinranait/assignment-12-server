const { createNewCommentUnderPosts, totalCommentForSinglePosts } = require('../controllers/CommentControllers');

const commentRoute = require('express').Router();

commentRoute.post('/comments', createNewCommentUnderPosts)
commentRoute.get('/comments/:id', totalCommentForSinglePosts)


module.exports = commentRoute