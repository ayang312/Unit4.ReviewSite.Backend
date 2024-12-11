const prisma = require("../config/prisma");

// get item reviews by ID
const getItemReviewById = async (req, res) => {
  const { itemId, reviewId } = req.params;
  try {
    const review = await prisma.review.findFirst({
      where: { id: parseInt(reviewId), itemId: parseInt(itemId) },
      include: {
        user: { select: { id: true, username: true } },
      },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("error in fetching specific review for item", error);
  }
};

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

// fetch reviews by specific user
const getMyReviews = async (req, res) => {
  const userId = req.user.id;

  try {
    // fetch all reviews by the logged-in user
    const reviews = await prisma.review.findMany({
      where: { userId },
      include: {
        item: { select: { id: true, title } },
      },
    });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error in fetching user reviews", error);
  }
};

// Update my review
const updateReview = async (req, res) => {
  const { userId, reviewId } = req.params;
  const { text, rating } = req.body;
  const authUserId = req.user.id; //extracted from the authenticated user

  // check if correct user id of logged in user
  if (parseInt(userId) !== authUserId) {
    return res
      .status(403)
      .json({ message: "You can only update your own reviews" });
  }

  try {
    // check if review exists
    const review = await prisma.review.findFirst({
      where: { id: parseInt(reviewId), userId: authUserId },
    });
    if (!review) {
      return res.status(404).json({ message: "No review found" });
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(reviewId) },
      data: {
        text: text || review.text,
        rating: rating !== undefined ? rating : review.rating,
      },
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error in updating review", error);
  }
};

// Delete a review


module.exports = {
  getItemReviewById,
  createReview,
  getMyReviews,
  updateReview,
};
