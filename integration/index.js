const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("../_config/env");
const db = require("../_db/index");
const { authenticate } = require("../_middlewares/auth");
const fs = require('fs')
const path = require('path');


const app = express();
app.use(helmet());


const PORT = env.port.integration;

const corsOptions = {
    origin : env.origin
}

app.use(cors(corsOptions));

//parse request of content-type application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


const prefix = '/integration';


//app.use(authenticate);


//Product Routes

app.use(prefix, require('./validate'))





app.listen(PORT, async() => {
    console.log(`Integration Module is running on port ${PORT}`);
})