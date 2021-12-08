import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import userApi from '../../api/userApi';

function SignUpComponent() {
  const [signUpErr, setSignUpErr] = useState(false);
  const [strSignUpErr, setStrSignUpErr] = useState('');
  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      setSignUpErr(true);
      setStrSignUpErr('Password and confirm password are not the same');
    } else {
      setSignUpErr(false);
      setStrSignUpErr('');
      const newUser = {
        username: values.userName,
        password: values.password,
        email: values.email,
      };
      const responsive = await userApi.registerUserApi(newUser);
      const { idUser, message } = responsive || {};
      if (message) {
        alert(message);
        return;
      }
    }
  };

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
            name='sign_in'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 50 }}
            onFinish={onFinish}>
            <div style={{ textAlign: 'left' }}>
              <p className='gray-5 fs-14 lh-18'>Email</p>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}>
                <Input className = "b-radius-5" placeholder='Email' type='email' />
              </Form.Item>
            </div>
            <div style={{ textAlign: 'left' }}>
              <p className='gray-5 fs-14 lh-18'>UserName</p>
              <Form.Item
                name='userName'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}>
                <Input className = "b-radius-5" placeholder='Username' />
              </Form.Item>
            </div>

            <div style={{ textAlign: 'left' }}>
              <p className='gray-5 fs-14 lh-18'>Password</p>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 8, message: 'Password must be minimum 8 characters.' },
                  { max: 20, message: 'Password must be max 20 characters.' },
                ]}>
                <Input className = "b-radius-5" placeholder='Password' type='password' />
              </Form.Item>
            </div>

            <div style={{ textAlign: 'left' }}>
              <p className='gray-5 fs-14 lh-18'>Confirm Password</p>
              <Form.Item
                name='confirmPassword'
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
