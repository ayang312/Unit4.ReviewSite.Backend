const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/reviews", require("./reviews"));
router.use("/comments", require("./comments"));

// Handle requests to /api
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

module.exports = router;
