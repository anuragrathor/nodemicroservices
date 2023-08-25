const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");


router.get("/top-cheap", async (req, res) => {
    try{

        await Product.findAndCountAll({
            // where: {
            //     price: '140'
            // },
            limit: 5
          }).then(result => {
            return res.json({
                status: true,
                message: 'Top Five Chepeast Product List',
                data: result
            });
        }).catch((err)=> {
            return res.json({
                status: error,
                message: 'Something error in Query',
                data: null
            });
        })


    }catch(err){
        return res.json({
            status: false,
            message: 'Something error found',
            data: null
        });
    }

})


module.exports = router;
