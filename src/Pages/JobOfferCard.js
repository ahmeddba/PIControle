import React, { useState } from 'react'
import './JobOfferCard.css'
import { Button, Card } from 'antd'
import JobOfferDetail from '../Components/JobOfferDetail'

const JobOfferCard = ({offer}) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
    setOpen(false);
    };

  return (
    <div>
        <Card
      title={`${offer.title} (${offer.time === "parttime" ? "Part Time" : "Full Time"})`}
      extra={<Button onClick={showModal}>More</Button>}
      style={{
        width: 300,
      }}
    >
      <p><span>Location: </span> {offer.location}</p>
      <p><span>Company: </span> {offer.companyId.name} </p>
      <p><span>Hr Contact: </span> {offer.HRrepresentative.email} </p>
    </Card>
    <JobOfferDetail open={open} handleCancel={handleCancel}jobOffer={offer} />

    </div>
  )
}

export default JobOfferCard
