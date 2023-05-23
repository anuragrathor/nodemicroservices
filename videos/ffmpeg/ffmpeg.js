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



//Add Image in video as a watermark
router.get('/ffmpeg/addwatermark', async (req, res )=> {

  const filePath = 'uploads/tes.mp4';
  const imagePath = 'uploads/test.jpg';


  const imagePath1 = 'uploads/overlay-1.jpg';
  const imagePath2 = 'uploads/overlay-2.jpg';
  const imagePath3 = 'uploads/overlay-3.jpg';
  

  // Run FFmpeg
  ffmpeg()
  
    // Input file
    .input(filePath)
    .input(imagePath)   //Activate if we need single image 
    // .input(imagePath1)
    // .input(imagePath2)
    // .input(imagePath3)

    .complexFilter([
        //"overlay=main_w-overlay_w-10:main_h-overlay_h-10",  //To place the overlay in the right bottom corner
        //"[0][1]overlay=x=0:y=0",  //To place the overlay in the top-left corner:
        //"[0][1]overlay=x=0:y=(main_h-overlay_h)",  //To place the overlay in the bottom-left corner:
        //"[0][1]overlay=x=(main_w-overlay_w):y=(main_h-overlay_h)",  //To place the overlay in the bottom-right corner:
        //"[0][1]overlay=x=0:y=0",  //To place the overlay in the top-left corner:
        //"[0][1]overlay=x=(main_w-overlay_w):y=0",  //To place the overlay in the top-right corner:
        //"[0][1]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2",  //To place the overlay in the center:

        //"[0][1]overlay=enable='between(t,0,4)':x=0:y=0[out];[out][2]overlay=enable='between(t,4,8)':x=0:y=0[out];[out][3]overlay=enable='between(t,8,12)':x=0:y=0",  //Overlaying a sequence of images
        "overlay='if(gte(t,1),-w+(t-1)*200,NAN)':(main_h-overlay_h)/2",  // Image Animation 
      ])
    //.videoCodec('libx264')
    .outputOptions('-pix_fmt yuv420p')

  
    // Output file
    .saveToFile('uploads/'+'audio.mp4')
  
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



  //Rotate Video
router.get('/ffmpeg/rotatevideo', async (req, res )=> {

  const filePath = 'uploads/tes.mp4';
  
  // Run FFmpeg
  ffmpeg()
  
    // Input file
    .input(filePath) 

  
    .withVideoFilter('transpose=2')

    // 0 = 90CounterCLockwise and Vertical Flip (default)
    // 1 = 90Clockwise
    // 2 = 90CounterClockwise
    // 3 = 90Clockwise and Vertical Flip
  
    // Output file
    .saveToFile('uploads/'+'audio.mp4')
  
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


// To split OR Cut video from some time to some and make new video
  router.get('/ffmpeg/cutvideo', async (req, res )=> {

    const filePath = 'uploads/test.mp4';
  
    // Run FFmpeg
    ffmpeg()
    
      // Input file
      .input(filePath) 
    
      .setStartTime('00:00:10')

      .setDuration(10)
    
      // Output file
      .saveToFile('uploads/'+'audio1.mp4')
    
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


  // To convert Extention of your Video File 
  router.get('/ffmpeg/convertExtention', async (req, res )=> {

    const filePath = 'uploads/tes.mp4';
  
    // Run FFmpeg
    ffmpeg()
    
      // Input file
      .input(filePath) 
    
      // Output file
      .saveToFile('uploads/'+'audio2.webm')
    
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


  // To Merge Two or more Video Files in one 
  router.get('/ffmpeg/mergefiles', async (req, res )=> {

    const filePath = 'uploads/tes.mp4';
    const filePath2 = 'uploads/test.mp4';
  
    // Run FFmpeg
    ffmpeg()
    
      // Input file
      .input(filePath) 
      .input(filePath2) 
    //.input(thirdFile)
    //.input(...)
    
      // Output file
      .mergeToFile('uploads/'+'audio3.mp4')
    
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


  // Take screenshot from Video
  router.get('/ffmpeg/screenshot', async (req, res )=> {

    const filePath = 'uploads/tes.mp4';
  
    // Run FFmpeg
    ffmpeg()
    
      // Input file
      .input(filePath) 
    
       // take 2 screenshots at predefined timemarks and size
      .takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '150x100' }, 'uploads/thumbnail')
    
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



module.exports = router;