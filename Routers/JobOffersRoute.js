const express = require('express');
const { createJobOffer, getJobOffers, updateJobOffer, deleteJobOffer, getJobOffersByHRId } = require('../Controllers/JobOfferController');
const router = express.Router();

router.post('/create/:idCompany/:idHR', createJobOffer);
router.get('/get', getJobOffers);
router.get('/get/:hrId', getJobOffersByHRId);
router.put('/update/:jobOfferId', updateJobOffer);
router.delete('/delete/:jobOfferId', deleteJobOffer);


module.exports = router;
