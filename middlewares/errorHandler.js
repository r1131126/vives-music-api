// 1. ASYNC WRAPPER: Eliminates the need for try-catch blocks in every route
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// 2. GLOBAL ERROR HANDLER: Catches all errors and sends a clean response
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log the error for the developer (you) to see in the console
    console.error('💥 ERROR:', err);

    // Send a professional English message to the client/Postman
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'Something went wrong inside the server'
    });
};

module.exports = { catchAsync, globalErrorHandler };
