const express = require("express");
const Video_video = require("../_models/videos/video_video");
const { Op } = require("sequelize");
const router = express.Router();




router.get('/list', async (req, res) => {

    try{
        
        const { title } = req.query;


        let page = Number(req.query.page) || 1 ;
        let limit = Number(req.query.limit) || 3 ;
        let skip = (page - 1) * limit ;

        var condition = {
            title: {
                [Op.like]: title+'%'
            },
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            } 
        };

        const data = await Video_video.findAndCountAll({
            where: condition,
            limit: limit,
            offset: skip,
            //To Print Raw SQL Query   
            logging: (sql, queryObject) => {
                sendToLogToConsole(sql, queryObject)
            },
            
        });

        return res.json({
            status: false,
            message: 'data fetched',
            data: data
        })
    }catch(error){
        return res.json({
            status: false,
            message: error.message,
            data: null
        })
    }


    function sendToLogToConsole (sql, queryObject) {  
        console.log(sql);
       // console.log(queryObject);
        // use the queryObject if needed (e.g. for debugging)
      }


})


module.exports = router;