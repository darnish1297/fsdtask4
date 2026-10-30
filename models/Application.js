const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true,
    minlength: [3, 'Roll number must be at least 3 characters'],
  },
  internshipId: {
    type: String,
    required: [true, 'Internship selection is required'],
  },
  internshipTitle: {
    type: String,
    required: [true, 'Internship title is required'],
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);
