/**
 * Application Entry Point
 * -----------------------
 * This file sets up the Express.js server, defines routes, 
 * and applies authentication middleware for admin and user routes.
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
 * This ensures that only admin-authenticated requests can access these routes.
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
 * Start Server
 * =========================
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
