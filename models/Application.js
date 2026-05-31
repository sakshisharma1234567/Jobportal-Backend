const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  recruiterId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

jobId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Job"
}
,
  name:String,
  email:String,

  college:String,
  education:String,
  skills:String,

  phone:String,
  linkedin:String,
  github:String,

  resume:{
    type:String
  },

  coverLetter:{
    type:String,
    required:true
  },

  status:{
    type:String,
    default:"Applied"
  }

},{
  timestamps:true
});
module.exports = mongoose.model(
  "Application",
  applicationSchema
);