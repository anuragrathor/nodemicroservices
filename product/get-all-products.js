const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");


router.get("/get-all-product", async (req, res) => {
    try{
        const rec = await Product.findAll();

        if(rec){
            return res.json({
                status: true,
                message: 'Product List',
                data: rec
            })
        }else{
            return res.json({
                status: false,
                message: 'Something error found',
                data: null
            })
        }
    }catch(err){
        return res.json({
            status: false,
            message: 'Something error found'+err.message,
            data: null
        });
    }

})


module.exports = router;
