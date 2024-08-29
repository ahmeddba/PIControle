import { Form, Input, DatePicker, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../JS/Actions/AuthActions';

const ExperienceModal = ({ open, handleOk, confirmLoading, handleCancel }) => {
    const [workExperience, setWorkExperience] = useState({
        company: '',
        role: '',
        startDate: null,
        endDate: null,
        description: '',
    }); // State for the work experience input

    const dispatch = useDispatch(); // Redux dispatch function
    const user = useSelector(state => state.AuthReducer.user); // Get the current user from the Redux state

    // Function to handle the form submission
    const handleUpdate = () => {
        dispatch(updateProfile(user._id, { workExperience }));
        handleOk();
    };

    // Handle input changes
    const handleChange = (e) => {
        setWorkExperience({
            ...workExperience,
            [e.target.name]: e.target.value,
        });
    };

    // Handle date changes
    const handleDateChange = (date, dateString, name) => {
        setWorkExperience({
            ...workExperience,
            [name]: date,
        });
    };

    return (
        <Modal
            title="Add Work Experience"
            open={open}
            onOk={handleUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="workExperience"
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
                    label="Company"
                    name="company"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the company name!',
                        },
                    ]}
                >
                    <Input name="company" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your role!',
                        },
                    ]}
                >
                    <Input name="role" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Start Date"
                    name="startDate"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the start date!',
                        },
                    ]}
                >
                    <DatePicker
                        onChange={(date, dateString) => handleDateChange(date, dateString, 'startDate')}
                    />
                </Form.Item>

                <Form.Item
                    label="End Date"
                    name="endDate"
                >
                    <DatePicker
                        onChange={(date, dateString) => handleDateChange(date, dateString, 'endDate')}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea name="description" onChange={handleChange} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ExperienceModal;
