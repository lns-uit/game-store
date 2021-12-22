import React, {useState} from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import axios from 'axios';
import {Endpoint} from '../../api/endpoint';

interface GeneralInterface {
    validUsername: (bool: boolean) => void;
}

function EditProfileGeneral({
    validUsername
}: GeneralInterface){
    const user = useSelector((state: RootState) => state.user);
    const [emailWarning, setEmailWarning] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [stunIdWarning, setStunIdWarning] = useState("");
    const [isValidUsername, setIsValidUsername] = useState(false);

    const ValidStunId = (username: string) => {
        if (username.length <6) {
          setIsValidUsername(false);
          setStunIdWarning("Must be minimun 6 characters")
          return;
        }
        if  (username==="") {
          setIsValidUsername(false);
          setStunIdWarning("Stun ID is require")
          return;
        }
        let valid = username.match(/^[a-zA-Z0-9._]+$/);
        if (valid===null){
          setIsValidUsername(false);
          setStunIdWarning('Invalid username. Username constrain a-z A-Z . _');
          return;
        }
        axios.get(Endpoint.mainApi + 'api/user/check-valid-username/' + username)
        .then(event => {
            setIsValidUsername(true);
            validUsername(true);
        })
        .catch(e => {
            setStunIdWarning(e.request.response)
            setIsValidUsername(false);
            validUsername(false);
        })
    }
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
                        name='username'
                        label = "Stun ID"
                        rules={[
                        { required: true, message: 'Please input your Stun ID!' },
                        ]}
                        hasFeedback
                        help= {stunIdWarning}
                        validateStatus = {isValidUsername ? "success" : "error"}
                    >
                        <Input maxLength={16} className = "b-radius-5" defaultValue={user.userName} placeholder='Stun ID' onBlur={(e)=> ValidStunId(e.target.value)} />
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
                </div>
            </div>
        </div>
    )
}

export default EditProfileGeneral;