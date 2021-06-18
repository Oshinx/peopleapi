const { createLogger, format, transports } = require('winston');



function prodLogger(){   

return createLogger({

    format: format.combine(
        format.timestamp(),
        format.errors({stack: true}),
        
        format.json()
        ),
    defaultMeta : {service: "people"},
    transports: [
        new transports.Console(),
        new transports.File({
            filename:`logs/server.log`,
            level:'silly',
        })
        ],
        
  /*   format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}), */
});

}

module.exports = prodLogger