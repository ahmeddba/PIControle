const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer', required: true },
    jobSeekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker', required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

