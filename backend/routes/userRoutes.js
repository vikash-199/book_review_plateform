const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:id", getUser);
router.put("/:id", updateUser);

module.exports = router;
