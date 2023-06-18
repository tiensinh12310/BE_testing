var general = require('../config/general');
var moment = require('moment-timezone');
module.exports = function () {
    if (general.timezone) {
        return moment.apply(this, arguments).tz(general.timezone);
    }
    return moment.apply(this, arguments);
};