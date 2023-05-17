const multer = require("multer");
const { fileUploadConfig } = require("../_config/file-upload-config-video");



async function uploadFile(req,res,fileinput){
    var upload = multer(fileUploadConfig).single(fileinput);
    
    return upload(req, res, function(uploadError){
        
        if(uploadError){
            var errorMessage;
            if(uploadError.code === 'LIMIT_FILE_TYPE') {
                errorMessage = uploadError.errorMessage;
            } else if(uploadError.code === 'LIMIT_FILE_SIZE'){
                errorMessage = 'Maximum file size allowed is ' + process.env.FILE_SIZE + 'MB';
            }

            return res.json({
                error: errorMessage
            });
        }

        const fileId = req.file.filename.split('-')[0];
        const link = 'http://' + req.hostname + ':' + process.env.PORT + '/video/' + fileId

        res.json({
        success: true,
        link: link
        });

        const attributesToBeSaved = {
        id: fileId,
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
        encoding: req.file.encoding,
        details: req.body.details ? req.body.details : ''
        }
        
        //handleDb.saveToDB(attributesToBeSaved);
        return attributesToBeSaved;

    });

}


module.exports = { uploadFile };
