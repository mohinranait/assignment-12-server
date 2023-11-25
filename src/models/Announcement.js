const {model, Schema } = require("mongoose");

const announcementSchema = new Schema({
    authorImage : {type:String},
    authorName : {type:String},
    title : {type:String},
    description : {type:String},

})

const Announcement = model("Announcement", announcementSchema);

module.exports = Announcement;