const asyncHandler = require("express-async-handler");
const Task = require("../model/taskModel");
// @desc Get Tasks
// @routes /api/v1/tasks
// @access private
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});
// @desc Create Task
// @routes /api/v1/tasks
// @access private
exports.createTask = asyncHandler(async (req, res) => {
  const taskBody = {
    user: req.user.id,
    taskTitle: req.body.title,
    taskDescription: req.body.description,
  };
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

exports.updateTask = asyncHandler(async (req, res) => {
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
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedTask,
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
  await task.remove();
  res.status(200).json({
    status: "success",
    message: "This task has been removed",
  });
});
