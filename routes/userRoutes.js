const express = require("express");
const authController = require("../controller/authController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// SIGNUP

router.route("/signup").post(authController.signUp);
// LOGIN
router.post("/login", authController.logIn);
module.exports = router;

// CHANGE PASSWORD
router.route("/changePassword").patch(protect, authController.changePassword);
