const express = require("express");
const router = express.Router();

const { registerUser, login } = require("../controllers/authController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", login);

module.exports = router;
