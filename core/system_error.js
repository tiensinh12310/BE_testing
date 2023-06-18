class SystemError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        this.message = message;
    }
}

module.exports = SystemError;