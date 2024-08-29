import React, { useEffect, useState } from 'react';
import './InterviewList.css';
import { useDispatch, useSelector } from 'react-redux';
import InterviewCard from '../Components/InterviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import InterviewModal from '../Components/InterviewModal';
import { getInterviews } from '../JS/Actions/InterviewActions';
import { Flex, Spin, Select } from 'antd';

const { Option } = Select;

const InterviewList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // State for the status filter

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

  const load = useSelector(state => state.InterviewReducer.load);
  const interviews = useSelector(state => state.InterviewReducer.interviews);
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);

  useEffect(() => {
    user && dispatch(getInterviews(user._id));
  }, [dispatch, user]);

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const filteredInterviews = statusFilter === 'all'
    ? interviews
    : interviews.filter(interview => interview.status === statusFilter);

  return (

    load ?
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
      :
      <div className='bigCont'>
        <div className='but'>
          <FontAwesomeIcon
            icon={faCircleLeft}
            style={{ color: "#34368a", marginLeft: '8%', cursor: 'pointer' }}
            size='2xl'
            onClick={() =>user && navigate(`/prof/${user._id}`)}
          />
          <Select
            defaultValue="all"
            style={{ width: 200, marginLeft: '8%' }}
            onChange={handleStatusChange}
          >
            <Option value="all">All Interviews</Option>
            <Option value="Scheduled">Scheduled</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Canceled">Canceled</Option>
          </Select>
          <FontAwesomeIcon
            icon={faCalendarPlus}
            style={{ color: "#34368a", marginLeft: '8%', cursor: 'pointer' }}
            size='2xl'
            onClick={showModal}
          />
        </div>
        <div className='intervCont'>
          {
            filteredInterviews &&
            filteredInterviews.map((interview, i) => <InterviewCard key={i} interview={interview} />)
          }
        </div>
        <InterviewModal open={open} handleOk={handleOk} confirmLoading={confirmLoading} handleCancel={handleCancel} />
      </div>
  )
};

export default InterviewList;
