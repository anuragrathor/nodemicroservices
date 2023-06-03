const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const {SendMail, emailLayout} = require("../_utility/mail/mail");
const {registrationMailTemplate} = require("../_utility/mail/mail-template/registration-Template");
const { EMAIL_FROM,origin } = require("../_config/env");
const { GeneratePassword, GenerateSalt } = require("../_helpers/bcrypt");
const { GenerateOtp, onRequestOTP } = require("../_utility/OtpUtility");


router.post("/register", async(req, res) => {
        
    try{
        const schema = Joi.object({
            username: Joi.string()
            .alphanum()
            .min(3)
            .max(15)
            .required(),

            password: Joi.string()
            .required(),

            repeat_password: Joi.ref('password'),
            
            mobile: Joi.string(),

            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'live'] } })
            .required()
        }).validate(req.body)


        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }


        const {username, email, mobile, password } = req.body;

        //Generate the Salt
        const salt = await GenerateSalt();
        
        //Encrypt the Password Using the Salt : Use Bcrypt Library
        const hashPassword = await GeneratePassword(password, salt);

        //Generate Otp   expiry not save some problem
        const {otp, expiry} = await GenerateOtp();
        // console.log('otp',otp,expiry)
        const data = {
            'username' : username,
            'email' : email,
            'password' : hashPassword,
            'mobile' : mobile,
            'otp_number' : otp,
            'otp_exp_time' : expiry.toTimeString()
        }
        const rec = await User.findOne({ where: {email: email} });
        
        if(rec){
            return res.json({
                status: true,
                message: 'User Already Registered',
                data: rec
            });
        }

        const user = await User.create(data);

        if(user){


            // Send the OTP to customer
            await onRequestOTP(otp, mobile)


            //send Mail for new Signup with confirm new signup 
            let content = "<h3>  Your Account  Successfully Verified...! </h3>";
            const link = `${origin}/auth/verify-email?email=${user.email}`;     //Change port later
            let html = await registrationMailTemplate(user.email, content, link);
            const sendMail = await SendMail(EMAIL_FROM, email, 'Job', `${EMAIL_FROM} Shared a file with you`, html);
            
            return res.json({
                status: true,
                message: 'Registered successfully',
                data: null
            });
        }

    }catch(err){
        return res.json({
            status: false,
            message: 'Please fill the fields required'+err.message,
            data: null
        });
    }
       
})


module.exports = router;
