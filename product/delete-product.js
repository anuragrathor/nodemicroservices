const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");



router.delete("/delete-product/:id", async (req, res) => {
        
    try{
        const productId = req.params.id;

        const product = await Product.findByPk(productId);
    
        if(!product){
            return res.json({
                status: false,
                message: 'Product not found',
                data: null
            })
        }

        
        //This will also work
        //const rec = product.destroy();
        const rec = await Product.destroy({
            where: { 
                id: productId 
            }
        })

        if(rec){
            res.json({
                status: true,
                message: 'Product Deleted Successfully',
                data: rec
            })
        }else{
            return res.json({
                status: false,
                message: 'Product ID not Found',
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
