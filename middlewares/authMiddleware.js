const asyncHandler = require("express-async-handler");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // Get the token from the request header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401);
    throw new Error("You are not logged in, Please login to get access!");
  }
  // Verify the token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  console.log(decoded);
  // Check if the user still exists
  const currentUser = await User.findById(decoded.id).select("-password");
  console.log(currentUser);
  if (!currentUser) {
    res.status(401);
    throw new Error("User doesn't exists");
  }
  // Check if the user changed password after the token was issued
  if (currentUser.isPasswordChanged(decoded.iat)) {
    res.status(401);
    throw new Error("User recently changed the password. Please login again!");
  }
  // Grant access to protected routes
  req.user = currentUser;
  next();
});

module.exports = protect;
