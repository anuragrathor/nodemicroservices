const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const { Op, and } = require("sequelize");
const { ValidatePassword } = require("../_helpers/bcrypt");
const { GenerateSignature } = require("../_helpers/jwt");

router.post("/login", async(req, res) => {

    try{

        //Validate Data
        const schema = Joi.object({
            email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'live'] } }),

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
            where: { 
                email: email 
            }
        });

        if(rec){

            //Check Account Activated or Deactivated
            if(!rec.status){
                return res.json({
                    status:false,
                    message: 'User is not Activated. Please Activate your Account',
                    data: rec 
                })
            }

            //Validate Password using Bcrypt
            const validatePass =  await ValidatePassword(password, rec.password);
          

            if(validatePass){

                // generate the signnature
                const payload = {
                    id: rec.id,
                    email: rec.email
                }

                const signature = await GenerateSignature(payload);
                
                return res.json({
                    status: true,
                    message: 'Login successfully',
                    data: signature
                });
            }else{
                return res.json({
                    status: true,
                    message: 'Password is not correct',
                    data: validatePass
                });
            }


            
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
