import React from 'react'
import './Home.css'
import Lottie from 'lottie-react'
import sign from '../Animations/signup.json'

const Home = () => {
  return (
    <div className='homeC'>

        <div className='part2'>
          <h1>Welcome to your proffessional community</h1>
          <p>New in our site ? <span>Sign up</span></p>
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
