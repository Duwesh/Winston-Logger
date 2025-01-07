import express from "express";
import logger from "../util/logger.js";
const router = express.Router();

// logger.info("This is an info message");
// logger.error("This is an error message");
// logger.warn("This is a warning message");
// logger.debug("This is a debug message");

router.get("/", (req, res) => {
  logger.info("Root endpoint hit");
  res.send(
    `🎊Welcome to ${process.env.APP_NAME}! Your server is up and running!`
  );
});

router.get("/test", (req, res) => {
  logger.warn("test endpoint hit");
  res.send({
    message: "success",
    data: "test",
  });
});

export default router;
