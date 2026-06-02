
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.applyJob = async (req, res) => {
  try {

    const job = await Job.findById(
      req.body.jobId
    );

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
      });
    }

// const resumeUrl = req.file
//   ? req.file.path
//   : req.body.resume;
console.log("FILE DATA:", req.file);

const resumeUrl = req.file
  ? req.file.path
  : req.body.resume;

console.log("RESUME URL:", resumeUrl);

    const application = await Application.create({

      studentId: req.body.studentId,
      recruiterId: job.recruiterId,
      jobId: job._id,

      name: req.body.name,
      email: req.body.email,

      college: req.body.college,
      education: req.body.education,
      skills: req.body.skills,

      phone: req.body.phone,
      linkedin: req.body.linkedin,
      github: req.body.github,

      resume: resumeUrl,
      coverLetter: req.body.coverLetter

    });
    //  Recruiter notification
    await Notification.create({

      userId: job.recruiterId,

      message:
        `${req.body.name} applied for ${job.title}`

    });

    // Student applications count update
    await User.findByIdAndUpdate(
      req.body.studentId,
      {
        $inc: {
          applicationsCount: 1
        }
      },
      { returnDocument: "after" }
    );

    // Recruiter applicants count update
    if (job.recruiterId) {

      await User.findByIdAndUpdate(
        job.recruiterId,
        {
          $inc: {
            applicantsCount: 1
          }
        },
        { returnDocument: "after" }
      );

    }

    res.status(201).json(application);

  } catch (error) {

    console.log("APPLICATION ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

// Student Applications
exports.getStudentApplications = async (req, res) => {

  try {

    const applications =
      await Application.find({
        studentId: req.params.id
      }).populate("jobId");

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Recruiter Applications
exports.getRecruiterApplications = async (req, res) => {

  try {

    const applications =
      await Application.find({
        recruiterId: req.params.id
      }).populate("jobId");

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};