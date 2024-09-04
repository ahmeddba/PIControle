import React, { useEffect, useState } from 'react'
import './Signin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons'
import sign from '../Animations/signin.json'
import Lottie from 'lottie-react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../JS/Actions/AuthActions'

const Signin = () => {
const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [user , setUser] = useState({
    email:'',
    password:''
  })
  const handleChange = (e) => {
    setUser({...user , [e.target.name] : e.target.value})
  }
  console.log(user)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Function to check if all attributes are non-null
  const checkIfAllAttributesFilled = () => {
    return Object.values(user).every(attr => attr !== null && attr !== '');
  };

  // Effect to update button state based on newUser attributes
  useEffect(() => {
    setIsButtonDisabled(!checkIfAllAttributesFilled());
  }, [user]);
  const dispatch = useDispatch()
  return (
  <>
    <div className='contSignin'>
        <div className='fou9'>
          <FontAwesomeIcon icon={faCircleLeft} style={{color: "#34368a",marginLeft:'8%' , cursor:'pointer'}} size='2xl' onClick={() => navigate('/')}/>
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
      label="email"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
        {
          type:'email',
          message:'this input should be a valid email!'
        }
      ]}
    >
      <Input name='email' onChange={handleChange}/>
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
      <Input.Password name='password' onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button className='sub' type="primary" htmlType="submit" onClick={() => dispatch(login(user , navigate))}  disabled={isButtonDisabled}>
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
