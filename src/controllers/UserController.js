const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const search = req.query?.search || '';
        const searchRegEx = new RegExp(".*"+ search + '.*','i')
        let query = {
            userName : { $regex: searchRegEx }
        }
        const queryEmail = req.query?.email;
        const tokenEmal = req.user?.email;

        if(queryEmail !== tokenEmal){
            return res.status(401).send({
                success: false,
                message : "invalid access",
            })
        }

        const users = await User.find(query);
        res.json( users )
    } catch (error) {
        res.send({
            success: false,
            message : error.message,
        })
    }
}

// Create user info in your database
const createUser =  async (req, res) => {
    const user = req.body;
    try {
        const isExists = await User.findOne({email:user?.email});
        if(isExists){
            return res.send({
                success: true,
                message : "already exists",
            })
        }
        const result = await  User.create(user)
        res.send({
            success: true,
            message : "Created successfull",
        })
    } catch (error) {
        res.send({
            success: false,
            message : error.message,
        })
    }
}

// Find a user by email address
const findUserByEmail = async (req, res) => {
    try {
        // console.log(req.params?.email);
        const email = req.params?.email;
        const tokenEmal = req.user?.email;
        if(email !== tokenEmal){
            return res.status(401).send({
                success: false,
                message : "Not found",
            })
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).send({
                success: false,
                message : "Not found",
            })
        }
        res.send(user);
    } catch (error) {
        res.send({
            success: false,
            message : error.message,
        })
    }
}

// Find a single user by ID
const findUserBySingleEmail = async (req, res) => {
    try {
        // console.log(req.params?.email);
        const email = req.params?.email;
      
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message : "Not found",
            })
        }
        res.send(user);
    } catch (error) {
        res.send({
            success: false,
            message : error.message,
        })
    }
}

// Update a user information using email address
const updateUserByEmail = async (req, res) => {
    try {
      
        const userData = req.body;
        const user = await User.findOneAndUpdate({email:req.params?.email} , userData, {returnOriginal:false})
        res.send(user);
    } catch (error) {
        res.send({
            success: false,
            message : error.message,
        })
    }
}


// existing user using user name
const existsUserForUserName = async (req, res) => {
    try {
        const user = req.body;
        // find by user name
        const isExists = await User.findOne({userName:user?.userName});
        if(isExists){
            return res.send({
                message : "This user name is already exists",
                success : 'exists',
            })
        }
        res.send(isExists)
    } catch (error) {
        res.send({
            success: false,
            message : error.message,
        })
    }
}

// is Admin check
const checkAdmin = async (req, res) => {
    try {
        const paramsEmail = req?.params?.email;
        const tokenEmail = req.user?.email;
        if(paramsEmail !== tokenEmail){
            return res.status(401).send({
                success: false,
                message : "Invalid request",
            })
        }
        const user = await User.findOne({email:req.params?.email});
        if(!user){
            return res.status(404).send({
                success: false,
                message : "404 not found"   
            })
        }
        let isAdmin = false;
        if(user?.role == 'admin'){
            isAdmin = true
        }
        res.send(isAdmin)
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : "Somthing wrong"   
        })
    }
}

// make admin
const makeAdmin = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({userName:req.params?.userName} , {role:'admin'}, {returnOriginal:false})

        if(!user){
            return res.status(404).send({
                success: false,
                message : 'Notfound'
            })
        }
        res.send({success:true});
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : "Somthing wrong"   
        })
    }
}

// my followers
const myFollowers = async (req, res) => {
    try {
        const id = req.params?.id;
        const user = await User.findById(id);
        const users = await User.find({});
        const followersIds = user?.followers;
        const myFollowersUser = [];
        followersIds?.forEach( (item) => {
            const user = users?.find(user => user?._id == item)
            if(user){
                myFollowersUser.push(user)
            }
        })
       
        res.send(myFollowersUser)
    } catch (error) {
        
    }
}

// my followers
const myFolloings = async (req, res) => {
    try {
        const id = req.params?.id;
        const user = await User.findById(id);
        const users = await User.find({});
        const follingsIds = user?.following;
        const myFolloings = [];
        follingsIds?.forEach( (item) => {
            const user = users?.find(user => user?._id == item)
            if(user){
                myFolloings.push(user)
            }
        })
       
        res.send(myFolloings)
    } catch (error) {
        
    }
}

module.exports = {
    createUser,
    findUserByEmail,
    updateUserByEmail,
    checkAdmin,
    existsUserForUserName,
    getAllUsers,
    makeAdmin,
    findUserBySingleEmail,
    myFollowers,
    myFolloings
}