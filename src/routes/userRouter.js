const express = require('express');
const userRoute = express.Router();
const { createUser, findUserByEmail, updateUserByEmail, checkAdmin, existsUserForUserName, getAllUsers, makeAdmin } = require('../controllers/UserController');



// Create new user
userRoute.get("/users", getAllUsers );
userRoute.post("/users", createUser );
userRoute.get('/user/:email', findUserByEmail );
userRoute.patch('/user/:email', updateUserByEmail)
userRoute.get('/is-admin-check/:email', checkAdmin);
userRoute.post('/check-user-name', existsUserForUserName);
userRoute.get('/make-admin/:userName', makeAdmin);

module.exports = userRoute