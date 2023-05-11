const express = require("express");
const router = express.Router();
const Joi  = require("joi");

router.post("/profile", async(req, res) => {
    return res.json({message : 'Profile successfully'});
})


module.exports = router;
