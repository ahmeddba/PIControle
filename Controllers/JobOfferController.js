const JobOffer = require('../Models/JobOffer');
const HRRepresentative = require('../Models/HrRepresentative');

exports.createJobOffer = async (req, res) => {
    try {
        const { idCompany , idHR} = req.params;
        const jobOffer = new JobOffer(req.body);
        jobOffer.companyId = idCompany;
        jobOffer.HRrepresentative = idHR; // Associate the job offer with the HR representative's company ID
        await jobOffer.save();

       const newHR = await HRRepresentative.findByIdAndUpdate(idHR, { $push: { jobOffers: jobOffer._id }}, {new:true});

        res.status(201).send({ success: { msg: "Job Offer created successfully",jobOffer , newHR } });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getJobOffers = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find().populate('companyId', 'name');
        res.status(200).send({ success: { msg: "Job Offers retrieved successfully"  , jobOffers}  });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getJobOffersByHRId = async (req, res) => {
    try {
        const { hrId } = req.params; // Assuming HR representative ID is passed as a parameter
        const jobOffers = await JobOffer.find({ HRrepresentative: hrId });
        if (!jobOffers.length) {
            return res.status(404).send({ errors: [{ msg: "No Job Offers found for this HR representative" }] });
        }
        res.status(200).send({ success: { msg: "Job Offers retrieved successfully" , jobOffers} });
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
