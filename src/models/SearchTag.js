const {model, Schema } = require("mongoose");

const searchTagSchema = new Schema({
    searchTag : {type:String},
    searchCount : {type:Number, default:0},
})

const SearchTag = model("SearchTag", searchTagSchema);

module.exports = SearchTag;