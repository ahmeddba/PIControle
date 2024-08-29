import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../JS/Actions/AuthActions';

const SkillsModal = ({open , handleOk , confirmLoading , handleCancel }) => {
    const [skill, setSkill] = useState(''); // State for the skill input
    const [userSkills, setUserSkills] = useState([]); // State for the user's skills array
    const dispatch = useDispatch(); // Redux dispatch function

    // Function to handle adding a skill
    const handleUpdate = () => {
        dispatch(updateProfile(user._id ,{ skill }));
        handleOk()

    };
    const handlechange = (e) => {
        setSkill(e.target.value)
    }
    const user = useSelector(state => state.AuthReducer.user)

return (
    <Modal
    title="Title"
    open={open}
    onOk={handleUpdate}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
  >
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

    autoComplete="off"
  >
    <Form.Item
      label="skill"
      name="skill"
      rules={[
        {
          required: true,
          message: 'Please input your new skill!',
        }
      ]}
    >
      <Input onChange={handlechange}/>
    </Form.Item>




  </Form>
  </Modal>
  )
}

export default SkillsModal
