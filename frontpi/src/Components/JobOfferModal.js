import { Form, Input, Modal, Select, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobOffer } from '../JS/Actions/RecruiterActions';
// import { getCompanies } from '../JS/Actions/RecruiterActions'; // Uncomment this if you're fetching companies

const JobOfferModal = ({ open, handleOk, confirmLoading, handleCancel }) => {
    const [jobOffer, setJobOffer] = useState({
        title: '',
        description: '',
        requirements: [],
        location: '',
        companyId: '',
        time: '' // New state for job type
    }); // State for the job offer data
    const [isOkDisabled, setIsOkDisabled] = useState(true); // State to control the disabled state of the OK button

    const dispatch = useDispatch(); // Redux dispatch function

    // Get companies from Redux store
    // const companies = useSelector(state => state.companies); // Assuming companies are loaded in the state
    console.log(jobOffer);

    // Handle input changes
    const handleChange = (e) => {
        setJobOffer({
            ...jobOffer,
            [e.target.name]: e.target.value,
        });
    };

    // Handle select changes
    const handleSelectChange = (value, name) => {
        setJobOffer({
            ...jobOffer,
            [name]: value,
        });
    };
    const user = useSelector(state => state.AuthReducer.user)

    // Function to handle the form submission
    const handleUpdate = () => {
        dispatch(addJobOffer(jobOffer,user._id , user.companyId )); // Dispatch the action to add a new job offer
        handleOk();
    };

    // Handle adding a new requirement
    const handleAddRequirement = () => {
        setJobOffer({
            ...jobOffer,
            requirements: [...jobOffer.requirements, '']
        });
    };

    // Handle requirement change
    const handleRequirementChange = (value, index) => {
        const newRequirements = [...jobOffer.requirements];
        newRequirements[index] = value;
        setJobOffer({
            ...jobOffer,
            requirements: newRequirements
        });
    };

    // Effect to enable/disable the OK button based on form completion
    useEffect(() => {
        const { title, description, requirements, location, time } = jobOffer;
        const isFormValid = title && description && location  && time && requirements.every(req => req);
        setIsOkDisabled(!isFormValid);
    }, [jobOffer]);

    return (
        <Modal
            title="Add/Edit Job Offer"
            open={open}
            onOk={handleUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okButtonProps={{ disabled: isOkDisabled }}
        >
            <Form
                name="jobOffer"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the job title!',
                        },
                    ]}
                >
                    <Input name="title" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the job description!',
                        },
                    ]}
                >
                    <Input.TextArea name="description" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the job location!',
                        },
                    ]}
                >
                    <Input name="location" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Job Type"
                    name="jobType"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the job type!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select Job Type"
                        onChange={(value) => handleSelectChange(value, 'time')}
                    >
                        <Select.Option value="fulltime">Full-time</Select.Option>
                        <Select.Option value="parttime">Part-time</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    label="Requirements"
                    name="requirements"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the job requirements!',
                        },
                    ]}
                >
                    {jobOffer.requirements.map((requirement, index) => (
                        <Input
                            key={index}
                            value={requirement}
                            onChange={(e) => handleRequirementChange(e.target.value, index)}
                            style={{ marginBottom: '8px' }}
                        />
                    ))}
                    <Button type="dashed" onClick={handleAddRequirement}>
                        Add Requirement
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default JobOfferModal;
