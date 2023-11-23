const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    name : {
        type : String,
    },
    userName : {
        type : String,
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
    }
})

const User = model("User", userSchema);
module.exports = User;