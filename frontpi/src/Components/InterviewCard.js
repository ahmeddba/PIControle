import React, { useState } from 'react';
import './InterviewCard.css';
import { CalendarTwoTone } from '@ant-design/icons';
import StatusModal from './StatusModal';

const InterviewCard = ({ interview }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const showModal = () => {
    setOpen(true);
  };

  // Function to format the date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    // Get hours and minutes
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Return formatted date and time as dd-mm-yyyy hh:mm
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Assuming interview.interviewDate contains a valid date string
  const formattedDate = formatDate(interview.interviewDate);

  return (
    <div className='cardd'>
      <div className='cal' onClick={showModal}>
        <h3>{formattedDate}</h3>
        <CalendarTwoTone />
      </div>
      <div className='inf'>
        <p><span>Status:</span> {interview.status}</p>
        <p><span>Invited:</span> {interview.candidateEmail}</p>
        <p><span>Subject:</span> {interview.subject}</p>
      </div>
      <StatusModal open={open} handleOk={handleOk} handleCancel={handleCancel} confirmLoading={confirmLoading} interv={interview} />
    </div>
  );
}

export default InterviewCard;
