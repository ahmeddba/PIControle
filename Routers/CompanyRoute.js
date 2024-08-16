const express = require('express');
const { getCompanyById, createCompany, updateCompany, deleteCompany } = require('../Controllers/CompanyController');
const router = express.Router()


router.get('/getCompany/:companyId', getCompanyById);
router.post('/createCompany', createCompany);
router.put('/updateCompany/:companyId', updateCompany);
router.delete('/deleteCompany/:companyId', deleteCompany);


module.exports = router;
