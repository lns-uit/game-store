import React, { useState } from 'react';
import '../../layout/SignInLayout/styles.css';
import {Link} from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';

function SignInComponent(){
    const [loginErr, setLoginErr] = useState(false);
    const [strLoginErr, setStrLoginErr] = useState('');
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    

    return(
        <div className="bgr-brow2 border-radius-4">
            <div className="pd-sign-in">
                <div className="login-content">
                    <div>
                        <div className="login-title">
                            sign in
                        </div>
                        <div 
                            id="error_display" 
                            className="checkout_error"
                            style={{display: loginErr === true ? "block": "none"}}
                        >
                            {strLoginErr}
                        </div>
                    </div>
                    <Form
                        name="sign_in"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 50 }}
                        onFinish={onFinish}
                    >
                        <div>
                            <p className="gray-5 fs-14 lh-18">Username and Email</p>
                            <Form.Item
                                name="userName"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Username and Email" />
                            </Form.Item>
                        </div>

                        <div>
                            <p className="gray-5 fs-14 lh-18">password</p>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input placeholder="Password" type="password"/>
                            </Form.Item>
                        </div>

                        <Form.Item wrapperCol={{ offset: 0, span: 100 }} className="button-m-top-60">
                            <Button type="primary" htmlType="submit" className="full-width">
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="not-account">
                        <Link to="/buyer/sign-up" className="a-create-account">Not Account Yet? Sign Up Now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInComponent;