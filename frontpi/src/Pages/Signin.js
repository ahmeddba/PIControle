import React from 'react'
import './Signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import sign from '../Animations/signin.json'
import Lottie from 'lottie-react'
import { Button, Form, Input } from 'antd'

const Signin = () => {

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
          <h1>Identify yourself</h1>
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
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
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
            style={{ width: "82%", height: "40%", margin: "0 auto" }}
          />
          </div>
        </div>
    </div>

  </>
  )
}

export default Signin
