var moment = require('../core/datetime');
var _ = require('lodash');

module.exports = {
    md5: function (string) {
        var crypto = require('crypto');
        var md5sum = crypto.createHash('md5');
        return md5sum.update(string.toString().trim()).digest('hex');
    },
    time_now: function (format) {
        if (!format)
            return moment().format('X');
        return moment().format(format);
    },
}