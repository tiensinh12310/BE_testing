var mongoose = require('mongoose');
var mongoConfig = require('../../config/database');

// var uri = 'mongodb+srv://' + mongoConfig.host + '/' + mongoConfig.database;
var uri = 'mongodb://' + mongoConfig.user + ":" + mongoConfig.pass + "@" + mongoConfig.host + ":" + mongoConfig.port + '/' + mongoConfig.database; //+ "?authMode=scram-sha1&rm.tcpNoDelay=true";

mongoose.conn = mongoose.connect(uri, mongoConfig.options, function () {
    console.log('Connect success DB Mongo')
});
mongoose.Promise = require('q').Promise;

module.exports = mongoose;