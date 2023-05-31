const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const { EMAIL_FROM } = require("../_config/env");
const { emailLayout, SendMail } = require("../_utility/mail/mail");

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
            const link = `${origin}/auth/change-password/${user.email}`;
            let html = await emailLayout(user.email, content, link);
            const sendMail = await SendMail(EMAIL_FROM, email, 'Job', `${EMAIL_FROM} forgot password`, html);
            
            
            return res.json({
                status: true,
                message: 'Forgot Password Mail Send Successfully',
                data: rec
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
