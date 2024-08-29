const { sendEmail } = require('../Middlewares/mailer');
const Interview = require('../Models/Interview');

// Create an Interview
exports.createInterview = async (req, res) => {
    try {
        const {idH , idJ} = req.params;
        const newInterview = new Interview(req.body);
        newInterview.interviewerId = idH;
        newInterview.jobOfferId = idJ;
        const savedInterview = await newInterview.save();
        await sendEmail(savedInterview.candidateEmail , savedInterview.subject , "Emchi brassomek 3andna interview ");
        console.log("mail sent")
        res.status(201).send({ success: { msg: "Interview created successfully", interview: savedInterview } });
    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] });
    }
};

// Get all Interviews
exports.getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find().populate('jobOfferId').populate('interviewerId');
        res.status(200).send({ success: { interviews } });
    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] });
    }
};

// Get Interview by ID
exports.getInterviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const interview = await Interview.findById(id).populate('jobOfferId').populate('interviewerId');
        if (!interview) {
            return res.status(404).send({ errors: [{ msg: "Interview not found" }] });
        }
        res.status(200).send({ success: { interview } });
    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] });
    }
};

// Get Interviews by HR Representative ID
exports.getInterviewsByHrId = async (req, res) => {
    try {
        const { idHr } = req.params;
        const interviews = await Interview.find({ interviewerId: idHr }).populate('jobOfferId').populate('interviewerId');
        res.status(200).send({ success: { interviews } });
    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] });
    }
};

// Update Interview Status
exports.updateInterviewStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedInterview = await Interview.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );

        if (!updatedInterview) {
            return res.status(404).send({ errors: [{ msg: "Interview not found" }] });
        }

        res.status(200).send({ success: { msg: "Interview status updated successfully", interview: updatedInterview } });
    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] });
    }
};

// Delete an Interview
exports.deleteInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInterview = await Interview.findByIdAndDelete(id);
        if (!deletedInterview) {
            return res.status(404).send({ errors: [{ msg: "Interview not found" }] });
        }
        res.status(200).send({ success: { msg: "Interview deleted successfully" } });
    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] });
    }
};
