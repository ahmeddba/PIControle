const JobSeeker = require('../Models/JobSeeker');
const Company = require('../Models/Company');

exports.followCompany = async (req, res) => {
    try {
        const { jobSeekerId, companyId } = req.body; // Assuming jobSeekerId and companyId are passed in the request body

        await JobSeeker.findByIdAndUpdate(jobSeekerId, { $addToSet: { follows: companyId } });

        const company = await Company.findById(companyId);

        res.status(200).send({ success: { msg: "Company followed successfully" }, company });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.unfollowCompany = async (req, res) => {
    try {
        const { jobSeekerId, companyId } = req.body; // Assuming jobSeekerId and companyId are passed in the request body

        await JobSeeker.findByIdAndUpdate(jobSeekerId, { $pull: { follows: companyId } });

        res.status(200).send({ success: { msg: "Company unfollowed successfully" } });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getFollowedCompanies = async (req, res) => {
    try {
        const { jobSeekerId } = req.params; // Assuming jobSeekerId is passed as a URL parameter

        const jobSeeker = await JobSeeker.findById(jobSeekerId).populate('follows');

        res.status(200).send({ success: { msg: "Followed companies retrieved successfully" }, follows: jobSeeker.follows });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};
