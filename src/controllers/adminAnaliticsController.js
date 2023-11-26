const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User")


const adminAnalityces = async (req, res) => {
    try {
        const users = await User.find({}).countDocuments();
        const posts = await Post.find({}).countDocuments();
        const comments = await Comment.find({}).countDocuments();
        res.send({
            posts,
            comments,
            users
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Wrong "
        })
    }
}


module.exports = {
    adminAnalityces
}