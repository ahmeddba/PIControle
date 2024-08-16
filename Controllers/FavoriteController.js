const JobSeeker = require('../Models/JobSeeker');
const JobOffer = require('../Models/JobOffer');

exports.addFavorite = async (req, res) => {
    try {
        const { jobSeekerId, jobOfferId } = req.body; // Assuming jobSeekerId and jobOfferId are passed in the request body

        await JobSeeker.findByIdAndUpdate(jobSeekerId, { $addToSet: { favorites: jobOfferId } });

        const jobOffer = await JobOffer.findById(jobOfferId);

        res.status(200).send({ success: { msg: "Job offer added to favorites" }, jobOffer });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { jobSeekerId, jobOfferId } = req.body; // Assuming jobSeekerId and jobOfferId are passed in the request body

        await JobSeeker.findByIdAndUpdate(jobSeekerId, { $pull: { favorites: jobOfferId } });

        res.status(200).send({ success: { msg: "Job offer removed from favorites" } });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const { jobSeekerId } = req.params; // Assuming jobSeekerId is passed as a URL parameter

        const jobSeeker = await JobSeeker.findById(jobSeekerId).populate('favorites');

        res.status(200).send({ success: { msg: "Favorite job offers retrieved successfully" }, favorites: jobSeeker.favorites });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};
