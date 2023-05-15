const express = require("express");
const router = express.Router();
const Joi  = require("joi");

router.post("/reset-password", async(req, res) => {
    return res.json({message : 'reset-password successfully'});
})


module.exports = router;
