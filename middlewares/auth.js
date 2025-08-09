/**
 * Authentication Middleware
 * -------------------------
 * This file contains middleware functions for admin and user authentication.
 * Middleware in Express has access to:
 *  - req: HTTP request object
 *  - res: HTTP response object
 *  - next: Callback to pass control to the next middleware/route handler
 */

/**
 * Admin Authentication Middleware
 * -------------------------------
 * Verifies if the request is made by an authenticated admin.
 * If authentication fails, sends 401 Unauthorized response.
 */
const authAdmin = (req, res, next) => {
  const token = "xyz"; // Simulated token (In real apps, this will come from headers)
  const isAdmin = token === "xyz"; // Check if token matches admin token

  if (!isAdmin) {
    // Unauthorized access
    return res.status(401).send("Unauthorized access");
  }
  // Allow request to proceed to the next middleware or route
  next();
};

/**
 * User Authentication Middleware
 * ------------------------------
 * Verifies if the request is made by an authenticated user.
 * If authentication fails, sends 401 Unauthorized response.
 */
const userAuth = (req, res, next) => {
  const token = "ac"; // Simulated token (In real apps, this will come from headers)
  const isUser = token === "abc"; // Check if token matches valid user token

  if (!isUser) {
    // Unauthorized access
    return res.status(401).send("Unauthorized access");
  }
  // Allow request to proceed
  next();
};

module.exports = {
  authAdmin,
  userAuth,
};
