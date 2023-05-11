const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const { Op, and } = require("sequelize");

router.post("/login", async(req, res) => {

    try{

        //Validate Data
        const schema = Joi.object({
            email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            password: Joi.string()
            .min(3)
            .max(30)
            .required()
        }).validate(req.body);


        if(schema.error){
            return res.json({
                status: false,
                message: schema.error.message,
                data: null 
            });
        }
 
        const {email, password } = req.body;

        const rec = await User.findOne({ 
            where: 
            {
                [Op.and]: [
                    { email: email },
                    { password: password }
                ]
            } 
        });

        if(rec){
            return res.json({
                status: true,
                message: 'Login successfully',
                data: rec
            });
        }else{
            return res.json({
                status: false,
                message: 'Email and Password is not correct',
                data: null
            });
        }


    }catch(err){
        return res.json({
            status: true,
            message: 'Something error found',
            data: null
        });
    }


    
})


module.exports = router;
