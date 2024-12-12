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
    res.status(201).json(comment);
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

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this user" });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in fetching user comments", error);
  }
};

// update comment
const updateComment = async (req, res) => {
  const { userId, commentId } = req.params;
  const { text } = req.body;
  const authUserId = req.user.id; //authenticated user id

  if (parseInt(userId) !== authUserId) {
    return res.status(403).json({
      message: "Unauthorized user: You can only update your own comments",
    });
  }

  try {
    // fetch user comments
    const comment = await prisma.comment.findFirst({
      where: { id: parseInt(commentId), userId: authUserId },
    });
    if (!comment) {
      return res.status(404).json({ message: "no comments found" });
    }

    // update the comment
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(commentId) },
      data: { text: text || comment.text },
    });
    res
      .status(200)
      .json(updatedComment);
  } catch (error) {
    console.error("Error in updating comment", error);
  }
};

// delete my comment
const deleteComment = async (req, res) => {
  const { userId, commentId } = req.params;
  const authUserId = req.user.id; //extracted from logged in user

  if (parseInt(userId) !== authUserId) {
    return res
      .status(403)
      .json({ message: "Unauthorized: You can only delete your own comments" });
  }

  try {
    const comment = await prisma.comment.findFirst({
      where: { id: parseInt(commentId), userId: authUserId },
    });
    if (!comment) {
      return res.status(404).json({ message: "No comments found" });
    }

    await prisma.comment.delete({ where: { id: parseInt(commentId) } });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleting comment", error);
  }
};

module.exports = { createComment, getMyComments, updateComment, deleteComment };
