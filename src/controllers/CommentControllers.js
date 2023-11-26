const Comment = require("../models/Comment");



// Create new comment for single posts
const createNewCommentUnderPosts = async (req, res) => {
    try {
        const {userEmail,postId} = req.body;
        const isExists = await Comment.findOne({userEmail,postId});
        if(isExists){
            return res.send({
                success: false,
                message : "already commented",
            })
        }
        const comment = await Comment.create(req.body) ;
        res.send({
            success: true,
            message : "Created",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : "Somthing wrong",
        })
    }
}


// count total comments for single posts
const totalCommentForSinglePosts = async (req, res) => {
    try {
        const id = req.params?.id;
        const comments = await Comment.find({postId:id});
        res.send(comments);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : "Somthing wrong",
        })
    }
}


module.exports = {
    createNewCommentUnderPosts,
    totalCommentForSinglePosts,
}