module.exports = function (req, res, next){
    var ip = req.headers["x-forwarded-for"] || req.ip;
    if(ip.indexOf('::ffff:') > -1){
        ip = ip.substr(7);
    }
    req.ip_address = ip;
    return next();
}