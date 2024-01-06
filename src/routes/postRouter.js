const postRouter = require('express').Router();

const { createNewPost, getAllPosts, getSinglePostById,getAllOwnerPosts, updatePostsById, getOwnerPostsCount, getAllOwnerDesc, deletePostsById, makeVoteInPosts, getAllOwnerPostsPublic } = require('../controllers/PostController');
const { verifyToken } = require('../middleware/verifyToken');



postRouter.post("/posts", verifyToken,  createNewPost);
postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getSinglePostById);
postRouter.patch("/posts/:id", verifyToken, updatePostsById);
postRouter.get("/posts-count/:email", getOwnerPostsCount)
postRouter.get("/owner-posts/:email", verifyToken, getAllOwnerPosts);
postRouter.get("/userwish-posts/:email", getAllOwnerPostsPublic);
postRouter.get("/owner-posts-desc/:email", verifyToken, getAllOwnerDesc);
postRouter.delete("/posts/:id",verifyToken, deletePostsById);
postRouter.post("/post-votes/:id",verifyToken, makeVoteInPosts);



module.exports = postRouter;