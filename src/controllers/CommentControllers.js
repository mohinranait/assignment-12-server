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
        const comments = await Comment.find({postId:id,visibility:true});
        res.send(comments);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : "Somthing wrong",
        })
    }
}


// Reported comments get method
const getReportedCommentForAdmins = async (req, res) => {
    try {
        // const id = req.params?.id;
        const comments = await Comment.find({visibility:false});
        res.send(comments);
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : "Somthing wrong",
        })
    }
}


// Update Comments using id
const updatePostCommentsById = async (req, res) => {
    try {
        const id = req.params?.id;
        // const body = ;
        // console.log(id);
        const comment = await Comment.findByIdAndUpdate(id, req.body, {
            new : true,
            runValidators: true,
        })

        // console.log(comment);

        if(!comment){
            return res.status(404).send({
                success : false,
                message : "Notfound comment",
            })
        }

        res.send({
            message : "update successfull",
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message : "Somthing wrong",
            success: false,
        })
    }
}

// Reported comment delete by ID
const reportedCommentDeleteById = async (req, res) => {
    try {
        const id = req.params?.id;
        const comment = await Comment.findByIdAndDelete(id);
        res.status(200).send({
            message : "Deleted",
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message : "Somthing wrong",
            success: false,
        })
    }
}

module.exports = {
    createNewCommentUnderPosts,
    totalCommentForSinglePosts,
    updatePostCommentsById,
    getReportedCommentForAdmins,
    reportedCommentDeleteById
}