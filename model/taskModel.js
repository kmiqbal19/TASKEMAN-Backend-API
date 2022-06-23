const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Must provide user id for each task"],
      ref: "User",
    },
    taskTitle: {
      type: String,
      required: [true, "Please add task title!"],
    },
    taskDescription: String,
    photo: {
      type: String,
      default: "default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
