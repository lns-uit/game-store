import { Button, Form, InputNumber, Space } from "antd";
import { EditorState, EditorRef, RichUtils  } from "draft-js";
import {  ContentState, convertToRaw  } from 'draft-js';
import { useRef, useState } from "react";
import "./style.css";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import {Endpoint} from "../../../../api/endpoint"

function StoreRefundPolicyEditor() {
  let _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const [hour,setHour] = useState(0);
  const [minute,setMinute] = useState(0);
  const [second,setSecond] = useState(0);
  const [form] = Form.useForm();

  return (
    <Form
    form={form}
    layout="vertical"
    onFinish={()=>{}}
    onFinishFailed={()=>{}}
    autoComplete="off"
  >
      <div className="console-container">
        <div className="console-detail-header">
          <h1>
            STORE REFUND POLICY MANAGER
          </h1>
          <div className="console-toolbar">
            <div style = {{width:'20px'}}></div>
            <Form.Item>
              <Button type = "primary" htmlType="submit" className = "btn">
                SAVE
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
        <div className="custom-editor" onClick={focus}>
          <br/>
          <Editor
              // ref={editorRef}
              defaultContentState={contentState}
              onContentStateChange={setContentState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
          />
        </div>
      </div>
    </Form>
  );
}

export default StoreRefundPolicyEditor;
