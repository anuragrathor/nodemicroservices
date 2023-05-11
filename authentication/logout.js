const express = require("express");
const router = express.Router();
const Joi  = require("joi");

router.post("/logout", async(req, res) => {
    return res.json({message : 'Logout successfully'});
})


module.exports = router;
