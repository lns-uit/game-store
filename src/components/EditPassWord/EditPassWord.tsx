import React from "react";
import {Form,Input} from "antd"

function EditPassWord(){
    return(
        <div>
            <div className="DialogHeader">Change Password</div>
            <div className="edit-general">
                <div className="pd-24-20">
                    <div>
                        <Form.Item
                            label="Old Password"
                            name="oldPassword"
                        >
                            <Input placeholder="Old Password" type="password"/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { min: 8, message: 'Password must be minimum 8 characters.' },
                                { max: 20, message: 'Password must be max 20 characters.' },
                            ]}
                        >
                            <Input placeholder="New Password" type="password"/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Comfirm Password"
                            name="comfirmPassword"
                        >
                            <Input placeholder="Comfirm Password" type="password"/>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPassWord;