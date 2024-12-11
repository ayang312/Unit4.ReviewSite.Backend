const authorize = (req, res, next) => {
  const { userId } = req.params;
  const authUserId = req.user.id;

  // Check if the authenticated user matches the userId in the request
  if (parseInt(userId) !== authUserId) {
    return res.status(403).json({
      message: "Unauthorized user: You are not authorized to proceed",
    });
  }
  // if user is authorized, proceed to next middleware or route handler
  next();
};

module.exports = authorize;
