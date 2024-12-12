// authenticate middleware
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  // Check to see if token was provided
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // verify token with a secret
    const decoded = jwt.verify(token, JWT);
    // Attach the user information to req.user
    req.user = { id: decoded.userId };
    // if user is authorized, proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Unauthorized: Invalid token", error);
  }
};

module.exports = authenticate;
