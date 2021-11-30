import React from 'react';
import { Form, Input } from 'antd';

function EditProfileGeneral(){
    return(
        <div>
            <div className="DialogHeader">About</div>
            <div className="DialogBodyText">
                Set your profile name and details. Providing additional information like your real name can help friends find you on the Steam Community.
                <br/>
                <br/>
                Your profile name and avatar represent you throughout Steam, and must be appropriate for all audiences. Please see the for more details.
            </div>
            <div className="edit-general">
                <div className="fs-16 lh-28 uppercase general-title">General</div>
                <div className="pd-24-20">
                    <div>
                        <p className="DialogLabel">Username</p>
                        <Form.Item
                            name="username"
                        >
                            <Input placeholder="UserName"/>
                        </Form.Item>
                    </div>
                    <div>
                        <p className="DialogLabel">Real Name</p>
                        <Form.Item
                            name="realName"
                        >
                            <Input placeholder="Real Name"/>
                        </Form.Item>
                    </div>
                    <div>
                        <p className="DialogLabel">Email</p>
                        <Form.Item
                            name="email"
                        >
                            <Input placeholder="Email"/>
                        </Form.Item>
                    </div>
                    <div>
                        <p className="DialogLabel">Phone</p>
                        <Form.Item
                            name="phone"
                        >
                            <Input placeholder="Phone"/>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileGeneral;