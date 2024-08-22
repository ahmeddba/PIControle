import React from 'react'
import './VisitorNav.css'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBriefcase, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'antd';

const NavBar = () => {


  return (
    <div className='cont'>
        <div className='issar'>
            <img src='/logo.png' alt='logo' height={60} />
        </div>
        <div className='west'>
            <div className='box'>
            <FontAwesomeIcon icon={faNewspaper} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Articles</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faPeopleGroup} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>People</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faBriefcase} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Offers</p>
            </div>

        </div>
        <div className='imin'>
        <Button>Sign in</Button>
        <Button className='signin'>Sign up</Button>
        </div>
    </div>
  )
}

export default NavBar
