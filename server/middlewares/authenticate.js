// authenticate middleware
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  // Check to see if token was provided
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // verify token with a secret
    const decoded = jwt.verify(token, process.env.JWT);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Unauthorized: Invalid token", error);
  }
};

module.exports = authenticate;
