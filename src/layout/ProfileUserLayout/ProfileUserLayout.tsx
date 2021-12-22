import React from 'react';
import '../../screens/User/styles.css';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UserType } from '../../interfaces/rootInterface';

interface ProfileUserLayoutPropsType {
  user: UserType;
}

function ProfileUserLayout({ user }: ProfileUserLayoutPropsType) {
  const { background, idUser, userName, realName, avatar, email, numberPhone } =
    user || {};
  return (
    <div className='white border-bottom-profile pd-bottom-24'>
      <div className='background-profile border-radius-8'>
        <div className='flex-basic relative border-radius-8 d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full'>
          <div className='width-full border-radius-8 height-300 jagged-wrapper'>
            {background && (
              <div
                className='height-full border-radius-8 background-user'
                style={{ backgroundImage: `url(${background})` }}></div>
            )}
          </div>
        </div>
      </div>
      <div className='avatar-profile'>
        <div className='flex-basic relative d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full'>
          <div className='width-full pd-left-right-16 relative'>
            <div>
              <div className='relative d-flex align-center avatars'>
                <Avatar
                  size={{
                    xs: 168,
                    sm: 168,
                    md: 168,
                    lg: 168,
                    xl: 168,
                    xxl: 168,
                  }}
                  src={
                    avatar ||
                    'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='information-profile'>
        <div className='flex-basic relative d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full'>
          <div className='width-full pd-left-right-48 relative'>
            <div className='d-flex space-between'>
              <div>
                <h1 className='m-bottom-4 white'>{realName}</h1>
                <p className='m-bottom-4 gray-5'>Username: {userName}</p>
                <p className='m-bottom-4 '>Email: {email}</p>
              </div>
              <div>
                <Link to='/edit/user/c1217ffe-de67-49fc-8515-eb6487b7dcda'>
                  <div className='edit-profile'>Edit Profile</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserLayout;
