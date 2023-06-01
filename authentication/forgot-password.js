const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const { EMAIL_FROM, origin } = require("../_config/env");
const { SendMail } = require("../_utility/mail/mail");
const { forgotMailTemplate } = require("../_utility/mail/mail-template/forgot-Template");

//Send Forgot Mail Link to Reset your Password
router.post("/forgot-password", async(req, res) => {

    try{
        const schema = Joi.object({
            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'live'] } })
            .required()
        }).validate(req.body)
        
        if(schema.error){
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            })
        }

        
        const { email } = req.body;

        const rec = await User.findOne({ where : {email : email } });

        if(rec){

            //send forgot password mail link
            let content = "<h3>  You can recover Password from here </h3>";

            const link = `${origin}/auth/reset-password?email=${rec.email}`;     //Change port later
            let html = await forgotMailTemplate(rec.email, content, link);
            const sendMail = await SendMail(EMAIL_FROM, email, 'Job', `${EMAIL_FROM} Forgot Password`, html);
            
            
            return res.json({
                status: true,
                message: 'Forgot Password Mail Send Successfully',
                data: link
            })

        }else{
            return res.json({
                status: false,
                message: 'User is not registered. Please First Register your Account',
                data: null
            })
        }

    }catch(err){
        return res.json({
            status: false,
            message: 'Something went Wrong'+err.message,
            data: null
        })
    }

})


module.exports = router;
