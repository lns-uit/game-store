import React from 'react';
import "../../screens/ForgotPassword/styles.css";
import ForgotPasswordComponent from "../../components/ForgotPasswordComponent/ForgotPasswordComponent";

function ForgotPasswordLayout(){
    return(
        <div className="responsive-page-confirm-email">
            <div className="page-content">
                <div className="d-flex center">
                    <ForgotPasswordComponent/>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordLayout;