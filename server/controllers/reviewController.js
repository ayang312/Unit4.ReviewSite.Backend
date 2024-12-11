const prisma = require("../config/prisma");

// create a review
const createReview = async (req, res) => {
  const { text, rating } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        text,
        rating,
        itemId: parseInt(req.params.itemId),
        userId: req.userId,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    console.error("Error in creating review", error);
  }
};

module.exports = { createReview };
