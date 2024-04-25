import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 3000;
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
