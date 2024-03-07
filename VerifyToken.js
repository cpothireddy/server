var jwt = require("jsonwebtoken");
var config = require("./config/config");
function verifyToken(req,res,next){
    console.log(req.headers.autherization);
    try{
        const token = req.headers.autherization.split(" ")[1];
        const decoded = jwt.verify(token,config.local.secret);
        next();
    }catch(error){
        return res.status(401).json({
            message:"Auth failed"
        });
    }
}
module.exports = verifyToken;