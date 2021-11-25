import React, { useState } from 'react';
import '../../layout/SignInLayout/styles.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import userApi from '../../api/userApi';
import { login } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';

function SignInComponent() {
  const [loginErr, setLoginErr] = useState(false);
  const [strLoginErr, setStrLoginErr] = useState('');
  const dispatch = useDispatch();
  let history = useHistory();
  const onFinish = async (values: any) => {
    const responsive = await userApi.loginApi({
      email: values.userName,
      password: values.password,
    });

    const { message, token } = responsive;

    if (message) {
      setLoginErr(true);
      setStrLoginErr(message);
    }

    if (token) {
      localStorage.setItem('accessToken', token);
      dispatch(login(responsive.username));
      history.replace('/');
    }
  };

  return (
    <div className='bgr-brow2 border-radius-4'>
      <div className='pd-sign-in'>
        <div className='login-content'>
          <div>
            <div className='login-title'>sign in</div>
            <div
              id='error_display'
              className='checkout_error'
              style={{ display: loginErr === true ? 'block' : 'none' }}
            >
              {strLoginErr}
            </div>
          </div>
          <Form
            name='sign_in'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 50 }}
            onFinish={onFinish}
          >
            <div style={{ textAlign: 'left' }}>
              <p className='gray-5 fs-14 lh-18'>Username or Email</p>
              <Form.Item
                name='userName'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input placeholder='Username and Email' />
              </Form.Item>
            </div>

            <div style={{ textAlign: 'left' }}>
              <p className='gray-5 fs-14 lh-18'>Password</p>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input placeholder='Password' type='password' />
              </Form.Item>
            </div>

            <Form.Item
              wrapperCol={{ offset: 0, span: 100 }}
              className='button-m-top-60'
            >
              <Button
                style={{ height: '40px' }}
                type='primary'
                htmlType='submit'
                className='full-width'
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className='not-account'>
            <Link to='/buyer/sign-up' className='a-create-account'>
              Not Account Yet? Sign Up Now
            </Link>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default SignInComponent;
