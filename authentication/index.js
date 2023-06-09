const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("../_config/env");
const db = require("../_db/index");
const { authenticate } = require("../_middlewares/auth");



const app = express();

//For only google auth
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('index');
// })

// app.get('/login', (req, res) => {
//     res.render('login');
// })

//For only google auth


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
app.use(prefix, require('./register'));
app.use(prefix, require('./logout'));
app.use(prefix, require('./forgot-password'));
app.use(prefix, require('./change-password'));
app.use(prefix, require('./verify-email'));
app.use(prefix, require('./reset-password'));


//app.use(authenticate)   On all below Routes this middleware works
app.use(prefix, authenticate , require('./profile'));




app.listen(PORT, async() => {
    console.log(`Authentication service is running on port ${PORT}`);
})