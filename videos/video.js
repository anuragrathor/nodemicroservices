const express = require("express");
const router = express.Router();
const Joi  = require("joi");
const { Op, and, NUMBER } = require("sequelize");
const Video_video = require("../_models/videos/video_video");
const fs = require('fs');
const multer  = require('multer');
const { fileUploadConfig } = require("../_helpers/multer");


const filePath = 'uploads/test.mp4';
// const filePath = __dirname+"/test.mp4";


router.post("/videos", async(req, res) => {

    try{

        return res.json({
            status: true,
            message: 'Success',
            data: null
        });


    }catch(err){
        return res.json({
            status: false,
            message: 'Something error found',
            data: null
        });
    }


    
})




router.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
})


//Upload Video using Multer
router.post("/video-upload", async(req, res) => {
    const attributesToBeSaved = {};
    var upload = multer(fileUploadConfig).single('user-file');
    
    upload(req, res, function(uploadError){
        if(uploadError){
        var errorMessage;
        if(uploadError.code === 'LIMIT_FILE_TYPE') {
            errorMessage = uploadError.errorMessage;
        } else if(uploadError.code === 'LIMIT_FILE_SIZE'){
            errorMessage = 'Maximum file size allowed is ' + process.env.FILE_SIZE + 'MB';
        }


        return res.json({
            status: false,
            message:errorMessage,
            data: null
        })

        }

        const fileId = req.file.filename.split('-')[0];
        const link = 'http://' + req.hostname + ':' + process.env.PORT + '/video/' + fileId


        attributesToBeSaved = {
            //id: fileId,
            // title: req.file.originalname,
            title: req.file.filename,
            file_size: req.file.size,
            url: req.file.path,
            // encoding: req.file.encoding,
            description: req.body.details ? req.body.details : '',
            video_extention:video_extention,
            // url: link
        }
        
    });

    return res.json({
        status: true,
        message:'File upload successfully',
        data: attributesToBeSaved
    })

    // const jane = await Video_video.create({ attributesToBeSaved });
    
})


router.get("/playvideo", (req, res) => {
    
    const stat = fs.statSync(filePath)
    const fileSize = stat.size
    const range = req.headers.range
  
    if (range) {
        console.log('anurag');
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1
        console.log(parts);
    //  const start = NUMBER(range.replace(/\D/g, ""));
    //  const CHUNK_SIZE = 10**6; //1 MB
    //  const end = Math.min(start + CHUNK_SIZE , videoSize-1);

      if (start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
        return
      }
  
      const chunksize = 10**6; //1 MB   (end - start) + 1 ;
      const file = fs.createReadStream(filePath, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      console.log(head);
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      console.log(req.headers)
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(filePath).pipe(res)
    }



    // res.setHeader("content-type", "video/mp4");

    // const range = req.headers.range;
    // console.log(req.headers.range);

    // if(!range){
    //     return res.json({
    //         status: false,
    //         message: 'Bad Request . Required Range Header'
    //     });
    // }

    // const videoPath = __dirname+"/test.mp4";
    // const videoSize = fs.statSync(videoPath).size;
    // const CHUNK_SIZE = 10**6; //1 MB
    // const start = NUMBER(range.replace(/\D/g, ""));
    // const end = Math.min(start + CHUNK_SIZE , videoSize-1);
    // const contentLength = end-start+1;
    // const headers = {
    //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    //     "Accept-Ranges": 'bytes',
    //     "Content-Length": contentLength,
    //     "Content-Type": 'video/mp4'
    // }


    // res.writeHead(206, headers);
    // const videoStream = fs.createReadStream(videoPath, {start, end});
    // videoStream.pipe(res);


})


router.get("/work-in-chrome", (req, res) => {
    
    res.setHeader("content-type", "video/mp4");
   
    fs.stat(filePath, (err, stat) => {
       if (err) {
           console.error(`File stat error for ${filePath}.`);
           console.error(err);
           res.sendStatus(500);
           return;
       }

       res.setHeader("content-length", stat.size);

       const fileStream = fs.createReadStream(filePath);
       fileStream.on("error", error => {
           console.log(`Error reading file ${filePath}.`);
           console.log(error);
           res.sendStatus(500);
       });

       fileStream.pipe(res)
   });

})

router.get('/works-in-chrome-and-safari', (req, res) => {

    const options = {};

    let start;
    let end;

    const range = req.headers.range;
    console.log(range);
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

    res.setHeader("content-type", "video/mp4");

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let contentLength = stat.size;
        
        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            res.end();
        }
        else {        
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start;
            }
            else if (end !== undefined) {
                retrievedLength = (end+1);
            }
            else {
                retrievedLength = contentLength;
            }

            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

            res.setHeader("content-length", retrievedLength);

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }

            const fileStream = fs.createReadStream(filePath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${filePath}.`);
                console.log(error);
                res.sendStatus(500);
            });
            
            fileStream.pipe(res);
        }
    });
});


module.exports = router;
