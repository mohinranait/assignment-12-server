const User = require("../models/User");


const createUser =  async (req, res) => {
    const user = req.body;
    try {
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

const findUserByEmail = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    createUser,
    findUserByEmail,
}