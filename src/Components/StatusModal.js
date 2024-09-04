import React, { useState } from 'react';
import { Modal, Radio, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateInterv } from '../JS/Actions/InterviewActions';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useNavigate } from 'react-router-dom';

const StatusModal = ({ open, handleOk, handleCancel, confirmLoading ,interv }) => {
  const [status, setStatus] = useState({status:"Scheduled"});

  const options = [
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'Canceled', value: 'Canceled' },
    { label: 'Completed', value: 'Completed' },
  ];
console.log(status)
  // Handle status change
  const handleChange = (e) => {
    setStatus({status :e.target.value});
  };
  const dispatch = useDispatch()
const user = useSelector(state => state.AuthReducer.user)
const navigate = useNavigate()
  // Handle OK click
  const handleConfirm = () => {
    dispatch(updateInterv( status , interv._id , navigate))
    handleOk();
    navigate('/Interv');
  };

  return (
    <Modal
      title="Change Interview Status"
      open={open}
      onOk={handleConfirm}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Radio.Group
        options={options}
        onChange={handleChange}
        value={status.status}
        optionType="button"
        buttonStyle="solid"
      />
    </Modal>
  );
};

export default StatusModal;
