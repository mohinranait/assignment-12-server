const authenticationRoute = require('express').Router();

const { createJwtToken, userLogout } = require('../controllers/Authentication');


// Create jwt 
authenticationRoute.post('/jwt', createJwtToken )
authenticationRoute.post('/logout', userLogout )


module.exports = authenticationRoute