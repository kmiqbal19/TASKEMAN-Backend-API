const express = require("express");
const taskController = require("../controller/taskController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();
// GET TASKS
router.route("/").get(protect, taskController.getTasks);
// GET TASK
router.route("/:id").get(protect, taskController.getTask);
// CREATE TASKS
router.route("/").post(
  protect,
  taskController.uploadTaskImage,
  // taskController.resizeUploadedTaskImage,
  taskController.createTask
);
// UPDATE TASK
router.patch(
  "/:id",
  protect,
  taskController.uploadTaskImage,
  // taskController.resizeUploadedTaskImage,
  taskController.updateTask
);
// DELETE TASK
router.delete("/:id", protect, taskController.deleteTask);
module.exports = router;
