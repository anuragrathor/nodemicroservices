const express = require("express");
const Video_video = require("../_models/videos/video_video");
const { Op } = require("sequelize");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("../_config/env");
const Razorpay = require('razorpay');
const router = express.Router();
//const { nanoid } = require("nanoid");

var instance = new Razorpay({
	key_id: RAZORPAY_KEY_ID,
	key_secret: RAZORPAY_KEY_SECRET,
  });

router.post('/order', async (req, res) => {  
    try{
        var options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };

        instance.orders.create(options, function(err, order) {
            console.log(order);
          }); 

        return res.json({
            status: true,
            message: 'Video Records',
            data: order
        })
    }catch(error){
        return res.json({
            status: false,
            message: error.message,
            data: null
        })
    }

})


router.get("/checkoutpage", (req, res) => {
    res.sendFile(__dirname+"/checkout.html");
})




module.exports = router;