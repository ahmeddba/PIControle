const mongoose = require('mongoose');
const User = require('./User');

const hrRepresentativeSchema = new mongoose.Schema(
    {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' , default: null},
    jobOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer'}]
    },
    {
    timestamps: true
    }
);

const HRRepresentative = User.discriminator('HRRepresentative', hrRepresentativeSchema);

module.exports = HRRepresentative;
