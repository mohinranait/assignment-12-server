const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');

const connectDatabase = async () => {
    try {
        await mongoose.connect(mongodbURL)
        console.log("Connect mongodb database successfully");
        mongoose.connection.on('error' , (error) => {
            console.error("Databse connect error",error)
        })
    } catch (error) {
        console.error("Could not connect db",error.toString())
    }
}

module.exports = connectDatabase