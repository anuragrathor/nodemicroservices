const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const User = require("../_models/user");
const { Op, and } = require("sequelize");
const { ValidatePassword } = require("../_helpers/bcrypt");
const { GenerateSignature } = require("../_helpers/jwt");
const Video_video = require("../_models/videos/video_video");

router.post("/videos", async(req, res) => {

    try{

        return res.json({
            status: true,
            message: 'Success',
            data: null
        });


    }catch(err){
        return res.json({
            status: false,
            message: 'Something error found',
            data: null
        });
    }


    
})


module.exports = router;
