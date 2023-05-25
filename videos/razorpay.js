const express = require("express");
const Video_video = require("../_models/videos/video_video");
const { Op } = require("sequelize");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("../_config/env");
const Razorpay = require('razorpay');
const router = express.Router();

router.get('/razorpay', async (req, res) => {
    
    try{

        var instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
          });


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
            data: data
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

router.post('/createOrder', (req, res)=>{

	// STEP 1:
	const {amount,currency,receipt, notes} = req.body;	
		
	// STEP 2:	
	razorpayInstance.orders.create({amount, currency, receipt, notes},
		(err, order)=>{
		
		//STEP 3 & 4:
		if(!err)
			res.json(order)
		else
			res.send(err);
		}
	)
});



router.post('/verifyOrder', (req, res)=>{
	
	// STEP 7: Receive Payment Data
	const {order_id, payment_id} = req.body;	
	const razorpay_signature = req.headers['x-razorpay-signature'];

	// Pass yours key_secret here
	const key_secret = RAZORPAY_KEY_SECRET;	

	// STEP 8: Verification & Send Response to User
	
	// Creating hmac object
	let hmac = crypto.createHmac('sha256', key_secret);

	// Passing the data to be hashed
	hmac.update(order_id + "|" + payment_id);
	
	// Creating the hmac in the required format
	const generated_signature = hmac.digest('hex');
	
	
	if(razorpay_signature===generated_signature){
		res.json({success:true, message:"Payment has been verified"})
	}
	else
	res.json({success:false, message:"Payment verification failed"})
});



module.exports = router;