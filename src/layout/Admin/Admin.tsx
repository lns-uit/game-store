import React, {useState, useRef} from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
    Input,
    Modal
} from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import {Editor, EditorState,convertToRaw,RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './styles.css';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const { Option } = Select;

function Admin(){
    const [fileList, setFileList] = useState([]);
    const editorRef = React.useRef<Editor>(null)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [draw, setDraw] = useState()
    
    const onChange = (editorState)=>{
        const contentState = editorState.getCurrentContent();
        setEditorState(editorState);
        setDraw(convertToRaw(contentState));
    }

    const onBoldClick = (e) =>{
        e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    const focus = () => {
        editorRef.current.focus();
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
    
    const onFinish = (values: any) => {
        values.draft = draw;
        console.log('Received values of form: ', values);
    };

    return (
        <div className="white">
            <Form
                name="validate_other"
                onFinish={onFinish}
            >
                <Form.Item style ={{backgroundColor: "#111"}} rules={[{ required: true, message: 'Please upload' }]}>
                    <Form.Item name="fileGame" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files">
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text uppercase">Upload File</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                <Row gutter={[48, 8]}>
                    <Col
                        xxl={14}
                        xl={14}
                        lg={16}
                        md={16}
                        sm={24}
                        xs={24}
                    >
                        <Form.Item
                            name="nameGame"
                            rules={[{ required: true, message: 'Please input name game!' }]}
                        >
                            <Input placeholder="Name Game" />
                        </Form.Item>

                        <Form.Item
                            name="select-multiple"
                            rules={[{ required: true, message: 'Please select genres', type: 'array' }]}
                        >
                            <Select mode="multiple" placeholder="Please select genres">
                                <Option value="Shooter">Shooter</Option>
                                <Option value="OpenWorld">Open World</Option>
                                <Option value="Casual">Casual</Option>
                                <Option value="HyperCasual">Hyper Casual</Option>
                                <Option value="Survival">Survival</Option>
                                <Option value="Puzzle">Puzzle</Option>
                                <Option value="Co.op">Co.op</Option>
                                <Option value="Multiplayer">Multiplayer</Option>
                                <Option value="SinglePlayer">Single Player</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="platform"
                            rules={[{ required: true, message: 'Please select platform!' }]}
                        >
                            <Select placeholder="Please select platform">
                                <Option value="window">Window</Option>
                                <Option value="macOS">MacOS</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="developer"
                            rules={[{ required: true, message: 'Please input developer!' }]}
                        >
                            <Input placeholder="Developer" />
                        </Form.Item>

                        <Form.Item
                            name="publisher"
                            rules={[{ required: true, message: 'Please input publisher!' }]}
                        >
                            <Input placeholder="Publisher" />
                        </Form.Item>

                        <Form.Item
                            name="privacyPolicy"
                            rules={[{ required: true, message: 'Please input privacy policy!' }]}
                        >
                            <Input placeholder="Privacy Policy" />
                        </Form.Item>

                        <Form.Item
                            name="urlVideo"
                            rules={[{ required: true, message: 'Please input url video!' }]}
                        >
                            <Input placeholder="URL Video" />
                        </Form.Item>
                    </Col>
                    <Col
                        xxl={10}
                        xl={100}
                        lg={8}
                        md={8}
                        sm={24}
                        xs={24}
                    >
                        <Form.Item
                            name="version"
                            rules={[{ required: true, message: 'Please input version!' }]}
                        >
                            <Input placeholder="Version" />
                        </Form.Item>
                        <Form.Item
                            name="icon"
                            valuePropName="icon"
                            getValueFromEvent={normFile}
                        >
                            <Upload name="icon" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="decription-photo">
                    <h3 className="uppercase m-0 white"> decription photo</h3>
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
                                {fileList.length < 8 && '+ Upload'}
                            </Upload>
                        </Form.Item>
                    </div>
                </div>
                <div className="short-decription">
                    <h3 className="uppercase m-0 white"> Short decription</h3>
                    <Form.Item
                        name="shortDecription"
                        valuePropName="shortDecription"
                        rules={[{ required: true, message: 'Please input short decription' }]}
                    >
                        <Input.TextArea showCount maxLength={500} />
                    </Form.Item>
                </div>
                <div className="detail-decription">
                    <h3 className="uppercase m-0 white"> detail decription</h3>
                    <Form.Item
                        name="detailDecription"
                        valuePropName="detailDecription"
                    >
                        <div className="custom-editor" onClick={focus}>
                            <span className="pointer btn-bold" onMouseDown={onBoldClick}>
                                Bold
                            </span>
                            <Editor                                     
                                ref={editorRef}                           
                                editorState={editorState}
                                onChange={onChange}
                            />
                        </div>
                    </Form.Item>
                </div>
                <div className="detail-decription">
                    <h3 className="uppercase m-0 white">System requirements</h3>
                    <Row gutter={[48, 8]}>
                        <Col
                            xxl={14}
                            xl={14}
                            lg={16}
                            md={16}
                            sm={24}
                            xs={24}
                        >
                            <h3 className="uppercase m-0 white">Minimum</h3>
                            <Form.Item
                                name="processor"
                                rules={[{ required: true, message: 'Please input processor!' }]}
                            >
                                <Input placeholder="Processor" />
                            </Form.Item>

                            <Form.Item
                                name="memory"
                                rules={[{ required: true, message: 'Please select memory!' }]}
                            >
                                <Input placeholder="Memory" />
                            </Form.Item>

                            <Form.Item
                                name="graphics"
                                rules={[{ required: true, message: 'Please select graphics!' }]}
                            >
                                <Input placeholder="Graphics" />
                            </Form.Item>

                            <Form.Item
                                name="storage"
                                rules={[{ required: true, message: 'Please input storage!' }]}
                            >
                                <Input placeholder="Storage" />
                            </Form.Item>

                            <Form.Item
                                name="OS"
                                rules={[{ required: true, message: 'Please input OS!' }]}
                            >
                                <Input placeholder="OS" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <Row gutter={[48, 8]}>
                    <Col
                        xxl={14}
                        xl={14}
                        lg={16}
                        md={16}
                        sm={24}
                        xs={24}
                    >
                        <h3 className="uppercase m-0 white">cost</h3>
                        <Form.Item
                            name="cost"
                            rules={[{ required: true, message: 'Please input cost!' }]}
                        >
                            <Input placeholder="Cost" />
                        </Form.Item>
                    </Col>
                    <Col
                        xxl={10}
                        xl={100}
                        lg={8}
                        md={8}
                        sm={24}
                        xs={24}
                    >
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Admin;