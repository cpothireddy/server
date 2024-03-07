const winston = require('winston');
winston.level = 'debug';

const logger = new (winston.Logger)({
    transports: [new (winston.transports.Console)({
        timestamp: (new Date()).toLocaleTimeString(),
        level: 'debug',
        colorize: true,
    }),
    new (winston.transports.File)({
        timestamp: (new Date()).toLocaleTimeString(),
        filename: './some_log_file.log',
        colorize: true,
        handleExceptions: true,
    }),
],


});

module.exports = logger;