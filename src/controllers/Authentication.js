const { jwtSecretToken } = require("../secret");




const createJwtToken = async (req, res) => {
    try {
        const user = req.body;
        const token = jwt.sign(user, jwtSecretToken , {expiresIn: "1h"} );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).send({
            status: true,
        })
    } catch (error) {
        res.send({
            success: false,
            message : "You do not own this assignment"
        })
    }
}