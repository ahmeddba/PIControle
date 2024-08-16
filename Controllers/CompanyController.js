const Company = require('../Models/Company');

exports.createCompany = async (req, res) => {
    try {
        const companyData = req.body; // Assuming company data is passed in the request body
        const company = new Company(companyData);
        await company.save();

        res.status(201).send({ success: { msg: "Company created successfully" }, company });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params; // Assuming companyId is passed as a URL parameter
        const company = await Company.findById(companyId).populate('hrRepresentatives', 'name email');

        if (!company) {
            return res.status(404).send({ errors: [{ msg: "Company not found" }] });
        }

        res.status(200).send({ success: { msg: "Company retrieved successfully" }, company });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const { companyId } = req.params; // Assuming companyId is passed as a URL parameter
        const updatedData = req.body; // Assuming updated company data is passed in the request body

        const company = await Company.findByIdAndUpdate(companyId, updatedData, { new: true });

        if (!company) {
            return res.status(404).send({ errors: [{ msg: "Company not found" }] });
        }

        res.status(200).send({ success: { msg: "Company updated successfully" }, company });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const { companyId } = req.params; // Assuming companyId is passed as a URL parameter

        const company = await Company.findByIdAndDelete(companyId);

        if (!company) {
            return res.status(404).send({ errors: [{ msg: "Company not found" }] });
        }

        res.status(200).send({ success: { msg: "Company deleted successfully" } });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};
