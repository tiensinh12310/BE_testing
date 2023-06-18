var SystemError = require('../core/system_error');
var GetIP = require('../core/get_ip')

module.exports = function (app) {
    app.use(GetIP) // get ip from request
    app.use('/api/v1/contact', require('../controllers/contact'));

    // handle undefined Routes
    app.use('*', (req, res, next) => {
        const err = new SystemError(404, false, 'Not found API');
        next(err, req, res, next);
    });

    // global error Handler
    app.use(require('../controllers/error'));
}