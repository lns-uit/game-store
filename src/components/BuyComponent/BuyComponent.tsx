import React,{useState} from 'react';
import "../../layout/LayoutGameDetail1/styles.css";
import { Form, Input, Button } from 'antd';
import visa from "./visa.png";
import NumberFormat from 'react-number-format'

function BuyComponent() {
    const [Err, setErr] = useState(false);
    const [strErr, setStrErr] = useState('');
    const [numberCard, setNumberCard] = useState('1234');
    console.log(numberCard);
    const onFinish = async (values: any) => {
        console.log(values)
    };
    const formatCreddit = (e) =>{
        console.log(e);
        var v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{0,16}/g);
        var match: string = matches && matches[0] || ''
        var parts = []

        console.log(typeof match);

        for (var i=0, len=match.length; i<len; i+=4) {
            
        }
    }
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

                <div style={{ textAlign: 'left', position: 'relative'}}>
                    <Form.Item
                        name='number'
                        label='NUMBER'
                        rules={[
                        { required: true, message: 'Please input your number!' },
                        ]}>
                            <NumberFormat className="number-format-creddit" format="#### #### #### ####"/>
                    </Form.Item>
                    <div className="visa-card">
                        <img src={visa} alt="master card" />
                    </div>
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
                                <Input type="month" placeholder='MONTH'/>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item
                    wrapperCol={{ offset: 0, span: 100 }}
                >
                    <Button
                        style={{ height: '40px' }}
                        htmlType='submit'
                        className='full-width btn-pay'>
                        Pay Now
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default BuyComponent;