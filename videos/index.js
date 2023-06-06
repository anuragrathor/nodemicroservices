const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("../_config/env");
const db = require("../_db/index");
const { authenticate } = require("../_middlewares/auth");
const fs = require('fs')
const morgan = require('morgan')
const path = require('path');
const morgan_var = require("../_utility/logger/morgan-logger");
const i18n = require("../_utility/localization/i18n");
const logWinston = require("../_middlewares/logWinston");

const app = express();
app.use(helmet());


// Morgan Log
app.use(morgan_var);

//Winston Logger
app.use(logWinston.request);


//Set Localization for Languages  set app.use how
// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);
//i18n.setLocale('hindi');
 console.log(i18n.getLocales()); // ['en', 'uk']
 console.log(i18n.getLocale()); // 'en'
 console.log(i18n.__('successfulSignUp')); // 'Hello'
// console.log(i18n.__n('You have %s message', 5)); // 'You have 5 messages'


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
app.use(prefix, require('./razorpay'));






app.listen(PORT, async() => {
    console.log(`Video Module is running on port ${PORT}`);
})