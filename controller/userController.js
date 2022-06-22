const User = require("../model/userModel");
// @desc Sign up new user
// @route /api/v1/users/signup
// @access public
exports.signUp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists with this email address!");
    }
    // Create user
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
