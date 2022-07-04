const asyncHandler = require("express-async-handler");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/userModel");
const cloudinary = require("../utils/cloudinary.js");
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

// Create multer for user image upload

// const multerStorage = multer.memoryStorage();
const multerStorage = multer.diskStorage({});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images can be uploaded"), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.updateUserImage = upload.single("photo");
exports.resizeUploadedUserImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};
exports.updateUserData = asyncHandler(async (req, res) => {
  // Get the user
  const user = req.user;
  // Create an error if there is password

  if (req.body.password || req.body.passwordCofirm) {
    res.status(400);
    throw new Error(
      "This route is not for password updates. Please use /changePassword route"
    );
  }
  // Filter out unwanted fields that are not allowed to be updated

  const filteredData = filterObj(req.body, "email", "name");

  if (req.file) {
    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }
    const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
      folder: "taskeman_users",
      eager: [
        {
          width: 500,
          height: 500,
          gravity: "auto",
          crop: "fill",
        },
      ],
    });
    filteredData.photo = uploadedImg.eager[0].secure_url;
    filteredData.cloudinary_id = uploadedImg.public_id;
  }
  // Update user

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredData, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
// @desc Deactivate User
// @route /api/v1/users/deactivateAccount
// @access private
exports.deactivateAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(200).json({
    status: "success",
    data: null,
    message: "Your account has been deactivated",
  });
});
