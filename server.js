const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});