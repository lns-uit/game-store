import { Button, Form, InputNumber, message, Space } from "antd";
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
function StoreRefundPolicyEditor() {
  let _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const [hour,setHour] = useState(0);
  const [minute,setMinute] = useState(0);
  const [second,setSecond] = useState(0);
  const [form] = Form.useForm();
  const [policy, setPolicy] = useState<any>();
  const getPrivacyPolicy = async () => {
    const res = await storePolicyApi.getPolicy('store-refund-policy');
    form.setFieldsValue({content:res.content});
    secondsFormatHMS(res.digitValue)
  }
  const updatePrivacyPolicy = async (values:any) => {
    console.log(values);
    const res = await storePolicyApi.updatePolicy({
      namePolicy: 'store-refund-policy',
      content: values.content,
      digitValue: values.Hour*60*60 + values.Minutes*60 + values.Seconds
    });
    message.success('Saved')
  }
  const secondsFormatHMS = (secs: number) => {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    form.setFieldsValue({
      Hour: hours,
      Minutes: minutes,
      Seconds: secs,
    })
  };
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
            <title> Stun Console | Store Refund Policy </title>
      </Helmet>
        <div className="console-detail-header">
          <h1>
            STORE REFUND POLICY MANAGER
          </h1>
          <div className="console-toolbar">
            <div style = {{width:'20px'}}></div>
            <Form.Item>
              <Button type = "primary" htmlType="submit"       
                      className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                      style={{ height: '40px' }}>
                SAVE STORE REFUND POLICY
              </Button>
            </Form.Item>
          </div>
        </div>
        <div className = "console-list" style = {{display:'flex',justifyContent:'space-between'}}>
          <div className = "time-refund-editor">
            
            <Space size='large'>
              <h3>
                Time Refund
              </h3>
              <Form.Item
                name="Hour"
                label="Hour"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} defaultValue={0}  />
              </Form.Item>
              <Form.Item
                name="Minutes"
                label="Minutes"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} max={59} defaultValue={0}  />
              </Form.Item>
          
              <Form.Item
                name="Seconds"
                label="Seconds"
                rules={[{ required: true }]}
              >           
                <InputNumber  min={0} max={59} defaultValue={0}/>
              </Form.Item>
            </Space>
            

          </div>
        </div>
        <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true }]}
              >           
                 <TextArea autoSize rows={25} />
        </Form.Item>
      </div>
    </Form>
  );
}

export default StoreRefundPolicyEditor;
