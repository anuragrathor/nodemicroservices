const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const { GenerateSalt, GeneratePassword } = require("../_helpers/bcrypt");


//Reset Password using Mail
router.post("/reset-password", async(req, res) => {
    
    try{
        const { email, password, password_confirmation } = req.body;

        const schema = Joi.object({
            email: Joi.string(),
            password: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
            .required()
            .messages({
                    "string.pattern.base": "Password must contains at least 6 characters, including UPPER or lowercase with numbers."
            }),
            password_confirmation: Joi.any()
            .equal(Joi.ref('password'))
            .required()
            .messages({'any.only': '{{#label}} does not match'})
        }).validate(req.body)

        if(schema.error){
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            })
        }


        //Find record using userid email
        const rec = await User.findOne({ where : 
            {
                email : email 
            }
        });

        if(rec){

            const salt = await GenerateSalt();
            const hashPass = await GeneratePassword(password , salt);

            // Change Password for Recovery
            await User.update({ password: hashPass }, 
                {
                where: {
                email: rec.email
                }
            }
            );
            
            return res.json({
                status: true,
                message: 'successfully changed Password',
                data: rec
            })
        }else{
            return res.json({
                status: false,
                message: 'User is not Valid',
                data: null
            })
        }

    }catch(err){ 
        return res.json({
            status: false,
            message: 'Something Error Found',
            data: null
        })
    }
    
})


module.exports = router;
