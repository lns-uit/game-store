import React from 'react';
import "../../screens/EditProfile/styles.css";

interface AvatarEditType{
    urlAvatar: string;
}

function AvatarEdit({
    urlAvatar
}:AvatarEditType){
    const avatar =
    'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg';
    return(
        <div className="avatar-AvatarRow">
            <div className="avatar-big">
                <div className="cover-image">
                    <img src={urlAvatar !== null ? urlAvatar : avatar} alt="avatar"/>
                </div>
                <div className="pd-top-15 fs-9 lh-11 white">
                    184px
                </div>
            </div>
            <div className="avatar-medium">
                <div className="cover-image">
                    <img src={urlAvatar !== null ? urlAvatar : avatar} alt="avatar"/>
                </div>
                <div className="pd-top-15 fs-9 lh-11 white">
                    64px
                </div>
            </div>
            <div className="avatar-small">
                <div className="cover-image">
                    <img src={urlAvatar !== null ? urlAvatar : avatar} alt="avatar"/>
                </div>
                <div className="pd-top-15 fs-9 lh-11 white">
                    32px
                </div>
            </div>
        </div>
    )
}
export default AvatarEdit;