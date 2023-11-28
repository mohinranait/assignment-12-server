const Post = require("../models/Post");
const PostVoteHistory = require("../models/PostVoteHistory");

// Create a new post
const createNewPost = async (req, res) => {
    const post = req.body;
    try {

        const paramsEmail = req.query?.email;
        const tokenEmail = req.user?.email;
        if(paramsEmail !== tokenEmail){
            return res.status(401).send({
                success: false,
                message : "Invalid request",
            })
        }


        const result = await Post.create(post);
        res.send({
            success : true,
            message : "Post Created",
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
} 

// get all posts
const getAllPosts = async (req, res) => {
    try {
        const page = req.query?.page || 1;
        const search = req?.query?.search;
        const limit = 5;
        const searchVal = new RegExp(".*"+search+".*", 'i');
        const sort = req.query?.sort;     

        const count = await Post.find({visivility:true}).countDocuments();
        // Shorting value for vote counter by descending
        if( sort === 'desc' ){
            const sortPosts = await Post.aggregate([
                {
                    $match: {
                        visivility: true,
                        tag : searchVal,
                    }
                },
                {
                    $addFields:{
                        voteDifference : {$subtract:['$upVote','$downVote']}
                    }
                },
                {
                    $sort : {
                        voteDifference : -1
                    }
                },
                {
                    $skip: ( page - 1) * limit
                },
                {
                    $limit : limit,
                },
                
            ])

            return res.send({
                success : true,
                data: sortPosts,
                total:count,
            })
        }

        // Default post display
        const posts = await Post.find(
            {visivility:true, tag:searchVal}
            ).skip((page-1)*limit).limit(limit).sort('-_id')
      
        res.send({
            success : true,
            data: posts,
            total:count,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}

// get all woner posts
const getAllOwnerPosts = async (req, res) => {
    try {
        const paramsEmail = req.params?.email;
        const tokenEmail = req.user?.email;
        if(paramsEmail !== tokenEmail){
            return res.status(401).send({
                success: false,
                message : "Invalid request",
            })
        }
        const posts = await Post.find({authorEmail:req.params?.email});
        res.send({
            success : true,
            data: posts,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}

// get all woner posts
const getAllOwnerDesc = async (req, res) => {
    try {
        const posts = await Post.find({authorEmail:req.params?.email}).sort('_id');
        res.send({
            success : true,
            data: posts,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}


// get all posts
const getOwnerPostsCount = async (req, res) => {
    try {
        const email = req.params?.email;
        const count = await Post.find({authorEmail:email}).countDocuments();
        res.send({
            success : true,
            count,
        })
    } catch (error) {
        res.send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}


// get single items
const getSinglePostById = async (req, res) => {
    const id = req.params?.id;
    try {
        const post = await Post.findById({_id:id});
        if(!post){
            res.status(404).send({
                success : false,
                message : "Not found",
            })
        }
        res.send(post)
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Somthing Wrong",
        })
    }
}

// update posts
const updatePostsById = async (req, res) => {
    try {
        const paramsEmail = req.query?.email;
        const tokenEmail = req.user?.email;
        if(paramsEmail !== tokenEmail){
            return res.status(401).send({
                success: false,
                message : "Invalid request",
            })
        }

        const id = req.params?.id;
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new : true,
            runValidators: true,
        })
        if(!post){
            res.status(404).send({
                success : false,
                message : "Not found",
            })
        }
        res.status(200).send({
            post,
            success : true,
            message : "Update successfull",
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Somthing wrong",
        })
    }
}


// Delete posts
const deletePostsById = async(req, res) => {
    try {
        const queryEmail = req.query?.email;
        const tokenEmail = req.user?.email;
        if(queryEmail !== tokenEmail){
            return res.status(401).send({
                success: false,
                message : "Invalid request",
            })
        }
        const id = req?.params?.id;
        const post = await Post.findByIdAndDelete(id);
        if(!post){
            return res.status(404).send({
                success: false,
                message : "Not found"
            })
        };

        res.send({
            success: true,
            message : "Delete successfull",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : "wrong info"
        })
    }
}


const makeVoteInPosts = async (req, res) => {
    try {
        const id  = req.params?.id;
        const {value, upVote, downVote,userEmail} = req.body;

        const existsVoteHistory = await PostVoteHistory.findOne({userEmail, postId:id});
        if( !existsVoteHistory ){
            let updateDoc = {}
            if(value == 'upvote'){
                updateDoc.upVote = Number(upVote+1);
            }else{
                updateDoc.downVote = Number(downVote+1);
            }
            await Post.findByIdAndUpdate(id, updateDoc );
            await PostVoteHistory.create({userEmail, postId:id, vote:value})
            return res.status(200).send({
                success: true,
                message  : "Success"
            })
        }

        let updateDoc = {};
        if(existsVoteHistory.vote == 'upvote' && value == 'downvote'){
            updateDoc.upVote = Number(upVote-1);
            updateDoc.downVote = Number(downVote+1);
        }else if(existsVoteHistory.vote == 'downvote' && value == 'upvote'){
            updateDoc.upVote = Number(upVote+1);
            updateDoc.downVote = Number(downVote-1);
        }
        await Post.findByIdAndUpdate(id, updateDoc );
        await PostVoteHistory.findByIdAndUpdate(existsVoteHistory?._id , { vote:value})
        res.send({
            message : "Update votes"
        })
        
    } catch (error) {
        res.send({
            message : "already comment update"
        })
    }
}


module.exports = {
    createNewPost,
    getAllPosts,
    getSinglePostById,
    updatePostsById,
    getOwnerPostsCount,
    getAllOwnerPosts,
    getAllOwnerDesc,
    deletePostsById,
    makeVoteInPosts,

}