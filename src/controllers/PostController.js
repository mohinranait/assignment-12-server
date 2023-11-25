const Post = require("../models/Post");

// Create a new post
const createNewPost = async (req, res) => {
    const post = req.body;
    try {
        const result = await Post.create(post);
        res.send({
            success : true,
            message : "Post Created",
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
} 

// get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.send({
            success : true,
            data: posts,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}

// get all woner posts
const getAllOwnerPosts = async (req, res) => {
    try {
        const posts = await Post.find({authorEmail:req.params?.email});
        res.send({
            success : true,
            data: posts,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}

// get all woner posts
const getAllOwnerDesc = async (req, res) => {
    try {
        const posts = await Post.find({authorEmail:req.params?.email}).sort('_id');
        res.send({
            success : true,
            data: posts,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}


// get all posts
const getOwnerPostsCount = async (req, res) => {
    try {
        const email = req.params?.email;
        const count = await Post.find({authorEmail:email}).countDocuments();
        res.send({
            success : true,
            count,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}


// get single items
const getSinglePostById = async (req, res) => {
    const id = req.params?.id;
    try {
        const post = await Post.findById({_id:id});
        if(!post){
            res.status(404).send({
                success : false,
                message : "Not found",
            })
        }
        res.send(post)
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}

// update posts
const updatePostsById = async (req, res) => {
    try {
        const id = req.params?.id;
       

        const post = await Post.findByIdAndUpdate(id, req.body, {
            new : true,
            runValidators: true,
        })
        if(!post){
            res.status(404).send({
                success : false,
                message : "Not found",
            })
        }
        res.status(200).send({
            post,
            success : true,
            message : "Update successfull",
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Somthing wrong",
        })
    }
}



module.exports = {
    createNewPost,
    getAllPosts,
    getSinglePostById,
    updatePostsById,
    getOwnerPostsCount,
    getAllOwnerPosts,
    getAllOwnerDesc
}