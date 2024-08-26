import Lottie from 'lottie-react'
import React from 'react'
import notfoundd from '../Animations/notfound.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='notC'>
        <Lottie
            animationData={notfoundd}
            loop={true}
            style={{ width: "800px", height: "40%", margin: "0 auto" }}
          />
           <div className='rjou3'>
          <FontAwesomeIcon icon={faCircleLeft} style={{color: "#34368a",marginLeft:'8%' , cursor:'pointer'}} size='2xl' onClick={() =>user ?  navigate('/acc') : navigate('/')}/>
          <h1>Back to home</h1>
        </div>
    </div>
  )
}

export default NotFound
