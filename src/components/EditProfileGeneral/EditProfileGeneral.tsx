import React from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

function EditProfileGeneral(){
    const user = useSelector((state: RootState) => state.user);
    console.log(user)
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
                        <Form.Item
                            label="Username"
                            name="username"
                        >
                            <Input placeholder="UserName" defaultValue={user.userName}/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Real Name"
                            name="realName"
                        >
                            <Input placeholder="Real Name" defaultValue={user.realName}/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input type="email" placeholder="Email" defaultValue={user.email}/>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            label="Phone"
                            name="phone"
                        >
                            <Input placeholder="Phone" defaultValue={user.phone}/>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfileGeneral;