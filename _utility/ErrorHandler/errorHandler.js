class ErrorHandler extends Error{

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


module.exports = {ErrorHandler};
//export default ErrorHandler;
//exports default ErrorHandler;
//module.exports = ErrorHandler