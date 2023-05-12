const { ValidateSignature } = require("../_helpers/jwt")


async function authenticate(req, res, next){
    try{
        const validate = await ValidateSignature(req);
    
        if(validate){
            next();
        }else{
            return res.json({"message" : "User Not Authorized"});
        }
    }catch(err){
        return res.json({"message" : "User Not Authorized"});
    }
    
}


module.exports = { authenticate }