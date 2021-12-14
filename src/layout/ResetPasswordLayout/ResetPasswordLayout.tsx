import React from 'react';
import "../../screens/ForgotPassword/styles.css";
import ResetPasswordComponent from "../../components/ResetPasswordComponent/ResetPasswordComponent";

function ResetPasswordLayout(){
    return(
        <div className="responsive-page-confirm-email">
            <div className="page-content">
                <div className="d-flex center">
                    <ResetPasswordComponent/>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordLayout;