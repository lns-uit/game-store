import React, {useState, useRef} from 'react';
import {
    Form,
    Row,
    Col,
    Input
} from 'antd';
import {GameDetailss} from "../../interfaces/rootInterface";

interface GameDetail{
    game: GameDetailss;
}

function SystemRequirements({
    game
}:GameDetail) {
    return (
        <div className="system-requirements">
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

                    <Form.Item
                        name="processor"
                        label = "Processor"
                        rules={[{ required: true, message: 'Please input processor!' }]}
                    >
                        <Input placeholder="Processor" defaultValue={game.newVersion.processor}/>
                    </Form.Item>

                    <Form.Item
                        name="memory"
                        label = "Memory"
                        rules={[{ required: true, message: 'Please select memory!' }]}
                    >
                        <Input placeholder="Memory" defaultValue={game.newVersion.memory}/>
                    </Form.Item>

                    <Form.Item
                        name="graphics"
                        label = "Graphics"
                        rules={[{ required: true, message: 'Please select graphics!' }]}
                    >
                        <Input placeholder="Graphics" defaultValue={game.newVersion.graphics}/>
                    </Form.Item>

                    <Form.Item
                        name="storage"
                        label = "Storage"
                        rules={[{ required: true, message: 'Please input storage!' }]}
                    >
                        <Input placeholder="Storage" defaultValue={game.newVersion.storage}/>
                    </Form.Item>

                    <Form.Item
                        name="OS"
                        label = "OS"
                        rules={[{ required: true, message: 'Please input OS!' }]}
                    >
                        <Input placeholder="OS" defaultValue={game.newVersion.os}/>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default SystemRequirements;