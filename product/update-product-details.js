const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");


router.put("/update-product/:id", async (req, res) => { 
    
    try{

        const productId = req.params.id;
        //const updatedData = req.body;
        const { name, price, size } = req.body;

        const product = await Product.findByPk(productId);
        
        if(!product){
            res.json({
                status: false,
                message: 'Product not found',
                data: null
            })
        }

        const data = {
            'name': name,
            'price': price,
            'size': size
        }

        // Update the product's data alternate Method
        //await product.update(updatedData);

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
