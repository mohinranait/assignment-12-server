const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    name : {
        type : String,
    },
    userName : {
        type : String,
        lowercase: true,
    },
    email : {
        type : String,
        trim : true,
    },
    badge: {
        type : String,
        trim : true,
        default: 'bronze'
    },
    role: {
        type : String,
        default : 'user',
    },
    avater: {
        type : String,
    },
    bio: {
        type : String,
    },
    address: {
        type : String,
    },
    followers: [{
        type : String,
    }],
    following: [{
        type : String,
    }],
})

const User = model("User", userSchema);
module.exports = User;