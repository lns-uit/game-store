import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import storePolicyApi from "../../api/storePolicyApi";
import './style.css';

function PrivacyPolicyScreen(){
    const [policy, setPolicy] = useState('');
    const getPrivacyPolicy = async () => {
        const res = await storePolicyApi.getPolicy('privacy-policy');
        setPolicy(res.content);
    }
    useEffect(()=>{
        getPrivacyPolicy();
    },[])
    return(
        <div className="policy-container">
            <h1 className="t-center f-title">
                Privacy Policy
            </h1>
            <br/>
            <div className="t-left f-content">
            <TextArea 
                value={policy}
                className="policy-content-text"
                disabled
                autoSize
            >

            </TextArea>
            </div>
        </div>
    )
}

export default PrivacyPolicyScreen;