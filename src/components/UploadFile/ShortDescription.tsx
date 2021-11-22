import React, {useState, useRef} from 'react';
import {
    Form,
    Input
} from 'antd';

function ShortDescription(){
    return(
        <div className="short-decription">
            <h3 className="uppercase m-0 white"> Short decription</h3>
            <Form.Item
                name="shortDecription"
                valuePropName="shortDecription"
                rules={[{ required: true, message: 'Please input short decription' }]}
            >
                <Input.TextArea showCount maxLength={500} />
            </Form.Item>
        </div>
    )
}

export default ShortDescription;