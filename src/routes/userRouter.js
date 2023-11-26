const express = require('express');
const userRoute = express.Router();
const { createUser, findUserByEmail, updateUserByEmail, checkAdmin, existsUserForUserName, getAllUsers, makeAdmin } = require('../controllers/UserController');
const { verifyToken } = require('../middleware/verifyToken');
const { isAdmin } = require('../middleware/isAdmin');



// Create new user
userRoute.get("/users",verifyToken, isAdmin, getAllUsers );
userRoute.post("/users", createUser );
userRoute.get('/user/:email',verifyToken, findUserByEmail );
userRoute.patch('/user/:email', updateUserByEmail)
userRoute.get('/is-admin-check/:email',verifyToken, checkAdmin);
userRoute.post('/check-user-name', existsUserForUserName);
userRoute.get('/make-admin/:userName', verifyToken,isAdmin, makeAdmin);

module.exports = userRoute