const Announcement = require("../models/Announcement");



const createAnnouncement = async (req, res) => {
    try {
        const queryEmail = req.query?.email;
        const tokenEmail = req.user?.email;
        if( queryEmail !== tokenEmail){
            return res.status(401).send({
                success: false,
                message : "forbidden access",
            })
        }
        const data = req.body;
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

const getAllAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find({});
        res.send(announcements)
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "somthin wrong",
        })
    }
}


module.exports =  {
    createAnnouncement,
    getAllAnnouncement,
}