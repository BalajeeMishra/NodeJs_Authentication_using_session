const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrollmentNo: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model("PersonalData", collegeSchema);
