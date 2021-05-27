import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import { useParams } from "react-router-dom";


import 'antd/dist/antd.css';
import { Form, Input, InputNumber } from 'antd';




function Profile() {
    const [response, setResponse] = useState({});
    const history = useHistory();
    const { id } = useParams();

   
    useEffect(() => {

        axios.post(`http://128.199.253.108:8082/user/getAllUser`, {username: "string"})
            .then(res => {
                setResponse(res);
            })
    });

    function placeholderAlert() {
        return alert("Unsupported");
    };
    const ProfileTest = () => {
        const onFinish = (values) => {
          console.log(values);
        };
      
        return (
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={['user', 'name']}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label="Email"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'age']}
              label="Age"
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'preference']} label="Preference">
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button  type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        );
      };
      
      // ReactDOM.render(<ProfileTest />, document.getElementById('root'));
   
    return (
        <>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} src={mcclogo} alt="Logo" />
                </div>
                <div className={styles.linktabs}>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                </div>
            </div>
      
            <div className = {bodyStyles.profilePage}>
              <div className = {bodyStyles.profilePageColumn}>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  <div>
                  Overview of user goes here
                  </div>
                  <div>
                    {"Profile page of user: " + JSON.stringify(id)}
                  </div>
                </div>
                <div>
                  <Button onClick= {placeholderAlert}>Delete User</Button>
                </div>
              </div>
              <div className = {bodyStyles.profilePageColumn}>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  Update Profile Section
                  {ProfileTest()}
                </div>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  <div style={{margin: '10px'}}>
                    <TextField style={{width:'100%'}} id="filled-basic" label="Preference" variant="outlined" onChange={(e) => this.handleTextFieldChange(e)} />
                  </div>
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button>Save Preference</Button>
                  </div>
                </div>
              </div>
              <div className = {bodyStyles.profilePageColumn}>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  Free container
                </div>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  Free container
                </div>
              </div>
            </div>
        </>
    )
};

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

export default Profile;