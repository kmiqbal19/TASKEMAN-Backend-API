const multer = require("multer");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");
const cloudinary = require("../utils/cloudinary");
// @desc Get Tasks
// @routes /api/v1/tasks
// @access private
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});
// @desc Get Task
// @routes /api/v1/task/:id
// @access private
exports.getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

// Create multer for adding image to tasks
const multerStorage = multer.diskStorage({});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images!"), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadTaskImage = upload.single("photo");
exports.resizeUploadedTaskImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `task-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(700, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/tasks/${req.file.filename}`);
  next();
};
// @desc Create Task
// @routes /api/v1/tasks
// @access private
exports.createTask = asyncHandler(async (req, res) => {
  const taskBody = {
    user: req.user.id,
    taskTitle: req.body.title,
    taskDescription: req.body.description,
  };
  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
    taskBody.photo = result.secure_url;
    taskBody.cloudinary_id = result.public_id;
  }
  const task = await Task.create(taskBody);
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});
// @desc Update Task
// @routes /api/v1/tasks/:id
// @access private

exports.updateTask = asyncHandler(async (req, res, next) => {
  // Check if the task is still available
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }
  // Check if the task belongs to the user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User is not authorized!");
  }
  // Update Task

  if (req.file) {
    try {
      await cloudinary.uploader.destroy(task.cloudinary_id);
      const fileCloudinary = await cloudinary.uploader.upload(req.file.path);
      req.body.photo = fileCloudinary.secure_url;
      req.body.cloudinary_id = fileCloudinary.public_id;
    } catch (err) {
      next(err);
    }
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      task: updatedTask,
    },
  });
});

// @desc Delete Task
// @routes /api/v1/tasks/:id
// @access private

exports.deleteTask = asyncHandler(async (req, res) => {
  // Check if the task is still available
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }
  // Check if the task belongs to the user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User is not authorized!");
  }
  // Delete Task
  if (task.cloudinary_id) {
    await cloudinary.uploader.destroy(task.cloudinary_id);
  }
  await task.remove();
  res.status(200).json({
    status: "success",
    deletedTaskId: req.params.id,
    message: "This task has been removed",
  });
});
