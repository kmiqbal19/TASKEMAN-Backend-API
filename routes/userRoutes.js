const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

// SIGNUP

router.route("/signup").post(userController.signUp);
module.exports = router;
