const { jwtSecretToken } = require("../secret");
const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token
    // console.log('access token' , token)
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
    }

    jwt.verify(token, jwtSecretToken , (err, decoded) => {
        if (err) {
            // console.log(err)
            return res.status(401).send({ message: 'unauthorized access' })
        }
        req.user = decoded
        next()
    })
}


module.exports = {
    verifyToken
}