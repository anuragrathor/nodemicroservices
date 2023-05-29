const express = require("express");
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const v4 = require('uuid');
//import { v4 as uuidv4 } from 'uuid';

const { origin }  = require('../../_config/env');
const Video_video  = require('../../_models/videos/video_video');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 1000000* 100},
}).single('user-file');


function UploadFile(req, res){
   
    upload(req, res, async (err) => {

        try{
            
        //Validate Request
        if(!req.file){
            return res.status(400).json({ message: 'All fields are Required' });
        } 

        if(err) {
            return res.status(500).json({ message: err.message})
        }

        //Store into Database
        const attributesToBeSaved = {
             //id: fileId,
            // title: req.file.originalname,     
            slug_folder:'Dummy',
            slug_smart:'Dummy',
            slug_user:'Dummy',  
            url: req.file?.path,
            video_extention: video_extention,
            title: req.file?.filename,
            //uuid: uuidv4(),
            thumbnail: 'thumbnaildummy',
            file_size: req.file?.size,
            // encoding: req.file.encoding,
            description: req.body.details ? req.body.details : '',
            // url: link
        }

        const response = await Video_video.create({attributesToBeSaved});

        console.log(attributesToBeSaved);
        return res.json({ file: `${origin}/files/${response.uuid}`});
        
    }catch(err){
        return res.status(400).json({message: 'Something went wrong'});
    }

    });
}


module.exports = { UploadFile } ;