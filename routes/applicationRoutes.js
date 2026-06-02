
const express = require("express");
const multer = require("multer");

const cloudinary =
require("../config/cloudinary");

const {
  CloudinaryStorage
} = require(
  "multer-storage-cloudinary"
);

const {
  applyJob,
  getStudentApplications,
  getRecruiterApplications
} = require(
  "../controllers/applicationController"
);

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "resumes",
    resource_type: "raw",
    format: "pdf",
    public_id:
      Date.now() + "-" +
      file.originalname.replace(".pdf", "")
  })
});

const upload =
multer({ storage });

const router =
express.Router();

// Apply Job

router.post(
  "/",
  upload.single("resume"),
  applyJob
);

// Student Applications

router.get(
  "/student/:id",
  getStudentApplications
);

// Recruiter Applications

router.get(
  "/recruiter/:id",
  getRecruiterApplications
);

// Test Route

router.get(
  "/test",
  (req, res) => {

    res.send(
      "Applications Route Working"
    );

  }
);

module.exports = router;
