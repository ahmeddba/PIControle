const Company = require('../Models/Company');
const HRRepresentative = require('../Models/HrRepresentative');

exports.createCompany = async (req, res) => {
    try {
        const companyData = req.body;
        const {id} = req.params // Assuming company data is passed in the request body
        const recruiter = await HRRepresentative.findById(id);
        if(!recruiter)
        {
            return res.status(404).send({ errors: [{ msg: "HRRepresentative not found" }] });
        }
        companyData.hrRepresentatives = [recruiter]
        const company = new Company(companyData);
        await company.save();

        recruiter.companyId = company._id;
        recruiter.title = "CTO of " + company.name;
        await recruiter.save();

        res.status(201).send({ success: { msg: "Company created successfully" , company  }});
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params; // Assuming companyId is passed as a URL parameter
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).send({ errors: [{ msg: "Company not found" }] });
        }

        res.status(200).send({ success: { msg: "Company retrieved successfully" , company } });
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

exports.getCompanies = async (req, res) => {
    try {
        // Fetch all companies from the database
        const companies = await Company.find();

        // If no companies are found, send a 404 response
        if (!companies) {
            return res.status(404).send({ errors: [{ msg: "No companies found" }] });
        }

        // Send the list of companies as a response
        res.status(200).send({ success: { msg: "Companies retrieved successfully", companies } });
    } catch (error) {
        // Handle any errors that occur during the database operation
        res.status(500).send({ errors: [{ msg: error.message }] });
    }
}
