import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    colorize(),
    json()
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), consoleLogFormat),
    }),
    new transports.File({
      filename: "src/app.log",
      format: combine(timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), json()),
    }),
  ],
});

export default logger;
