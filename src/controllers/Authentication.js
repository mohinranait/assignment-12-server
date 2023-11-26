const { jwtSecretToken } = require("../secret");
const jwt = require('jsonwebtoken');




const createJwtToken = async (req, res) => {
    try {
        const user = req.body;
        const token =  jwt.sign(user, jwtSecretToken , {expiresIn: "1h"} );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).send({
            status: true,
            token: token
        })
    } catch (error) {
        res.send({
            success: false,
            message : "You do not own this assignment"
        })
    }
}


// logout user
const userLogout =  async (req, res) => {
    try {
        res
        .clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    } catch (err) {
      res.status(500).send(err.message)
    }
}


module.exports = {
    createJwtToken,
    userLogout
}