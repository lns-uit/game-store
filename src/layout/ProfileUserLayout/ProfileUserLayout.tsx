import React from 'react';
import "../../screens/User/styles.css"
import { Avatar } from 'antd';
function ProfileUserLayout(){
    const backgroundUser = 'https://lienminh.garena.vn/images/Lan_h3lpm3/LoL-Patch-Notes-11-4-Article-Banner.jpg'
    return (
        <div className="white">
            <div className="background-profile border-radius-8">
                <div 
                    className="flex-basic relative border-radius-8 d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full">
                    <div className="width-full border-radius-8 height-300 jagged-wrapper">
                        {
                            backgroundUser !== null
                            ?
                            <div className="height-full border-radius-8 background-user" style={{backgroundImage: `url(${backgroundUser})`}}></div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="avatar-profile">
                <div className="flex-basic relative d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full">
                    <div className="width-full pd-left-right-16 relative">
                        <div>
                            <div className="relative d-flex align-center avatar">
                                <Avatar
                                    size={{ xs: 100, sm: 100, md: 100, lg: 168, xl: 168, xxl: 168 }}
                                    src={backgroundUser}
                                />,
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="information-profile">
                <div className="flex-basic relative d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full">
                    <div className="width-full pd-left-right-16 relative">
                        <div>
                            map dit
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserLayout;