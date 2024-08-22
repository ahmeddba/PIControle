import React from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBriefcase, faHouse, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const NavBar = () => {

    const items = [
        {
          label: <a href="https://www.antgroup.com">Profile</a>,
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
        },
      ];
  return (
    <div className='cont'>
        <div className='issar'>
            <img src='/logo.png' alt='logo' height={60} />
        </div>
        <div className='west'>
            <div className='box'>
            <FontAwesomeIcon icon={faHouse} style={{color:"#59bce7"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Home</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faPeopleGroup} style={{color:"#59bce7"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Network</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faBriefcase} style={{color:"#59bce7"}} size='2xl'/>
            <p style={{fontWeight:500 , justifySelf:'flex-start'}}>Offers</p>
            </div>
            <div className='box'>
            <FontAwesomeIcon icon={faBell} style={{color:"#59bce7"}} size='2xl'/>
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
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <img src='/prof.jpg' alt='profile' height={35} width={35} className='prof' />
        <DownOutlined className='down'/>
      </Space>
    </a>
  </Dropdown>
        </div>
    </div>
  )
}

export default NavBar
