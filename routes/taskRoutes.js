const express = require("express");
const taskController = require("../controller/taskController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();
// GET TASKS
router.route("/").get(protect, taskController.getTasks);
// CREATE TASKS
router.route("/").post(protect, taskController.createTask);

module.exports = router;
