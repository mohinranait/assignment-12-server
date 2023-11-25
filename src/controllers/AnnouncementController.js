const Announcement = require("../models/Announcement");



const createAnnouncement = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const announcement  = await Announcement.create(data);
        res.send({
            success : true,
            message : "Create Successfull",
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "somthin wrong",
        })
    }
}


module.exports =  {
    createAnnouncement,
}