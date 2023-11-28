const { createNewCommentUnderPosts, totalCommentForSinglePosts, updatePostCommentsById, getReportedCommentForAdmins, reportedCommentDeleteById } = require('../controllers/CommentControllers');
const { isAdmin } = require('../middleware/isAdmin');
const { verifyToken } = require('../middleware/verifyToken');

const commentRoute = require('express').Router();

commentRoute.post('/comments', verifyToken, createNewCommentUnderPosts)
commentRoute.get('/comments/:id', totalCommentForSinglePosts)
commentRoute.patch('/update-comments/:id', verifyToken, updatePostCommentsById)
commentRoute.get('/reported-comments', verifyToken, isAdmin, getReportedCommentForAdmins)
commentRoute.delete('/delete-reported-comment/:id', verifyToken, isAdmin, reportedCommentDeleteById)


module.exports = commentRoute