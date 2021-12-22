import { Button, Form, message } from "antd";
import { EditorState, EditorRef, RichUtils  } from "draft-js";
import {  ContentState, convertToRaw  } from 'draft-js';
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import {Endpoint} from "../../../../api/endpoint"
import TextArea from "antd/lib/input/TextArea";
import Helmet from 'react-helmet'
import storePolicyApi from "../../../../api/storePolicyApi";

function TermOfService() {
  let _contentState = ContentState.createFromText('');
  const [policy, setPolicy] = useState<any>();
  const [form] = Form.useForm();
  const getPolicy = async () => {
    const res = await storePolicyApi.getPolicy('term-of-service');
    form.setFieldsValue({content:res.content});
  }
  const updatePolicy = async (values:any) => {
    const res = await storePolicyApi.updatePolicy({
      namePolicy: 'term-of-service',
      content: values.content
    });
    message.success('Saved')
  }
  useEffect(()=>{
    getPolicy();
  },[])
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values)=>{updatePolicy(values)}}
      onFinishFailed={()=>{}}
      autoComplete="off"
    >

      <div className="console-container">
      <Helmet>
            <title> Stun Console | Term of service </title>
      </Helmet>
        <div className="console-detail-header">
          <h1>
              TERM OF SERVICE MANAGER
          </h1>
          <div className="console-toolbar">
          <Button
              type="primary"
              htmlType="submit"     
              className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
              style={{ height: '40px' }}
            >
              Save Term Of Service
            </Button>  
          </div>
        </div>
        <div style={{paddingTop:'150px'}}>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true }]}
        >           
          <TextArea autoSize rows={25}/>
        </Form.Item>
        </div>
       
      </div>
          
    </Form>
  );
}

export default TermOfService;
