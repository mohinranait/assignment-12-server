const {model, Schema } = require("mongoose");

const commentSchema = new Schema({
    userEmail : {type:String},
    postId : {type:String},
    comment : {
        type:String,
    },
})

const Comment = model("Comment", commentSchema);

module.exports = Comment;