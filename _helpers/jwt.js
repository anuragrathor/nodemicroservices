const jwt = require("jsonwebtoken");
const { JWT_SECREAT_KEY } = require("../_config/env");


//Generate Json web Token 
async function GenerateSignature(payload){
    const signature = jwt.sign(payload, JWT_SECREAT_KEY, {expiresIn: '1h'});
    return signature;
}

//Validate Token
async function ValidateSignature(req){
    const signature = req.get('Authorization');
    
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], JWT_SECREAT_KEY);
        
        const { id, email } = payload;
        
        
        // console.log(id);
        // console.log(email);
        // console.log(payload);

        return true;
    }

    return false;
}

module.exports = { GenerateSignature, ValidateSignature }