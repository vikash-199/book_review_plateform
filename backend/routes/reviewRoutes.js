const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getReviews); // Anyone can read reviews
router.post("/", protect, addReview); // Only logged-in users can post

module.exports = router;
