/**
 * Application Entry Point
 * -----------------------
 * This file sets up the Express.js server, configures routes,
 * applies authentication middleware for admin and user sections,
 * and includes global error handling for 404 and 500 errors.
 */

const express = require("express");
const logger = require("./logger"); // Winston logger for logging activities
const { authAdmin, userAuth } = require("../middlewares/auth"); // Import authentication middlewares

const app = express();
const PORT = process.env.PORT || 7777; // Use environment port or default to 7777

/**
 * =========================
 * Middleware Configuration
 * =========================
 * Apply 'authAdmin' middleware to all routes starting with "/admin".
 * This ensures only admin-authenticated requests can access these routes.
 */
app.use("/admin", authAdmin);

/**
 * =========================
 * Admin Routes
 * =========================
 */

// GET - Fetch all users (Admin only)
app.get("/admin/getAllUsers", (req, res) => {
  res.send("All users fetched successfully");
  logger.info("Fetched all users successfully");
});

// DELETE - Delete a specific user (Admin only)
app.delete("/admin/deleteUser", (req, res) => {
  res.send("User deleted successfully");
  logger.info("User deleted successfully");
});

/**
 * =========================
 * User Routes
 * =========================
 */

// GET - Public Login Page (No authentication required)
app.get("/user/login", (req, res) => {
  res.send("Welcome to Login page");
  logger.info("Welcome to Login page");
});

// GET - Access user-specific endpoint (Requires user authentication)
app.get("/user", userAuth, (req, res) => {
  res.send("User endpoint accessed");
  logger.info("User endpoint accessed");
});

/**
 * =========================
 * Testing 500 Error Handling
 * =========================
 * This route intentionally triggers an error to test the global
 * error handler (500 Internal Server Error).
 */
app.get("/test500", (req, res, next) => {
  next(new Error("Testing the global error handler"));
});

/**
 * =========================
 * 404 Handler (Route Not Found)
 * =========================
 * This middleware is placed AFTER all routes so it only runs
 * if no other route matches the request.
 * It handles "Not Found" cases with a JSON response.
 */
app.use((req, res, next) => {
  res.status(404).send({
    error: "Route not found",
    status: 404
  });
  logger.warn(`404 - Page not found: ${req.originalUrl}`);
});

/**
 * =========================
 * Global Error Handling (500)
 * =========================
 * Error-handling middleware in Express must have 4 parameters: (err, req, res, next)
 * This must be placed LAST so it catches any errors from routes/middleware.
 */
app.use("/", (err, req, res, next) => {
  if (err) {
    logger.error("An error occurred: ", err);
    res.status(500).send({
      error: "Internal Server Error",
      status: 500
    });
  }
});

/**
 * =========================
 * Start Server
 * =========================
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
