import { Form, Input, DatePicker, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
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

    const [isFormValid, setIsFormValid] = useState(false); // State to manage form validity

    const dispatch = useDispatch(); // Redux dispatch function
    const user = useSelector(state => state.AuthReducer.user); // Get the current user from the Redux state

    // Function to handle the form submission
    const handleUpdate = () => {
        dispatch(updateProfile(user._id, { education }));
        handleOk();
    };

    // Handle input changes
    const handleChange = (e) => {
        const updatedEducation = {
            ...education,
            [e.target.name]: e.target.value,
        };
        setEducation(updatedEducation);
        checkFormValidity(updatedEducation); // Check validity after input change
    };

    // Handle date changes
    const handleDateChange = (date, dateString, name) => {
        const updatedEducation = {
            ...education,
            [name]: date,
        };
        setEducation(updatedEducation);
        checkFormValidity(updatedEducation); // Check validity after date change
    };

    // Function to check the validity of the form
    const checkFormValidity = (data) => {
        const isValid = data.institution && data.degree && data.fieldOfStudy && data.startDate;
        setIsFormValid(isValid);
    };

    useEffect(() => {
        checkFormValidity(education);
    }, [education]);

    return (
        <Modal
            title="Add Education"
            open={open}
            onOk={handleUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okButtonProps={{ disabled: !isFormValid }} // Disable the Ok button if the form is not valid
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
