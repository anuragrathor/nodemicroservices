
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECREAT_KEY } = require("../_config/env");


//Password Utility Functions
export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}


export const GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}


export const ValidatePassword = async (enteredpassword, savedpassword, salt) => {
    return await GeneratePassword(enteredpassword, salt ) === savedpassword;
}


export const GenerateSignature = (payload) => {
    const signature = jwt.sign(payload, JWT_SECREAT_KEY, {expiresIn: '1d'});
    return signature;
}


export const ValidateSignature = async(req) => {
   
    const signature = req.get('Authorization');

    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], JWT_SECREAT_KEY);
        
        req.user = payload;

        return true;
    }

    return false;
}