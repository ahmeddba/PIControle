const Application = require('../Models/Application');
const JobOffer = require('../Models/JobOffer');

exports.applyToJob = async (req, res) => {
    try {
        const { jobId, jobSeekerId } = req.body; // Assuming these are passed in the request body
        const application = new Application({ jobId, jobSeekerId });
        await application.save();

        await JobOffer.findByIdAndUpdate(jobId, { $push: { applicants: jobSeekerId } });

        res.status(201).send({ success: { msg: "Application submitted successfully" }, application });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getApplicationsByJobSeeker = async (req, res) => {
    try {
        const { jobSeekerId } = req.params; // Assuming jobSeekerId is passed as a URL parameter
        const applications = await Application.find({ jobSeekerId }).populate('jobId', 'title companyId');

        res.status(200).send({ success: { msg: "Applications retrieved successfully" }, applications });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getApplicationsByJob = async (req, res) => {
    try {
        const { jobId } = req.params; // Assuming jobId is passed as a URL parameter
        const applications = await Application.find({ jobId }).populate('jobSeekerId', 'name email');

        res.status(200).send({ success: { msg: "Applications retrieved successfully" }, applications });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params; // Assuming applicationId is passed as a URL parameter
        const { status } = req.body; // Assuming status is passed in the request body
        const application = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });

        if (!application) {
            return res.status(404).send({ errors: [{ msg: "Application not found" }] });
        }

        res.status(200).send({ success: { msg: "Application status updated successfully" }, application });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};
