// logger.js
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

// 🔧 Define the log directory path — outside 'src'
const logDir = path.join(__dirname, '..', 'logs');

// 📁 Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 🗓️ Helper function to get current date in YYYY-MM-DD format
function getCurrentDateString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// 📄 File names with date suffix
const dateStr = getCurrentDateString();
const errorLogFile = path.join(logDir, `error-${dateStr}.log`);
const combinedLogFile = path.join(logDir, `combined-${dateStr}.log`);

// 📝 Define the logger configuration
const logger = createLogger({
  level: 'info', // Set the minimum log level (e.g., info, warn, error)
  format: format.combine(
    format.timestamp(),                // Add timestamp to each log
    format.errors({ stack: true }),   // Include stack trace if available
    format.printf(({ timestamp, level, message, stack }) => {
      // Custom log message format
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    // 💥 Error log file (only logs with level "error")
    new transports.File({ filename: errorLogFile, level: 'error' }),

    // 📦 Combined log file (all logs from "info" and above)
    new transports.File({ filename: combinedLogFile })
  ]
});

// 👨‍💻 Log to console if not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple() // Simpler format for console output
    })
  );
}

// 🚀 Export the logger so it can be used across the app
module.exports = logger;
