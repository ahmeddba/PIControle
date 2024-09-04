import { Modal, Button, Descriptions } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob } from '../JS/Actions/RecruiterActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ApplicationModal from './ApplicationModal';
// import { applyForJob, addToFavorites } from '../JS/Actions/JobActions';  // Assuming these actions are defined

const JobOfferDetail = ({ jobOffer, open, handleCancel }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.AuthReducer.user)
    const liked = user.favorites.includes(jobOffer._id)
    const styleLike = liked ? {margin:'0 2%' , color:'red' , cursor:'pointer'} : {margin:'0 2%' , cursor:'pointer'}


    const handleDel = () => {
        dispatch(deleteJob(jobOffer._id))
        handleCancel();
    }
    const [open1 , setOpen1] = useState(false);

    const showModal = () => {
        setOpen1(true);
    }

    const handleCancel1 = () => {
        setOpen1(false);
    };

    const handleOk1 = () => {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen1(false);
          setConfirmLoading(false);
        }, 2000);
    };
    const [confirmLoading, setConfirmLoading] = useState(false);

    return (
        <Modal
            title={`${jobOffer.title} (${jobOffer.time === "parttime" ? "Part Time" : "Full Time"})`}
            open={open}
            onCancel={handleCancel}


            footer={
                user.role === 'JobSeeker'
                ? [
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="apply" type="primary" onClick={showModal}>
                        Apply
                    </Button>,
                    <FontAwesomeIcon icon={faHeart} style={styleLike} size='xl'/>,
                  ]
                : [
                      <Button key="cancel" onClick={handleCancel}>
                          Cancel
                      </Button>,
                      <Button type="primary" danger onClick={handleDel}>
                      Delete
                    </Button>
                  ]}
        >
             <Descriptions title="Company Details" >
                <Descriptions.Item label="Company">{jobOffer.companyId.name}</Descriptions.Item>
                <Descriptions.Item label="HR Contact">{jobOffer.HRrepresentative.email}</Descriptions.Item>
            </Descriptions>
            <br/>
            <Descriptions title="Job Details" >
                <Descriptions.Item label="Applied">{jobOffer.applicants.length}</Descriptions.Item>
                <Descriptions.Item label="Location">{jobOffer.location}</Descriptions.Item>
                <Descriptions.Item label="Requirements">
                    {jobOffer.requirements && jobOffer.requirements.join(' , ')}
                </Descriptions.Item>
            </Descriptions>
            <br/>
            <Descriptions title="Job Description" >
                <Descriptions.Item label="Description">{jobOffer.description}</Descriptions.Item>
            </Descriptions>
            <ApplicationModal open={open1} handleOk={handleOk1} confirmLoading={confirmLoading} offer={jobOffer} handleCancel={handleCancel1} />
        </Modal>
    );
};

export default JobOfferDetail;
