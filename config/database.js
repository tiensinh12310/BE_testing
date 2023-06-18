require('dotenv')

module.exports = {
    host: '103.173.226.166',
    port: '27017',
    database: 'admin',
    user: 'krang',
    pass: '1111qqqqQQ',

    options: {
        poolSize: 10000,
        socketTimeoutMS: 1000000,
        connectTimeoutMS: 600000,
        autoReconnect: true,
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
}