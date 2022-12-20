class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

// err: instance của AppError
const handleErrors = (err, req, res, next) => {
    // Kiểm tra err có phải là instance của AppError hay ko
    // Nếu err là instance của AppError, nghĩa là err là đã biết và đã được xử lý
    // Nếu err không phải là instance của AppError, thì có thể là lỗi unknown
    if (!(err instanceof AppError)) {
        err = new AppError(500, err.message);
    }

    const { message, statusCode } = err;
    res.status(statusCode).json({
        status: "error",
        message: message,
    });

    // next() để đi tới middleware phía sau (nếu có)
    next();
};

module.exports = {
    AppError,
    handleErrors,
};
