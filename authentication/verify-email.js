const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");

router.post("/verify-email", async(req, res) => {

    try{
        const { email } = req.body;

        const rec = await User.findOne({where : { email: email }});

        if(rec){
            await User.update({ status: 1 },
                { where : {
                    email: rec.email
                }})

            return res.json({
                status: true,
                message: 'User Activated Successfully',
                data: rec
            })    
                
        }else{
            return res.json({
                status: true,
                message: 'User not Registered . this is not authorized Account',
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

    return res.json({message : 'Verify Email successfully'});
})


module.exports = router;
