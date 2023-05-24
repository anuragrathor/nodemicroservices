const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("../_config/env");
const db = require("../_db/index");
const { authenticate } = require("../_middlewares/auth");
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')



const app = express();
app.use(helmet());


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));


const PORT = env.port.video;

const corsOptions = {
    origin : env.origin
}

app.use(cors(corsOptions));

//parse request of content-type application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


const prefix = '/video';


//app.use(authenticate);

app.use(prefix, require('./video'));
app.use(prefix, require('./list'));
app.use(prefix, require('./ffmpeg/ffmpeg'));





app.listen(PORT, async() => {
    console.log(`Video Module is running on port ${PORT}`);
})