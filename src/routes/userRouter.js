const express = require('express');
const userRoute = express.Router();
const { createUser } = require('../controllers/UserController');



// Create new user
userRoute.post("/users", createUser );

module.exports = userRoute