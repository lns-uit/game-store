import React, {useState, useRef} from 'react';
import {
    Form,
    Upload
} from 'antd';

function DecriptionPhoto(){
    const [fileList, setFileList] = useState([]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    return(
        <div className="decription-photo">
            <h3 className="uppercase m-0 white"> description photo</h3>
            <p className="m-0 gray-1">(1920x1080 Required size)</p>
            <div className="upload">
                <Form.Item
                    name="images"
                    valuePropName="images"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Please input images', type: 'array' }]}
                >
                    <Upload
                        listType="picture-card"
                    >
                        {fileList.length < 8 && '+ Upload Image'}
                    </Upload>
                </Form.Item>
            </div>
        </div>
    )
}

export default DecriptionPhoto;