const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const Cart = require("../../_models/products/cart");


router.post("/delete-cart/:id", async (req, res) => {

    try{
        const cartId = req.params.id;

        const rec = await Cart.destroy({
            where: {
                id: cartId
            }
        })

        if(rec){
            res.json({
                status: true,
                message: 'Cart Items deleted Successfully',
                data: rec
            })
        }else{
            return res.json({
                status: false,
                message: 'Something error found',
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
