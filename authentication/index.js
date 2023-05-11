const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("../_config/env");
const db = require("../_db/index");



const app = express();
app.use(helmet());

const PORT = env.port.authentication;

const corsOptions = {
    origin : env.origin
}

app.use(cors(corsOptions));

//parse request of content-type application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));




const prefix = '/auth';

app.use(prefix, require('./login'));
app.use(prefix, require('./logout'));
app.use(prefix, require('./profile'));
app.use(prefix, require('./register'));



app.listen(PORT, async() => {
    console.log(`Authentication service is running on port ${PORT}`);
})