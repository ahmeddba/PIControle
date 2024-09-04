import { Form, Input, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../JS/Actions/AuthActions';

const SkillsModal = ({ open, handleOk, confirmLoading, handleCancel }) => {
    const [skill, setSkill] = useState(''); // State for the skill input
    const [isFormValid, setIsFormValid] = useState(false); // State to manage form validity
    const dispatch = useDispatch(); // Redux dispatch function
    const user = useSelector(state => state.AuthReducer.user); // Get the current user from the Redux state

    // Function to handle adding a skill
    const handleUpdate = () => {
        dispatch(updateProfile(user._id, { skill }));
        handleOk();
    };

    // Handle input changes
    const handleChange = (e) => {
        setSkill(e.target.value);
        checkFormValidity(e.target.value); // Check validity after input change
    };

    // Function to check the validity of the form
    const checkFormValidity = (value) => {
        setIsFormValid(value.trim() !== ''); // Ensure the skill is not an empty string
    };

    useEffect(() => {
        checkFormValidity(skill); // Check validity on initial render and whenever skill changes
    }, [skill]);

    return (
        <Modal
            title="Add New Skill"
            open={open}
            onOk={handleUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okButtonProps={{ disabled: !isFormValid }} // Disable the Ok button if the form is not valid
        >
            <Form
                name="basic"
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
                    label="Skill"
                    name="skill"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new skill!',
                        }
                    ]}
                >
                    <Input onChange={handleChange} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default SkillsModal;
