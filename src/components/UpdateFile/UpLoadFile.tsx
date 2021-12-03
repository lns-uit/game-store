import React,{useState} from 'react';
import {
    Form,
    Upload
} from 'antd';
import {InboxOutlined } from '@ant-design/icons';

function UploadFile(){
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    }

    // function handleUpload(image){
    //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //     uploadTask.on(
    //         "state_changed",
    //         snapshot =>{},
    //         error => {
    //             console.log(error);
    //         },
    //         ()=>{
    //             storage
    //                 .ref("images")
    //                 .child(image.name)
    //                 .getDownloadURL()
    //                 .then(url=>{
    //                     setUrl(url)
    //                 })
    //         }
    //     )
    // }

    return (
        <Form.Item style ={{backgroundColor: "#111"}} rules={[{ required: true, message: 'Please upload' }]}>
            <Form.Item name="fileGame" valuePropName="fileGame" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="fileGame">
                        <p className="ant-upload-drag-icon">
                         <InboxOutlined />
                        </p>
                    <p className="ant-upload-text uppercase">Upload File Zip</p>
                </Upload.Dragger>
            </Form.Item>
        </Form.Item>
    )
}

export default UploadFile;