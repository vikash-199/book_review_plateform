const Review = require("../models/Review");

// GET /api/reviews?bookId=<id>
exports.getReviews = async (req, res) => {
  const { bookId } = req.query;

  if (!bookId) {
    return res
      .status(400)
      .json({ message: "bookId query parameter is required" });
  }

  const reviews = await Review.find({ bookId }).populate(
    "userId",
    "name email"
  );
  res.json(reviews);
};

// POST /api/reviews
exports.addReview = async (req, res) => {
  const { bookId, text, rating } = req.body;

  if (!bookId || !text || !rating) {
    return res
      .status(400)
      .json({ message: "bookId, text, and rating are required" });
  }

  const review = new Review({
    userId: req.user._id,
    bookId,
    text,
    rating,
  });

  await review.save();
  res.status(201).json(review);
};
