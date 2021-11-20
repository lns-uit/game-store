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
    Modal,
    DatePicker
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function DetailGame(){

    return(
        <div className="detail-game">
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
                        className="m-bottom-24"
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
                        className="white"
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
                        name="releaseDate" 
                        hasFeedback validateStatus="success" 
                        rules={[{ required: true, message: 'Please input release date!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
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
                </Col>
            </Row>
        </div>
    )
}

export default DetailGame;