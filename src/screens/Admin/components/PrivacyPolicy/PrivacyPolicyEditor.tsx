import { Button, Form, Input, message } from "antd";
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

function PrivacyPolicyEditor() {
  let _contentState = ContentState.createFromText('');
  const [policy, setPolicy] = useState<any>();
  const [form] = Form.useForm();
  const getPrivacyPolicy = async () => {
    const res = await storePolicyApi.getPolicy('privacy-policy');
    form.setFieldsValue({content:res.content});
  }
  const updatePrivacyPolicy = async (values:any) => {
    const res = await storePolicyApi.updatePolicy({
      namePolicy: 'privacy-policy',
      content: values.content
    });
    message.success('Saved')
  }
  useEffect(()=>{
    getPrivacyPolicy();
  },[])
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values)=>{updatePrivacyPolicy(values)}}
      onFinishFailed={()=>{}}
      autoComplete="off"
    >

      <div className="console-container">
      <Helmet>
            <title> Stun Console | Privacy Policy </title>
      </Helmet>
        <div className="console-detail-header">
          <h1>
              PRIVACY POLICY MANAGER
          </h1>
          <div className="console-toolbar">
            <Button
              type="primary"
              htmlType="submit"     
              className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
              style={{ height: '40px' }}
            >
              SAVE PRIVACY POLICY
            </Button>  
          </div>
        </div>
        <div style={{paddingTop:'150px'}}>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >           
            <TextArea autoSize rows={25} />
          </Form.Item>
        </div>
      </div>
          
    </Form>
  );
}

export default PrivacyPolicyEditor;
