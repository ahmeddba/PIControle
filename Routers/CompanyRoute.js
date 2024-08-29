const express = require('express');
const { getCompanyById, createCompany, updateCompany, deleteCompany , getCompanies } = require('../Controllers/CompanyController');
const router = express.Router()


router.get('/getCompany/:companyId', getCompanyById);
router.post('/createCompany/:id', createCompany);
router.put('/updateCompany/:companyId', updateCompany);
router.delete('/deleteCompany/:companyId', deleteCompany);
router.get('/getCompanies', getCompanies);


module.exports = router;
