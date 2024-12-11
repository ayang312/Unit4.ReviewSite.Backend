const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const { updateReview } = require("../controllers/reviewController");
const { updateComment } = require('../controllers/commentController');

// Route to get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next("failed to fetch users", error);
  }
});

// Route to update review
router.put("/:userId/reviews/:reviewId", authenticate, authorize, updateReview);

// Route to update comment
router.put('/:userId/comments/:commentId', authenticate, authorize, updateComment);

module.exports = router;
