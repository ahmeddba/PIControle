const express = require('express');
const router = express.Router();
const { createInterview, getAllInterviews, getInterviewById, getInterviewsByHrId, updateInterviewStatus, deleteInterview } = require('../Controllers/InterviewController');

router.post('/:idH/:idJ', createInterview);
router.get('/', getAllInterviews);
router.get('/:id', getInterviewById);
router.get('/hr/:idHr', getInterviewsByHrId);
router.put('/:id', updateInterviewStatus);
router.delete('/:id', deleteInterview);

module.exports = router;
