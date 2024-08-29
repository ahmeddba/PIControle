import { Modal, Button, Descriptions } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob } from '../JS/Actions/RecruiterActions';
// import { applyForJob, addToFavorites } from '../JS/Actions/JobActions';  // Assuming these actions are defined

const JobOfferDetail = ({ jobOffer, open, handleCancel }) => {
    const dispatch = useDispatch();

    // Handle applying for the job
    const handleApply = () => {
        // dispatch(applyForJob(jobOffer._id));
        console.log("Applied for job: ", jobOffer._id);
        handleCancel(); // Close the modal after applying
    };
    // Handle adding to favorites
    const handleAddToFavorites = () => {
        // dispatch(addToFavorites(jobOffer._id));
        console.log("Added to favorites: ", jobOffer._id);
    };
    const user = useSelector(state => state.AuthReducer.user)
    const handleDel = () => {
        dispatch(deleteJob(jobOffer._id ))
        handleCancel();
    }
    return (
        <Modal
            title={jobOffer.title}
            open={open}
            onCancel={handleCancel}


            footer={ user.role === 'JobSeeker'
                ? [
                      <Button key="cancel" onClick={handleCancel}>
                          Cancel
                      </Button>,
                      <Button key="favorite" onClick={handleAddToFavorites}>
                          Add to Favorites
                      </Button>,
                      <Button key="apply" type="primary" onClick={handleApply}>
                          Apply
                      </Button>,

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
            <Descriptions title="Job Details" >
                <Descriptions.Item label="Title">{jobOffer.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{jobOffer.description}</Descriptions.Item>
                <Descriptions.Item label="Location">{jobOffer.location}</Descriptions.Item>
                <Descriptions.Item label="Job Type">{jobOffer.time === "parttime" ? "Part-time" : "Full-time"}</Descriptions.Item>
                <Descriptions.Item label="Requirements">
                    {jobOffer.requirements && jobOffer.requirements.join(' : ')}
                </Descriptions.Item>
            </Descriptions>
        </Modal>
    );
};

export default JobOfferDetail;
