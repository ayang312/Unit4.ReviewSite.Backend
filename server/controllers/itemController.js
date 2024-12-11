const prisma = require("../config/prisma");

// get all items
const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items", error);
  }
};

// get items by ID
const getItemById = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.itemId },
    });
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error getting specified item", error);
  }
};

// get item reviews
const getItemReviews = async (req, res) => {
  const { itemId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { itemId: parseInt(itemId) },
      include: {
        user: { select: { id: true, username: true } },
      },
    });
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this item" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error("error in fetching item reviews", error);
  }
};

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

module.exports = {
  getItems,
  getItemById,
  getItemReviews,
  getItemReviewById,
};
