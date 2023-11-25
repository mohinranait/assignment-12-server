const {model, Schema } = require("mongoose");

const voteHistory = new Schema({
    userEmail : {type:String},
    postId : {type:String},
    vote : {
        type:String,
    },
})

const PostVoteHistory = model("PostVoteHistory", voteHistory);

module.exports = PostVoteHistory;