
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).send({
                success : false,
                message : "Unuthorize access",
            })
        }

        
    } catch (error) {
        
    }
}