import { Form, Input, DatePicker, Modal, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInterview } from '../JS/Actions/InterviewActions';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const InterviewModal = ({ open, handleOk, confirmLoading, handleCancel }) => {
  const [interview, setInterview] = useState({
    interviewDate: null,
    candidateEmail: '',
    subject: '',
    jobOfferId: '', // To store the selected job offer ID
  });

  const [isOkDisabled, setIsOkDisabled] = useState(true);
  const user = useSelector(state => state.AuthReducer.user);
  const dispatch = useDispatch();
  // Handle input changes
  const handleChange = (e) => {
    setInterview({
      ...interview,
      [e.target.name]: e.target.value,
    });
  };

  // Handle date-time change
  const handleDateTimeChange = (date, dateString) => {
    setInterview({
      ...interview,
      interviewDate: dateString,
    });
  };

  // Handle job offer selection
  const handleJobOfferChange = (value) => {
    setInterview({
      ...interview,
      jobOfferId: value, // Store the selected job offer ID
    });
  };
console.log(interview)
const navigate = useNavigate()
  // Function to handle the form submission
  const handleUpdate = () => {
    dispatch(addInterview(interview, user._id , interview.jobOfferId , navigate));
    handleOk();
  };

  // Effect to enable/disable the OK button based on form completion
  useEffect(() => {
    const { interviewDate, candidateEmail, subject, jobOfferId } = interview;
    const isFormValid = interviewDate && candidateEmail && subject && jobOfferId;
    setIsOkDisabled(!isFormValid);
  }, [interview]);

  return (
    <Modal
      title="Create Interview"
      open={open}
      onOk={handleUpdate}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okButtonProps={{ disabled: isOkDisabled }} // Disable the OK button if the form is not valid
    >
      <Form
        name="interview"
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
          label="Interview Date and Time"
          name="interviewDate"
          rules={[
            {
              required: true,
              message: 'Please select the interview date and time!',
            },
          ]}
        >
          <DatePicker showTime onChange={handleDateTimeChange} format="YYYY-MM-DD HH:mm" />
        </Form.Item>

        <Form.Item
          label="Candidate Email"
          name="candidateEmail"
          rules={[
            {
              required: true,
              message: 'Please input the candidate\'s email!',
            },
            {
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <Input name="candidateEmail" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: 'Please input the subject of the interview!',
            },
          ]}
        >
          <Input name="subject" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Job Offer"
          name="jobOfferId"
          rules={[
            {
              required: true,
              message: 'Please select a job offer!',
            },
          ]}
        >
          <Select placeholder="Select a job offer" onChange={handleJobOfferChange}>
            { user && user.jobOffers.map((jobOffer) => (
              <Option key={jobOffer._id} value={jobOffer._id}>
                {jobOffer.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InterviewModal;
