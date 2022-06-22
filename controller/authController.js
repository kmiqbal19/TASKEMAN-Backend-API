const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");
// @desc Sign up new user
// @route /api/v1/users/signup
// @access public
exports.signUp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // Check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email address!");
  }
  // Create user
  const newUser = await User.create(req.body);
  if (newUser) {
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});
// @desc  Login User
// @route /api/v1/users/login
// @access public

exports.login = asyncHandler(async (req, res, next) => {
  // Check if email and password exists
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password!");
  }
  // Check if the user exists and password matches
  const user = await User.findOne({ email }).select("+password");
  const check = user && (await user.checkPassword(password, user.password));

  if (!user || check === false) {
    res.status(401);
    throw new Error("Incorrect Credentials!");
  }
  // If everything is fine, then send the user data
  res.status(200).json({
    status: "success",
    data: user,
  });
});
