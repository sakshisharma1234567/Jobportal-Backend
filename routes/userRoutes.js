const express = require("express");

const router = express.Router();

const {
  updateProfile,
  getUserById
} = require("../controllers/userController");

router.get("/:id", getUserById);

router.put("/:id", updateProfile);

module.exports = router;