const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    jobOfferId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer', required: true },
    interviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'HRRepresentative', required: true },
    interviewDate: { type: Date, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    feedback: { type: String },
    candidateEmail: { type: String, required: true },
    subject: { type: String, required: true }
}, { timestamps: true });

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
