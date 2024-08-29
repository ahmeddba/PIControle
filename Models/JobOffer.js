const mongoose = require('mongoose');

const jobOfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    location: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    HRrepresentative: { type: mongoose.Schema.Types.ObjectId, ref: 'HRRepresentative', required: true },
    time: { type: String, required: true, enum: ['fulltime', 'parttime'] }, // Add HRrepresentative attribute
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' }]
}, { timestamps: true });

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports = JobOffer;
