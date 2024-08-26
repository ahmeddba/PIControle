import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Profile.css'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import SkillsModal from '../Components/SkillsModal'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { getOne } from '../JS/Actions/AuthActions'
import ExperienceModal from '../Components/ExperienceModal'
import EducationModal from '../Components/EducationModal'

const Profile = () => {
  const match = useMatch('/prof/:id')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOne(match.params.id))
  }, [match.params.id])
  const user = useSelector(state => state.user)






  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };
  const showModal1 = () =>{
    setOpen1(true);
  }
  const showModal2 = () => {
    setOpen2(true);
  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancel1 = () => {
    setOpen1(false);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };
  return (
    user && (
      user.role === "JobSeeker" ?
      <>
      <div className='profCont'>
    <img className='imgP' src='/prof.jpg' alt='profile' height={80} width={80} />
    <div className='headP'>
      <div>
      <h1 style={{textAlign:'start'}}>{user.name}</h1>
      <p style={{textAlign:'start'}}>{user.title}</p>
      </div>
      <div className='infoP'>
        <div className='left'>
          <div className='listTitle'> <p> Work experience </p> <FontAwesomeIcon style={{cursor:'pointer'}} onClick={showModal1} icon={faSquarePlus}/> </div>
          <ul>
            {
              user.workExperience.length !== 0 ?
              <ul>
            {
              user.workExperience.map(exp => (<><li>{exp.role} at {exp.company}</li></>))
            }
              </ul>
                :
              <p>No experience</p>
            }
          </ul>
          <div className='listTitle'>Education <FontAwesomeIcon style={{cursor:'pointer'}} onClick={showModal2} icon={faSquarePlus}/></div>
          <ul>
            {
              user.education.length !== 0 ?
              <ul>
            {
              user.education.map(edu => (<><li>{edu.fieldOfStudy} in {edu.institution}</li></>))
            }
              </ul>
                :
              <p>No education</p>
            }
          </ul>
        </div>
        <div className='right'>
          <div className='listTitle'>Skills <FontAwesomeIcon style={{cursor:'pointer'}} onClick={showModal} icon={faSquarePlus}/></div>
            {
              user.skills.length !== 0 ?
              <ul>
            {
              user.skills.map(skill => (<><li>{skill}</li></>))
            }
              </ul>
                :
              <p>No skills</p>
            }
          <div className='listTitle'>Network</div>
          <ul>
            <li>Companies Followed: {user.follows.length}</li>

          </ul>
        </div>
      </div>
    </div>
    <SkillsModal open={open} handleOk={handleOk} handleCancel={handleCancel} confirmLoading={confirmLoading} />
    <ExperienceModal open={open1} handleOk={handleOk} handleCancel={handleCancel1} confirmLoading={confirmLoading} />
    <EducationModal open={open2} handleOk={handleOk} handleCancel={handleCancel2} confirmLoading={confirmLoading} />
  </div>
      </>
      :
      <div className='profCont'>
    <img className='imgP' src='/pic.png' alt='profile' height={80} width={80} />
    <div className='headP'>
      <div>
        <h1 style={{textAlign:'start'}}>{user.name}</h1>
        <p style={{textAlign:'start'}}>{user.title}</p>
      </div>
      <div className='infoP1'>
        <div className='left' >
          <div className='listTitle'> <p> Job Offers </p> <FontAwesomeIcon style={{cursor:'pointer'}} onClick={showModal1} icon={faSquarePlus}/> </div>
          <ul>
            {
              user.jobOffers.length !== 0 ?
              <ul>
            {
              user.jobOffers.map(exp => (<><li>Alooo</li></>))
            }
              </ul>
                :
              <p>No experience</p>
            }
          </ul>

        </div>
        <div className='right' >
        <div className='listTitle'>Company associated <FontAwesomeIcon style={{cursor:'pointer'}} onClick={showModal2} icon={faSquarePlus}/></div>
          <ul>
            {
              user.companyId ?
              <ul>
            {
              user.companyId
            }
              </ul>
                :
              <p>No Company associated</p>
            }
          </ul>
        </div>
      </div>
    </div>

  </div>
    )

  )
}

export default Profile
