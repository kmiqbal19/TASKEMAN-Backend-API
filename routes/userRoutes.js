const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// SIGNUP

router.route("/signup").post(authController.signUp);
// LOGIN
router.post("/login", authController.logIn);
module.exports = router;

// CHANGE PASSWORD
router.route("/changePassword").patch(protect, authController.changePassword);

// GET USERS
router.get("/", userController.getUsers);

// GET CURRENT USER
router.get("/:id", userController.getCurrentUser);

// UPDATE CURRENT USER DATA
router.route("/updateUserData").put(
  protect,
  userController.updateUserImage,
  // userController.resizeUploadedUserImage,
  userController.updateUserData
);
// DEACTIVATE ACCOUNT
router.patch("/deactivateAccount", protect, userController.deactivateAccount);
