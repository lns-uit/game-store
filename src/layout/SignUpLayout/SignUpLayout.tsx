import React from 'react';
import SignUpComponent from "../../components/SignUpComponent/SignUpComponent";
import "../SignInLayout/styles.css";

function SignUpLayout(){
    return(
        <div className="responsive-page-sign-up">
            <div className="page-content">
                <div className="d-flex center">
                    <SignUpComponent/>
                </div>
            </div>
        </div>
    )
}

export default SignUpLayout;