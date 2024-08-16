const express = require('express');
const { getFollowedCompanies, followCompany, unfollowCompany } = require('../Controllers/FollowController');
const router = express.Router()

router.get('/getFollowers/:jobSeekerId', getFollowedCompanies);
router.put('/followCompany', followCompany);
router.put('/unfollowCompany', unfollowCompany);

module.exports = router;
