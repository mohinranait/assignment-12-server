const postRouter = require('express').Router();

const { createNewPost, getAllPosts, getSinglePostById,getAllOwnerPosts, updatePostsById, getOwnerPostsCount, getAllOwnerDesc } = require('../controllers/PostController');



postRouter.post("/posts", createNewPost);
postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getSinglePostById);
postRouter.patch("/posts/:id", updatePostsById);
postRouter.get("/posts-count/:email", getOwnerPostsCount)
postRouter.get("/owner-posts/:email", getAllOwnerPosts);
postRouter.get("/owner-posts-desc/:email", getAllOwnerDesc);




module.exports = postRouter;