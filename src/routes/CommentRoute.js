const { createNewCommentUnderPosts, totalCommentForSinglePosts, updatePostCommentsById, getReportedCommentForAdmins } = require('../controllers/CommentControllers');
const { isAdmin } = require('../middleware/isAdmin');
const { verifyToken } = require('../middleware/verifyToken');

const commentRoute = require('express').Router();

commentRoute.post('/comments', verifyToken, createNewCommentUnderPosts)
commentRoute.get('/comments/:id', totalCommentForSinglePosts)
commentRoute.patch('/update-comments/:id', verifyToken, updatePostCommentsById)
commentRoute.get('/reported-comments', verifyToken, isAdmin, getReportedCommentForAdmins)


module.exports = commentRoute