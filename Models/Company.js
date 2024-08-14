const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    hrRepresentatives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HRRepresentative' }],
    jobOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer' }]
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
