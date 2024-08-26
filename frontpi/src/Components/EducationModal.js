import { Form, Input, DatePicker, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../JS/Actions/AuthActions';

const EducationModal = ({ open, handleOk, confirmLoading, handleCancel }) => {
    const [education, setEducation] = useState({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: null,
        endDate: null,
    }); // State for the education input

    const dispatch = useDispatch(); // Redux dispatch function
    const user = useSelector(state => state.user); // Get the current user from the Redux state

    // Function to handle the form submission
    const handleUpdate = () => {
        dispatch(updateProfile(user._id, { education }));
        handleOk();
    };

    // Handle input changes
    const handleChange = (e) => {
        setEducation({
            ...education,
            [e.target.name]: e.target.value,
        });
    };

    // Handle date changes
    const handleDateChange = (date, dateString, name) => {
        setEducation({
            ...education,
            [name]: date,
        });
    };

    return (
        <Modal
            title="Add Education"
            open={open}
            onOk={handleUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="education"
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
                    label="Institution"
                    name="institution"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the institution name!',
                        },
                    ]}
                >
                    <Input name="institution" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Degree"
                    name="degree"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your degree!',
                        },
                    ]}
                >
                    <Input name="degree" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Field of Study"
                    name="fieldOfStudy"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your field of study!',
                        },
                    ]}
                >
                    <Input name="fieldOfStudy" onChange={handleChange} />
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
            </Form>
        </Modal>
    );
};

export default EducationModal;
