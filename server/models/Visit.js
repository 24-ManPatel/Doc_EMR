const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
  patientId: String,
  doctorId: String,
  height: String,
  weight: String,
  pulse: String,
  bp: Number,
  mmHg: Number,
  temperature: String,
  complaints: [{
    complaintName: String,
    frequency: String,
    severity: String,
    duration: String,
    date: String
  }],
  diagnosis: [{
    diagnosisName: String,
    duration: String,
    date: String
  }],
  medicine: [{
    medicineName: String,
    dose: String,
    when: String,
    frequency: String,
    duration: String,
    notes: String
  }],
  tests: [String],
  createdAt: { type: Date, default: Date.now }  
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
