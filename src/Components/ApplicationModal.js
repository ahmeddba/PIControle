import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ApplicationModal = ({ offer, open, handleOk, handleCancel, confirmLoading }) => {
  // State to manage years of experience for each skill
  const [experience, setExperience] = useState(
    offer.requirements.reduce((acc, skill) => ({ ...acc, [skill]: '' }), {})
  );
  // State to manage the uploaded CV
  const [cv, setCv] = useState(null);
  // State to track form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle changes in the experience input
  const handleExperienceChange = (skill, value) => {
    setExperience({
      ...experience,
      [skill]: value,
    });
  };

  // Handle file upload
  const handleCvUpload = ({ file }) => {
    setCv(file);
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      experience,
      cv,
    };
    console.log('Submitted data:', formData);
    handleOk();
  };

  // Function to check the validity of the form
  const checkFormValidity = () => {
    const allFieldsFilled = offer.requirements.every(skill => experience[skill].trim() !== '') && cv !== null;
    setIsFormValid(allFieldsFilled);
  };

  // useEffect to check form validity whenever experience or CV changes
  useEffect(() => {
    checkFormValidity();
  }, [experience, cv]);

  return (
    <Modal
      title="Apply for Job Offer"
      open={open}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !isFormValid }} // Disable the Ok button if the form is not valid
    >
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        {offer.requirements.map((skill) => (
          <Form.Item
            key={skill}
            label={`Years of Experience in ${skill}`}
            required
          >
            <Input
              type="number"
              min={0}
              placeholder="Enter years of experience"
              value={experience[skill]}
              onChange={(e) => handleExperienceChange(skill, e.target.value)}
            />
          </Form.Item>
        ))}

        <Form.Item
          label="Upload CV"
          required
        >
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleCvUpload}

          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {/* {cv && <p style={{ marginTop: 8 }}>{cv.name}</p>} */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApplicationModal;
