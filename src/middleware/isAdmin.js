const User = require("../models/User");

const isAdmin = async (req, res, next) => {

    const email = req.user?.email;
    const query = {email:email};
    const user = await User.findOne(query);
    const admin = user?.role === 'admin';
  
    if(!admin){
        return res.status(403).send({
            message : "Access forbidden",
            success : false,
        })
    }
    next();
}


module.exports = {
    isAdmin
}