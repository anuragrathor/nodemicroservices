const express = require("express");
const router = express.Router();
const Joi  = require("joi");

router.post("/forgot-password", async(req, res) => {
    return res.json({message : 'Reset successfully'});
})


module.exports = router;
