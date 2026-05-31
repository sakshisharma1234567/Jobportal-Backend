const Job = require("../models/Job");
const User = require("../models/User");
const Notification =require("../models/Notification");



// Create Job
exports.createJob = async (req, res) => {
  try {

    const job = await Job.create({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      type: req.body.type,
      description: req.body.description,
      recruiterId: req.body.recruiterId
    });

    if (req.body.recruiterId) {

      await User.findByIdAndUpdate(
        req.body.recruiterId,
        {
          $inc: {
            jobsPosted: 1
          }
        }
      );

    }

    // Notification for all students

    const students = await User.find({
      role: "student"
    });

    for (const student of students) {

      await Notification.create({

        userId: student._id,

        message:
          `New ${job.title} job posted by ${job.company}`

      });

    }

    res.status(201).json({
      success: true,
      job
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {

  try {

    const { search, location, type } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i"
      };
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i"
      };
    }

    if (type) {
      query.type = {
        $regex: type,
        $options: "i"
      };
    }

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get Single Job
exports.getJobById = async (req, res) => {

  try {

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {

      return res.status(404).json({
        message: "Job Not Found"
      });

    }

    res.status(200).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Delete Job
exports.deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {

      return res.status(404).json({
        message: "Job Not Found"
      });

    }

    if (job.recruiterId) {

      await User.findByIdAndUpdate(
        job.recruiterId,
        {
          $inc: {
            jobsPosted: -1
          }
        }
      );

    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Job Deleted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};