import React, { useState } from 'react';
import '../../layout/SignInLayout/styles.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
import { useHistory } from 'react-router-dom';
import userApi from '../../api/userApi';
import { login } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';
import RootErrorMessage from '../../constants/ErrorMessage';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import fbIcon from '../../assets/images/facebook-4-50.png';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import {setEmail} from '../../redux/actions/actionEmail';

function SignInComponent() {
  const [loginErr, setLoginErr] = useState(false);
  const [strLoginErr, setStrLoginErr] = useState('');
  const [verificationEmail, setVerificationEmail] = useState(null);
  const dispatch = useDispatch();
  let history = useHistory();
  const onFinish = async (values: any) => {
    try {
      const responsive = await userApi.loginApi({
        email: values.userName,
        password: values.password,
      });
      const { message, token, user } = responsive || {};

      if (user){
        axios.get(Endpoint.mainApi + `api/user/verification-email-status/${user.idUser}`)
        .then(res=>{
          if (res.data === true ){
            if (token) {
              localStorage.setItem('accessToken', token);
              dispatch(login(user));
              history.replace('/');
            }
          }else{
            dispatch(setEmail('getEmail', user.email));
            history.push('/confirm-email');
          }
        })
        .catch(err => {console.log(err)})
        
      }
      if (message) {
        setLoginErr(true);
        setStrLoginErr(message);
      }
    } catch (e) {
      alert(RootErrorMessage.DEFAULT_ERROR_MESSAGE);
    }
  };
  const responseGoogle = async (response) => {
    let data = response.profileObj;
    try {
      const responsive = await userApi.loginWithSMA({
          iLogin: {
              email: data.email,
          },
          iUser: {
              email: data.email,
              realname: data.name,
              avatar: data.imageUrl,
              userName: data.email
          }
      })

      const {message, token, user} = responsive || {}
      if (message) {
        setLoginErr(true);
        setStrLoginErr(message);
      }
      if (token) {
        localStorage.setItem('accessToken',token);
        dispatch(login(user));
        history.replace('/')
      }
    } catch (e) {
      alert(RootErrorMessage.DEFAULT_ERROR_MESSAGE);
    }
  }
  const responseFacebook = async (response) => {
    let data = response;
    try {
      const responsive = await userApi.loginWithSMA({
          iLogin: {
              email: data.id + "@facebook.com",
          },
          iUser: {
              email: data.id + "@facebook.com",
              realname: data.name,
              avatar: data.picture.data.url,
              userName: data.id
          }
      })

      const {message, token, user} = responsive || {}
      if (message) {
        setLoginErr(true);
        setStrLoginErr(message);
      }
      if (token) {
        localStorage.setItem('accessToken',token);
        dispatch(login(user));
        history.replace('/')
      }
    } catch (e) {
      alert(RootErrorMessage.DEFAULT_ERROR_MESSAGE);
    }
  }
  return (
    <div className='bgr-brow2 b-radius-5'>
      <div className='pd-sign-in'>
        <div className='login-content'>
          <div>
            <div className='login-title'>sign in</div>
            <div
              id='error_display'
              className='checkout_error'
              style={{ display: loginErr === true ? 'block' : 'none' }}>
              {strLoginErr}
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
                name='userName'
                label = "Stun ID or Email"
                rules={[
                  { required: true, message: 'Input require !' },
                ]}>
                <Input className = "b-radius-5" placeholder='Stun ID and Email' />
              </Form.Item>
            </div>

            <div style={{ textAlign: 'left' }}>
              <Form.Item
                name='password'
                label = "Password"
                rules={[
                  { required: true, message: 'Input require !' },
                ]}>
                <Input className = "b-radius-5" placeholder='Password' type='password' />
              </Form.Item>
            </div>

            <Form.Item
              wrapperCol={{ offset: 0, span: 100 }}
              className='button-m-top-60'>
              <Button
                style={{ height: '40px' }}
                type='primary'
                htmlType='submit'
                className='full-width btn-login-submit'>
                Sign In
              </Button>
            </Form.Item>
            <span style = {{color:'#787878', padding:'0 10px', background: '#161616'}}>OR</span>
            <div style = {{borderTop: '1px solid #454545',marginTop:'-10px'}}>
            </div>
        
            <br/>
            <GoogleLogin
              className = "btn-login-with-google"
              clientId="436864193139-pp683cr97eg03a8jri9lmmmonfa0963e.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <br/><br/>
            <FacebookLogin
              appId="4499644436831251"
              fields="name,email,picture"
              // onClick={responseFacebook}
              cssClass="btn-login-with-facebook"
              icon= {<img src={fbIcon} height="25px"/>}
              callback={responseFacebook} />
          </Form>
          <div className='not-account'>
            <Link to='/sign-up' className='a-create-account'>
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
