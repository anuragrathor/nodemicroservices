const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");

router.post("/change-password", async(req, res) => {

    try{

        const { email, password } = req.body;
        
        const schema = Joi.object({
            old_password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
            .required()
            .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
            }),
            password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
            .required()
            .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
            }),
            password_confirmation: Joi.any()
            .equal(Joi.ref(password))
            .required()
            .messages({'any.only': '{{#label}} does not match'}),
        }).validate(req.body)

        if(schema.error){
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            })
        }

        


        //let userId = req.userId;

        //Find record using userid email
        const rec = await User.findOne({ where : {email : email }});

        if(rec){
            const data = {
                password: password
            }


            // Change Password for Recovery
            await User.update({ password: password }, 
                {
                where: {
                email: rec.email
                }
            }
            );

            return res.json({
                status: true,
                message: 'Password Updated Successfully',
                data: userId
            })

        }else{
            return res.json({
                status: false,
                message: 'User is not Authorized',
                data: rec
            })
        }


        

        

    }catch(err){
        return res.json({
            status: false,
            message: 'Something went wrong'+err.message,
            data: null
        })
    }

})


module.exports = router;
