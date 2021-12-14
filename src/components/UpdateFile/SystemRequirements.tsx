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
    isUpdate: boolean;
}

function SystemRequirements({
    game,isUpdate
}:GameDetail) {
    return (
        <div style = {{display: isUpdate ? 'none' : 'block'}} className="system-requirements">
            <h3 className="uppercase m-0 white">System requirements</h3>

                    <Form.Item
                        name="processor"
                        label = "Processor"
                        rules={[{ required: !isUpdate, message: "Please Input Processor" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="Processor"/>
                    </Form.Item>

                    <Form.Item
                        name="memory"
                        label = "Memory"
                        rules={[{ required: !isUpdate, message: "Please Input Memory" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="Memory"/>
                    </Form.Item>

                    <Form.Item
                        name="graphics"
                        label = "Graphics"
                        rules={[{ required: !isUpdate, message: "Please Input Graphics" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="Graphics" />
                    </Form.Item>

                    <Form.Item
                        name="storage"
                        label = "Storage"
                        rules={[{ required: !isUpdate, message: "Please Input Storage" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="Storage" />
                    </Form.Item>

                    <Form.Item
                        name="OS"
                        label = "OS"
                        rules={[{ required: !isUpdate, message: "Please Input OS" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="OS"/>
                    </Form.Item>
   
        </div>
    )
}

export default SystemRequirements;