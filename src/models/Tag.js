const {model, Schema } = require("mongoose");

const tagSchema = new Schema({
    tag : {type:String},
})

const Tag = model("Tag", tagSchema);

module.exports = Tag;