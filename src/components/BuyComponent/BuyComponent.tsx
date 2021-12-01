import React,{useState} from 'react';
import "../../layout/LayoutGameDetail1/styles.css";
import { Form, Input, Button } from 'antd';

function BuyComponent() {
    const [Err, setErr] = useState(false);
    const [strErr, setStrErr] = useState('');
    const onFinish = async (values: any) => {
        console.log(values)
    };
    return(
        <div className="buy-content">
            <div
              id='error_display'
              className='checkout_error'
              style={{ display: Err === true ? 'block' : 'none' }}>
              {strErr}
            </div>
            <Form
                name='sign_in'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 50 }}
                onFinish={onFinish}
                layout="vertical"
            >
                <div style={{ textAlign: 'left' }}>
                    <Form.Item
                        name='name'
                        label='NAME'
                        rules={[
                        { required: true, message: 'Please input your name!' },
                        ]}>
                        <Input placeholder='NAME' />
                    </Form.Item>
                </div>

                <div style={{ textAlign: 'left' }}>
                    <Form.Item
                        name='number'
                        label='NUMBER'
                        rules={[
                        { required: true, message: 'Please input your number!' },
                        ]}>
                        <Input type="number" placeholder='NUMBER'/>
                    </Form.Item>
                </div>

                <div style={{ display: 'flex', gap: "10px"}}>
                    <div style={{ textAlign: 'left'}}>
                        <Form.Item
                            name='ccv2'
                            label='CCV2'
                            rules={[
                            { required: true, message: 'Please input your ccv2!' },
                            ]}>
                            <Input placeholder='CCV2'/>
                        </Form.Item>
                    </div>

                    <div style={{ textAlign: 'left'}}>
                        <Form.Item
                            name='expirationDate'
                            label='EXPIRATION DATE'
                            rules={[
                            { required: true, message: 'Please input your expiration date!' },
                            ]}>
                            <Input placeholder='EXPIRATION DATE'/>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item
                    wrapperCol={{ offset: 0, span: 100 }}
                >
                    <Button
                        style={{ height: '40px' }}
                        htmlType='submit'
                        className='full-width'>
                        Pay Now
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default BuyComponent;