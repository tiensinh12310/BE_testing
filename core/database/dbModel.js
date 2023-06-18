var dbSchema = require('./dbSchema');
var mongoose = dbSchema.mongoose;

var dbModel = {};

dbModel.mongoose = mongoose;
dbModel.conn = mongoose.conn;

dbModel.dbSchema = dbSchema;
dbModel.Types = mongoose.Types;


dbModel.wait_connect = function () {
    var q = require('q');
    return q.Promise(function (resolve, reject) {
        var loop = function () {
            if (dbModel.is_connected) {
                resolve();
            } else {
                setTimeout(loop, 100);
            }
        };
        loop();
    })
};

// ------------------------------------
dbModel.contact = mongoose.model(dbSchema.CollectionName.contact, dbSchema.contact, dbSchema.CollectionName.contact);


// ------------------------------------
module.exports = dbModel;