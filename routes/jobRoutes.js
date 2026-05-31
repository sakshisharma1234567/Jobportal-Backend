const express = require("express");

const {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
} = require(
  "../controllers/jobController"
);

const router = express.Router();

// Create Job
router.post("/", createJob);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;