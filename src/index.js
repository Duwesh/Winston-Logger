import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import logger from "./util/logger.js"; // Need to include .js extension in last
import router from "./routes/index.js";

dotenv.config();

const app = express();

// Use port from environment variable or default to 3000
const port = process.env.APP_PORT || 3000;

// Morgan format
const morganFormat = ":method :url :status :response-time ms";

// Log file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log file path
const logFilePath = path.join(__dirname, "app.log");

// Check if app.log file exists, create it if it doesn't
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "", { flag: "wx" });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
app.use("/", router); // Send all request to route folder

app.listen(port, () => {
  console.log(`Server is up and running on ${process.env.APP_URL}:${port}`);
});
