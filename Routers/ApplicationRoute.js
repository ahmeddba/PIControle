const express = require('express');
const { applyToJob, getApplicationsByJobSeeker, getApplicationsByJob, updateApplicationStatus } = require('../Controllers/ApplicationController');
const router = express.Router();

router.post('/apply' , applyToJob);
router.get('/jobseeker/:jobSeekerId', getApplicationsByJobSeeker);
router.get('/job/:jobId', getApplicationsByJob);
router.put('/:applicationId', updateApplicationStatus);

module.exports = router;
