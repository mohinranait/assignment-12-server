const {model, Schema } = require("mongoose");

const commentSchema = new Schema({
    userEmail : {type:String},
    postId : {type:String},
    comment : {
        type:String,
    },
    feedback: {type:String},
    repoterEmail: {type:String},
    visibility: {type:Boolean, default:true},
})

const Comment = model("Comment", commentSchema);

module.exports = Comment;