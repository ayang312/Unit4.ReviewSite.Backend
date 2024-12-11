const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const { getMyReviews } = require("../controllers/reviewController");

router.get("/me", authenticate, getMyReviews);

module.exports = router;
