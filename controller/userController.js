const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
// Filter unwanted items
const filterObj = (obj, ...allowedItems) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedItems.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// Get Users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
// Get Current User
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
// @desc Update User
// @route /api/v1/users/updateMe
// @access private
exports.updateUserData = asyncHandler(async (req, res) => {
  // Create an error if there is password
  if (req.body.password || req.body.passwordCofirm) {
    res.status(400);
    throw new Error(
      "This route is not for password updates. Please use /changePassword route"
    );
  }
  // Filter out unwanted fields that are not allowed to be updated

  const filteredData = filterObj(req.body, "email", "name", "photo");

  // Update user

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredData, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
// @desc Deactivate User
// @route /api/v1/users/deactivateAccount
// @access private
exports.deactivateAccount = asyncHandler(async (req, res) => {
  const deactivatedUser = await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(200).json({
    status: "success",
    data: null,
    message: "Your account has been deactivated",
  });
});
