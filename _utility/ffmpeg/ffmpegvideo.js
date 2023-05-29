const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);


async function fileInfo(req, res, file){

    // return res.json({
    //     status: true,
    //     message: 'Data Fetched',
    //     data: file
    // })

    const filePath = 'uploads/'+file; //'uploads/test.mp4';
  
    ffmpeg.ffprobe(filePath, function (err, metadata) {
            if (err) {
            console.log("MetaData not Found. " + err);
            } else {
            console.log("MetaData Found."+metadata);
    
            return metadata; 
            // res.json({
            //     status: true,
            //     message: 'Data Fetched',
            //     data: metadata
            // })
        }
    });


    return 'ajdk';
}


async function extractAudio(){

}

async function changeResolution(){

}

async function removeAudioFVideo(){

}

async function extractImagesFVideo(){

}


async function stichImageInVideo(){

}

module.exports = { fileInfo, extractAudio, changeResolution, removeAudioFVideo, extractImagesFVideo, stichImageInVideo }