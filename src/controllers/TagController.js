const Tag = require("../models/Tag");

const createTag = async (req, res) => {
    try {
        const data = req.body;
        const tag  = await Tag.create(data);
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

// Get all tags
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.send(tags)
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "somthin wrong",
        })   
    }
}


module.exports = {createTag,getAllTags}