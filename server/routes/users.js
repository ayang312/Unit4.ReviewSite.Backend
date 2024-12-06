const express = require("express");
const router = express.Router();

// Route to get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next("failed to fetch users", error);
  }
});


module.exports = router;
