require('dotenv').config();

const serverPort = process.env.PORT || 5000;

const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/assignment_12'

module.exports = {
    serverPort,
    mongodbURL,
}