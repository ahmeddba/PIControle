import React, { useEffect, useState } from 'react'
import './Signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Input, Select } from 'antd'
import Lottie from 'lottie-react'
import sign from '../Animations/home.json'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../JS/Actions/AuthActions'


const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [newUser , setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role:null
  })

  const handleChange = (e)=> {
    setNewUser({...newUser , [e.target.name] : e.target.value})
  }
  const handleChangeS = (e) => {
    setNewUser({...newUser , role: e})
   }

   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Function to check if all attributes are non-null
  const checkIfAllAttributesFilled = () => {
    return Object.values(newUser).every(attr => attr !== null && attr !== '');
  };

  // Effect to update button state based on newUser attributes
  useEffect(() => {
    setIsButtonDisabled(!checkIfAllAttributesFilled());
  }, [newUser]);
  return (
  <>
    <div className='contSignin'>
        <div className='fou9'>
          <FontAwesomeIcon icon={faCircleLeft} style={{color: "#34368a",marginLeft:'8%' , cursor:'pointer'}} size='2xl' onClick={() => navigate('/')}/>
          <h1>Register</h1>
        </div>
        <div className='louta'>
          <div className='issarr'>
          <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}

    autoComplete="on"
  >
     <Form.Item
      label="name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input  name='name' onChange={handleChange}/>
    </Form.Item>
    <Form.Item
      label="email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
        {
          type: 'email',
          message: 'Please enter a valid email!',
        },
      ]}
    >
      <Input name='email'  onChange={handleChange} />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password  name='password'  onChange={handleChange}/>
    </Form.Item>
    <Form.Item
      label="title"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please input your title!',
        },
      ]}
    >
      <Input name='title'  onChange={handleChange} />
    </Form.Item>
    <Form.Item
    label="Account type"
    name="Account type"
      rules={[
        {
          required: true,
          message: 'Please input your account type!',
        },
      ]}
      >
    <Select
      defaultValue="Choose type"
      style={{
        width: '100%',
        marginBottom:'3%'
      }}
      // onChange={handleChangeS}
      options={[

        {
          value: 'JobSeeker',
          name: 'role',
          label:"Job Seeker "
        },
        {
          value: 'HRRepresentative',
          name: 'role',
          label:"Recruiter"
        }
      ]}
      onChange={handleChangeS}
    />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button className='sub' type="primary" htmlType="submit" onClick={() => dispatch(register(newUser,navigate))}   disabled={isButtonDisabled}  // Button is disabled until all attributes are filled
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
          </div>
          <div className='iminn'>
          <Lottie
        animationData={sign}
        loop={true}
        style={{ width: "100%", height: "100%", margin: "auto" }}
      />
          </div>
        </div>
    </div>

  </>
  )
}

export default Signup
