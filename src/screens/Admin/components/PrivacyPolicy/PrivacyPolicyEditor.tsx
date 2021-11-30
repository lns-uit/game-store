import { Button, Input } from "antd";
import { EditorState, EditorRef, RichUtils  } from "draft-js";
import {  ContentState, convertToRaw  } from 'draft-js';
import { useRef, useState } from "react";
import "./style.css";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import {Endpoint} from "../../../../api/endpoint"

function PrivacyPolicyEditor() {
  let _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);

  return (
    <div className="console-container">
      <div className="console-detail-header">
        <h1>
            PRIVACY POLICY MANAGER
        </h1>
        <div className="console-toolbar">
          
          <div className = "btn" onClick={() => { }}>
            {" "}
            Save{" "}
          </div>
        </div>
      </div>
      <div className="console-list" onClick={focus}>
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
