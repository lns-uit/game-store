import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from 'axios';
import { Endpoint } from '../../api/endpoint';
import './style.css'
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";

interface typeSlug{
    url: string,
}

function ConfirmEmailWithLink() {
    const slug = useParams<typeSlug>();
    const [isSuccess,setIsSuccess] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const Verifying = () => {
        axios.post(Endpoint.mainApi + 'api/user/verification/link',{},{
            headers: {
                url: slug.url
            }
            
        }).then(e => {
            setIsSuccess(true);
            localStorage.setItem('accessToken',e.data.token);
            dispatch(login(e.data.user));
        }).catch(e => {
            setIsSuccess(false);
        })
    }
    
    useEffect(()=>{
        Verifying();
    },[])
    return(
        <div className = "confirm-email-with-link-container flex-center">
                {
                isSuccess ?
                <div className = "flex-column confirm-email-with-link-box flex-center">
                    <div className = "fs-tt">
                        Welcome
                    </div>
                    <br/>
                    <div className = "btn flex-center b-r5" onClick={()=>{history.replace('/')}}>
                        Go to Discover
                    </div>
                </div> : 
                <div className = "flex-column confirm-email-with-link-box flex-center">
                    <div className = "fs-tt">
                        Fail to Verification Code
                    </div>
                    <br/>
                    <div className = "btn flex-center b-r5">
                        Go to Discover
                    </div>
                </div>
                }
        </div>
    )
}

export default ConfirmEmailWithLink;