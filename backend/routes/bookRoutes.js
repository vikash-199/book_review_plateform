const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  addBook,
} = require("../controllers/bookController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", protect, adminOnly, addBook);

module.exports = router;
