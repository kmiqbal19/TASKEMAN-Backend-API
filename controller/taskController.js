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
