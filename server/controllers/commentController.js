const prisma = require("../config/prisma");

// create a comment
const createComment = async (req, res) => {
  const { itemId, reviewId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  try {
    // check if item exists
    const item = await prisma.item.findUnique({
      where: {
        id: parseInt(itemId),
      },
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if review exists
    const review = await prisma.review.findFirst({
      where: { id: parseInt(reviewId), itemId: parseInt(itemId) },
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        reviewId: parseInt(reviewId),
      },
      include: {
        user: { select: { id: true, username: true } },
      },
    });
    res.status(201).json({ message: "Comment created successfully" }, comment);
  } catch (error) {
    console.error("Error in creating comment", error);
  }
};


// get comments by logged-in user
const getMyComments = async (req, res) => {
  const userId = req.user.id; // extracted from the authenticated user

  try {
    // fetch all comments by the logged-in user
    const comments = await prisma.comment.findMany({
      where: { userId },
      include: {
        review: { select: { id: true, text: true } },
      },
    });
    
    if(comments.length === 0) {
      return res.status(404).json({message: 'No comments found for this user'});
    };

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in fetching user comments", error);
  }
};

module.exports = { createComment, getMyComments };
