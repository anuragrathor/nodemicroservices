const express = require("express");
const Video_video = require("../_models/videos/video_video");
const { Op } = require("sequelize");
const router = express.Router();




router.get('/list', async (req, res) => {

    try{

        const data = await Video_video.findAll({
            where: {
                ffmpeg_status: {
                  [Op.or]: {
                    [Op.lt]: 1,
                    [Op.eq]: null
                  }
                },
                createdAt: {
                    [Op.lt]: new Date(),
                    [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                },
                [Op.or]: [
                    {
                    title: {
                        [Op.like]: 'a%'
                    }
                    },
                    {
                    description: {
                        [Op.like]: '%a%'
                    }
                    }
                ]  
              },
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
        // save the `sql` query in Elasticsearch
        console.log(sql)
      
        // use the queryObject if needed (e.g. for debugging)
      }


})


module.exports = router;