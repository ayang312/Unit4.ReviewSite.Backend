const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const { getMyComments } = require("../controllers/commentController");

router.get('/me', authenticate, getMyComments);


module.exports = router;