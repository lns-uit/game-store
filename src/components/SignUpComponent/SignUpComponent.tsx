import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message as Mss, message } from 'antd';
import userApi from '../../api/userApi';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import CheckValidEmail  from '../../utils/validEmail';
import { useDispatch } from 'react-redux';
import {setEmail} from '../../redux/actions/actionEmail';

function SignUpComponent() {
  const history = useHistory();
  const [signUpErr, setSignUpErr] = useState(false);
  const [strSignUpErr, setStrSignUpErr] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [stunIdWarning, setStunIdWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    if (!isValidEmail) return;
    if (!isValidUsername) return;
    if (!isValidEmail) return;
    if (values.password !== values.confirmPassword) {
      // setSignUpErr(true);
      Mss.error('Password and confirm password are not the same');
    } else {
      // setSignUpErr(false);
      // setStrSignUpErr('');
      dispatch(setEmail('getEmail', values.email));
      const newUser = {
        username: values.username,
        password: values.password,
        email: values.email,
      };
      const responsive = await userApi.registerUserApi(newUser);
      const { idUser, message } = responsive || {};

      if (message) {
        Mss.success(message);
        history.push('/confirm-email');
        return;
      }
    }
  };

  const ValidStunId = (username: string) => {
    if (username.length <6) {
      setIsValidUsername(false);
      setStunIdWarning("Must be minimun 6 characters")
      return;
    }
    if  (username==="") {
      setIsValidUsername(false);
      setStunIdWarning("Stun ID is require")
      return;
    }
    let valid = username.match(/^[a-zA-Z0-9._]+$/);
    if (valid===null){
      setIsValidUsername(false);
      setStunIdWarning('Invalid username. Username constrain a-z A-Z . _');
      return;
    }
    axios.get(Endpoint.mainApi + 'api/user/check-valid-username/' + username)
    .then(event => {
        setIsValidUsername(true);
    })
    .catch(e => {
        setStunIdWarning(e.request.response)
        setIsValidUsername(false);
    })
  }
  const ValidEmail = (email:string) =>{
    if (!CheckValidEmail(email)){
      setEmailWarning('Email not valid');
      setIsValidEmail(false);
      return;
    }
    axios.get(Endpoint.mainApi + 'api/user/check-valid-email/' + email)
    .then (e => {
        setIsValidEmail(true);
    })
    .catch(e => {
      setEmailWarning(e.request.response);
      setIsValidEmail(false);
    })
  }
  return (
    <div className='bgr-brow2 b-radius-5'>
      <div className='pd-sign-in'>
        <div className='sign-up-content'>
          <div>
            <div className='sign-up-title'>sign up</div>
            <div
              id='error_display'
              className='checkout_error'
              style={{ display: signUpErr === true ? 'block' : 'none' }}>
              {strSignUpErr}
            </div>
          </div>
          <Form
            layout = "vertical"
            name='sign_in'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 50 }}
            onFinish={onFinish}>
            <div style={{ textAlign: 'left' }}>
              <Form.Item
                name='email'
                label = 'Email'
                hasFeedback
                help= {emailWarning}
                validateStatus = {isValidEmail ? "success" : "error"}
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}>
                <Input className = "b-radius-5" placeholder='Email' type='email' onBlur={e => ValidEmail(e.target.value)}/>
              </Form.Item>
            </div>
            <div style={{ textAlign: 'left' }}>
              <Form.Item
                name='username'
                label = "Stun ID"
                rules={[
                  { required: true, message: 'Please input your Stun ID!' },
                ]}
                hasFeedback
                help= {stunIdWarning}
                validateStatus = {isValidUsername ? "success" : "error"}
                >
                <Input maxLength={16} className = "b-radius-5" placeholder='Stun ID' onBlur={(e)=> ValidStunId(e.target.value)} />
              </Form.Item>
            </div>

            <div style={{ textAlign: 'left' }}>
              <Form.Item
                name='password'
                label = 'Password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 8, message: 'Password must be minimum 8 characters.' },
                  { max: 20, message: 'Password must be max 20 characters.' },
                ]}>
                <Input className = "b-radius-5" placeholder='Password' type='password' />
              </Form.Item>
            </div>

            <div style={{ textAlign: 'left' }}>
              <Form.Item
                name='confirmPassword'
                label = 'Confirm password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your confirm password!',
                  },
                ]}>
                <Input className = "b-radius-5" placeholder='Confirm Password' type='password' />
              </Form.Item>
            </div>

            <Form.Item
              wrapperCol={{ offset: 0, span: 100 }}
              className='button-m-top-60'>
              <Button
                style={{ height: '40px' }}
                type='primary'
                htmlType='submit'
                className='full-width b-radius-5'>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className='not-account'>
            <Link to='/sign-in' className='a-create-account'>
              Already have an account? Sign In Now
            </Link>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
