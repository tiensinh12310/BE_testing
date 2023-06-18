var express_session = require('express-session');

var mongoose = require('../core/database/dbModel');
var express_sessionStore = require('connect-mongo')(express_session);

var sessionConfig = require('../config/session');
var session = function (app) {
    sessionConfig.session.store = new express_sessionStore({
        mongooseConnection: mongoose.mongoose.connection
    });
    app.use(express_session(sessionConfig.session));
};

module.exports = session;