const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");


router.post("/category", (req, res) => {
    try{
        return res.json({
            status: true,
            message: 'Success ddfddf',
            data: rec
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
