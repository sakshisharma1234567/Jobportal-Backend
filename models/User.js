const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "recruiter", "admin"],
    default: "student"
  },

  /* Student Fields */

  college: {
    type: String,
    default: ""
  },

  education: {
    type: String,
    default: ""
  },

  skills: {
    type: String,
    default: ""
  },

  github: {
    type: String,
    default: ""
  },

  linkedin: {
    type: String,
    default: ""
  },


applicationsCount: {
  type: Number,
  default: 0
},
  /* Recruiter Fields */

  company: {
    type: String,
    default: ""
  },

  designation: {
    type: String,
    default: ""
  },

  experience: {
    type: String,
    default: ""
  },
  applicantsCount: {
  type: Number,
  default: 0
},

  jobsPosted: {
    type: Number,
    default: 0
  },
  website: {
  type: String,
  default: ""
}
});

module.exports = mongoose.model(
  "User",
  userSchema
);