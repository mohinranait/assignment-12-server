require('dotenv').config();

const serverPort =  5000;

const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/assignment_12'
const jwtSecretToken = process.env.ACCESS_TOKEN

module.exports = {
    serverPort,
    mongodbURL,
    jwtSecretToken
}