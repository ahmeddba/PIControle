const mongoose = require('mongoose');

const jobOfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    location: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' }]
}, { timestamps: true });

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports = JobOffer;
