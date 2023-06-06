import ErrorHandler from "../_utility/ErrorHandler/errorHandler";

const errorMiddleware = (err, req, res, next )=> {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000){
        err.message = "Duplicate Key Error";
        err.statusCode = 400;
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(message, 400);
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

};


//export default errorMiddleware;
module.exports = errorMiddleware;