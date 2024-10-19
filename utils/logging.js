const winston = require("winston");
const { getCurrentTraceId } = require("./tracing");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, traceId }) => {
      return `${timestamp} [${level.toUpperCase()}] [Trace ID: ${
        traceId || "N/A"
      }]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

const logWithTraceId = (level, message) => {
  const traceId = getCurrentTraceId();
  logger.log({ level, message, traceId });
};

const warn = (message) => {
  logWithTraceId("warn", message);
};

const info = (message) => {
  logWithTraceId("info", message);
};

const error = (message) => {
  logWithTraceId("error", message);
};

module.exports = { info, warn, error };
