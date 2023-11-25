const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    
    authorName : {
        type: String,
    },
    authorImage : {
        type : String,
    },
    authorEmail : {
        type : String,
        trim: true,
    },
    title : {
        type : String,
    },
    image : {
        type : String,
    },
    description : {
        type : String,
    },
    tag : {
        type: String,
    },
    upVote: {
        type : Number,
        default: 0,
    },
    downVote: {
        type : Number,
        default: 0,
    },
    createAt:{
        type: Date,
    }
})


const Post = model("Post", postSchema);

module.exports = Post;