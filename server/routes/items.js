const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const {
  getItems,
  getItemById,
  getItemReviews,
  getItemReviewById,
  createReview,
  createComment,
} = require("../controllers/itemController");

router.get("/", getItems);
router.get("/:itemId", getItemById);
router.get("/:itemId/reviews", getItemReviews);
router.get("/:itemId/reviews/:reviewId", getItemReviewById);
router.post("/:itemId/reviews", authenticate, createReview);
router.post("/:itemId/reviews/:reviewId/comments", authenticate, createComment);

module.exports = router;
