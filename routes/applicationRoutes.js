// const express = require("express");
// const fs = require("fs");
// const multer = require("multer");

// const {
//   applyJob,
//   getStudentApplications,
//   getRecruiterApplications
// } = require(
//   "../controllers/applicationController"
// );

// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now();
//     const safeName = `${timestamp}-${file.originalname}`.replace(/\s+/g, "-");
//     cb(null, safeName);
//   }
// });

// const upload = multer({ storage });

// const router = express.Router();

// // Apply Job

// router.post(
//   "/",
//   upload.single("resume"),
//   applyJob
// );

// // Student Applications

// router.get(
//   "/student/:id",
//   getStudentApplications
// );

// // Recruiter Applications

// router.get(
//   "/recruiter/:id",
//   getRecruiterApplications
// );

// // Test Route

// router.get(
//   "/test",
//   (req, res) => {

//     res.send(
//       "Applications Route Working"
//     );

//   }
// );

// module.exports = router;

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

const storage =
new CloudinaryStorage({

  cloudinary,

  params: {
    folder: "resumes",
    resource_type: "raw"
  }

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