import React from 'react'
import './Home.css'
import Lottie from 'lottie-react'
import sign from '../Animations/signup.json'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='homeC'>

        <div className='part2'>
          <h1>Welcome to your proffessional community</h1>
          <p>New in our site ? <span onClick={() => navigate('/register')}>Sign up</span></p>
        </div>
        <div className='part1'>
        <Lottie
        animationData={sign}
        loop={true}
        style={{ width: "100%", height: "100%", margin: "auto" }}
      />
        </div>
    </div>
  )
}

export default Home
