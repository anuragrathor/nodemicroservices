const express = require("express");
const router = express.Router();
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);

//Get File Info (it contain all info File name , size, duration etc)
router.get('/ffmpeg/fileinfo', async (req, res )=> {

  const filePath = 'uploads/test.mp4';
  
  ffmpeg.ffprobe(filePath, function (err, metadata) {
    if (err) {
      console.log("MetaData not Found. " + err);
    } else {
      console.log("MetaData Found."+metadata);
  
      return res.json({
        status: true,
        message: 'Data Fetched',
        data: metadata
      })
    }
  });
  
})

//Extract Audio From Video
router.get('/ffmpeg/extractaudio', async (req, res )=> {

const filePath = 'uploads/test.mp4';

// Run FFmpeg
ffmpeg()

  // Input file
  .input(filePath)

  // Audio bit rate
  .outputOptions('-ab', '192k')

  // Output file
  .saveToFile('uploads/'+'audio.mp3')

  // Log the percentage of work completed
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    }
  })

  // The callback that is run when FFmpeg is finished
  .on('end', () => {
    console.log('FFmpeg has finished.');
    return res.json({
      status: true,
      message: 'Audio Extract From Video Successfully',
      data: 'Fmpeg has finished'
    })
  })

  // The callback that is run when FFmpeg encountered an error
  .on('error', (error) => {
    console.error(error);
    return res.json({
      status: false,
      message: 'Something Error Found',
      data: error
    })
  });




})


//Changing the resolution of a video file
router.get('/ffmpeg/changeresolution', async (req, res )=> {

  const filePath = 'uploads/test.mp4';
  
  // Run FFmpeg
  ffmpeg()

  // Input file
  .input(filePath)

  // Scale the video to 720 pixels in height. The -2 means FFmpeg should figure out the
  // exact size of the other dimension. In other words, to make the video 720 pixels wide
  // and make FFmpeg calculate its height, use scale=720:-2 instead.
  .outputOptions('-vf','scale=-2:720')

  // Output file
  .saveToFile('uploads/'+'video.mp4')

  // Log the percentage of work completed
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    }
  })

  // The callback that is run when FFmpeg is finished
  .on('end', () => {
    console.log('FFmpeg has finished.');
    return res.json({
      status: true,
      message: 'Video Resolution Changed Successfully',
      data: 'Fmpeg has finished'
    })
  })

  // The callback that is run when FFmpeg encountered an error
  .on('error', (error) => {
    console.error(error);
    return res.json({
      status: false,
      message: 'Something error Found',
      data: error
    })
  });
  
})



//Removing the audio stream from a video you can remove the audio track from a video without re-encoding. This operation is quite fast, because it doesn't have to process the video. It just copies the video stream but not the audio

router.get('/ffmpeg/removeaudiofvideo', async (req, res )=> {

  const filePath = 'uploads/test.mp4';
  
  // Run FFmpeg
  ffmpeg()

  // Input file
  .input(filePath)

  // Tell FFmpeg to ignore the audio track
  .noAudio()

  // Copy the video without re-encoding
  .outputOptions('-codec', 'copy')

  // Output file
  .saveToFile('uploads/'+'video.mp4')

  // Log the percentage of work completed
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    }
  })

  // The callback that is run when FFmpeg is finished
  .on('end', () => {
    console.log('FFmpeg has finished.');
    return res.json({
      status: true,
      message: 'Video Resolution Changed Successfully',
      data: 'Fmpeg has finished'
    })
  })

  // The callback that is run when FFmpeg encountered an error
  .on('error', (error) => {
    console.error(error);
    return res.json({
      status: false,
      message: 'Something error Found',
      data: error
    })
  });
  
})


//Extracting images from a video Here's how to grab the frames from a video and save them as PNG
router.get('/ffmpeg/extractimagesfvideo', async (req, res )=> {

  const filePath = 'uploads/test.mp4';
  
  // Run FFmpeg
  ffmpeg()

  // Input file
  .input(filePath)

  // Optional: Extract the frames at this frame rate
  // .fps(10)

  // Output file format. Frames are stored as frame-001.png, frame-002.png, frame-003.png, etc.
  .saveToFile('uploads/'+'frame-%03d.png')

  // Log the percentage of work completed
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    }
  })

  // The callback that is run when FFmpeg is finished
  .on('end', () => {
    console.log('FFmpeg has finished.');
    return res.json({
      status: true,
      message: 'Video Resolution Changed Successfully',
      data: 'Fmpeg has finished'
    })
  })

  // The callback that is run when FFmpeg encountered an error
  .on('error', (error) => {
    console.error(error);
    return res.json({
      status: false,
      message: 'Something error Found',
      data: error
    })
  });
  
})


//Stitch images into a video file  Like the previous example, but the other way around:
router.get('/ffmpeg/stichimageinvideo', async (req, res )=> {

  const filePath = 'uploads/test.mp4';
  
  // Run FFmpeg
  ffmpeg()

  // FFmpeg expects your frames to be named like frame-001.png, frame-002.png, etc.
  .input('uploads/'+'frame-%03d.png')

  // Tell FFmpeg to import the frames at 10 fps
  .inputOptions('-framerate', '10')

  // Use the x264 video codec
  .videoCodec('libx264')

  // Use YUV color space with 4:2:0 chroma subsampling for maximum compatibility with
  // video players
  .outputOptions('-pix_fmt', 'yuv420p')

  // Output file
  .saveToFile('uploads/'+'video.mp4')

  // Log the percentage of work completed
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    }
  })

  // The callback that is run when FFmpeg is finished
  .on('end', () => {
    console.log('FFmpeg has finished.');
    return res.json({
      status: true,
      message: 'Stitch images into a video file Successfully',
      data: 'Fmpeg has finished'
    })
  })

  // The callback that is run when FFmpeg encountered an error
  .on('error', (error) => {
    console.error(error);
    return res.json({
      status: false,
      message: 'Something error Found',
      data: error
    })
  });
  
})


module.exports = router;