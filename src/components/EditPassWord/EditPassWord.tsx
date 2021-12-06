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