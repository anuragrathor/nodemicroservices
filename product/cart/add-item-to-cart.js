const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Cart = require("../../_models/products/cart");


router.post("/add-to-cart", async (req, res) => {
    
    try{

        const { email, items, totalPrice, totalQuantity } = req.body;

        const data = {
            email : email,
            items : items,
            totalPrice : totalPrice,
            totalQuantity : totalQuantity
        }

        const rec = await Cart.create(data);

        if(rec){
            return res.json({
                status: true,
                message: 'Items added in Cart',
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
            message: 'Something errorsdfsd found'+err.message,
            data: null
        });
    }

})


module.exports = router;
