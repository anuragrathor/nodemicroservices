const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");


router.get("/get-product", async (req, res) => {
    
    try{
        const productId = req.query.productId;

        const rec = await Product.findOne({
            where: { 
                id: productId 
            }
        })


        return res.json({
            status: true,
            message: 'Product Detail Fetched',
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
