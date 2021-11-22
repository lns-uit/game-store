import { Button } from "antd";
import { EditorState, EditorRef, RichUtils  } from "draft-js";
import {  ContentState, convertToRaw  } from 'draft-js';
import { useRef, useState } from "react";
import "./style.css";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

function PrivacyPolicyEditor() {
  let _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);

  return (
    <div className="privacy-policy-container-editor">
      <div style = {{float:'right'}}>
        <Button type="primary" danger onClick={()=>console.log(contentState)}>
            Save
        </Button>
      
      </div>
      <br/><br/>
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

export default PrivacyPolicyEditor;
