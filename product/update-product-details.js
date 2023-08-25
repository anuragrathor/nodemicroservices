const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");


router.post("/update-product", async (req, res) => { 
    
    try{

        const { productId, name, price, size } = req.body;
        
        if(!productId){
            res.json({
                status: false,
                message: 'Product ID not selected . First select it after you can Update Product Detail',
                data: null
            })
        }

        const data = {
            'name': name,
            'price': price,
            'size': size
        }

        const rec = await Product.update(data, {
            where: 
            { 
                id: productId 
            } 
        });

       
        if(rec){
            return res.json({
                status: true,
                message: 'Product Updated Successfully',
                data: rec
            })
        }else{
            return res.json({
                status: false,
                message: 'Something error Found',
                data: null
            });
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
