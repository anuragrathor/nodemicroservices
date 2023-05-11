const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");


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

            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
        }).validate(req.body)


        if (schema.error) {
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            });
        }


        const {username, email, password } = req.body;

        const data = {
            'username' : username,
            'email' : email,
            'password' : password
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

        return res.json({
            status: true,
            message: 'Registered successfully',
            data: null
        });

    }catch(err){
        return res.json({
            status: false,
            message: 'Please fill the fields required',
            data: null
        });
    }
       
})


module.exports = router;
