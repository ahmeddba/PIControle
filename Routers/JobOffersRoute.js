const express = require('express');
const { createJobOffer, getJobOffers, getJobOfferById, updateJobOffer, deleteJobOffer } = require('../Controllers/JobOfferController');
const router = express.Router();

router.post('/create', createJobOffer);
router.get('/get', getJobOffers);
router.get('/get/:id', getJobOfferById);
router.put('/update/:jobOfferId', updateJobOffer);
router.delete('/delete/:jobOfferId', deleteJobOffer);


module.exports = router;
