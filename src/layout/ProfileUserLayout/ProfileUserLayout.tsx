import React from 'react';
import "../../screens/User/styles.css"
import { Avatar } from 'antd';
import {Link} from "react-router-dom";
function ProfileUserLayout(){
    const backgroundUser = 'https://st.quantrimang.com/photos/image/2019/06/11/lol-la-gi-2.jpg';
    const user = {
        realName: "Nguyen Phuc",
        userName: "demo",
        email: "demo@gmail.com",
        phone: "0792545xxx"
    }
    return (
        <div className="white border-bottom-profile pd-bottom-24">
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
                            <div className="relative d-flex align-center avatars">
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
                    <div className="width-full pd-left-right-48 relative">
                        <div className="d-flex space-between">
                            <div>
                                <h1 className="m-bottom-4 white">{user.realName}</h1>
                                <p className="m-bottom-4 gray-5">Username: {user.userName}</p>
                                <p className="m-bottom-4 ">Email: {user.email}</p>
                                <p className="m-0 ">Phone: {user.phone}</p>
                            </div>
                            <div>
                                <Link to={"/user/c1217ffe-de67-49fc-8515-eb6487b7dcda/edit"}>
                                    <div className="edit-profile">Edit Profile</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserLayout;