import { Button, InputNumber, Space } from "antd";
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

  return (
    <div className="privacy-policy-container-editor">
      <div style = {{display:'flex',justifyContent:'space-between'}}>
        <div className = "time-refund-editor">
          <h3>
            Time Refund
          </h3>
          <InputNumber min={0} defaultValue={0} onChange={value=>setHour(value)} /> &nbsp; Hour&ensp;
          <InputNumber min={0} max={59} defaultValue={0} onChange={value=>setMinute(value)} />&nbsp; Minute&ensp;
          <InputNumber min={0} max={59} defaultValue={0} onChange={value=>setSecond(value)} />&nbsp; Second&ensp;
        </div>
        <Button type="primary" danger onClick={()=>console.log(hour,minute,second)}>
            Save
        </Button>
      
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
  );
}

export default StoreRefundPolicyEditor;
