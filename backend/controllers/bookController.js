const Book = require("../models/Book");
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};
exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};
