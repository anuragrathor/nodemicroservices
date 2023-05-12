const bcrypt = require("bcrypt");


//Generate Salt
async function GenerateSalt(){
    return await bcrypt.genSalt();
}


//Generate Password using plantext Password with sale Generated with help of genSalt()
async function GeneratePassword(password, salt){
    return await bcrypt.hash(password, salt);
}


//Validate Password 
async function ValidatePassword(enteredpassword, savedPassword){
    return  await bcrypt.compareSync(enteredpassword, savedPassword);
}



module.exports = { GenerateSalt, GeneratePassword, ValidatePassword }