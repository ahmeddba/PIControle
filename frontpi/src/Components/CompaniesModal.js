import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../JS/Actions/RecruiterActions';  // Assuming there's an action to update the company

const CompaniesModal = ({ open, handleOk, confirmLoading, handleCancel }) => {

    const [company, setCompany] = useState({
        name: '',
        location: '',
        hrRepresentatives: [],
        jobOffers: []
    }); // State for the company data

    const dispatch = useDispatch(); // Redux dispatch function

    const user = useSelector(state => state.AuthReducer.user); // Get the current user from the Redux state
    
    // Function to handle the form submission
    const handleUpdate = () => {
        dispatch(addCompany(user._id, company));
        handleOk();
    };

    // Handle input changes
    const handleChange = (e) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Modal
            title="Add Company"
            open={open}
            onOk={handleUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="company"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Company Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the company name!',
                        },
                    ]}
                >
                    <Input name="name" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the company location!',
                        },
                    ]}
                >
                    <Input name="location" onChange={handleChange} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CompaniesModal;
