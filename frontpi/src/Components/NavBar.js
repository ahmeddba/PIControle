import React from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBriefcase, faHouse, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutt } from '../JS/Actions/AuthActions';

const NavBar = () => {
const user = useSelector(state => state.AuthReducer.user)
const dispatch = useDispatch()
const navigate = useNavigate()
    const items = [
        {
          label: user && <Link to={`/prof/${user._id}`} >Profile</Link>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">Settings</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: 'Log Out',
          danger: true ,
          key: '3',
          onClick:() => dispatch(logoutt(navigate))
        },
      ];
  return (
    <div className='cont'>
        <div className='issar'>
            <img src='/logo.png' alt='logo' height={60} />
        </div>
        <div className='west'>
            <div className='box'>
            <FontAwesomeIcon icon={faHouse} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Home</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faPeopleGroup} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Network</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faBriefcase} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Offers</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faBell} style={{color:"#34368a"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Notification</p>
            </div>
        </div>
        <div className='imin'>
        <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
      <Space>
        <img src='/prof.jpg' alt='profile' height={35} width={35} className='prof' />
        <DownOutlined className='down'/>
      </Space>

  </Dropdown>
        </div>
    </div>
  )
}

export default NavBar
