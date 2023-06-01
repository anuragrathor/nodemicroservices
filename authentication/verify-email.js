const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");

router.get("/verify-email", async(req, res) => {

    try{
        const email = req.query.email;

        const rec = await User.findOne({where : { email: email }});

        if(rec){
            if(rec.status != 1){
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
                    message: 'User Already Activated',
                    data: rec
                })
            }
              
                
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

})


module.exports = router;
