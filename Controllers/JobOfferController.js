const JobOffer = require('../Models/JobOffer');
const HRRepresentative = require('../Models/HrRepresentative');

exports.createJobOffer = async (req, res) => {
    try {
        const { jobOfferData, hrRepId } = req.body;  // Assuming these are passed in the request body
        const jobOffer = new JobOffer(jobOfferData);
        jobOffer.companyId = hrRepId;  // Associate the job offer with the HR representative's company ID
        await jobOffer.save();

        await HRRepresentative.findByIdAndUpdate(hrRepId, { $push: { jobOffers: jobOffer._id } });

        res.status(201).send({ success: { msg: "Job Offer created successfully" }, jobOffer });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getJobOffers = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find().populate('companyId', 'name');
        res.status(200).send({ success: { msg: "Job Offers retrieved successfully" }, jobOffers });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getJobOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const jobOffer = await JobOffer.findById(id).populate('companyId', 'name');
        if (!jobOffer) {
            return res.status(404).send({ errors: [{ msg: "Job Offer not found" }] });
        }
        res.status(200).send({ success: { msg: "Job Offer retrieved successfully" }, jobOffer });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.updateJobOffer = async (req, res) => {
    try {
        const { jobOfferId } = req.params;
        const updatedData = req.body;
        const jobOffer = await JobOffer.findByIdAndUpdate(jobOfferId, updatedData, { new: true });
        if (!jobOffer) {
            return res.status(404).send({ errors: [{ msg: "Job Offer not found" }] });
        }
        res.status(200).send({ success: { msg: "Job Offer updated successfully" }, jobOffer });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.deleteJobOffer = async (req, res) => {
    try {
        const { jobOfferId } = req.params;
        const jobOffer = await JobOffer.findByIdAndDelete(jobOfferId);
        if (!jobOffer) {
            return res.status(404).send({ errors: [{ msg: "Job Offer not found" }] });
        }
        res.status(200).send({ success: { msg: "Job Offer deleted successfully" }, jobOffer });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};
