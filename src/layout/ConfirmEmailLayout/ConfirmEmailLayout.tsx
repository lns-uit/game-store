import React from 'react';
import '../../screens/ConfirmEmail/styles.css';
import ComfirmEmailComponent from '../../components/ConfirmEmailComponent/ConfirmEmailComponent'

function ConfirmEmailLayout(){
    return(
        <div className="responsive-page-confirm-email">
            <div className="page-content">
                <div className="d-flex center">
                    <ComfirmEmailComponent/>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmailLayout;