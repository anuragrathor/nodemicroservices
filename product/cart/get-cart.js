const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const Cart = require("../../_models/products/cart");


router.get("/cart-list", async (req, res) => {
    try{

        const { cartId } = req.body;

        const rec = await Cart.findOne({
            where: {
                id : cartId
            }
        })

        if(rec){
            return res.json({
                status: true,
                message: 'Cart List Fetched successfully',
                data: rec
            });
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
