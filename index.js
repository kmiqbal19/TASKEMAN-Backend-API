// Import Modules
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ConnectDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Import Routers
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

// Setting Colors Theme
colors.setTheme({
  error: colors.bgRed,
  warn: colors.yellow,
});
// APP
const app = express();
// .ENV CONFIG
dotenv.config();
// CORS
app.use(cors());
// APP STATIC FILE PATH CONFIG
app.use(express.static(path.join(__dirname, "public/img")));
// CONNECT TO DB
ConnectDB();
// BODY PARSER AND URL ENCODED PARSER
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
// USE MORGAN IN DEVELOPMENT MODE ONLY
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// REST API
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
// BASIC APP GET MIDDELWARE FOR ('/')
app.get("/", (req, res, next) => {
  res.send("Backend is running!");
});
// USE GLOBAL ERROR HANDLER
app.use(errorMiddleware);
// CREATE SERVER AND LISTEN TO SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port: ${port}`.bgGreen.underline);
});
