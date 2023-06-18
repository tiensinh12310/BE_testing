const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const configRoutes = require('./config/router');
const system_error = require('./core/system_error');

// --------------- use middlewares
// Allow Cross-Origin requests
app.use(cors({
    origin: '*',
    credentials: true
}))
// Set security HTTP headers
app.use(helmet());
// Limit request from the same API 
const limiter = rateLimit({
    max: 2000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request',
    handle: function (req, res, next) {
        var err = new system_error(500, 'Too many request')
        return next(err, req, res, next);
    }
});
//
app.use('/api', limiter);
// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

require('./core/database/dbModel');
// session
require('./core/session')(app)

// Routes
configRoutes(app)


module.exports = app;