const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

// SIGNUP

router.route("/signup").post(authController.signUp);
// LOGIN
router.post("/login", authController.login);
module.exports = router;
