import React, {useState, useRef} from 'react';
import {
    Form,
    Input
} from 'antd';

function ShortDescription(){
    return(
        <div className="short-decription">
            <Form.Item
                name="shortDecription"
                valuePropName="shortDecription"
                label = "SHORT DESCRIPTION"
                rules={[{ required: true, message: 'Please input short decription' }]}
            >
                <Input.TextArea showCount maxLength={500} />
            </Form.Item>
        </div>
    )
}

export default ShortDescription;