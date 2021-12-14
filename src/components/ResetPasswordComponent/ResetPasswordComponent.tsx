import React, { useState, useEffect } from 'react';
import '../../layout/SignInLayout/styles.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert, message } from 'antd';
import { useHistory } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index';
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import { login } from '../../redux/actions/userAction';
import CheckValidEmail  from '../../utils/validEmail';
import { useDispatch } from 'react-redux';
import {setEmail} from '../../redux/actions/actionEmail';
import {setForgotPassword} from '../../redux/actions/forgotPasswordAction';

function ResetPasswordComponent(){
    const [emailWarning, setEmailWarning] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const onFinish = (values: any)=>{
        if (values.newPassword !== values.confirmPassword){
            window.alert('mật khẩu không khớp')
        }
    }
    return(
        <div className='bgr-brow2 b-radius-5'>
            <div className='pd-sign-in'>
                <div className='confirm-email-content'>
                    <div>
                        <div className='confirm-email-title'>Reset Password</div>
                    </div>
                    <Form
                        name='confirm-email'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 50 }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <div className="note">
                            <p className="m-bottom-10 fs-12 fw-normal">Enter your email to reset password</p>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <Form.Item
                                name='newPassword'
                                label = 'New Password'
                                rules={[
                                  { required: true, message: 'Please input new password!' },
                                ]}
                            >
                                <Input className = "b-radius-5" placeholder='New Password'/>
                            </Form.Item>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <Form.Item
                                name='confirmPassword'
                                label = 'Confirm Password'
                                rules={[
                                  { required: true, message: 'Please input confirm password!' },
                                ]}
                            >
                                <Input className = "b-radius-5" placeholder='Confirm Password'/>
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
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordComponent;