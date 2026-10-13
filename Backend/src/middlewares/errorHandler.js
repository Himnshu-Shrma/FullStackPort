
const errorHandler = (err, req, res, next) => {

    if (res.headersSent) {
        return next(err);
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Database validation failed'
        })
    }


    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid resource Id or value'
        })
    }

    // MongoDB duplicate-key error
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'A record with this value already exists'
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode < 500
                ? err.message
                : 'Internal server error'
    });
};

export default errorHandler;