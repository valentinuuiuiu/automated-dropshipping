const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

function createEventLogger() {
  return {
    logEvent: (eventType, metadata) => {
      logger.info(`EVENT: ${eventType}`, { metadata });
    },
    logError: (error, context) => {
      logger.error(`ERROR: ${error.message}`, { 
        stack: error.stack,
        context 
      });
    }
  };
}

module.exports = { logger, createEventLogger };
