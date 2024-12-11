const express = require("express");
const router = express.Router();

// Auth routes
router.use("/auth", require("./auth"));

// User Routes
router.use("/users", require("./users"));

// Items Routes
router.use("/items", require("./items"));

// Reviews Routes
router.use("/reviews", require("./reviews"));

// // Comments Routes
// router.use("/comments", require("./comments"));

// Handle requests to /api
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
