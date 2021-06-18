const { createLogger, format, transports } = require('winston');



function devLogger(){   

    const logFormat = format.printf(({level, message, timestamp}) => {
        return `${timestamp} ${level}: ${message}`
    })

return createLogger({
    format: format.combine(format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}), logFormat),
    transports: [new transports.Console()],

});

}

module.exports = devLogger