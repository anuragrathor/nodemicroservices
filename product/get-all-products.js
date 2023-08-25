const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Product = require("../_models/products/product");
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");


router.get("/get-all-product", async (req, res) => {
    try{

        let page = Number(req.query.page) || 1 ;
        let limit = Number(req.query.limit) || 3 ;
        let skip = (page - 1) * limit ;

        var condition = {
            // title: {
            //     [Op.like]: title+'%'
            // },
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            } 
        };


        const rec = await Product.findAndCountAll({
            where: condition,
            limit: limit,
            offset: skip,
            //To Print Raw SQL Query   
            logging: (sql, queryObject) => {
                sendToLogToConsole(sql, queryObject)
            },
        });

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



    function sendToLogToConsole (sql, queryObject) {  
        console.log(sql);
       // console.log(queryObject);
        // use the queryObject if needed (e.g. for debugging)
      }

})


module.exports = router;
