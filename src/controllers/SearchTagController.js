const SearchTag = require("../models/SearchTag");

const createSearchTag = async (req, res) => {
    try {
        const {searchTag} = req.body;
        // console.log(req.body);
        const findTag = searchTag.toLowerCase().split(' ')[0]
        const isExists = await SearchTag.findOne({searchTag:findTag})
        if( isExists){
            const counterIncrement = {searchCount : isExists.searchCount + 1}
            const update  = await SearchTag.findByIdAndUpdate(isExists?._id, counterIncrement, {
                new :true,
                runValidators: true,
            })
            return res.send({
                success : true,
            })
        }

        const newTag = await SearchTag.create({searchTag:findTag, searchCount:1})
        res.send({
            success : true,
        })
    } catch (error) {
        return res.send({
            success: false,
            message : "Invalid",
        })
    }
}


// get search tag reverse
const getSearchTagWithReverceCounter =  async (req, res) => {
    try {
        const tags = await SearchTag.find({}).sort('-searchCount').limit(3);
        res.send(tags) 
    } catch (error) {
        return res.send({
            success: false,
            message : "Server out"
        })
    }
}


module.exports = {
    createSearchTag,
    getSearchTagWithReverceCounter
}