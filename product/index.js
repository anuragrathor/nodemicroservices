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


const PORT = env.port.product;

const corsOptions = {
    origin : env.origin
}

app.use(cors(corsOptions));

//parse request of content-type application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


const prefix = '/product';


//app.use(authenticate);

//Product Routes
app.use(prefix, require('./add-product'));
app.use(prefix, require('./delete-product'))
app.use(prefix, require('./get-all-products'))
app.use(prefix, require('./get-product'))
app.use(prefix, require('./top-five-cheap'))
app.use(prefix, require('./update-product-details'))
app.use(prefix, require('./update-product-images'))
app.use(prefix, require('./update-product-main-image'));


//Category Routes
app.use(prefix, require('./category/add-category'));
app.use(prefix, require('./category/delete-category'));
app.use(prefix, require('./category/get-all-categories'));
app.use(prefix, require('./category/get-category'));
app.use(prefix, require('./category/update-category-details'));
app.use(prefix, require('./category/update-category-image'));



//Cart Routes 
app.use(prefix, require('./cart/add-item-to-cart'));
app.use(prefix, require('./cart/delete-cart'));
app.use(prefix, require('./cart/delete-item-from-cart'));
app.use(prefix, require('./cart/get-cart'));


//Order Routes
app.use(prefix, require('./order/order-status'));
app.use(prefix, require('./order/order-create'));
app.use(prefix, require('./order/order-get'));
app.use(prefix, require('./order/order-get-all'));
app.use(prefix, require('./order/order-cancle'));


//Discount Routes
app.use(prefix, require('./discount/cancel-discount-code'));
app.use(prefix, require('./discount/delete-discount-code'));
app.use(prefix, require('./discount/generate-discount-code'));
app.use(prefix, require('./discount/get-all-discount-codes'));
app.use(prefix, require('./discount/get-discount'));
app.use(prefix, require('./discount/verify-discount-code'));



app.listen(PORT, async() => {
    console.log(`Product Module is running on port ${PORT}`);
})