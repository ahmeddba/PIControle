const mongoose = require('mongoose');
const User = require('./User');

const jobSeekerSchema = new mongoose.Schema({
    skills: [{ type: String }],
    workExperience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobOffer'
    }],
    follows: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }]
}, { timestamps: true });

const JobSeeker = User.discriminator('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;
