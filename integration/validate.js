const express = require("express");
const router = express.Router();
const { default: ErrorHandler } = require("../_utility/ErrorHandler/errorHandler");
const axios = require('axios');


router.get("/validate", async (req, res) => {
    
    try{
        //const productId = req.query.productId;
        
        // GET request for remote image in node.js
        axios({
            method: 'get',
            url: 'https://pixabay.com/api/?key=13071583-c971d5676d0a073851e64e82d&q=yellow+flowers&image_type=photo&pretty=true'
        })
        .then(function (response) {

            // if(response.data.status){

            // }

            return res.json({
                status: true,
                message: 'Data Fetched',
                data: response.data
            });
        }).catch(function (error) {
            // handle error
            return res.json({
                status: true,
                message: 'VError Found',
                data: error
            });
        })
        .finally(function () {
            // always executed
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
