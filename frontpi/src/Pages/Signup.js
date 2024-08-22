import React from 'react'
import './Signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Input, Select } from 'antd'
import Lottie from 'lottie-react'
import sign from '../Animations/home.json'


const Signup = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
  <>
    <div className='contSignin'>
        <div className='fou9'>
          <FontAwesomeIcon icon={faCircleLeft} style={{color: "#34368a",marginLeft:'8%' , cursor:'pointer'}} size='2xl'/>
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
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
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
      <Input />
    </Form.Item>
    <Form.Item
      label="email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
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
      <Input.Password />
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
          label:"Recruiter"
        },
        {
          value: 'HRRepresentative',
          name: 'role',
          label:"Job seeker"
        }
      ]}
    />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button className='sub' type="primary" htmlType="submit">
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
