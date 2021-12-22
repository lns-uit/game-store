import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import storePolicyApi from "../../api/storePolicyApi";
import './style.css';

function RefundPolicyScreen(){
    const [policy, setPolicy] = useState('');
    const [timeRefund, setTimeRefund] = useState(0);
    const getPrivacyPolicy = async () => {
        const res = await storePolicyApi.getPolicy('store-refund-policy');
        setPolicy(res.content);
        setTimeRefund(res.digitValue);
    }
    const pad = num => {
        return ('0' + num).slice(-2);
      };
      const secondsFormatHMS = (secs: number) => {
        var minutes = Math.floor(secs / 60);
        secs = secs % 60;
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        return `${(hours)} h ${pad(minutes)} m ${pad(secs)} s`;
      };
    useEffect(()=>{
        getPrivacyPolicy();
    },[])
    return(
        <div className="policy-container">
            <h1 className="t-center f-title">
                Store Refund Policy
            </h1>
            <h1 className="t-center f-time-refund">
                Time Refund: {secondsFormatHMS(timeRefund)}
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

export default RefundPolicyScreen;