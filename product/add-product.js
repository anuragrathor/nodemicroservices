const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");


router.post("/add-product", async(req, res) => {      
    try{
        const schema = Joi.object({
            name: Joi.string()
            .min(3)
            .max(15)
            .required(),

            image: Joi.string(),

            price: Joi.number()
            .min(1)
            .max(2000)
            .required(),

            size: Joi.number()
            .max(5)
            .required()
            
        }).validate(req.body)



        if(schema.error){
            return res.json({
                status: false,
                message: schema.error.message,
                data: null
            })
        }

        const { name, image, price, size } = req.body;

        const data = {
            'name': name,
            'image': image,
            'price': price,
            'size': size
        }

        const rec = await Product.create(data);
        
        if(rec){
            return res.json({
                status: true,
                message: 'Product Added Successfully',
                data: rec
            })
        }else{
            return res.json({
                status: false,
                message: ' Something error Found',
                data: null
            })
        }


    }catch(err){
        return res.json({
            status: false,
            message: 'Please fill the required fields'+err.message,
            data: null
        });
    }
})


module.exports = router;
